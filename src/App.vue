<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader @toggleNav="toggleNav" @closeNav="closeNav" />
    <el-collapse-transition>
      <TheNavbar v-if="navIsOpen" @closeNav="closeNav" />
    </el-collapse-transition>
    <div class="flex-grow bg-light">
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import "normalize.css";

import Home from "./pages/Home.vue";
import TheHeader from "./components/TheHeader.vue";
import TheNavbar from "./components/TheNavbar.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  data() {
    return {
      navIsOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.navIsOpen = !this.navIsOpen;
    },
    closeNav() {
      this.navIsOpen = false;
    },
  },
  components: {
    Home,
    TheHeader,
    TheNavbar,
    TheFooter,
  },
};
</script>

<style>
:root {
  --blue: #118ab2;
  --darkBlue: #073b4c;
  --light: "#f3f3f3";
  --lightBlue: "#dce8ed";
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
