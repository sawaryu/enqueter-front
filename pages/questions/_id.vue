<template>
  <!-- mine -->
  <div v-if="isAnsweredOrMine">
    <v-card>
      <v-card-title>my questions.</v-card-title>
    </v-card>
  </div>
  <!-- anothers -->
  <div v-else>
    <!-- question -->
    <v-row class="justify-center">
      <v-card class="mt-4" width="600">
        <v-card-title class="pb-1 font-weight-bold">
          Choice majority!
          <v-spacer></v-spacer>
          <v-avatar size="30">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img
          ></v-avatar>
          <div class="pl-1">
            <div class="text-caption">
              <span class="font-weight-medium"> sample123 </span>
              <span>• few seconds ago</span>
            </div>
          </div>
        </v-card-title>
        <v-card-title class="pt-0">{{ question.title }}?</v-card-title>
      </v-card>
    </v-row>
    <!-- choice -->
    <v-row class="justify-center">
      <!-- yes or no -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        width="300"
        height="300"
        link
      >
        <v-icon color="red" size="100">mdi-circle-outline</v-icon>
        <!-- <div class="text-h1 red--text">72%</div> -->
        <!-- <div><v-icon>mdi-account</v-icon>72</div> -->
      </v-card>
      <v-card
        class="d-flex justify-center align-center ma-6"
        width="300"
        height="300"
        link
      >
        <v-icon color="blue" size="100">mdi-close</v-icon>
        <!-- <div class="text-h1 blue--text">28%</div> -->
        <!-- <div><v-icon>mdi-account</v-icon>28</div> -->
      </v-card>
    </v-row>

    <!-- result information -->
    <v-row class="justify-end">
      <v-col class="text-center" cols="12">
        <div class="success--text text-h4">Great!</div>
        <div class="red--text text-h4">Wrong!</div>
        <div class="warning--text text-h4">You are first!</div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
  async asyncData(context) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
      .then((res) => {
        return { question: res.data };
      });
  },
  data() {
    return {
      isAnsweredOrMine: false,
    };
  },
  methods: {
    next(): void {},
    questions(): void {},
  },
});
</script>

<style>
</style>