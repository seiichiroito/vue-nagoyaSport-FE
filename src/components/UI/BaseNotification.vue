<template>
  <div :class="type" class="flex justify-center items-center">
    <ul class="text-dark px-4 py-2 text-center text-sm list-disc list-inside">
      <li v-for="message in notification.messages" :key="message">
        {{ message }}
      </li>
    </ul>
    <font-awesome-icon
      icon="times-circle"
      class="text-2xl relative text-dark"
      @click="clearNotification"
    />
  </div>
</template>

<script>
export default {
  props: {
    notification: Object,
    type: String,
  },
  methods: {
    clearNotification() {
      this.$store.dispatch("clearNotification");
    },
  },
};
</script>

<style scoped>
.warning {
  background-color: #ffd166;
}
.error {
  background-color: #ef476f;
}
.success {
  background-color: #118ab2;
}
</style>
