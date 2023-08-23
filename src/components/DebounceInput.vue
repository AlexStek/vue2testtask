<template>
  <input type="text" v-model="input" :id="id" :placeholder="placeholder" />
</template>

<script>
export default {
  name: "DebounceInput",
  props: {
    id: String,
    placeholder: String,
    value: [String, Number],
  },
  data() {
    return {
      timeout: null,
      debouncedInput: this.value,
    };
  },
  watch: {
    value: function () {
      this.debouncedInput = this.value;
    },
  },
  computed: {
    input: {
      get() {
        return this.debouncedInput;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedInput = val;
          this.$emit("input", val);
        }, 300);
      },
    },
  },
};
</script>
