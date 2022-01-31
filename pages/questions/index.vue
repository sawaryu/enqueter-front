<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card-title>
          <div><v-icon>mdi-file-question</v-icon> Questions</div>
          <v-spacer></v-spacer>
          <v-btn icon large @click="update">
            <v-icon>mdi-cached</v-icon>
          </v-btn>
        </v-card-title>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>

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
              color="grey darken-3"
              circle
            ></v-pagination>
          </v-col>
        </template>

        <v-col class="text-center" v-else>
          <div class="text--secondary">There are no questions.</div>
        </v-col>

        <FloatCreate />
        <CreateQuestion />
      </v-row>
    </transition>
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
    };
  },
  computed: {
    currentPage() {
      return Number(this.$route.query.page);
    },
  },
  methods: {
    async getQuestions() {
      try {
        const res = await this.$axios.$get("/questions", {
          params: {
            page: this.$route.query.page,
          },
        });
        this.questions = res.data.questions;
        this.totalPages = res.data.total_pages;
      } catch (error) {
        console.log(error);
      }
    },
    push(event: number) {
      this.$router.push({ path: "questions", query: { page: String(event) } });
    },
    update() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  watch: {
    '$route.query': {
      handler(to, from) {
        this.getQuestions();
      },
      immediate: true
    },
  },
});
</script>

<style>
</style>