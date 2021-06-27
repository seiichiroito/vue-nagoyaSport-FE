<template>
  <RouterLink class="bg-blue text-light py-2 px-8 rounded-md hover:bg-darkBlue">
    <slot></slot>
  </RouterLink>
</template>

<script>
export default {
  props: {
    type: String,
  },
};
</script>
