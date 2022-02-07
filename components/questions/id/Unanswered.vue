<template>
  <div>
    <v-row class="mt-4" justify="center">
      <v-col class="text-center" cols="12">
        <div class="text-h6 font-weight-light">Which is majority?</div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <AnswerCard
        v-for="(card, index) in cards"
        :key="index"
        :type="card"
        @answer="answer"
      />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      cards: [true, false],
    };
  },
  created() {
    // randomize cards.
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  },
  methods: {
    async answer(is_yes: boolean) {
      try {
        const question_id: number = Number(this.$route.params.id);
        const res = await this.$axios.$post("/questions/answer", {
          question_id: question_id,
          is_yes: is_yes,
        });
        // change store
        this.$accessor.timeline.answeredQuestion(question_id);
        this.$emit("answered", res);
      } catch (error) {}
    },
  },
});
</script>

<style>
</style>