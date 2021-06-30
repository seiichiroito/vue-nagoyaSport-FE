<template>
  <div class="bg-light py-8">
    <div class="app-container" v-if="result">
      <div>
        <BackButton />
      </div>
      <Heading>{{ result.name }}</Heading>
      <div class="flex items-center mb-4">
        <div class="ml-4 bg-lightGray w-4 h-4 rounded-full"></div>
        <p class="ml-2">予約済み</p>
        <div class="ml-4 bg-gray w-4 h-4 rounded-full"></div>
        <p class="ml-2">休館日</p>

        <div class="ml-4 bg-blue w-4 h-4 rounded-full"></div>
        <p class="ml-2">予約可能</p>
      </div>
      <div ref="calendar">
        <ElCalendar @click="clickDay" v-model="selectedDate">Hello</ElCalendar>
      </div>
      <div class="py-8" v-if="availableDate">
        <div class="border p-4 rounded-md flex justify-between">
          <p>
            {{ availableDate.getMonth() }}月 {{ availableDate.getDate() }}日
          </p>
          <p>￥1500</p>
        </div>
        <div class="mt-8 flex justify-end">
          <Button :to="'/reserve/' + facilityId + '/confirm'"
            >確認画面に進む</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BackButton from "../components/UI/BackButton.vue";

const numbers = ["3", "8", "11", "15", "25"];
const reservedNumbers = ["5", "12", "19", "26"];

export default {
  components: {
    BackButton,
  },
  props: {
    facilityId: String,
  },
  data() {
    return {
      result: Object,
      selectedDate: null,
      availableDate: null,
      selected: false,
    };
  },
  methods: {
    clickDay(el) {
      if (el.target.className !== "el-calendar-day") {
        return;
      }
      const calendar = this.$refs.calendar;
      const days = calendar.querySelectorAll(".current .el-calendar-day");
      const title = calendar.querySelector(".el-calendar__title");
      const displayedMonth = title.innerHTML.slice(-3, -1).trim();

      let previousSelectedDate;
      for (let i = 0; i < days.length; i++) {
        if (days[i].style.backgroundColor === "rgb(255, 209, 102)") {
          previousSelectedDate = days[i].children[0].innerHTML;
        }
        if (numbers.includes(days[i].children[0].innerHTML)) {
          days[i].style.backgroundColor = "#118AB2";
        }
      }

      const selectedDay = el.target.children[0].innerHTML;
      if (numbers.includes(selectedDay)) {
        el.target.style.backgroundColor = "#FFD166";
        this.availableDate = this.selectedDate;
      } else {
        for (let i = 0; i < days.length; i++) {
          if (days[i].children[0].innerHTML === previousSelectedDate) {
            days[i].style.backgroundColor = "#FFD166";
          }
        }
      }
    },
    handleBlur(el) {
      el.target.style.backgroundColor = "#118AB2";
    },
    showAvailable() {
      const calendar = this.$refs.calendar;
      const days = calendar.querySelectorAll(".current .el-calendar-day");

      for (let i = 0; i < days.length; i++) {
        if (numbers.includes(days[i].children[0].innerHTML)) {
          days[i].style.backgroundColor = "#118AB2";
        }
      }
      for (let i = 0; i < days.length; i++) {
        if (reservedNumbers.includes(days[i].children[0].innerHTML)) {
          days[i].style.backgroundColor = "#8e8e8e";
        }
      }
    },
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
    this.showAvailable();
  },
};
</script>

<style lang="scss">
.el-calendar-table {
  .current {
    &.is-today {
      .el-calendar-day {
        border: 1px solid var(--blue);
      }
    }
    .el-calendar-day {
      background-color: #ddd;
    }
  }
}
</style>
