<template>
  <div class="flex">
    <el-date-picker
      v-model="value"
      type="date"
      :placeholder="placeholder"
      @change="updateValue"
      @focus="onFocus"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: Date,
  },
  methods: {
    updateValue() {
      this.$emit("change", this.value);
    },
    onFocus() {
      document.activeElement.blur();
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
