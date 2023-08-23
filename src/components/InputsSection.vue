<template>
  <div>
    <div class="inputs">
      <DebounceInput
        class="flex-item"
        type="text"
        id="price"
        placeholder="Цена"
        v-model="price"
      />
      <DebounceInput
        class="flex-item"
        type="text"
        id="count"
        placeholder="Количество"
        v-model="count"
      />
      <DebounceInput
        class="flex-item"
        type="text"
        id="sum"
        placeholder="Сумма"
        v-model="sum"
      />
      <button
        class="flex-item"
        type="button"
        @click="saveData"
        :disabled="disable"
      >
        Отправить
      </button>
    </div>
    <div class="labels">
      <p class="flex-item">Цена: {{ price }}</p>
      <p class="flex-item">Количество: {{ count }}</p>
      <p class="flex-item">Сумма: {{ sum }}</p>
      <p class="flex-item">{{ getLocalData }}</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import DebounceInput from "./DebounceInput.vue";
import { mapGetters } from "vuex";

export default {
  name: "InputsSection",
  components: {
    DebounceInput,
  },
  data() {
    return {
      price: 0,
      count: 0,
      sum: 0,
      prevChangedField: "count", // price, count or sum
      lastChangedField: "price", // price, count or sum
      processing: false,
      disable: false,
    };
  },
  methods: {
    async saveData() {
      if (this.disable) {
        return;
      }
      this.disable = true;
      const data = {
        price: this.price,
        qty: this.sum,
        amount: this.count,
      };
      await this.$store.dispatch("saveToServer", data);

      this.disable = false;
    },
    updateChangeOrder(field) {
      if (this.lastChangedField !== field) {
        this.prevChangedField = this.lastChangedField;
        this.lastChangedField = field;
      }
    },
  },
  watch: {
    price: function () {
      if (this.processing) {
        return;
      }
      this.processing = true;
      this.updateChangeOrder("price");
      this.$store.dispatch("addToHistory", `Введена цена: ${this.price}`);
      if (this.prevChangedField === "sum") {
        this.count = this.sum / this.price || 0;
        this.$store.dispatch(
          "addToHistory",
          `Количество пересчитано: ${this.count}`
        );
      } else {
        this.sum = this.price * this.count || 0;
        this.$store.dispatch("addToHistory", `Сумма пересчитана: ${this.sum}`);
      }
      Vue.nextTick(() => {
        this.processing = false;
      });
    },
    count: function () {
      if (this.processing) {
        return;
      }
      this.processing = true;
      this.updateChangeOrder("count");
      this.$store.dispatch("addToHistory", `Введено количество: ${this.count}`);
      if (this.prevChangedField === "sum") {
        this.price = this.sum / this.count || 0;
        this.$store.dispatch("addToHistory", `Цена пересчитано: ${this.price}`);
      } else {
        this.sum = this.price * this.count || 0;
        this.$store.dispatch("addToHistory", `Сумма пересчитана: ${this.sum}`);
      }
      Vue.nextTick(() => {
        this.processing = false;
      });
    },
    sum: function () {
      if (this.processing) {
        return;
      }
      this.processing = true;
      this.updateChangeOrder("sum");
      this.$store.dispatch("addToHistory", `Введена сумма: ${this.sum}`);
      if (this.prevChangedField === "price") {
        this.count = this.sum / this.price || 0;
        this.$store.dispatch(
          "addToHistory",
          `Количество пересчитано: ${this.count}`
        );
      } else {
        this.price = this.sum / this.count || 0;
        this.$store.dispatch("addToHistory", `Цена пересчитано: ${this.price}`);
      }
      Vue.nextTick(() => {
        this.processing = false;
      });
    },
  },
  created() {
    const data = localStorage.getItem("data");
    this.localData = data;
  },
  computed: {
    ...mapGetters(["getLocalData"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputs,
.labels {
  display: flex;
  gap: 10px;
}
.flex-item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100%;
  width: 100%;
}
</style>
