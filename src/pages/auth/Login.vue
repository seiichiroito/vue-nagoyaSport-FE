<template>
  <div class="bg-light py-8">
    <BaseLoading v-if="isLoading" />
    <div class="app-container">
      <PageTitle>ログイン</PageTitle>
      <div class="mt-8 p-6 border border-blue shadow-lg max-w-sm mx-auto">
        <form class="grid" @submit.prevent="submitForm">
          <Input
            id="email"
            type="email"
            autofocus
            placeholder="Eメール"
            :value="formState.email"
            @input="onInput"
          />
          <Input
            id="password"
            type="password"
            placeholder="パスワード"
            :value="formState.password"
            @input="onInput"
            class="mb-12"
          />

          <button
            class="bg-blue text-light py-2 px-8 rounded-md hover:bg-darkBlue"
            type="submit"
          >
            ログイン
          </button>
        </form>
        <div class="text-center mt-4">
          <p class="text-gray mr-4">アカウント作成はまだですか？</p>
          <RouterLink to="/signup" class="text-blue hover:text-darkBlue"
            >アカウント登録</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLoading from "../../components/UI/BaseLoading.vue";

export default {
  data() {
    return {
      formState: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  components: {
    BaseLoading,
  },
  methods: {
    async submitForm() {
      this.clearNotification();
      let isError = false;
      const errors = [];

      if (this.formState.email === "") {
        errors.push("メールアドレスを入力してください。");
        isError = true;
      }
      if (this.formState.password.length === 0) {
        errors.push("パスワードを入力してください。");
        this.formState.password = "";
        this.formState.passwordConfirmation = "";
        isError = true;
      }

      if (isError) {
        this.$store.dispatch("showNotification", {
          type: "error",
          messages: errors,
        });
        return;
      }

      this.isLoading = true;
      try {
        await this.$store.dispatch("login", {
          email: this.formState.email,
          password: this.formState.password,
        });
        this.isLoading = false;
        this.$router.replace("/");
      } catch (err) {
        console.log(err.message);
        if (err.message === "INVALID_PASSWORD") {
          this.$store.dispatch("showNotification", {
            type: "error",
            messages: ["パスワードが正しくありません。"],
          });
        } else if (err.message === "EMAIL_NOT_FOUND") {
          this.$store.dispatch("showNotification", {
            type: "error",
            messages: ["そのメールアドレスは登録されていません。"],
          });
        }
        this.isLoading = false;
      }
    },
    onInput(event) {
      this.formState = {
        ...this.formState,
        [event.target.id]: event.target.value,
      };
    },
    clearNotification() {
      this.$store.dispatch("clearNotification");
    },
  },
};
</script>
