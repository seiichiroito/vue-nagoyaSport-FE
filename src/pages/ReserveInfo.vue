<template>
  <div class="bg-light py-8">
    <div class="app-container" v-if="result">
      <Heading>{{ result.name }}</Heading>
      <el-button>Hello</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    facilityId: String,
  },
  data() {
    return {
      result: null,
    };
  },
  mounted() {
    const query = `
        query ($id:String!){
        facility(id:$id){
            name
            address
            info
            imageCollection {
            items {
                url
                title
                sys {
                id
                }
            }
            }
        }
        }
        `;
    axios
      .post(
        "https://graphql.contentful.com/content/v1/spaces/" +
          import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        JSON.stringify({ query, variables: { id: this.facilityId } }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_CONTENTFUL_API,
          },
        }
      )
      .then((res) => {
        this.result = res.data.data.facility;
      });
  },
};
</script>
