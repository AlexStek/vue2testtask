<template>
  <div id="app">
    <InputsSection />
    <HistorySection />
  </div>
</template>

<script>
import InputsSection from "./components/InputsSection.vue";
import HistorySection from "./components/HistorySection.vue";

export default {
  name: "App",
  components: {
    InputsSection,
    HistorySection,
  },
  data() {
    return {
      history: [],
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 10px;
  border: 1px solid black;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
