<template>
  <StaticLayout>
    <template #heading>{{ info.title }}</template>
  </StaticLayout>
</template>

<script>
import axios from "axios";
import StaticLayout from "../components/layout/StaticLayout.vue";

export default {
  props: {
    infoId: String,
  },
  data() {
    return {
      info: null,
    };
  },
  components: {
    StaticLayout,
  },
  mounted() {
    const query = `
        query ($id:String!){
        nagoyaInformation(id:$id) {
            title
            importance
            sys {
            id
            }
            description{
            json
            }
        }
        }
        `;
    axios
      .post(
        "https://graphql.contentful.com/content/v1/spaces/" +
          import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        JSON.stringify({ query, variables: { id: infoId } }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_CONTENTFUL_API,
          },
        }
      )
      .then((res) => {
        this.info = res.data.data.nagoyaInformation;
      });
  },
};
</script>
