<template>
  <v-form ref="form">
    <v-text-field
      type="password"
      v-model="passwordModel.current_password"
      :rules="rules.passwordRules"
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
      :rules="rules.passwordRules"
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
      :rules="rules.passwordConfirmationRules"
      maxlength="72"
      counter="72"
      label="New password (confirmation)"
      tabindex="1"
    >
    </v-text-field>
    <submit class="mt-3" @click="submit">update</submit>
  </v-form>
</template>

<script lang="ts">
import { passwordRules } from "@/common/validators/validator";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      passwordModel: {
        current_password: "",
        new_password: "",
        password_confirmation: "",
      },
      rules: {},
    };
  },
  methods: {
    submit(): void {
      this.rules = {
        passwordRules: passwordRules,
        passwordConfirmationRules: this.passwordConfirmationRules,
      };
      this.$nextTick(() => {
        if ((this.$refs.form as any).validate()) {
          this.update();
        }
      });
    },
    async update(): Promise<void> {
      try {
        const res = await this.$axios.$put(
          "/auth/password",
          this.passwordModel
        );
        Object.assign(this.$data, (this.$options as any).data());
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
          `Not match with the new password.`,
      ];
    },
  },
});
</script>