<template>
  <teleport to="body">
    <transition>
      <button
        class="
          fixed
          bottom-5
          right-5
          bg-darkBlue
          rounded-full
          p-4
          flex
          text-white
        "
        @click="moveToTop"
        v-if="isShow"
      >
        <font-awesome-icon icon="arrow-up" class="text-lg" />
      </button>
    </transition>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      scY: 0,
    };
  },
  watch: {
    scY(val) {
      if (val > 1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  methods: {
    moveToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active {
  transition: all 0.5s ease-in;
}
.v-leave-active {
  transition: all 0.5s ease-out;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
