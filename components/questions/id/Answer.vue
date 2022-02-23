<template>
  <div>
    <v-row class="mt-4" justify="center">
      <v-col class="text-center" cols="12">
        <div class="text-h6 font-weight-light">Which is majority?</div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-card
        elevation="8"
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
        link
        @click="answer('first')"
      >
        <div class="text-h6 text-sm-h4 red--text font-weight-bold text-center">
          {{ question.option_first }}
        </div>
      </v-card>

      <v-card
        elevation="8"
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
        link
        @click="answer('second')"
      >
        <div class="text-h6 text-sm-h4 blue--text font-weight-bold text-center">
          {{ question.option_second }}
        </div>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Question } from "@/common/entity/Question";
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    question: {
      type: Object,
      required: true,
    } as PropOptions<Question>,
  },
  computed: {
    size() {
      const breakpointName = this.$vuetify.breakpoint.name;
      if (breakpointName === "xs") {
        return 130;
      } else {
        return 250;
      }
    },
  },
  methods: {
    async answer(option: string): Promise<void> {
      if (
        this.question.user_id == this.$auth.user.id ||
        this.question.is_answered ||
        !this.question.is_open
      ) {
        return;
      }
        try {
          const question_id: number = Number(this.$route.params.id);
          const res = await this.$axios.$post("/questions/answer", {
            question_id: question_id,
            option: option,
          });
          this.$accessor.timeline.answeredQuestion(question_id);
          this.$emit("answer", res);
        } catch (error) {}
    },
  },
});
</script>

<style>
</style>