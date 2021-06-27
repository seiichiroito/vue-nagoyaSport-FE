<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <PageTitle>アカウント登録</PageTitle>
      <div class="mt-8 p-6 border border-blue shadow-lg max-w-sm mx-auto">
        <form class="grid" @submit.prevent="submitForm">
          <Input id="name" type="text" placeholder="名前" />
          <Input id="email" type="email" placeholder="Eメール" />
          <Input id="password" type="password" placeholder="パスワード" />
          <Input
            id="passwordConfirmation"
            type="password"
            placeholder="確認用パスワード"
            class="mb-12"
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
export default {
  methods: {
    submitForm() {
      console.log("Signup");
    },
  },
};
</script>
