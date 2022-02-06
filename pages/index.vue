<template>
  <v-row>
    <v-col cols="12" md="4">
      <div style="position: sticky; top: 85px">
        <Ranking />
      </div>
    </v-col>

    <!--  -->

    <!-- min height solve ranking display bugs -->
    <v-col cols="12" md="8" style="min-height: 300px">
      <v-card color="rgb(0, 0, 0, 0)" flat>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn x-large icon @click="init(true)">
            <v-icon>mdi-cached</v-icon>
          </v-btn>
        </v-card-title>

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

          <span v-else key="questions">
            <!-- Nothing -->
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

            <!-- Questions -->
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
                    $accessor.timeline.getQuestions.length >= 10
                  "
                  @infinite="getMore"
                >
                  <div slot="spinner">
                    <VueLoading
                      type="bars"
                      color="#333"
                      :size="{ width: '40px', height: '40px' }"
                    />
                  </div>
                  <div
                    class="font-weight-bold"
                    slot="no-more"
                    style="height: 40px"
                  >
                    No more questions.
                  </div>
                  <div
                    class="font-weight-bold"
                    slot="no-results"
                    style="height: 40px"
                  >
                    No more questions.
                  </div>
                </infinite-loading>
              </v-col>
            </v-row>
          </span>
        </transition>
      </v-card>
    </v-col>
    <FloatAnswer />
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { VueLoading } from "vue-loading-template";
import InfiniteLoading from "vue-infinite-loading";
export default Vue.extend({
  components: {
    VueLoading,
    InfiniteLoading,
  },
  data() {
    return {
      loading: false,
      scrollY: 0,
    };
  },
  created() {
    this.init();
    this.$vuetify.goTo(this.$accessor.timeline.getScrollY)
  },
  destroyed() {
    // scroll位置を格納する。
    console.log("Destroyed:", window.scrollY);
    this.$accessor.timeline.saveScroll(window.scrollY);
  },
  methods: {
    // Initially
    async init(isReset: boolean = false): Promise<void> {
      if (isReset) {
        this.loading = true;
        this.$accessor.timeline.reset();
      }
      if (this.$accessor.timeline.getPage >= 2) {
        return;
      }
      try {
        this.loading = true;
        const res = await this.$axios.$get(`/questions/timeline`, {
          params: {
            page: this.$accessor.timeline.getPage,
          },
        });
        this.$accessor.timeline.incrementPage();
        console.log(res);
        this.$accessor.timeline.setQuestions(res);
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 250);
      }
    },
    // More
    async getMore($state: any): Promise<void> {
      try {
        const res = await this.$axios.$get(`/questions/timeline`, {
          params: {
            page: this.$accessor.timeline.getPage,
          },
        });
        console.log(res);
        setTimeout(() => {
          if (res.length) {
            this.$accessor.timeline.incrementPage();
            this.$accessor.timeline.pushQuestions(res);
            $state.loaded();
          } else {
            $state.complete();
          }
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
  },
  beforeDestroy() {
    console.log(this.$vuetify);
  },
});
</script>

<style>
</style>