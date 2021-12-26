<template>
  <div>
    <v-select
      color="black"
      dense
      solo
      value="new"
      class="mt-2 ml-2"
      item-color="black"
      :items="items"
      outlined
      style="width: 150px; height: 50px"
    ></v-select>
    <!-- questions -->
    <v-row class="pa-3">
      <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
        <!-- a question. -->
        <Question :question="q" />
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
      .get(`https://jsonplaceholder.typicode.com/users/1/posts`)
      .then((res) => {
        return { questions: res.data };
      });
  },
  data() {
    return { items: ["new", "popular", "closed"] };
  },
});
</script>

<style>
</style>