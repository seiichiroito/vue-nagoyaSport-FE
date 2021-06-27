<template>
  <StaticLayout>
    <template #heading>個人情報の取り扱い</template>
    <template #content>
      <p>
        このサイトで取得したデータは、ユーザーが円滑にこのサイトを利用できるようにするためのみに利用され、それ以外の用途では一切利用されません。
      </p>
    </template>
  </StaticLayout>
</template>

<script>
import StaticLayout from "../../components/layout/StaticLayout.vue";

export default {
  components: {
    StaticLayout,
  },
};
</script>
