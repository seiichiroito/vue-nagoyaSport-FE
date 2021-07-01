<template>
  <main>
    <section class="py-8 bg-light">
      <div class="app-container">
        <Heading>利用方法</Heading>
        <div class="px-4 grid gap-8 md:grid-cols-3">
          <HowtoCard number="1" title="アカウント登録" img="account"
            >名前とメールアドレスで簡単登録</HowtoCard
          >
          <HowtoCard number="2" title="予約" img="booking"
            >施設とスポーツを選択し、空いている日時を予約。日時から空いている施設を検索•予約することも可能</HowtoCard
          >
          <HowtoCard number="3" title="当日に行く" img="navigation"
            >あとは当日、予約した場所に行ってスポーツを楽しむだけ。支払いは施設の窓口で</HowtoCard
          >
        </div>
      </div>
    </section>
    <section class="py-8 bg-lightBlue">
      <div class="app-container">
        <Heading>特徴</Heading>
        <div class="px-4 grid gap-12 lg:grid-cols-3">
          <FeatureCard title="いつでも、どこでも気軽に予約" img="planner"
            >好きなスポーツを当日にでも予約して楽しむことが出来ます。</FeatureCard
          >
          <FeatureCard title="予約の照会•取り消しも簡単" img="survey" annotation
            >予約をいつでも確認でき、前日までなら簡単に予約のキャンセル、変更が出来ます。</FeatureCard
          >
          <FeatureCard title="抽選の参加" img="garagara"
            >施設の抽選に参加することが出来ます。団体での利用の時や早めに施設を確保したいときに最適です。</FeatureCard
          >
          <p class="text-sm col-span-full">
            ※
            当日の予約の変更•キャンセルは直接施設に電話していただく必要があります。
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import HowtoCard from "./HowtoCard.vue";
import FeatureCard from "./FeatureCard.vue";

export default {
  components: {
    HowtoCard,
    FeatureCard,
  },
};
</script>
