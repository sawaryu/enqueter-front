<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      type="password"
      v-model="passwordModel.current_password"
      maxlength="72"
      counter="72"
      color="grey darken-3"
      label="current password"
      tabindex="1"
    >
    </v-text-field>
    <v-divider light class="my-4"></v-divider>
    <v-text-field
      type="password"
      v-model="passwordModel.new_password"
      maxlength="72"
      counter="72"
      color="grey darken-3"
      label="new password"
      tabindex="1"
    >
    </v-text-field>
    <v-text-field
      type="password"
      v-model="passwordModel.password_confirmation"
      maxlength="72"
      counter="72"
      color="grey darken-3"
      label="new password (confirmation)"
      tabindex="1"
    >
    </v-text-field>
    <v-btn tabindex="1" @click="change">change</v-btn>
  </v-form>
</template>

<script lang="ts">
// TODO: validation
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      passwordModel: {
        current_password: "",
        new_password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    async change() {
      try {
        const res = await this.$axios.$put(
          "/auth/password",
          this.passwordModel
        );
        this.passwordModel = {
          current_password: "",
          new_password: "",
          password_confirmation: "",
        };
        this.$accessor.flash.showMessage(
          {
            message: `updated completly your password.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style>
</style>