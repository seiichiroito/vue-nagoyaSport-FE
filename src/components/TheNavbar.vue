<template>
  <nav class="bg-blue">
    <ul class="text-center">
      <li>
        <NavLink to="/" @click="$emit('closeNav')">ホーム</NavLink>
      </li>
      <li>
        <NavLink to="/reserve-date" @click="$emit('closeNav')">
          日時から予約
        </NavLink>
      </li>
      <li>
        <NavLink to="/reserve-facility" @click="$emit('closeNav')">
          施設から予約
        </NavLink>
      </li>
      <li v-if="!isLoggedIn">
        <NavLink to="/login" @click="$emit('closeNav')"> ログイン </NavLink>
      </li>
      <li v-if="isLoggedIn">
        <NavLink to="/setting" @click="$emit('closeNav')">設定</NavLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import NavLink from "./NavLink.vue";

export default {
  components: {
    NavLink,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style>
@media screen and (min-width: 768px) {
  nav {
    display: none;
  }
}
</style>
