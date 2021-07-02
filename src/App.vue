<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader @toggleNav="toggleNav" @closeNav="closeNav" />
    <el-collapse-transition>
      <TheNavbar v-if="navIsOpen" @closeNav="closeNav" />
    </el-collapse-transition>
    <el-collapse-transition>
      <BaseNotification
        v-if="notification.messages"
        :notification="notification"
        :type="notification.type"
      />
    </el-collapse-transition>
    <div class="flex-grow bg-light">
      <RouterView v-if="this.$route.meta.keepAlive" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </RouterView>
      <router-view v-else></router-view>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import "normalize.css";

import Home from "./pages/Home.vue";
import TheHeader from "./components/TheHeader.vue";
import BaseNotification from "./components/UI/BaseNotification.vue";
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
  computed: {
    notification() {
      return this.$store.getters.notification;
    },
  },
  components: {
    Home,
    TheHeader,
    BaseNotification,
    TheNavbar,
    TheFooter,
  },
  created() {
    this.$store.dispatch("autoLogin");
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
  /* outline: 1px solid #555; */
}
.app-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
