<template>
  <RouterLink class="border flex p-4 rounded items-center">
    <img :src="imgUrl" :alt="imgUrl" class="w-16 h-16" />
    <div class="flex-1 ml-4">
      <p>{{ name }}</p>
      <div class="mt-4 flex justify-between text-sm items-center">
        <ul>
          <li class="border border-blue py-0.5 px-1 rounded-full">
            {{ type }}
          </li>
        </ul>
        <p>{{ area }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    imgUrl: String,
    name: String,
    type: String,
    area: String,
  },
};
</script>
