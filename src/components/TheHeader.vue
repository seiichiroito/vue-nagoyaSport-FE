<template>
  <header class="bg-blue shadow-md">
    <div
      class="app-container py-4 flex justify-between text-light items-center"
    >
      <div class="flex items-center">
        <RouterLink to="/" @click="$emit('closeNav')">
          <img src="/logo.png" alt="logo" class="w-6 h-6" />
        </RouterLink>
        <p class="text-xs ml-4">
          名古屋市
          <br />
          スポーツ•レクリエーション情報システム
        </p>
      </div>
      <div>
        <span class="p-4 text-3xl md:hidden" @click="$emit('toggleNav')">
          <font-awesome-icon icon="bars" />
        </span>
        <ul class="hidden md:flex text-base space-x-6">
          <li>
            <RouterLink to="/" class="hover:text-darkBlue"> ホーム </RouterLink>
          </li>
          <li>
            <RouterLink to="/reserve-date" class="hover:text-darkBlue">
              日時から予約
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/reserve-facility" class="hover:text-darkBlue">
              施設から予約
            </RouterLink>
          </li>
          <li v-if="!isLoggedIn">
            <RouterLink to="/login" class="hover:text-darkBlue">
              ログイン
            </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink to="/setting" class="hover:text-darkBlue"
              >設定</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import TheNavbar from "./TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
  data() {
    return {
      navIsHidden: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
