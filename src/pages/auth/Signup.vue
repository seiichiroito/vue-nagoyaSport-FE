<template>
  <BaseLoading v-if="isLoading" />
  <div class="bg-light py-8">
    <div class="app-container">
      <PageTitle>アカウント登録</PageTitle>
      <div class="mt-8 p-6 border border-blue shadow-lg max-w-sm mx-auto">
        <form class="grid" @submit.prevent="submitForm">
          <Input
            id="email"
            type="email"
            placeholder="Eメール"
            autofocus
            :value="formState.email"
            @input="onInput"
          />
          <Input
            id="password"
            type="password"
            placeholder="パスワード（6文字以上）"
            :value="formState.password"
            @input="onInput"
          />
          <Input
            id="passwordConfirmation"
            type="password"
            placeholder="確認用パスワード"
            class=""
            :value="formState.passwordConfirmation"
            @input="onInput"
          />
          <button
            class="bg-blue text-light py-2 px-8 rounded-md hover:bg-darkBlue"
            type="submit"
          >
            アカウントを登録
          </button>
        </form>
        <div class="text-center mt-4">
          <p class="text-gray mr-4">アカウントをすでにお持ちですか？</p>
          <RouterLink to="/login" class="text-blue hover:text-darkBlue"
            >ログイン</RouterLink
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
        passwordConfirmation: "",
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
      if (this.formState.password.length < 6) {
        errors.push("パスワードは6文字以上入力してください。");
        this.formState.password = "";
        this.formState.passwordConfirmation = "";
        isError = true;
      }
      if (this.formState.password !== this.formState.passwordConfirmation) {
        errors.push("パスワードが合いません。");
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
        await this.$store.dispatch("signup", {
          email: this.formState.email,
          password: this.formState.password,
        });
        this.isLoading = false;

        const redirectUrl = "/" + (this.$route.query.redirect || "");

        this.$router.replace(redirectUrl);
      } catch (err) {
        if (err.message === "EMAIL_EXISTS") {
          this.$store.dispatch("showNotification", {
            type: "error",
            messages: [
              "そのメールアドレスはすでにアカウントが存在しています。",
            ],
          });
        }
        this.formState.password = "";
        this.formState.passwordConfirmation = "";
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
