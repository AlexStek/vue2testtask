<template>
  <div>
    <div class="inputs">
      <input
        class="flex-item"
        type="text"
        id="price"
        placeholder="Цена"
        v-model="price"
      />
      <input
        class="flex-item"
        type="text"
        id="count"
        placeholder="Количество"
        v-model="count"
      />
      <input
        class="flex-item"
        type="text"
        id="sum"
        placeholder="Сумма"
        v-model="sum"
      />
      <button class="flex-item" type="button">Отправить</button>
    </div>
    <div class="labels">
      <p class="flex-item">Цена: {{ price }}</p>
      <p class="flex-item">Количество: {{ count }}</p>
      <p class="flex-item">Сумма: {{ sum }}</p>
      <p class="flex-item">{{ prevChangedField }} {{ lastChangedField }}</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "InputsSection",
  data() {
    return {
      price: 0,
      count: 0,
      sum: 0,
      prevChangedField: "count", // price, count or sum
      lastChangedField: "price", // price, count or sum
      processing: false,
    };
  },
  methods: {
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
      if (this.prevChangedField === "sum") {
        this.count = this.sum / this.price;
      } else {
        this.sum = this.price * this.count;
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
      if (this.prevChangedField === "sum") {
        this.price = this.sum / this.count;
      } else {
        this.sum = this.price * this.count;
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
      if (this.prevChangedField === "price") {
        this.count = this.sum / this.price;
      } else {
        this.price = this.sum / this.count;
      }
      Vue.nextTick(() => {
        this.processing = false;
      });
    },
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
