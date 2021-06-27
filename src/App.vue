<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex-grow bg-light">
      <RouterView></RouterView>
    </div>
    <TheFooter />
  </div>
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
:root {
  --blue: #118ab2;
  --darkBlue: #073b4c;
}
body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
* {
  /* outline: 1px solid #ddd; */
}
.app-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
