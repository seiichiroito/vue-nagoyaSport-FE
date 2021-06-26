<template>
  <header class="bg-blue shadow-md">
    <div
      class="app-container py-4 flex justify-between text-light items-center"
    >
      <div class="flex items-center">
        <RouterLink to="/">
          <img src="../assets/logo.png" alt="logo" class="w-6 h-6" />
        </RouterLink>
        <p class="text-sm ml-4">
          名古屋市
          <br />
          スポーツ•レクリエーション情報システム
        </p>
      </div>
      <div>
        <font-awesome-icon icon="bars" class="text-2xl md:hidden" />
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
          <li>
            <RouterLink to="/login" class="hover:text-darkBlue">
              ログイン
            </RouterLink>
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
};
</script>
