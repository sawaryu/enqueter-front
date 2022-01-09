<template>
  <div>
    <!-- After answer result. -->
    <SnackAnswered
      :snackbar="snackbar"
      :snackDisplay="snackDisplay"
      @close="snackbar = false"
    />

    <!-- Go to the next question. -->
    <FloatNext v-if="float" @close="snackbar = false" />

    <!-- QUESTION -->
    <v-row class="justify-center my-4">
      <Question :question="question" />
    </v-row>

    <!-- by the status -->
    <transition name="fade" mode="out-in">
      <component @answered="answered" :is="currentComponent"></component>
    </transition>
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
    return {
      // use only after answered
      snackbar: false,
      snackDisplay: {
        message: "",
        color: "",
      },
      float: false,
    };
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
  },
  methods: {
    // change component and show snackbar.
    answered(arg: any) {
      if (arg.result === "right") {
        this.snackDisplay = {
          message: "right (+3pt)",
          color: "success",
        };
      } else if (arg.result === "wrong") {
        this.snackDisplay = {
          message: "wrong (-2pt)",
          color: "dark",
        };
      } else if (arg.result === "even") {
        this.snackDisplay = {
          message: "The ratio is even.",
          color: "warning",
        };
      } else if (arg.result === "first") {
        this.snackDisplay = {
          message: "You are the first. (+1pt)",
          color: "info",
        };
      }
      this.float = true;
      this.snackbar = true;
      this.question.is_answered = true;
    },
  },
});
</script>

<style>
</style>