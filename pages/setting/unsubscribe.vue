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
    <v-btn :disabled="!checkbox" @click="unsubscribe()">unsubscribe</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      checkbox: false,
    };
  },
  methods: {
    unsubscribe(): void {
      this.$router.push("/welcome");
      this.$accessor.flash.showMessage(
        {
          message: `unsubscribe completly.`,
          type: "info",
          status: true,
        },
        { root: true }
      );
    },
  },
});
</script>

<style>
</style>