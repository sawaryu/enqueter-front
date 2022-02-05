<template>
  <div>
    <!-- title -->
    <v-row>
      <v-col cols="12">
        <v-card-title>
          <v-btn
            dark
            large
            color="grey darken-3"
            @click="$accessor.dialog.setQuestionDialog(true)"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <div>
            <v-select
              color="black"
              dense
              solo
              class="mt-2 ml-2"
              item-color="black"
              :value="$accessor.sort.getQuestionsSort"
              @change="changeSort($event)"
              :items="sorts"
              outlined
              style="width: 150px; height: 50px"
            ></v-select>
          </div>
        </v-card-title>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>

    <!-- questions -->
    <transition name="fade" mode="out-in">
      <v-row v-if="loading" justify="center" key="loading">
        <v-col cols="12">
          <VueLoading
            type="bars"
            color="#333"
            :size="{ width: '50px', height: '50px' }"
          />
        </v-col>
      </v-row>

      <v-row v-else key="questions">
        <template v-if="questions.length">
          <v-col v-for="q in questions" :key="q.id" cols="12" sm="6" md="4">
            <Question :question="q" />
          </v-col>

          <v-col cols="12" class="text-center mb-10 mt-5">
            <v-pagination
              :value="currentPage"
              @input="push"
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
import { Question } from "@/components/common/Question.vue";
import { VueLoading } from "vue-loading-template";
import Vue from "vue";
import CreateQuestion from "~/components/dialog/CreateQuestion.vue";
export default Vue.extend({
  components: { CreateQuestion, VueLoading },
  data() {
    return {
      totalPages: 0 as number,
      questions: [] as Question[],
      loading: false as boolean,
      sorts: ["answerable", "closed", "all"],
    };
  },
  computed: {
    currentPage() {
      return Number(this.$route.query.page);
    },
  },
  methods: {
    async getQuestions(): Promise<void> {
      try {
        this.loading = true;
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 200);
        const res = await this.$axios.$get("/questions", {
          params: {
            page: this.$route.query.page,
            sort: this.$accessor.sort.getQuestionsSort,
          },
        });
        this.questions = res.data.questions;
        this.totalPages = res.data.total_pages;
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 250);
      }
    },
    push(event: number): void {
      this.$router.push({
        path: "questions",
        query: { page: String(event) },
      });
    },
    changeSort(event: string): void {
      console.log(event);
      this.$accessor.sort.setQuestionsSort(event);

      if (this.$route.query.page === "1") {
        this.getQuestions();
      }

      this.$router.push({
        path: "questions",
        query: { page: "1" },
      });
    },
  },
  watch: {
    "$route.query": {
      handler(to, from) {
        this.getQuestions();
      },
      immediate: true,
    },
  },
});
</script>

<style>
</style>