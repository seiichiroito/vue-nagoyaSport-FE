<template>
  <StaticLayout>
    <template #heading>このサイトについて</template>
    <template #content>
      <p>
        このサイトは名古屋市のスポーツ•レクリエーション情報システムを、独断と偏見で個人がデザインし直したものです。
        <a href="http://www.net.city.nagoya.jp/sporec/index.html">
          元のサイト
        </a>
        を見ていただければわかりますが、正直デザインはいいとは思えません。「市のやることだから。」と笑ってほっとくことは可能です。しかし、名古屋市民として、こういったところからよくしていかなければ多くの人が目指しているであろう、IT改革は訪れず、いつまでもIT革命(笑)の状態で終わってしまうと深く感じております。
      </p>
      <p>
        もしこのサイトの見た目がいいなと思った方の中に、市の役所に繋がる人がいましたら、私のサイトを紹介してくださるともしかしたら、もしかしたら元のサイトが改善されるかもしれません。
      </p>
      <p>
        え？自分で売り込め？うーん、考えておきます。（考えるとは言っていない）
      </p>
    </template>
  </StaticLayout>
</template>

<script>
import StaticLayout from "../../components/layout/StaticLayout.vue";

export default {
  components: {
    StaticLayout,
  },
};
</script>
