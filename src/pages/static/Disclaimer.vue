<template>
  <StaticLayout>
    <template #heading>免責事項について</template>
    <template #content>
      <h2>サイト内容についての責任</h2>
      <p>
        このサイトは
        <a href="http://www.net.city.nagoya.jp/sporec/index.html">
          このサイト
        </a>
        をいい感じにするためだけに作られたサイトですので、サイトの内容の正しさについては一切保証いたしません。
      </p>
      <h2>免責事項に関するご質問•ご意見•お問い合わせ</h2>
      <p>
        なにかサイトの製作者に連絡がある場合は下記の連絡先にて連絡してください。「いやー。このサイトまずいんじゃね？」と思われた方も連絡してくださると幸いです。その際は実際に市に連絡してやばそうなら即座に削除します。
      </p>
      <div>
        <a href="https://twitter.com/seiichiro_ito">
          <font-awesome-icon
            :icon="['fab', 'twitter-square']"
            class="text-3xl"
          />
        </a>
        <span>Email: seiichiro@hey.com</span>
      </div>
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
