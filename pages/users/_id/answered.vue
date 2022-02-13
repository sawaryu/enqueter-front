<template>
  <div>
    <!-- questions -->
    <v-row class="pa-3 mt-2">
      <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
        <!-- a question. -->
        <Question :question="q" />
      </v-col>
      <v-col cols="12" v-if="page >= 2 && questions.length >= 15">
        <infinite-loading @infinite="getMore">
          <div slot="spinner">
            <VueLoading
              type="bars"
              color="#333"
              :size="{ width: '30px', height: '30px' }"
            />
          </div>
          <div class="font-weight-light" slot="no-more" style="height: 30px">
            No more questions.
          </div>
          <div class="font-weight-light" slot="no-results" style="height: 30px">
            No more questions.
          </div>
        </infinite-loading>
      </v-col>

      <v-col v-if="!questions.length" class="text--secondary text-center">
        <div class="font-weight-light">There are no answered questions.</div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/common/entity/Question";
import { VueLoading } from "vue-loading-template";
import InfiniteLoading from "vue-infinite-loading";
import Vue from "vue";
export default Vue.extend({
  components: { VueLoading, InfiniteLoading },
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/users/${params.id}/questions/answered`, {
      params: {
        page: 1,
      },
    });
    return { questions: res as Question[], page: 2 };
  },
  methods: {
    async getMore($state: any): Promise<void> {
      try {
        const res = await this.$axios.$get(
          `/users/${this.$route.params.id}/questions/answered`,
          {
            params: {
              page: this.page,
            },
          }
        );
        setTimeout(() => {
          if (res.length) {
            this.page++;
            this.questions.push(...res);
            $state.loaded();
          } else {
            $state.complete();
          }
        }, 1000);
      } catch (e) {}
    },
  },
});
</script>

<style>
</style>