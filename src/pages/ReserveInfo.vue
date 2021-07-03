<template>
  <div class="bg-light py-8">
    <BaseLoading v-if="isLoading" />
    <div class="app-container">
      <div>
        <BackButton />
      </div>
      <Heading v-if="facility.length !== 0">{{ facility.fields.name }}</Heading>
      <div class="flex items-center mb-4">
        <div class="ml-4 bg-gray w-4 h-4 rounded-full"></div>
        <p class="ml-2">利用不可</p>

        <div class="ml-4 bg-lightGray w-4 h-4 rounded-full"></div>
        <p class="ml-2">予約済み</p>

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
        <div class="grid gap-4">
          <p class="text-xl">
            {{ availableDate.getMonth() + 1 }}月 {{ availableDate.getDate() }}日
          </p>
          <ul class="grid gap-4 border p-4 rounded-md">
            <li
              class="flex justify-between items-center"
              v-for="(space, index) in facility.fields.SpaceTime"
              :key="space"
            >
              <p>{{ space }}</p>
              <button
                class="text-blue border border-blue py-2 px-4"
                @click="setSelectTime(index)"
                :class="{ 'is-selected': isSelected === index }"
              >
                選択
              </button>
            </li>
            <!-- <p class="text-sm">*早朝利用可能期間　4月1日から9月30日</p> -->
            <p class="text-sm">*薄暮利用可能期間　3月1日から10月31日</p>
          </ul>
          <p
            class="
              border-b border-blue
              pb-1
              justify-self-end
              mr-2
              text-lg
              font-bold
            "
            v-if="isSelected !== null"
          >
            ￥ {{ facility.fields.SpacePrice[isSelected] }}
          </p>
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
                name: facility.fields.name,
                year: availableDate.getFullYear(),
                month: availableDate.getMonth() + 1,
                date: availableDate.getDate(),
                time: facility.fields.SpaceTime[isSelected],
                price: facility.fields.SpacePrice[isSelected],
                spaceId: facility.fields.Space[isSelected],
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
import { getFacility } from "../middleware/restAPI/airtable";
export default {
  props: {
    facilityId: String,
  },
  data() {
    return {
      facility: [],
      selectedDate: null,
      availableDate: null,
      selected: false,
      isLoading: false,
      isSelected: null,
    };
  },
  methods: {
    clickDay(el) {
      this.showAvailable();
      if (
        el.target.className.includes("reserved") ||
        el.target.parentElement.className.includes("reserved") ||
        el.target.className.includes("unabled") ||
        el.target.parentElement.className.includes("unabled")
      ) {
        return;
      }

      const calendar = this.$refs.calendar;
      const day = calendar.querySelector(".is-selected");

      if (
        day.children[0].className.includes("reserved") ||
        day.children[0].className.includes("unabled")
      ) {
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
        days[i].classList.remove("unabled");
      }

      const title = calendar.querySelector(".el-calendar__title").innerHTML;
      const displayedYear = parseInt(title.slice(0, 4).trim());
      const displayedMonth = parseInt(title.slice(-3, -1).trim());

      const today = new Date();
      days.forEach((day, index) => {
        const eachDay = new Date(displayedYear, displayedMonth - 1, index + 1);
        if (eachDay.getTime() < today.getTime()) {
          day.classList.add("unabled");
        }
      });

      if (!this.facility.fields.reservationDate) {
        return;
      }
      this.facility.fields.reservationDate.map((res) => {
        const resDate = new Date(res);

        if (
          resDate.getFullYear() === displayedYear &&
          resDate.getMonth() + 1 === displayedMonth
        ) {
          days[resDate.getDate() - 1].classList.add("reserved");
        }
      });
    },
    async setFacility() {
      this.isLoading = true;
      this.facility = await getFacility(this.facilityId);
      this.showAvailable();
      this.isLoading = false;
    },
    setSelectTime(index) {
      this.isSelected = index;
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    this.setFacility();
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
      &.unabled {
        background-color: #555;
      }
    }
  }
}
ul {
  .is-selected {
    background-color: #118ab2;
    color: #fff;
  }
}
</style>
