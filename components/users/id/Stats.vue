<template>
  <v-card class="mt-2 mx-auto" max-width="400" height="55vh">
    <v-card-title class="pb-0 text--secondary">
      Stats
      <v-spacer></v-spacer>
      <v-btn
        v-for="period in periods"
        color="grey darken-2"
        dark
        :key="period.id"
        v-text="period.text"
        :text="period.id != $accessor.analytics.getCurrentPeriod"
        @click="$accessor.analytics.setCurrentPeriod(period.id)"
        x-small
      ></v-btn>
    </v-card-title>

    <!-- <v-card-text class="pb-0 pt-0">
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >Regularly aggregated.</span
      >
      <div class="subheading font-weight-medium text--secondary mt-3">
        <span v-if="point_stats"
          >Point: {{ point_stats.rank }} / {{ point_stats.point }}pt</span
        >
        <span v-else>Point: N / A</span>
      </div>
    </v-card-text>
    <div class="mx-auto text-center" style="width: 90%; height: 60%">
      <RadarChart v-if="!loading && isRadarData" :radar_data="radar_data" />
      <template v-else>
        <div class="font-weight-light text--secondary">No data yet.</div>
        <small class="grey--text">*It takes time to reflect</small>
      </template>
    </div> -->
  </v-card>
</template>

<script lang="ts">
import RadarChart from "~/chart/RadarChart";
import Vue from "vue";
import UserStats from "@/common/entity/UserStats";
export default Vue.extend({
  components: {
    RadarChart,
  },
  data() {
    return {
      loading: true,
      stats: null as UserStats,
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "total", text: "total" },
      ],
      radar_data: [0, 0, 0],
      point_stats: null,
    };
  },
  computed: {
    currentRadarData() {
      const stats: UserStats = this.stats;
      if (!stats) {
        return false;
      }
      switch (this.currentPeriod) {
        case "week":
          return [
            stats.week_response,
            stats.week_questions,
            stats.week_answers,
          ];
        case "month":
          return [
            stats.month_response,
            stats.month_questions,
            stats.month_answers,
          ];
        case "total":
          return [
            stats.total_rank_response,
            stats.total_questions,
            stats.total_answers,
          ];
      }
    },
    currentStats() {
      const stats: UserStats = this.stats;
      if (stats) {
        return false;
      }
      switch (this.currentPeriod) {
        case "week":
          return {
            rank: stats.week_rank_point,
            point: stats.week_point,
          };
        case "month":
          return {
            rank: stats.month_rank_point,
            point: stats.month_point,
          };
        case "total":
          return {
            rank: stats.total_rank_point,
            point: stats.total_point,
          };
      }
    },
    currentPeriod() {
      return this.$accessor.analytics.getCurrentPeriod;
    },
  },
  watch: {
    currentPeriod: {
      handler() {
        this.getStats();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async getStats() {
      try {
        const res = await this.$axios.$get(
          `/users/${this.$route.params.id}/stats`
        );
        this.radar_data = res.radar_data;
        this.point_stats = res.point_stats;
        this;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>