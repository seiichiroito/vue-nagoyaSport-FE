<template>
  <div class="bg-light py-8">
    <BaseLoading v-if="isLoading" />

    <div class="app-container setting-container">
      <BackButton />
      <PageTitle>設定</PageTitle>
      <swiper
        :slides-per-view="1"
        :pagination="pagination"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>
          <div class="p-8">
            <form class="grid" @submit.prevent="submitForm">
              <label for="email">Eメール</label>
              <Input
                id="email"
                type="email"
                placeholder="Eメール"
                :value="formState.email"
                @input="onInput"
              />
              <label for="userId">利用者ID</label>
              <Input
                id="userId"
                type="text"
                :value="userId"
                disabled
                @input="onInput"
                class="mb-12 bg-lightGray"
              />

              <button
                class="
                  bg-blue
                  text-light
                  py-2
                  px-8
                  rounded-md
                  hover:bg-darkBlue
                "
                type="submit"
              >
                保存する
              </button>
            </form>
          </div>
        </swiper-slide>
        <swiper-slide> password 変更 </swiper-slide>
        <swiper-slide>
          <div class="flex justify-center items-center h-full">
            <button
              class="bg-blue py-2 px-4 hover:bg-darkBlue rounded text-light"
              @click="logout"
            >
              ログアウトする
            </button>
          </div>
        </swiper-slide>
        <!-- <template name="container-start">Container Start</template>
        <template name="container-end">Container End</template>
        <template name="wrapper-start">Wrapper Start</template>
        <template name="wrapper-end">Wrapper end</template> -->
      </swiper>
    </div>
  </div>
</template>
<script>
// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

// install Swiper modules
SwiperCore.use([Pagination]);

// Import Swiper styles
export default {
  data() {
    return {
      formState: {
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmationNewPassword: "",
      },
      isLoading: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    setUserEmail() {
      this.formState.email = this.$store.getters.email;
    },
    onSwiper(swiper) {
      // console.log(swiper);
    },
    onSlideChange() {
      // console.log("slide change");
    },
    async submitForm() {
      if (this.isLoading) {
        return;
      }
      try {
        this.isLoading = true;
        await this.$store.dispatch("changeEmail", {
          email: this.formState.email,
        });
        this.isLoading = false;
        this.$store.dispatch("showNotification", {
          type: "success",
          messages: ["メールの変更に成功しました。"],
        });
      } catch (err) {
        this.isLoading = false;

        this.$store.dispatch("showNotification", {
          type: "error",
          messages: ["メールの変更に失敗しました。"],
        });
      }
    },
    onInput(event) {
      this.formState = {
        ...this.formState,
        [event.target.id]: event.target.value,
      };
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    pagination() {
      const tabs = ["プロフィール", "パスワード変更", "ログアウト"];
      return {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + tabs[index] + "</span>";
        },
      };
    },
  },
  mounted() {
    this.setUserEmail();
  },
};
</script>
<style lang="scss">
.swiper-slide {
  /* Center slide text vertically */
  padding-top: 50px;
  background-color: #fff;
}

.swiper-container {
  height: 60vh;
  margin-top: 1rem;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.25);
  max-width: 30rem;
}

.swiper-pagination {
  height: 50px;
  bottom: initial !important;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #fff;
}
.swiper-pagination-bullet {
  width: 100%;
  height: 50px;
  border-radius: 0;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  color: #000;
  opacity: 1;
  margin: 0 !important;
  background: #fff;
}

.swiper-pagination-bullet-active {
  color: #118ab2;
  background: #fff;
  border-bottom: 1px solid #118ab2;
}
</style>
