<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader @toggleNav="toggleNav" @closeNav="closeNav" />
    <transition name="navbar">
      <TheNavbar v-if="navIsOpen" @closeNav="closeNav" />
    </transition>
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

.navbar-enter-from {
  height: 0;
}
.navbar-enter-to {
  height: 14rem;
}
.navbar-enter-active {
  transition: all 0.3s ease-in;
}
.navbar-leave-from {
  height: 14rem;
}
.navbar-leave-to {
  height: 0;
}
.navbar-leave-active {
  transition: all 0.3s ease-in;
}
</style>
