<template>
  <div class="bg-light py-8">
    <div class="app-container">
      <PageTitle>予約が完了しました</PageTitle>
      <div class="my-16 px-4">
        <p>
          •
          予約の詳細を登録してあるメールアドレスに送信しましたのでご確認ください。
        </p>
        <p class="mt-2">
          • 予約の確認、変更及びキャンセルは<RouterLink
            to="/"
            class="text-blue hover:text-darkBlue"
            >予約照会</RouterLink
          >から行うことが出来ます。
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <Button to="/">ホーム画面に戻る</Button>
      </div>
    </div>
  </div>
</template>
