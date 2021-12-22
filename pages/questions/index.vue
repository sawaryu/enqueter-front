<template>
  <v-row>
    <v-col v-for="q, n in questions" :key="n" cols="12" sm="6" md="4">
      <!-- a question. -->
      <Question :question="q"  />
    </v-col>

    <!-- flota btn for creating th question. -->
    <v-btn
      fixed
      right
      bottom
      class="mb-8 mr-2"
      fab
      dark
      large
      color="grey darken-3"
    >
      <v-icon dark>mdi-file-question</v-icon>
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
  async asyncData(context) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        return { questions: res.data };
      });
  },
});
</script>

<style>
</style>