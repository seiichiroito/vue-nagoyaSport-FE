<template>
  <BaseLoading v-if="isLoading" />
  <div v-else>
    <InfoLayout v-if="news">
      <h2>{{ news.fields.title }}</h2>
      <h3 class="text-sm mt-4 text-right">
        {{ year }} 年 {{ month }} 月 {{ date }} 日
      </h3>
      <div v-html="content"></div>
    </InfoLayout>
  </div>
</template>

<script>
import InfoLayout from "../components/layout/InfoLayout.vue";
import { getNews } from "../middleware/restAPI/airtable";
import marked from "marked";
export default {
  data() {
    return {
      news: null,
      isLoading: false,
    };
  },
  props: {
    newsId: String,
  },
  components: {
    InfoLayout,
  },
  computed: {
    year() {
      return this.news.fields.date.split("-")[0];
    },
    month() {
      return this.news.fields.date.split("-")[1];
    },
    date() {
      return this.news.fields.date.split("-")[2];
    },
    content() {
      return marked(this.news.fields.content);
    },
  },
  methods: {
    async setNews() {
      this.isLoading = true;
      this.news = await getNews(this.newsId);
      this.isLoading = false;
    },
  },
  mounted() {
    this.setNews();
  },
};
</script>
