<template>
  <section class="text-center py-12 grid content-between justify-center">
    <div class="app-container">
      <h1
        class="
          text-darkBlue text-base
          lg:text-xl
          border-b border-darkBlue
          inline-block
        "
      >
        どんなスポーツも、いつでも好きなときに
      </h1>
      <p class="mt-4 text-lg lg:text-2xl">
        <span class="text-sm lg:text-base">名古屋市</span>
        <br />
        スポーツ•レクリエーション情報システム
      </p>
    </div>
    <div>
      <Button to="/signup">登録はこちら</Button>
    </div>
  </section>
</template>

<style scoped>
section {
  background-image: url("/hero.jpg");
  height: 20rem;

  background-position: center;
  background-size: cover;
  position: relative;
}
</style>
