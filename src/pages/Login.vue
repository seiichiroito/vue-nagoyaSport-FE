<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <PageTitle>ログイン</PageTitle>
      <div class="mt-8 p-6 border border-blue shadow-lg max-w-sm mx-auto">
        <form class="grid" @submit.prevent="submitForm">
          <Input id="email" type="email" placeholder="Eメール" />
          <Input
            id="password"
            type="password"
            placeholder="パスワード"
            class="mb-12"
          />

          <Button type="submit">ログイン</Button>
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
  methods: {
    submitForm() {
      console.log("Login");
    },
  },
};
</script>
