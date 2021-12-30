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
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/users/${params.id}/questions`);
    return { questions: res };
  },
  data() {
    return { items: ["new", "popular", "closed"] };
  },
});
</script>

<style>
</style>