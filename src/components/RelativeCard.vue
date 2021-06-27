<template>
  <a class="flex justify-center">
    <img :src="imgPath" :alt="img" />
  </a>
</template>

<script>
export default {
  props: {
    img: String,
  },
  computed: {
    imgPath() {
      return "/" + this.img + ".gif";
    },
  },
};
</script>
