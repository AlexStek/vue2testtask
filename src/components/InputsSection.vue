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
      <p class="flex-item">{{ localData }}</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import DebounceInput from "./DebounceInput.vue";

async function sendToServer(data) {
  localStorage.setItem("data", JSON.stringify(data));
  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, 1000);
  });
  return {
    success: true,
  };
}

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
      nonce: 0,
      localData: null,
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
        nonce: this.nonce,
        price: this.price,
        qty: this.sum,
        amount: this.count,
      };
      this.nonce++;
      const result = await sendToServer(data);
      console.log("result", result);
      this.localData = data;
      this.disable = false;
    },
    updateChangeOrder(field) {
      if (this.lastChangedField !== field) {
        this.prevChangedField = this.lastChangedField;
        this.lastChangedField = field;
      }
    },
    addToHistory(event) {
      this.$emit("updateHistory", event);
    },
  },
  watch: {
    price: function () {
      if (this.processing) {
        return;
      }
      this.processing = true;
      this.updateChangeOrder("price");
      this.addToHistory(`Введена цена: ${this.price}`);
      if (this.prevChangedField === "sum") {
        this.count = this.sum / this.price;
        this.addToHistory(`Количество пересчитано: ${this.count}`);
      } else {
        this.sum = this.price * this.count;
        this.addToHistory(`Сумма пересчитана: ${this.sum}`);
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
      this.addToHistory(`Введено количество: ${this.count}`);
      if (this.prevChangedField === "sum") {
        this.price = this.sum / this.count;
        this.addToHistory(`Цена пересчитано: ${this.price}`);
      } else {
        this.sum = this.price * this.count;
        this.addToHistory(`Сумма пересчитана: ${this.sum}`);
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
      this.addToHistory(`Введена сумма: ${this.sum}`);
      if (this.prevChangedField === "price") {
        this.count = this.sum / this.price;
        this.addToHistory(`Количество пересчитано: ${this.count}`);
      } else {
        this.price = this.sum / this.count;
        this.addToHistory(`Цена пересчитано: ${this.price}`);
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
