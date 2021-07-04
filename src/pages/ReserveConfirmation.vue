<template>
  <div class="bg-light py-8">
    <BaseLoading v-if="isLoading" />

    <div class="app-container">
      <div>
        <BackButton />
      </div>
      <PageTitle>予約確認</PageTitle>
      <div class="mt-8 grid md:grid-cols-2 border p-4 gap-4 rounded-md">
        <p>施設名: {{ name }}</p>
        <p>日時: {{ year }} 年 {{ month }} 月 {{ date }} 日</p>
        <p>時間帯: {{ time }}</p>
        <p>利用料金: {{ price }}円</p>
        <p>利用者ID*: {{ userId }}</p>
      </div>
      <p class="text-sm mt-4 px-2">
        *
        利用者IDは電話でやり取りする場合に予約者の確認として使われる場合があります。
      </p>
      <div class="mt-8 flex justify-end">
        <button
          class="bg-blue text-light py-2 px-8 rounded-md hover:bg-darkBlue"
          @click="makeReservation"
        >
          予約する
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { addReservation } from "../middleware/restAPI/airtable";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      name: String,

      year: String,
      month: String,
      date: String,

      price: String,
      time: String,
      spaceId: String,
      isLoading: false,
    };
  },
  props: {
    facilityId: String,
  },

  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    async makeReservation() {
      const date = `${this.year}-${this.month}-${this.date}`;
      try {
        this.isLoading = true;
        await addReservation(
          {
            fields: {
              id: uuidv4(),
              date: date,
              userId: this.userId,
              Facility: [this.facilityId],
              Space: [this.spaceId],
            },
          },
          this.name,
          this.time
        );
        this.isLoading = false;
        this.$router.replace("/reserve/completed");
      } catch (err) {
        this.$store.dispatch("showNotification", {
          type: "error",
          messages: [err.message],
        });
        this.isLoading = false;
      }
    },
  },
  created() {
    const { name, year, month, date, price, time, spaceId } = this.$route.query;
    this.name = name;
    this.year = year;
    this.month = month;
    this.date = date;
    this.price = price;
    this.time = time;
    this.spaceId = spaceId;
  },
};
</script>
