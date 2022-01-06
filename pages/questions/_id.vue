<template>
  <div>
    <!-- QUESTION -->
    <v-row class="justify-center my-4">
      <Question :question="question" />
    </v-row>

    <!-- by the status -->
    <component @answered="question.is_answered = true" :is="currentComponent"></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/questions/${params.id}`);
    console.log(res);
    return { question: res };
  },
  data() {
    return {};
  },
  computed: {
    // display the component by the question status from view of the current_user.
    currentComponent() {
      if (
        this.question.user_id == this.$auth.user.id ||
        this.question.is_answered
      ) {
        return "Owner";
      } else if (!this.question.is_answered) {
        return "Unanswered";
      }
    },
  }
});
</script>

<style>
</style>