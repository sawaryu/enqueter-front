<template>
  <v-row>
    <v-col cols="12" md="4" order="first" order-sm="second">
      <div style="position: sticky; top: 80px">
        <Ranking />
      </div>
    </v-col>

    <!--  -->
    
    <v-col cols="12" md="8">
      <v-card color="rgb(0, 0, 0, 0)" flat>
        <!-- <v-card-title><v-icon>mdi-home</v-icon>Timeline</v-card-title>
        <v-divider></v-divider> -->

        <v-card-text v-if="!questions.length" class="text-center">
          <div class="font-weight-bold text-h6">
            Questions related to you will be displayed here
          </div>
          <div class="text-caption">
            Let's try create questions or follow people.
          </div>
        </v-card-text>

        <v-row v-else>
          <v-col v-for="q in questions" :key="q.id" cols="12" sm="6">
            <Question :question="q" @remove="remove(q.id)" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Question } from "@/components/common/Question.vue";
import Vue from "vue";
export default Vue.extend({
  async asyncData({ $axios }) {
    const res = await $axios.$get(`/questions/timeline`);
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