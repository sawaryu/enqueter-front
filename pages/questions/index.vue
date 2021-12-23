<template>
  <v-row>
    <v-col v-for="q, n in questions" :key="n" cols="12" sm="6" md="4">
      <!-- a question. -->
      <Question :question="q"  />
    </v-col>

    <!-- flota btn for creating th question. -->
    <Float />
    <CreateQuestion />
  </v-row>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import CreateQuestion from "~/components/dialog/CreateQuestion.vue";
export default Vue.extend({
  components: { CreateQuestion },
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