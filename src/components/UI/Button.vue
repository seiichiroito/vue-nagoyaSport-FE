<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="bg-blue text-light py-2 px-8 rounded-md hover:bg-darkBlue"
  >
    <slot></slot>
  </RouterLink>
  <button
    v-if="!to"
    :type="type"
    class="bg-blue text-light py-2 px-8 rounded-md hover:bg-darkBlue"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    to: String,
    type: String,
  },
};
</script>
