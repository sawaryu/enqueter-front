<template>
  <v-row>
    <v-col cols="12" md="4">
      <div style="position: sticky; top: 76px">
        <v-card height="18vh">
          <v-card-title
            ><v-icon>mdi-information</v-icon>Information</v-card-title
          >
          <v-card-text class="d-flex justify-space-around align-center">
            <div class="text-subtitle-1 black--text">
              <div><v-icon>mdi-file-question</v-icon> questions</div>
              <div class="ml-10"><NumberDrumRoll :count="821" /></div>
            </div>
            <div class="text-subtitle-1 black--text">
              <div><v-icon>mdi-message-reply-outline</v-icon>answeres</div>
              <div class="ml-10"><NumberDrumRoll :count="821" /></div>
            </div>
            <div class="text-subtitle-1 black--text">
              <div><v-icon>mdi-account</v-icon> users</div>
              <div class="ml-6"><NumberDrumRoll :count="821" /></div>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="mt-5">
          <v-card-title
            ><v-icon>mdi-crown</v-icon>Ranking
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
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense height="57vh" class="overflow-y-auto">
            <v-list-item v-for="(n, index) in 10" :key="n">
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
              <v-list-item-content class="pointer underline">
                <v-list-item-title class="text-subtitle-2"
                  >sample123</v-list-item-title
                >
                <v-list-item-subtitle>sample</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <div>125pt</div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </v-col>

    <v-col cols="12" sm="8" md="8">
      <v-row class="pa-3 mt-2">
        <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
          <!-- a question. -->
          <Question :question="q" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
  async asyncData(context) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/users/1/posts`)
      .then((res) => {
        return { questions: res.data };
      });
  },
  data() {
    return {
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "all", text: "all" },
      ],
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
  },
  watch: {
    currentBtn() {
      // some methods get from api
    },
  },
});
</script>

<style>
</style>