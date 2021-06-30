<template>
  <HomeHero v-if="!isLoggedIn" />
  <Landing v-if="!isLoggedIn" />
  <HomeMain v-if="isLoggedIn" />
  <TheSidebar />
</template>

<script>
import Landing from "../components/Landing.vue";
import HomeHero from "../components/HomeHero.vue";
import HomeMain from "../components/HomeMain.vue";
import TheSidebar from "../components/TheSidebar.vue";

export default {
  components: {
    Landing,
    HomeHero,
    HomeMain,
    TheSidebar,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
