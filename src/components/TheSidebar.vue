<template>
  <aside class="py-8 bg-ligh">
    <div class="app-container">
      <div class="my-8">
        <div class="flex justify-between">
          <Heading>お知らせ</Heading>
          <RouterLink to="/" class="text-blue text-sm"
            >すべてのお知らせを見る ></RouterLink
          >
        </div>
        <ul class="grid divide-y">
          <li v-for="info in information" :key="info" class="py-4">
            <RouterLink to="/" class="flex">
              <font-awesome-icon
                icon="exclamation-circle"
                class="text-sm mt-1"
              />
              <p class="ml-2">{{ info.title }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="my-8">
        <Heading>関連リンク</Heading>
        <div class="grid grid-cols-3 gap-4 md:grid-cols-5 justify-center">
          <RelativeCard
            href="http://www.higashiyama.city.nagoya.jp/"
            img="東山動植物園"
          />
          <RelativeCard
            href="http://www.higashiyamaskytower.jp/"
            img="東山スカイタワー"
          />
          <RelativeCard href="http://www.shirotori-garden.jp/" img="白鳥庭園" />
          <RelativeCard href="https://www.tokugawaen.aichi.jp/" img="徳川園" />
          <RelativeCard
            href="http://top-sports.nespa.or.jp/"
            img="でらスポ名古屋"
          />
        </div>
      </div>
      <div class="my-8">
        <Heading>利用案内</Heading>
        <div class="grid md:grid-cols-2 gap-8">
          <div className="border p-2">
            <p className="text-base">
              スポーツセンター・瑞穂公園・東山テニスセンターなどの利用案内はこちら
            </p>
            <p className="text-lg font-bold my-2">スポーツ情報センター</p>
            <p className="text-base">
              TEL: 052-614-7511
              <br />
              FAX: 052-614-7515
              <br />
              Email: jyouhou-c@nespa.or.jp
            </p>
          </div>
          <div className="border p-2">
            <p className="text-base">
              公園内の野球場・テニスコートなどの利用案内はこちら
            </p>
            <p className="text-lg font-bold my-2">公園案内センター</p>
            <p className="text-base">
              TEL: 052-732-4398
              <br />
              FAX: 052-732-4330
              <br />
              Email: infopark@isis.ocn.ne.jp
            </p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import RelativeCard from "./RelativeCard.vue";
export default {
  components: {
    RelativeCard,
  },
  data() {
    return {
      information: [
        {
          title:
            "稲永公園野球場（Ａ．Ｂ．Ｅ．Ｆ）の空き予約について（5月16日・23日）",
        },
        {
          title: "このサイトを初めて利用される方へ",
        },
        {
          title: "2月16日（火）に生じたアクセス障害について",
        },
      ],
    };
  },
};
</script>
