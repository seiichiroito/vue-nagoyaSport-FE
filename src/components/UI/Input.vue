<template>
  <input
    class="border border-gray placeholder-gray py-2 px-4 my-2"
    :value="value"
    @input="onInput"
  />
</template>

<script>
export default {
  emits: ["input"],
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event);
    },
  },
};
</script>
