<template>
  <div>
    <v-row class="justify-center my-4">
      <Question :question="question" />
    </v-row>

    <transition name="fade" mode="out-in">
      <component
        :question="question"
        @answer="answer"
        :is="currentComponent"
      ></component>
    </transition>

    <SnackAnswered
      :snackbar="snackbar"
      :snackDisplay="snackDisplay"
      @close="snackbar = false"
    />
    <FloatAnswer @close="snackbar = false" />
    <Dial @close="snackbar = false" />
  </div>
</template>

<script lang="ts">
const COMPONENT = {
  owner: "Owner",
  unanswered: "Answer",
};
const RESULT = {
  right: 3,
  wrong: -3,
  even: 0,
  first: 1,
};
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }): Promise<any> {
    try {
      const res = await $axios.$get(`/questions/${params.id}`);
      return { question: res };
    } catch (error) {}
  },
  data() {
    return {
      snackbar: false,
      snackDisplay: {
        message: "",
        color: "",
      },
    };
  },
  computed: {
    currentComponent() {
      if (
        this.question.user_id == this.$auth.user.id ||
        this.question.is_answered ||
        !this.question.is_open
      ) {
        return COMPONENT.owner;
      } else if (!this.question.is_answered) {
        return COMPONENT.unanswered;
      }
    },
  },
  methods: {
    answer(result: number) {
      if (result === RESULT.right) {
        this.snackDisplay = {
          message: "Right (+3pt)",
          color: "success",
        };
      } else if (result === RESULT.wrong) {
        this.snackDisplay = {
          message: "Wrong (-3pt)",
          color: "dark",
        };
      } else if (result === RESULT.even) {
        this.snackDisplay = {
          message: "Even",
          color: "warning",
        };
      } else if (result === RESULT.first) {
        this.snackDisplay = {
          message: "First (+1pt)",
          color: "info",
        };
      }
      this.snackbar = true;
      this.question.is_answered = true;
    },
  },
});
</script>

<style>
</style>