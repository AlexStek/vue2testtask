<template>
  <div class="history">
    <h2 class="title">История</h2>
    <div>
      <p v-for="(item, index) in historyReversed" :key="index">{{ item }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistorySection",
  props: {
    history: Array,
  },
  computed: {
    historyReversed() {
      return [...this.history].reverse();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history {
  border: 1px solid black;
  padding: 10px;
}
.title {
  margin: 0;
}
</style>
