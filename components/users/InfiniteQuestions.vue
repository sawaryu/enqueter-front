<template>
  <div style="min-height: 530px">
    <v-row class="pa-3 mt-2">
      <Loading v-if="loading" />

      <template v-else-if="questions.length">
        <v-col class="pt-0" v-for="q in questions" :key="q.id" cols="12" sm="6">
          <Question :question="q" />
        </v-col>
        <v-col cols="12" v-if="page >= 2 && questions.length >= 15">
          <infinite-loading @infinite="getMore">
            <div slot="spinner">
              <Loading />
            </div>
            <div class="font-weight-light" slot="no-more" style="height: 30px">
              No more questions.
            </div>
            <div
              class="font-weight-light"
              slot="no-results"
              style="height: 30px"
            >
              No more questions.
            </div>
          </infinite-loading>
        </v-col>
      </template>

      <v-col v-else class="text--secondary text-center">
        <div class="font-weight-light">
          <slot name="nothing"></slot>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/common/types/models";
import InfiniteLoading from "vue-infinite-loading";
import Vue from "vue";
export default Vue.extend({
  components: { InfiniteLoading },
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true as boolean,
      questions: [] as Question[],
      page: 1 as number,
    };
  },
  async created(): Promise<void> {
    try {
      const res: Question[] = await this.$axios.$get(this.url, {
        params: {
          page: this.page,
        },
      });
      this.page = 2;
      this.questions = res;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async getMore($state: any): Promise<void> {
      try {
        const res = await this.$axios.$get(this.url, {
          params: {
            page: this.page,
          },
        });
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