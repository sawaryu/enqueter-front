<template>
  <v-row>
    <v-col cols="12" md="4">
      <div style="position: sticky; top: 76px">
        <v-card height="18vh">
          <v-card-title><v-icon>mdi-home</v-icon>Home</v-card-title>
          <v-card-text class="d-flex justify-space-around align-center">
            <div class="text-subtitle-1 black--text">
              <v-icon>mdi-file-question</v-icon>
              <div><NumberDrumRoll :count="321" /></div>
            </div>
            <div class="text-subtitle-1 black--text">
              <v-icon>mdi-message-reply-outline</v-icon>
              <div><NumberDrumRoll :count="821" /></div>
            </div>
            <div class="text-subtitle-1 black--text">
              <v-icon>mdi-account</v-icon>
              <div><NumberDrumRoll :count="121" /></div>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="mt-5">
          <v-card-title
            ><v-icon>mdi-crown</v-icon>Ranking
            <v-spacer></v-spacer>
            <v-btn icon @click="changeCategory()">
              <v-icon size="38">{{
                $accessor.ranking.getCurrentCategory
              }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense height="57vh" class="overflow-y-auto">
            <v-list-item>
              <v-spacer></v-spacer>
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
            </v-list-item>
            <v-list-item v-for="(n, index) in 10" :key="n">
              <div v-text="ordinal(index + 1)"></div>
              <v-badge
                :value="[0, 1, 2].includes(index)"
                :color="sizeAndColorByRank(index).color"
                icon="mdi-crown"
                offset-x="28"
                offset-y="23"
                overlap
              >
                <v-list-item-avatar
                  class="pointer"
                  :size="sizeAndColorByRank(index).size"
                >
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                  ></v-img>
                </v-list-item-avatar>
              </v-badge>
              <v-list-item-content>
                <v-list-item-title class="text-subtitle-2"
                  ><span class="pointer underline"
                    >sample123</span
                  ></v-list-item-title
                >
                <v-list-item-subtitle>sample</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <!-- <div>125<v-icon>mdi-alpha-p-circle-outline</v-icon></div> -->
                <div>125<v-icon>mdi-file-question</v-icon></div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </v-col>

    <v-col cols="12" sm="8" md="8">
      <v-row class="pa-3">
        <v-col cols="12">
          <div class="font-weight-bold text-h6"><v-icon>mdi-clock-time-four</v-icon>Timeline</div>
        </v-col>
        <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
          <!-- a question. -->
          <Question :question="q" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import ordinal from "ordinal";
import Vue from "vue";
export default Vue.extend({
  async asyncData({ $axios }) {
    const res = await $axios.$get(`/questions/timeline`);
    return { questions: res };
  },
  data() {
    return {
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "all", text: "all" },
      ] as Array<object>,
    };
  },
  methods: {
    sizeAndColorByRank(index: number): {} {
      if (index === 0) {
        return { size: 48, color: "amber accent-4" };
      } else if (index === 1) {
        return { size: 43, color: "grey lighten-1" };
      } else if (index === 2) {
        return { size: 38, color: "brown lighten-1" };
      } else {
        return { size: 33, color: null };
      }
    },
    changeCategory(): void {
      if (
        this.$accessor.ranking.getCurrentCategory ===
        "mdi-alpha-p-circle-outline"
      ) {
        this.$accessor.ranking.setCurrentCategory("mdi-file-question");
      } else {
        this.$accessor.ranking.setCurrentCategory("mdi-alpha-p-circle-outline");
      }
    },
    ordinal(number: number): string {
      return ordinal(number);
    },
  },
});
</script>

<style>
</style>