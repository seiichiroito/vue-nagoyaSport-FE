<template>
  <div class="flex">
    <el-date-picker
      v-model="value"
      type="date"
      :placeholder="placeholder"
      @change="updateValue"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    updateValue() {
      this.$emit("setDate", this.value);
    },
  },
};
</script>

<style>
.el-icon-d-arrow-left,
.el-icon-d-arrow-right {
  display: none;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  font-size: 1.5rem;
}
</style>
