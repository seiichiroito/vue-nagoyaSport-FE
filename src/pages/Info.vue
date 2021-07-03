<template>
  <StaticLayout>
    <template #heading>{{ news.title }}</template>
  </StaticLayout>
</template>

<script>
import StaticLayout from "../components/layout/StaticLayout.vue";
import { getNews } from "../middleware/restAPI/airtable";

export default {
  props: {
    infoId: String,
  },
  data() {
    return {
      news: null,
    };
  },
  components: {
    StaticLayout,
  },
  methods: {
    async setNews() {
      this.news = await getNews(this.infoId);
    },
  },
  mounted() {
    this.setNews();
  },
};
</script>
