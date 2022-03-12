<template>
  <div>
    <v-btn
      v-for="period in periods"
      color="grey darken-2"
      dark
      :key="period.id"
      v-text="period.text"
      :text="period.id != $accessor.ranking.getCurrentPeriod"
      @click="$accessor.ranking.setCurrentPeriod(period.id)"
      x-small
    ></v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "total", text: "total" },
      ] as Array<object>,
    };
  },
});
</script>