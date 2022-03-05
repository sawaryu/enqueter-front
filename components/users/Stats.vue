<template>
  <v-card class="mx-auto pb-5" height="470">
    <v-card-title class="pb-0 text--secondary">
      <div>
        <div>Stats</div>
        <div>
          <v-icon class="mr-2" small>mdi-clock</v-icon>
          <span class="text-caption text--secondary font-weight-light"
            >Regularly aggregated.</span
          >
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        v-for="period in periods"
        color="grey darken-2"
        dark
        :key="period"
        v-text="period"
        :text="period != currentPeriod"
        @click="currentPeriod = period"
        x-small
      ></v-btn>
    </v-card-title>

    <v-card-text class="pb-0 pt-0">
      <v-divider class="my-2"></v-divider>

      <transition name="fade" mode="out-in">
        <Loading
          class="mt-16 pt-16"
          v-if="loading"
          width="40px"
          height="40px"
        />

        <div v-else>
          <div class="subheading font-weight-medium text--secondary mt-3">
            <div>
              <span v-if="point_stats"
                >Point: {{ ordinalPointRank }} / {{ point_stats[1] }} pt</span
              >
              <span v-else>Point: N / A</span>
            </div>
            <div>
              <span v-if="response_stats"
                >Response: {{ ordinalResponseRank }} /
                {{ response_stats[1] }} res</span
              >
              <span v-else>Response: N / A</span>
            </div>
          </div>
          <div class="mx-auto text-center" style="width: 300px; height: 300px">
            <RadarChart v-if="!loading" :radar_data="radar_data" />
          </div>
        </div>
      </transition>
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
      loading: true as boolean,
      currentPeriod: "week",
      periods: ["week", "month", "total"],
      radar_data: [0, 0, 0] as number[],
      point_stats: null as number[] | null,
      response_stats: null as number[] | null,
    };
  },
  computed: {
    ordinalPointRank(): string | void {
      if (this.point_stats) {
        return ordinal(this.point_stats[0]);
      }
    },
    ordinalResponseRank(): string | void {
      if (this.response_stats) {
        return ordinal(this.response_stats[0]);
      }
    },
  },
  watch: {
    currentPeriod: {
      handler(): void {
        this.getStats();
      },
      immediate: true,
    },
  },
  methods: {
    async getStats(): Promise<void> {
      try {
        this.loading = true;
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
        this.response_stats = res.response_stats;
        this;
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
  },
});
</script>