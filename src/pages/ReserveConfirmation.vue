<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <BackButton />
      <PageTitle>予約確認</PageTitle>
      <div class="mt-8 grid md:grid-cols-2 border p-4 gap-4 rounded-md">
        <p>施設名: 瑞穂グラウンド</p>
        <p>日時: 6月8日　9:00 〜 12:00</p>
        <p>利用料金: 1500円</p>
        <p>利用者ID*: 2308sdfkj</p>
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
import BackButton from "../components/UI/BackButton.vue";
export default {
  components: {
    BackButton,
  },
};
</script>
