<template>
  <div style="min-height: 30vh">
    <!-- questions -->
    <v-row class="pa-3 mt-2">
      <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
        <!-- a question. -->
        <Question :question="q" />
      </v-col>

      <v-col v-if="!questions.length" class="text--secondary text-center">
        <div class="font-weight-light">There are no bookmarks.</div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/common/entity/Question";
import Vue from "vue";
export default Vue.extend({
  // this page catch the error. Because it can be only accessed by current_user.
  async asyncData({ params, $axios }): Promise<any> {
    try {
      const res = await $axios.$get(`/users/${params.id}/questions/bookmark`);
      return { questions: res as Question[] };
    } catch (error) {}
  },
});
</script>

<style>
</style>