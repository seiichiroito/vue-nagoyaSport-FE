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
          @change="onChange"
          placeholder="検索日"
          :value="selected.date"
        />

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
          <option
            v-for="sport in sports"
            :key="sport"
            :value="sport"
            id="sport"
          >
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
          id="name"
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
        v-if="selected.date !== null"
      >
        <FacilityCard
          v-for="facility in filteredFacilities"
          @click="checkAuth(facility)"
          :key="facility.id"
          :name="facility.fields.name"
          :imgUrl="facility.fields.photos[0].url"
          :type="facility.fields.type"
          :area="facility.fields.area"
        />
      </div>
      <div v-else>
        <p>日時を指定してください。</p>
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
        area: "",
        date: null,
      },
      searchedName: "",
      facilities: [],
      facilityLoader: null,
      filteredFacilities: [],
    };
  },
  methods: {
    onChange(event) {
      if (event && event.target) {
        if (!this.selected.date) {
          return;
        }
      } else {
        this.selected.date = event;
      }

      this.filteredFacilities = this.facilities;
      if (this.selected.date !== null) {
        this.filteredFacilities = this.facilities.filter((facility) => {
          let isFree = true;
          if (!facility.fields.reservationDate) {
            return true;
          }
          facility.fields.reservationDate.map((res) => {
            const resDate = new Date(res);

            if (this.sameDay(this.selected.date, resDate)) {
              isFree = false;
            }
          });
          return isFree;
        });
      }

      // Area
      if (this.selected.area !== "") {
        this.filteredFacilities = this.filteredFacilities.filter(
          (facility) => facility.fields.area === this.selected.area
        );
      }

      // Type of Sport
      if (this.selected.sport !== "") {
        this.filteredFacilities = this.filteredFacilities.filter((facility) => {
          return facility.fields.type === this.selected.sport;
        });
      }

      // Search Name
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
        date: null,
      };
      this.filteredFacilities = this.facilities;
    },
    async setFacilities() {
      // this.setLoader();
      this.facilities = await getAllFacility();
      this.filteredFacilities = this.facilities;
      // this.closeLoader();
    },
    closeLoader() {
      this.facilityLoader.close();
    },
    setLoader() {
      this.facilityLoader = ElLoading.service({
        target: document.querySelector("#facilities"),
      });
    },
    sameDay(d1, d2) {
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    },
    checkAuth(facility) {
      if (!this.isLoggedIn) {
        this.$store.dispatch("showNotification", {
          type: "warning",
          messages: ["予約するにはログインする必要があります。"],
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
      this.$router.push({
        path: `/reserve/${facility.id}/confirm`,
        query: {
          name: facility.fields.name,
          year: this.selected.date.getFullYear(),
          month: this.selected.date ? this.selected.date.getMonth() + 1 : null,
          date: this.selected.date ? this.selected.date.getDate() : null,
          price: facility.fields.price,
        },
      });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
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
