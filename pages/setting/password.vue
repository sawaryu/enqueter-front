<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      type="password"
      v-model="passwordModel.current_password"
      :rules="passwordRules"
      maxlength="72"
      counter="72"
      label="Current password"
      tabindex="1"
    >
    </v-text-field>
    <v-divider light class="my-4"></v-divider>
    <v-text-field
      type="password"
      v-model="passwordModel.new_password"
      :rules="passwordRules"
      maxlength="72"
      counter="72"
      label="New password"
      persistent-hint
      tabindex="1"
    >
    </v-text-field>
    <v-text-field
      type="password"
      v-model="passwordModel.password_confirmation"
      :rules="passwordConfirmationRules"
      maxlength="72"
      counter="72"
      label="New password (confirmation)"
      tabindex="1"
    >
    </v-text-field>
    <submit tabindex="1" @click="change">update</submit>
  </v-form>
</template>

<script lang="ts">
import { passwordRules } from "@/common/validators/validator";
type passwordModel = {
  current_password: string;
  new_password: string;
  password_confirmation: string;
};
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      valid: true,
      passwordModel: {
        current_password: "",
        new_password: "",
        password_confirmation: "",
      } as passwordModel,
      passwordRules: passwordRules,
    };
  },
  methods: {
    async change(): Promise<void> {
      if (!(this.$refs.form as any).validate()) {
        return;
      }

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
        (this.$refs.form as any).resetValidation();
        this.$accessor.flash.showMessage(
          {
            message: `Updated completely your password.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {}
    },
  },
  computed: {
    passwordConfirmationRules() {
      return [
        (v: string) =>
          this.passwordModel.new_password == v ||
          `not match with the new password.`,
      ];
    },
  },
});
</script>

<style>
</style>