<template>
  <v-card class="mt-5">
    <v-card-title
      >Stats
      <v-spacer></v-spacer>
      <v-btn
        v-for="period in periods"
        color="grey darken-2"
        dark
        :key="period.id"
        v-text="period.text"
        :text="period.id != currentId"
        @click="currentId = period.id"
        x-small
      ></v-btn>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text class="text-subtitle-1">
      <div><span class="font-weight-bold mr-3">Total point:</span><span>38pt / 3rd</span></div>
      <div><span class="font-weight-bold mr-3">Right rate<sup>*</sup>:</span><span>38pt / 3rd</span></div>
      <div class="text-caption">* Need more than 10 questions the user answered.</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      stats: null as object,
      currentId: "week",
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "all", text: "all" },
      ] as Array<object>,
    };
  },
  created() {
    // this.getStats()
  },
  methods: {
    async getStats() {
      try {
        const res = await this.$axios.$get(
          `/users/${this.route.params.id}/stats`,
          {
            params: {
              period: this.currentId,
            },
          }
        );
        this.stats = res;
      } catch (error) {}
    },
  },
  watch: {
    currentId() {
      // this.getStats();
    },
  },
});
</script>

<style>
</style>