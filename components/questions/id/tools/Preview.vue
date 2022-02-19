<template>
  <v-row justify="center">
    <v-card
      elevation="8"
      class="d-flex justify-center align-center ma-6"
      :width="size"
      :height="size"
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
    >
      <div class="text-h6 text-sm-h4 blue--text font-weight-bold text-center">
        {{ question.option_second }}
      </div>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Question } from "@/common/entity/Question";
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
      if (breakpointName == "xs") {
        return 130;
      } else {
        return 250;
      }
    },
  },
});
</script>

<style>
</style>