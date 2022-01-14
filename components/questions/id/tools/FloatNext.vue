<template>
  <v-fab-transition>
    <v-btn class="mb-10" large fixed bottom left dark fab @click="next">
      <v-icon dark>mdi-chevron-left</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    async next() {
      try {
        const res = await this.$axios.$get("/questions/next");
        if (res.data) {
          this.$router.push(`/questions/${res.data}`);
        } else {
          this.$router.push("/questions");
          this.$accessor.flash.showMessage(
            {
              message: `There are no more answerable questions.`,
              type: "dark",
              status: true,
            },
            { root: true }
          );
        }
      } catch (error) {} finally {
        this.$emit("close")
      }
    },
  },
});
</script>