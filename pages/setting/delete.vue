<template>
  <div>
    <div class="mb-3">Unsubscribe from this application and delete your account.</div>
    <div class="text-caption text--secondary">※This operation can't be canceled.</div>
    <div class="text-caption text--secondary">
      ※It may take a while to deleted completely from the database.
    </div>
    <v-checkbox
      v-model="checkbox"
      class="mx-auto"
      label="I agree."
      color="grey darken-3"
      style="width: 100px"
    ></v-checkbox>
    <submit :disabled="!checkbox" @click="destroy">delete</submit>
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
    async destroy(): Promise<void> {
      try {
        const res = await this.$axios.$delete("/auth");
        await this.$auth.logout();
        await (this as any).$resetStore();
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