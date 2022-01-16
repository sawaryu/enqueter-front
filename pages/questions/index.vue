<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card-title>
          <div><v-icon>mdi-file-question</v-icon> Questions</div>
          <v-spacer></v-spacer>
          <div>
            <v-select
              color="black"
              dense
              solo
              item-color="black"
              :value="$accessor.sort.getQuestionsSort"
              @change="$accessor.sort.setQuestionsSort($event)"
              :items="sorts"
              outlined
              style="width: 150px; height: 50px"
            ></v-select>
          </div>
        </v-card-title>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    <v-row>
      <v-col v-for="q in questionsSorted" :key="q.id" cols="12" sm="6" md="4">
        <!-- a question. -->
        <Question :question="q" />
      </v-col>

      <!-- float btn for creating th question. -->
      <Float />
      <CreateQuestion />
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/components/common/Question.vue";
import Vue from "vue";
import CreateQuestion from "~/components/dialog/CreateQuestion.vue";
export default Vue.extend({
  components: { CreateQuestion },
  async asyncData({ $axios }) {
    const res = await $axios.$get("/questions");
    return { questions: res as Question[] };
  },
  data() {
    return { sorts: ["all", "answerable", "closed"] };
  },
  computed: {
    questionsSorted(): Question[] {
      const currentSort: string = this.$accessor.sort.getQuestionsSort;
      if (currentSort == "closed") {
        return this.questions.filter((q: Question) => !q.is_open);
      } else if (currentSort == "answerable") {
        return this.questions.filter((q: Question) => {
          return q.is_open && !q.is_answered && q.user_id != this.$auth.user.id;
        });
      }
      return this.questions;
    },
  },
});
</script>

<style>
</style>