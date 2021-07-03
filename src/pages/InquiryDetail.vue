<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <div>
        <BackButton />
      </div>
      <PageTitle>予約詳細</PageTitle>
      <div
        class="mt-8 grid md:grid-cols-2 border p-4 gap-4 rounded-md"
        v-if="reservation"
      >
        <p>施設名: {{ reservation.fields.FacilityName[0] }}</p>
        <p>
          日時: {{ reservationDate.getFullYear() }} 年
          {{ reservationDate.getMonth() + 1 }} 月
          {{ reservationDate.getDate() }} 日
        </p>
        <p>利用料金: 1500 円</p>
        <p>利用者ID*: {{ reservation.fields.userId }}</p>
      </div>
      <div class="mt-8 flex justify-end">
        <button
          class="bg-blue text-light py-2 px-8 rounded-md hover:bg-darkBlue"
          @click="removeReservation(reservation.id)"
        >
          予約を取り消す
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getReservationById,
  removeReservation,
} from "../middleware/restAPI/airtable";

export default {
  data() {
    return {
      reservation: null,
    };
  },
  props: {
    resId: String,
  },
  computed: {
    reservationDate() {
      return new Date(this.reservation.fields.date);
    },
  },
  methods: {
    async removeReservation() {
      try {
        await removeReservation(this.resId);
        this.$router.replace("/");
      } catch (err) {
        this.$store.dispatch("showNotification", {
          type: "error",
          messages: [err.message],
        });
      }
    },
    async getReservation() {
      try {
        this.reservation = await getReservationById(this.resId);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getReservation();
  },
};
</script>
