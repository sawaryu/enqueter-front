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
          <v-icon color="black" size="40">mdi-file-question</v-icon>
          Question.
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
        <v-card-title class="pt-0"
          >{{question.title}}?</v-card-title
        >
      </v-card>
    </v-row>
    <!-- choice -->
    <v-row class="justify-center">
      <!-- yes or no -->
      <template v-if="answer === null">
        <v-card
          class="d-flex justify-center align-center ma-6"
          width="300"
          height="300"
          link
          @click="answer = true"
        >
          <v-icon color="red" size="100">mdi-circle-outline</v-icon>
        </v-card>
        <v-card
          class="d-flex justify-center align-center ma-6"
          width="300"
          height="300"
          link
          @click="answer = false"
        >
          <v-icon color="blue" size="100">mdi-check-bold</v-icon>
        </v-card>
      </template>
      <!-- result -->
      <template v-else>
        <v-row class="mt-5 justify-center">
          <Ratio />

          <v-col class="text-center" cols="12">
            <v-btn class="mr-3" @click="next">next</v-btn>
            <v-btn @click="questions"> questions </v-btn>
          </v-col>
        </v-row>
      </template>
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
      answer: null as boolean | null,
    };
  },
  methods: {
    next(): void {
      this.answer = null;
    },
    questions(): void {},
  },
});
</script>

<style>
</style>