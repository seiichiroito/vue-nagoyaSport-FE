<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <PageTitle>施設から予約</PageTitle>
      <div
        class="mt-8 grid grid-cols-2 md:grid-cols-4 border p-4 gap-8 rounded-md"
      >
        <div class="col-span-full flex justify-between">
          <p>詳細検索</p>
          <button
            class="border border-red text-red p-1 text-sm"
            @click="resetForm"
          >
            リセット
          </button>
        </div>

        <label for="area">地域</label>
        <select id="area" v-model="selected.area" @change="onChange($event)">
          <option value="">すべての地域</option>
          <option v-for="area in areas" :key="area" :value="area">
            {{ area }}
          </option>
        </select>

        <label for="sport">スポーツ施設</label>
        <select id="sport" v-model="selected.sport" @change="onChange($event)">
          <option value="">全てのスポーツ施設</option>
          <option v-for="sport in sports" :key="sport" :value="sport">
            {{ sport }}
          </option>
        </select>
      </div>

      <div class="my-8 flex justify-center relative max-w-sm m-auto">
        <font-awesome-icon
          icon="search"
          class="text-lg absolute top-2.5 left-3"
        />
        <input
          type="text"
          placeholder="施設名で検査"
          class="w-full py-2 pl-12 rounded"
          v-model="searchedName"
          @input="onChange($event)"
        />
      </div>

      <div
        class="grid gap-8 my-12 sm:grid-cols-2 lg:grid-cols-3"
        id="facilities"
      >
        <FacilityCard
          v-for="facility in filteredFacilities"
          :to="'/reserve/' + facility.id"
          :key="facility.id"
          :name="facility.fields.name"
          :imgUrl="facility.fields.photos[0].url"
          :type="facility.fields.type"
          :area="facility.fields.area"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FacilityCard from "../components/FacilityCard.vue";
import { getAllFacility } from "../middleware/restAPI/airtable";
import { ElLoading } from "element-plus";

export default {
  components: {
    FacilityCard,
  },
  data() {
    return {
      facilityLoader: null,

      areas: [
        "千種区",
        "東区",
        "北区",
        "西区",
        "中村区",
        "中区",
        "昭和区",
        "瑞穂区",
        "熱田区",
        "中川区",
        "港区",
        "南区",
        "守山区",
        "緑区",
        "名東区",
        "天白区",
        "県内",
      ],
      sports: [
        "テニスコート",
        "野球場",
        "体育館",
        "格技場",
        "軽運動室",
        "プール",
        "トレーニング室",
        "弓道場•アーチェリー場",
        "陸上競技場",
        "サッカー•ラグビー場",
        "キャンプ場",
        "その他",
      ],
      selected: {
        sport: "",
        area: "",
      },
      searchedName: "",
      facilities: [],
      filteredFacilities: null,
    };
  },
  methods: {
    onChange(event) {
      this.filteredFacilities = this.facilities;

      if (this.selected.area !== "") {
        this.filteredFacilities = this.filteredFacilities.filter(
          (facility) => facility.fields.area === this.selected.area
        );
      }

      if (this.selected.sport !== "") {
        this.filteredFacilities = this.filteredFacilities.filter(
          (facility) => facility.fields.type === this.selected.sport
        );
      }

      if (this.searchedName !== "") {
        this.filteredFacilities = this.filteredFacilities.filter((facility) =>
          facility.fields.name.includes(this.searchedName)
        );
      }
    },
    resetForm() {
      this.selected = {
        sport: "",
        area: "",
      };
      this.filteredResult = this.results;
    },
    async setFacilities() {
      this.setLoader();
      this.facilities = await getAllFacility();
      this.filteredFacilities = this.facilities;
      this.closeLoader();
    },
    closeLoader() {
      this.facilityLoader.close();
    },
    setLoader() {
      this.facilityLoader = ElLoading.service({
        target: document.querySelector("#facilities"),
      });
    },
  },

  mounted() {
    this.setFacilities();
  },
};
</script>

<style lang="scss">
#facilities {
  .el-loading-spinner {
    display: flex;
    justify-content: center;
  }
}
</style>
