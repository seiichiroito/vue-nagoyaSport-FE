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
      <li>
        <NavLink to="/login" @click="$emit('closeNav')"> ログイン </NavLink>
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
};
</script>

<style>
nav {
  height: 14rem;
}

@media screen and (min-width: 768px) {
  nav {
    display: none;
  }
}
</style>
