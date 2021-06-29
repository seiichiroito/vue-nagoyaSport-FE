<template>
  <button
    @click="backLink"
    class="border p-1 rounded-md border-blue text-blue mb-4"
  >
    &lt; 戻る
  </button>
</template>

<script>
export default {
  methods: {
    backLink() {
      this.$router.go(-1);
    },
  },
};
</script>
