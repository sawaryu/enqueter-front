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
        <v-col v-for="q in questions" :key="q.id" cols="12" sm="6" md="4">
          <Question :question="q" />
        </v-col>

        <v-col class="text-center" v-if="!questions.length">
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
  async asyncData({ $axios }) {
    const res = await $axios.$get("/questions");
    return { questions: res as Question[] };
  },
  data() {
    return {
      loading: false as boolean,
    };
  },
  methods: {
    update() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
});
</script>

<style>
</style>