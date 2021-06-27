<template>
  <div class="py-4 rounded-lg bg-light text-center">
    <p class="text-lg">{{ title }}</p>
    <img class="w-16 h-16 mx-auto my-8" :src="imgPath" :alt="img" />
    <p class="text-sm px-12"><slot></slot><span v-if="annotation">※</span></p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    img: String,
    annotation: Boolean,
  },
  computed: {
    imgPath() {
      return "/" + this.img + ".png";
    },
  },
};
</script>
