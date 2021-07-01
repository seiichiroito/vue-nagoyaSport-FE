<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <div>
        <BackButton />
      </div>
      <PageTitle>予約確認</PageTitle>
      <div class="mt-8 grid md:grid-cols-2 border p-4 gap-4 rounded-md">
        <p>施設名: {{ name }}</p>
        <p>日時: {{ year }} 年 {{ month }} 月 {{ date }} 日</p>
        <p>利用料金: {{ price }}円</p>
        <p>利用者ID*: {{ userId }}</p>
      </div>
      <p class="text-sm mt-4 px-2">
        *
        利用者IDは電話でやり取りする場合に予約者の確認として使われる場合があります。
      </p>
      <div class="mt-8 flex justify-end">
        <Button to="/reserve/completed">予約する</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: String,
      day: {
        year: String,
        month: String,
        date: String,
      },
      price: String,
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  created() {
    const { name, year, month, date, price } = this.$route.query;
    this.name = name;
    this.year = year;
    this.month = month;
    this.date = date;
    this.price = price;
  },
};
</script>
