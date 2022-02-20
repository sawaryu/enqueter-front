<template>
  <div>
    <!-- title -->
    <v-row>
      <v-col cols="12">
        <v-card-title class="font-weight-light">
          <v-icon>mdi-file-question</v-icon>Questions
          <v-spacer></v-spacer>
          <v-btn
            dark
            large
            color="grey darken-3"
            @click="$accessor.dialog.setQuestionDialog(true)"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>

    <!-- questions -->
    <transition name="fade" mode="out-in">
      <Loading v-if="loading" key="loading" />

      <v-row v-else key="questions">
        <template v-if="questions.length">
          <v-col v-for="q in questions" :key="q.id" cols="12" sm="6" md="4">
            <Question :question="q" />
          </v-col>

          <v-col cols="12" class="text-center mb-10 mt-5">
            <v-pagination
              :value="$accessor.questions.getCurrentPage"
              @input="changePage"
              :length="totalPages"
              :total-visible="5"
              color="grey darken-3"
              circle
            ></v-pagination>
          </v-col>
        </template>

        <v-col class="text-center" v-else>
          <div class="text--secondary">There are no questions.</div>
        </v-col>
      </v-row>
    </transition>

    <!-- modal -->
    <CreateQuestion />
  </div>
</template>

<script lang="ts">
import { Question } from "@/common/entity/Question";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      totalPages: 0 as number,
      questions: [] as Question[],
      loading: false as boolean,
    };
  },
  created() {
    this.getQuestions(true);
  },
  destroyed() {
    this.$accessor.questions.saveScroll(window.scrollY);
  },
  methods: {
    async getQuestions(isInit: boolean = false): Promise<void> {
      try {
        this.loading = true;

        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 150);
        const res = await this.$axios.$get("/questions", {
          params: {
            page: this.$accessor.questions.getCurrentPage,
          },
        });
        this.questions = res.data.questions;
        this.totalPages = res.data.total_pages;
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 50);

        if (isInit) {
          setTimeout(() => {
            this.$vuetify.goTo(this.$accessor.questions.getScrollY);
          }, 290);
        }
      }
    },
    changePage(event: number): void {
      this.$accessor.questions.setCurrentPage(event);
      this.getQuestions();
    },
  },
});
</script>

<style>
</style>