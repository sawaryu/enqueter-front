<template>
  <div>
    <!-- After answer result. -->
    <SnackAnswered
      :snackbar="snackbar"
      :snackDisplay="snackDisplay"
      @close="snackbar = false"
    />

    <!-- Go to the next question. Back to questions. -->
    <FloatAnswer @close="snackbar = false" />
    <FloatBack @close="snackbar = false" />

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
    try {
      const res = await $axios.$get(`/questions/${params.id}`);
      console.log(res);
      return { question: res };
    } catch (error) {}
  },
  data() {
    return {
      // use only after answered
      snackbar: false,
      snackDisplay: {
        message: "",
        color: "",
      },
    };
  },
  computed: {
    // display the component by the question status from view of the current_user.
    currentComponent() {
      if (
        this.question.user_id == this.$auth.user.id ||
        this.question.is_answered ||
        !this.question.is_open
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
      if (arg.result === 3) {
        this.snackDisplay = {
          message: "Right (+3pt)",
          color: "success",
        };
      } else if (arg.result === -3) {
        this.snackDisplay = {
          message: "Wrong (-3pt)",
          color: "dark",
        };
      } else if (arg.result === 0) {
        this.snackDisplay = {
          message: "Even",
          color: "warning",
        };
      } else if (arg.result === 1) {
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