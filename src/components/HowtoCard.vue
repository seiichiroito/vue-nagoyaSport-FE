<template>
  <div class="py-4">
    <p class="flex items-center">
      <span
        class="
          w-8
          h-8
          border border-blue
          rounded-full
          flex
          items-center
          justify-center
          mr-2
        "
        >{{ number }}</span
      >{{ title }}
    </p>
    <img class="h-48 mx-auto my-4" :src="imgPath" :alt="img" />
    <p class="text-center px-4"><slot></slot></p>
  </div>
</template>

<script>
export default {
  props: {
    number: String,
    title: String,
    img: String,
  },
  computed: {
    imgPath() {
      return "/src/assets/" + this.img + ".svg";
    },
  },
};
</script>
