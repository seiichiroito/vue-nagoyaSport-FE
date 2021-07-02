<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <PageTitle>日時から予約</PageTitle>
      <div
        class="
          mt-8
          grid grid-cols-2
          md:grid-cols-4
          border
          p-4
          gap-8
          rounded-md
          items-center
        "
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

        <label for="date">日時</label>

        <DatePicker
          id="date"
          class="col-span-1"
          @change="setDate"
          placeholder="検索日"
          :value="selected.date"
        />

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
          v-for="facility in facilities"
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
import DatePicker from "../components/UI/DatePicker.vue";
import { getAllFacility } from "../middleware/restAPI/airtable";
import { ElLoading } from "element-plus";

export default {
  components: {
    FacilityCard,
    DatePicker,
  },
  data() {
    return {
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
        date: null,
      },
      searchedName: "",
      facilities: [],
      facilityLoader: null,
      filteredResult: [],
    };
  },
  methods: {
    setDate(date) {
      this.filterdFacilities = this.facilities;

      this.selected.date = date;

      if (this.selected.date !== null) {
        this.filterdFacilities = this.filterdFacilities.filter((facility) => {
          let isFree = true;

          // if (this.selected.date.getTime() <= new Date().getTime()) {
          //   return false;
          // }
          // for (const key in result.reservation) {
          //   const res = result.reservation[key];
          //   const reservationDate = new Date(res.year, res.month - 1, res.date);
          //   if (reservationDate.getTime() === this.selected.date.getTime()) {
          //     isFree = false;
          //   }
          // }
          return isFree;
        });
      }
    },
    onChange(event) {
      this.filteredResult = this.results;

      if (this.selected.sport !== "") {
        this.filteredResult = this.filteredResult.filter(
          (result) => result.sports.indexOf(this.selected.sport) > -1
        );
      }

      if (this.searchedName !== "") {
        this.filteredResult = this.filteredResult.filter((result) =>
          result.name.includes(this.searchedName)
        );
      }
    },
    resetForm() {
      this.selected = {
        sport: "",
        startDate: null,
        endDate: null,
      };
      this.filteredResult = this.results;
    },
    async setFacilities() {
      this.setLoader();
      this.facilities = await getAllFacility();
      this.filterdFacilities = this.facilities;
      console.log(this.facilities);
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
