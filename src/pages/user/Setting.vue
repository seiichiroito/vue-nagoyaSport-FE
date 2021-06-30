<template>
  <section class="py-8 bg-light">
    <div class="app-container">
      <button @click="confirm">ログアウト</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    confirm() {
      if (window.confirm("ログアウトしますか？")) {
        this.logout();
        this.$router.push("/login");
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
