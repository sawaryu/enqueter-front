<template>
  <div>
    <!-- questions -->
    <v-row class="pa-3 mt-2">
      <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
        <!-- a question. -->
        <Question :question="q" />
      </v-col>

      <v-col v-if="!questions.length" class="text--secondary text-center">
        No questions.
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/users/${params.id}/questions/bookmark`);
    return { questions: res };
  },
});
</script>

<style>
</style>