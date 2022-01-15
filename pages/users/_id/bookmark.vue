<template>
  <div>
    <!-- questions -->
    <v-row class="pa-3 mt-2">
      <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
        <!-- a question. -->
        <Question :question="q" @remove="remove(q.id)" />
      </v-col>

      <v-col v-if="!questions.length" class="text--secondary text-center">
        No questions.
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/components/common/Question.vue";
import Vue from "vue";
export default Vue.extend({
  // this page catch the error. Because it can be only accessed by current_user.
  async asyncData({ params, $axios }) {
    try {
      const res = await $axios.$get(`/users/${params.id}/questions/bookmark`);
      return { questions: res };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    remove(question_id: number) {
      this.questions = this.questions.filter(
        (q: Question) => q.id !== question_id
      );
    },
  },
});
</script>

<style>
</style>