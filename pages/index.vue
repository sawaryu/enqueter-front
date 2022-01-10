<template>
  <v-row>
    <!-- todo:　高さの異なる繰り返し要素を詰める(colをしなければ詰められる？) -->
    <v-col cols="12" sm="8" md="8" order="last" order-sm="first">
      <v-card color="rgb(0, 0, 0, 0)" flat>
        <v-card-title><v-icon>mdi-home</v-icon>Timeline</v-card-title>

        <v-divider></v-divider>

        <v-card-text v-if="!questions.length" class="text-center">
          Questions that you and your following users have are displayed there.
        </v-card-text>

        <v-row class="mt-3" v-else>
          <v-col
            v-for="q in questions"
            :key="q.id"
            cols="12"
            sm="6"
          >
            <Question :question="q" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <!--  -->

    <v-col cols="12" md="4">
      <div style="position: sticky; top: 150px">
        <!-- <Information /> -->
        <Ranking />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async asyncData({ $axios }) {
    const res = await $axios.$get(`/questions/timeline`);
    return { questions: res };
  },
});
</script>

<style>
</style>