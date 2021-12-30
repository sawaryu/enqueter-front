<template>
  <div>
    <!-- QUESTION -->
    <v-row class="justify-center mt-4">
      <Question :question="question" />
    </v-row>

    <NuxtChild />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/questions/${params.id}`);
    return { question: res };
  },
  data() {
    return {};
  },
  methods: {
    next(): void {},
    questions(): void {},
  },
});
</script>

<style>
</style>