<template>
  <v-row>
    <v-col v-for="q in questions" :key="q.id" cols="12" sm="6" md="4">
      <!-- a question. -->
      <Question :question="q" @remove="remove(q.id)" />
    </v-col>

    <!-- float btn for creating th question. -->
    <Float />
    <CreateQuestion />
  </v-row>
</template>

<script lang="ts">
import { Question } from "@/components/common/Question.vue";
import Vue from "vue";
import CreateQuestion from "~/components/dialog/CreateQuestion.vue";
export default Vue.extend({
  components: { CreateQuestion },
  async asyncData({ $axios }) {
    const res = await $axios.$get("/questions");
    return { questions: res };
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