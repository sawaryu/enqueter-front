<template>
  <div>
    <v-row class="justify-center">
      <!-- Yes -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
        link
        @click="submit(true)"
      >
        <!-- <v-icon color="#EF9A9A" size="100">mdi-circle-outline</v-icon> -->
        <div class="text-h4 red--text">Yes</div>
      </v-card>

      <!-- No -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
        link
        @click="submit(false)"
      >
        <!-- <v-icon color="#90CAF9" size="100">mdi-close</v-icon> -->
        <div class="text-h4 blue--text">No</div>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
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
  methods: {
    // todo after answered
    async submit(is_yes: boolean) {
      // try {
      //   const res = await this.$axios.$post(
      //     `/questions/${this.$route.params.id}/answer`,
      //     {
      //       is_yes: is_yes,
      //     }
      //   );
      // } catch (error) {}
    },
  },
});
</script>

<style>
</style>