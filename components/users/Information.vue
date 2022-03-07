<template>
  <v-card class="mx-auto pb-5" height="450" rounded="lg">
    <v-card-title class="pb-0 text--secondary">
      <v-btn
        rounded
        outlined
        @click="changeCategory"
        :ripple="false"
        v-text="currentCategory"
      >
      </v-btn>
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
      <div class="mt-2">
        <v-icon small> mdi-information </v-icon>
        <span
          v-if="currentCategory === 'rank'"
          class="text-caption text--secondary font-weight-light"
          >Ranking data are regularly aggregated.</span
        >
        <span v-else class="text-caption text--secondary font-weight-light"
          >The data of answered result</span
        >
      </div>
      <v-divider class="my-2"></v-divider>

      <transition name="fade" mode="out-in">
        <!-- Loading -->
        <Loading
          class="mt-16 pt-16"
          v-if="loading"
          width="40px"
          height="40px"
        />

        <!-- Contents -->
        <template v-else>
          <div class="text-center" v-if="currentCategory === 'stats'">
            <span class="font-weight-light">Answered</span>
            <span class="font-weight-bold" v-text="answeredCount"></span>
            <span class="font-weight-light">questions</span>
            <div
              class="mx-auto text-center mt-3"
              style="width: 300px; height: 300px"
            >
              <RadarChart v-if="!loading" :radar_data="radar_data" />
            </div>
          </div>

          <div class="text-center" v-else>
            <v-row class="my-auto">
              <v-col class="font-weight-light" cols="12">Point</v-col>
              <v-col cols="6">
                <span class="font-weight-bold text-h5" v-text="point[0]"></span>
                <br />
                / {{ point_users_count }} users
              </v-col>
              <v-col cols="6">
                <span class="font-weight-bold text-h5" v-text="point[1]"></span>
                <br />
                point
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row class="my-auto">
              <v-col class="font-weight-light" cols="12">Response</v-col>
              <v-col cols="6">
                <span
                  class="font-weight-bold text-h5"
                  v-text="response[0]"
                ></span>
                <br />
                / {{ response_users_count }} users
              </v-col>
              <v-col cols="6">
                <span
                  class="font-weight-bold text-h5"
                  v-text="response[1]"
                ></span>
                <br />
                response
              </v-col>
            </v-row>
          </div>
        </template>
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
      // Basic
      loading: true as boolean,
      currentCategory: "rank",
      currentPeriod: "week",
      periods: ["week", "month", "total"],

      // Data
      radar_data: [0, 0, 0] as number[],
      answeredCount: 0 as number,
      point_stats: null as number[] | null,
      response_stats: null as number[] | null,
      point_users_count: 0 as number,
      response_users_count: 0 as number,
    };
  },
  computed: {
    point(): any[] {
      if (this.point_stats) {
        return [ordinal(this.point_stats[0]), this.point_stats[1]];
      } else {
        return ["NA", "NA"];
      }
    },
    response(): any[] {
      if (this.response_stats) {
        return [ordinal(this.response_stats[0]), this.response_stats[1]];
      } else {
        return ["NA", "NA"];
      }
    },
  },
  watch: {
    currentPeriod: {
      handler(): void {
        this.getInformation();
      },
      immediate: true,
    },
    currentCategory: {
      handler(): void {
        this.getInformation();
      },
      immediate: true,
    },
  },
  methods: {
    async getInformation(): Promise<void> {
      try {
        this.loading = true;
        const res = await this.$axios.$get(
          `/users/${this.$route.params.id}/information`,
          {
            params: {
              period: this.currentPeriod,
            },
          }
        );
        this.radar_data = res.radar_data;
        this.answeredCount = 0;
        this.radar_data.forEach((count) => {
          this.answeredCount += count;
        });
        this.point_stats = res.point_stats;
        this.response_stats = res.response_stats;
        this.point_users_count = res.point_users_count;
        this.response_users_count = res.response_users_count;
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
    changeCategory(): void {
      if (this.currentCategory === "stats") {
        this.currentCategory = "rank";
      } else {
        this.currentCategory = "stats";
      }
    },
  },
});
</script>