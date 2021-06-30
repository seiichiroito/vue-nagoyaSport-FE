<template>
  <div class="bg-light py-8">
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
  methods: {
    async submitForm() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("login", {
          email: this.formState.email,
          password: this.formState.password,
        });
        this.$router.replace("/");
      } catch (err) {}
      this.isLoading = false;
    },
    onInput(event) {
      this.formState = {
        ...this.formState,
        [event.target.id]: event.target.value,
      };
    },
  },
};
</script>
