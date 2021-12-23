<template>
  <div>
    <!-- QUESTION -->
    <v-row class="justify-center mt-4">
      <Question :question="question" />
    </v-row>

    <NuxtChild />
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