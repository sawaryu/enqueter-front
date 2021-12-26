<template>
  <div>
    <v-row class="justify-center">
      <!-- YES -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
      >
        <v-row class="text-center">
          <v-col cols="12">
            <v-badge color="amber accent-4" icon="mdi-crown" overlap>
              <div class="text-sm-h1 text-h3 red--text font-weigth-bold">
                <NumberDrumRoll :count="72" />%
              </div>
            </v-badge>
          </v-col>
          <v-col cols="12">
            <div class="text-h6 text-sm-h3 red--text font-weigth-bold">
              (<span> <NumberDrumRoll :count="32" /></span> people)
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- NO -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
      >
        <v-row class="text-center">
          <v-col cols="12">
            <div class="text-sm-h1 text-h3 blue--text">
              <NumberDrumRoll :count="28" />%
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-h6 text-sm-h3 blue--text">
              (<span> <NumberDrumRoll :count="16" /></span> people)
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

    <!-- RESULT -->
    <v-row class="justify-center">
      <v-col class="text-center" cols="12">
        <div class="success--text text-h4">Great!</div>
        <!-- <div class="red--text text-h4">Wrong!</div>
        <div class="warning--text text-h4">You are first!</div> -->
      </v-col>
      <v-col class="text-center" cols="12">
        <v-btn>next</v-btn>
        <v-btn>back</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    size() {
      const breakpointName = this.$vuetify.breakpoint.name;
      if (breakpointName == "xs") {
        return 130;
      } else {
        return 300;
      }
    },
  },
});
</script>

<style>
</style>