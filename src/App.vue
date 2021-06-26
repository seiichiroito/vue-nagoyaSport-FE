<template>
  <TheHeader />
  <RouterView></RouterView>
  <TheFooter />
</template>

<script>
import "normalize.css";

import Home from "./pages/Home.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  components: {
    Home,
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.app-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
