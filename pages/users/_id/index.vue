<template>
  <div style="min-height: 30vh">
    <!-- questions -->
    <v-row class="pa-3 mt-2">
      <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
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
                  >Delete</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </Question>
      </v-col>

      <v-col v-if="!questions.length" class="text--secondary text-center">
        <div class="font-weight-light">There are no questions.</div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/common/types/models";
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }): Promise<any> {
    try {
      const res = await $axios.$get(`/users/${params.id}/questions`);
      return { questions: res as Array<Question> };
    } catch (error) {}
  },
  data() {
    return { questions: [] as Question[] };
  },
  methods: {
    async remove(question_id: number): Promise<void> {
      try {
        const res = await this.$axios.$delete("/questions", {
          data: {
            question_id: question_id,
          },
        });
        this.questions = this.questions.filter(
          (q: Question) => q.id !== question_id
        );
        this.$accessor.timeline.deleteQuestion(question_id);
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