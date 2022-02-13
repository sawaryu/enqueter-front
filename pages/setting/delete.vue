<template>
  <div>
    <div>Unsubscribe from this application and delete your account.</div>
    <div class="text-caption">※This operation can't be canceled.</div>
    <div class="text-caption">
      ※It may take a while to deleted completely from database.
    </div>
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
    async destroy(): Promise<void> {
      try {
        const res = await this.$axios.$delete("/auth");
        await this.$auth.logout();
        await this.$resetStore();
        this.$accessor.flash.showMessage(
          {
            message: `Deleted your account.`,
            type: "info",
            status: true,
          },
          { root: true }
        );
        this.$router.push("/welcome");
      } catch (error) {}
    },
  },
});
</script>

<style>
</style>