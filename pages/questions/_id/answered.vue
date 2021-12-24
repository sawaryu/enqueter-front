<template>
  <div>
    <v-row class="justify-center">
      <!-- YES -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        width="300"
        height="300"
      >
        <v-row class="text-center">
          <v-col cols="12">
            <v-badge color="amber accent-4" icon="mdi-crown" overlap>
              <div class="text-h1 red--text">
                <NumberDrumRoll :count="72" />%
              </div>
            </v-badge>
          </v-col>
          <v-col cols="12">
            <div class="text-h5 red--text">
              (<span> <NumberDrumRoll :count="32" /></span> people)
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- NO -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        width="300"
        height="300"
      >
        <v-row class="text-center">
          <v-col cols="12">
            <div class="text-h1 blue--text">
              <NumberDrumRoll :count="28" />%
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-h5 blue--text">
              (<span> <NumberDrumRoll :count="16" /></span> people)
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

    <!-- RESULT -->
    <v-row class="justify-end">
      <v-col class="text-center" cols="12">
        <div class="success--text text-h4">Great!</div>
        <!-- <div class="red--text text-h4">Wrong!</div>
        <div class="warning--text text-h4">You are first!</div> -->
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>