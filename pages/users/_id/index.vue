<template>
  <div>
    <!-- (Attention!) ex: $event = "closed" -->
    <v-select
      color="black"
      dense
      solo
      class="mt-2 ml-2"
      item-color="black"
      :value="$accessor.sort.getUserQuestionsSort"
      @change="$accessor.sort.setUserQuestionsSort($event)"
      :items="sorts"
      outlined
      style="width: 150px; height: 50px"
    ></v-select>
    <!-- questions -->
    <v-row class="pa-3">
      <v-col
        class="pt-0"
        v-for="q in questionsSorted"
        :key="q.id"
        cols="12"
        sm="6"
      >
        <!-- a question. -->
        <Question :question="q">
          <!-- slot: (* go to see parent infos) -->
          <v-menu v-if="q.user_id === $auth.user.id" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="remove(q.id)">
                <v-list-item-title class="red--text"
                  ><v-icon color="red">mdi-delete</v-icon
                  >delete</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </Question>
      </v-col>

      <v-col v-if="!questionsSorted.length" class="text--secondary text-center">
        <div class="font-weight-light">There are no questions.</div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/common/entity/Question";
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }): Promise<any> {
    try {
      const res = await $axios.$get(`/users/${params.id}/questions`);
      return { questions: res as Array<Question> };
    } catch (error) {}
  },
  data() {
    return { sorts: ["all", "closed"] };
  },
  computed: {
    questionsSorted(): Question[] {
      const currentSort = this.$accessor.sort.getUserQuestionsSort;
      if (currentSort == "closed") {
        return this.questions.filter((q: Question) => !q.is_open);
      }
      return this.questions;
    },
  },
  methods: {
    async remove(question_id: number) {
      try {
        const res = await this.$axios.$delete("/questions", {
          data: {
            question_id: question_id,
          },
        });
        this.questions = this.questions.filter(
          (q: Question) => q.id !== question_id
        );
        this.$accessor.flash.showMessage(
          {
            message: "The question was successfully deleted.",
            type: "info",
            status: true,
          },
          { root: true }
        );
      } catch (error) {}
    },
  },
});
</script>

<style>
</style>