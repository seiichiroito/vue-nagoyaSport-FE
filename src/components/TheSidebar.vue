<template>
  <aside class="py-8 bg-ligh">
    <div class="app-container">
      <div class="my-8">
        <div class="flex justify-between">
          <Heading>お知らせ</Heading>
          <!-- <RouterLink to="/info" class="text-blue text-sm"
            >すべてのお知らせを見る ></RouterLink
          > -->
        </div>
        <ul class="grid divide-y" id="news">
          <li v-for="news in allNews" :key="news.id">
            <RouterLink :to="'/info/' + news.id" class="flex py-4">
              <font-awesome-icon
                icon="exclamation-circle"
                class="text-sm mt-1"
              />
              <p class="ml-2">{{ news.fields.title }}</p>
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
import { getAllNews } from "../middleware/restAPI/airtable";
import { ElLoading } from "element-plus";
export default {
  components: {
    RelativeCard,
  },
  data() {
    return {
      allNews: null,
      newsLoader: null,
    };
  },
  methods: {
    async setNews() {
      this.setLoader();
      this.allNews = await getAllNews();
      this.closeLoader();
    },
    closeLoader() {
      this.newsLoader.close();
    },
    setLoader() {
      this.newsLoader = ElLoading.service({
        target: document.querySelector("#news"),
      });
    },
  },
  mounted() {
    this.setNews();
  },
};
</script>

<style lang="scss">
#news {
  .el-loading-mask {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .el-loading-spinner {
    display: flex;
    justify-content: center;
  }
}
</style>
