<template>
  <div>
    <div>Unsubscribe from this application and delete your account.</div>
    <div class="text-caption">※This operation can't be canceled.</div>
    <v-checkbox
      v-model="checkbox"
      class="mx-auto"
      label="I agree."
      color="grey darken-3"
      style="width: 100px"
    ></v-checkbox>
    <v-btn :disabled="!checkbox" @click="destroy">delete</v-btn>
  </div>
</template>

<script lang="ts">
// TODO: validation
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      checkbox: false,
    };
  },
  methods: {
    async destroy() {
      try {
        const res = await this.$axios.$delete("/auth");
        this.$accessor.flash.showMessage(
          {
            message: `deleted completly.`,
            type: "info",
            status: true,
          },
          { root: true }
        );
        this.$auth.logout()
      } catch (error) {}
    },
  },
});
</script>

<style>
</style>