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
  props: {
    to: String,
  },
  methods: {
    backLink() {
      if (this.to) {
        this.$router.push(this.to);
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>
