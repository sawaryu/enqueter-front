<template>
  <v-card class="mt-2 mx-auto" max-width="400" min-height="25vh">
    <v-card-title class="pb-0 text--secondary">
      <div>
        <div class="text-h5 font-weight-light">Analytics</div>
        <div class="subheading font-weight-medium text--secondary">
          <span>Point: 6th / 32pt</span>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div>
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
      </div>
    </v-card-title>
    <v-card-text>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >In a {{ currentPeriod }} data.</span
      >
    </v-card-text>
    <div class="mx-auto text-center" style="width: 90%; height: 60%">
      <RadarChart v-if="!loading && isAnalytics" :analytics="analytics" />
      <template v-else>
        <div class="font-weight-light text--secondary">No data yet.</div>
        <!-- <div class="text-caption">Let's try answer and create questions.</div> -->
      </template>
    </div>
  </v-card>
</template>

<script lang="ts">
import RadarChart from "~/chart/RadarChart";
import Vue from "vue";
export default Vue.extend({
  components: {
    RadarChart,
  },
  data() {
    return {
      loading: true,
      analytics: [0, 0, 0],
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "total", text: "total" },
      ],
    };
  },
  computed: {
    currentPeriod() {
      return this.$accessor.analytics.getCurrentPeriod;
    },
    isAnalytics() {
      return this.analytics[0] || this.analytics[1] || this.analytics[2];
    },
  },
  watch: {
    currentPeriod: {
      handler() {
        this.getAnalytics();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async getAnalytics() {
      try {
        const res = await this.$axios.$get(
          `/users/${this.$route.params.id}/analytics`,
          {
            params: {
              period: this.currentPeriod,
            },
          }
        );
        console.log(this.currentPeriod, res);
        this.analytics = res;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>