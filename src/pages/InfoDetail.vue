<template>
  <InfoLayout v-if="information">
    <h2>{{ information.title }}</h2>
    <div>
      <p v-for="info in information.description.json.content" :key="info">
        {{ info.content[0].value }}
      </p>
    </div>
  </InfoLayout>
</template>

<script>
import axios from "axios";
import InfoLayout from "../components/layout/InfoLayout.vue";

export default {
  data() {
    return {
      information: null,
    };
  },
  components: {
    InfoLayout,
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
        JSON.stringify({
          query,
          variables: { id: this.$route.params.infoId },
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_CONTENTFUL_API,
          },
        }
      )
      .then((res) => {
        this.information = res.data.data.nagoyaInformation;
      });
  },
};
</script>
