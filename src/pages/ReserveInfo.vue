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
        <ElCalendar @click="clickDay" v-model="selectedDate">
          <template #dateCell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ parseInt(data.day.split("-")[2]) }}
            </p>
          </template>
        </ElCalendar>
      </div>
      <div class="py-8" v-if="availableDate">
        <div class="border p-4 rounded-md flex justify-between">
          <p>
            {{ availableDate.getMonth() + 1 }}月 {{ availableDate.getDate() }}日
          </p>
          <p>￥1500</p>
        </div>

        <div v-if="!isLoggedIn">
          <p class="my-4">予約をするにはアカウント登録が必要です</p>
          <div class="flex justify-end">
            <Button :to="'/signup?redirect=reserve/' + facilityId"
              >アカウント登録へ進む</Button
            >
          </div>
        </div>
        <div v-else class="mt-8 flex justify-end">
          <Button
            :to="{
              path: `/reserve/${facilityId}/confirm`,
              query: {
                name: result.name,
                year: availableDate.getFullYear(),
                month: availableDate.getMonth() + 1,
                date: availableDate.getDate(),
                price: 1500,
              },
            }"
            >確認画面に進む</Button
          >
        </div>
      </div>
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
      result: Object,
      selectedDate: null,
      availableDate: null,
      selected: false,
    };
  },
  methods: {
    clickDay(el) {
      this.showAvailable();
      if (
        el.target.className.includes("reserved") ||
        el.target.parentElement.className.includes("reserved")
      ) {
        return;
      }

      const calendar = this.$refs.calendar;
      const day = calendar.querySelector(".is-selected");

      if (day.children[0].className.includes("reserved")) {
        return;
      }

      this.availableDate = this.selectedDate;
    },
    handleBlur(el) {
      el.target.style.backgroundColor = "#118AB2";
    },
    showAvailable() {
      const calendar = this.$refs.calendar;
      const days = calendar.querySelectorAll(".current .el-calendar-day");

      for (let i = 0; i < days.length; i++) {
        days[i].classList.remove("reserved");
      }

      const title = calendar.querySelector(".el-calendar__title").innerHTML;
      const displayedYear = title.slice(0, 4).trim();
      const displayedMonth = title.slice(-3, -1).trim();

      const today = new Date();
      if (today.getFullYear() > parseInt(displayedYear)) {
        for (let i = 0; i < days.length; i++) {
          days[i].classList.add("reserved");
        }
      } else if (today.getFullYear() === parseInt(displayedYear)) {
        if (today.getMonth() + 1 > parseInt(displayedMonth)) {
          for (let i = 0; i < days.length; i++) {
            days[i].classList.add("reserved");
          }
        } else if (today.getMonth() + 1 === parseInt(displayedMonth)) {
          for (let i = 0; i < days.length; i++) {
            if (days[i].children[0].innerHTML <= today.getDate()) {
              days[i].classList.add("reserved");
            }
          }
        }
      }

      if (!this.result.reservation) {
        return;
      }
      const limitedReservationYear = this.result.reservation[displayedYear];

      if (!limitedReservationYear) {
        return;
      }
      const limitedReservationMonth = limitedReservationYear[displayedMonth];
      if (!limitedReservationMonth) {
        return;
      }
      const reservations = limitedReservationMonth.map((val) => val.date);

      for (let i = 0; i < days.length; i++) {
        if (reservations.includes(parseInt(days[i].children[0].innerHTML))) {
          days[i].classList.add("reserved");
        }
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    const query = `
        query ($id:String!){
        facility(id:$id){
            name
            address
            info
            reservation
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
        this.showAvailable();
      });
  },
};
</script>

<style lang="scss">
.el-calendar-table {
  .current {
    &.is-selected {
      .el-calendar-day {
        background-color: #ffd166;
      }
    }
    &.is-today {
      .el-calendar-day {
        color: #fff;
      }
    }
    .el-calendar-day {
      background-color: #118ab2;
      &.reserved {
        background-color: #ddd;
      }
    }
  }
}
</style>
