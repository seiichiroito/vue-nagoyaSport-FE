<template>
  <section class="bg-light py-8">
    <div class="app-container">
      <div class="flex justify-center gap-8">
        <Button to="/reserve-date">日時から予約</Button>
        <Button to="/reserve-facility">施設から予約</Button>
      </div>
    </div>
  </section>
  <section class="py-8 bg-light">
    <div class="app-container">
      <Heading>予約照会</Heading>

      <div class="flex gap-4 overflow-scroll" id="res">
        <FacilityCard
          class="flex-shrink-0"
          v-for="res in reservations"
          @click="goInquiry(res.id)"
          :key="res.id"
          :name="res.fields.FacilityName[0]"
          :imgUrl="res.fields.FacilityPhotos[0].url"
          :type="res.fields.FacilityType[0]"
          :area="res.fields.FacilityArea[0]"
        >
          <template v-slot:reservation>
            <p>
              {{ new Date(res.fields.date).getMonth() + 1 }}月{{
                new Date(res.fields.date).getDate()
              }}日
            </p>
            <p>￥ {{ res.fields.FacilityPrice[0] }}</p>
          </template>
        </FacilityCard>
      </div>
      <div v-if="reservations !== null && reservations.length === 0">
        <p>予約がありません。</p>
      </div>
    </div>
  </section>
</template>

<script>
import { getReservationByUserId } from "../middleware/restAPI/airtable";
import FacilityCard from "../components/FacilityCard.vue";
import { ElLoading } from "element-plus";

export default {
  components: {
    FacilityCard,
  },
  data() {
    return {
      reservations: null,
      reservationLoader: null,
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    reservationDate(date) {
      return new Date();
    },
  },
  methods: {
    async setReservation() {
      this.setLoader();
      this.reservations = await getReservationByUserId(this.userId);
      this.closeLoader();
    },
    closeLoader() {
      this.reservationLoader.close();
    },
    setLoader() {
      this.reservationLoader = ElLoading.service({
        target: document.querySelector("#res"),
      });
    },
    goInquiry(resId) {
      this.$router.push("/inquiry/" + resId);
    },
  },
  mounted() {
    this.setReservation();
  },
};
</script>

<style lang="scss">
#res {
  .el-loading-mask {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .el-loading-spinner {
    display: flex;
    justify-content: center;
  }
}
</style>
