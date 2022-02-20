<template>
  <v-sheet color="rgb(0, 0, 0, 0)" flat>
    <v-card-title class="font-weight-light">
      <v-icon>mdi-timer</v-icon>Timeline
      <v-spacer></v-spacer>
      <v-btn x-large icon @click="init(true)">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </v-card-title>

    <transition name="fade" mode="out-in">
      <Loading v-if="loading" />

      <span v-else key="questions">
        <v-card-text
          v-if="!$accessor.timeline.getQuestions.length"
          class="text-center"
        >
          <div class="font-weight-bold text-h6">
            Questions related to you will be displayed here
          </div>
          <div class="text-caption">
            Let's try create questions or follow people.
          </div>
        </v-card-text>

        <v-row v-else>
          <v-col
            v-for="q in $accessor.timeline.getQuestions"
            :key="q.id"
            cols="12"
            sm="6"
          >
            <Question :question="q" :isVuex="true" />
          </v-col>
          <v-col cols="12">
            <infinite-loading
              v-if="
                $accessor.timeline.getPage >= 2 &&
                $accessor.timeline.getQuestions.length >= 15
              "
              @infinite="getMore"
            >
              <div slot="spinner">
                <Loading />
              </div>
              <div
                class="font-weight-light"
                slot="no-more"
                style="height: 30px"
              >
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
        </v-row>
      </span>
    </transition>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";
export default Vue.extend({
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init(isReset: boolean = false): Promise<void> {
      try {
        if (isReset) {
          this.$accessor.timeline.reset();
        }
        if (this.$accessor.timeline.getPage >= 2) {
          return;
        }
        this.loading = true;
        const res = await this.$axios.$get(`/questions/timeline`, {
          params: {
            page: this.$accessor.timeline.getPage,
          },
        });
        if (res.length) {
          this.$accessor.timeline.incrementPage();
          this.$accessor.timeline.setQuestions(res);
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 250);
      }
    },
    async getMore($state: any): Promise<void> {
      try {
        const res = await this.$axios.$get(`/questions/timeline`, {
          params: {
            page: this.$accessor.timeline.getPage,
          },
        });
        setTimeout(() => {
          if (res.length) {
            this.$accessor.timeline.incrementPage();
            this.$accessor.timeline.pushQuestions(res);
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