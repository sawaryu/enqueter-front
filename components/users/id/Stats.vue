<template>
  <v-card class="mt-2 pb-3 mx-auto">
    <v-card-title class="pb-0 text--secondary">
      <div>
        <div>Stats</div>
        <div>
          <v-icon class="mr-2" small>mdi-clock</v-icon>
          <span class="text-caption text--secondary font-weight-light"
            >Regularly aggregated.</span>
        </div>
      </div>
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

    <v-card-text class="pb-0 pt-0">
      <v-divider class="my-2"></v-divider>
      <div class="subheading font-weight-medium text--secondary mt-3">
        <v-icon class="mb-2">mdi-crown</v-icon>
        <span v-if="point_stats"
          >Point: {{ ordinalRank }} / {{ point_stats[1] }}pt</span
        >
        <span v-else>Point: N / A</span>
      </div>
      <div class="mx-auto text-center" style="width: 300px; height: 300px">
        <RadarChart v-if="!loading" :radar_data="radar_data" />
        <template v-else>
          <div class="font-weight-light text--secondary">No data yet.</div>
          <small class="grey--text">*It takes time to reflect</small>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import ordinal from "ordinal";
import RadarChart from "~/chart/RadarChart";
import Vue from "vue";
export default Vue.extend({
  components: {
    RadarChart,
  },
  data() {
    return {
      loading: true,
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
    ordinalRank(): string {
      return ordinal(this.point_stats[0]);
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
          `/users/${this.$route.params.id}/stats`,
          {
            params: {
              period: this.currentPeriod,
            },
          }
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