<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      type="password"
      v-model="passwordModel.current_password"
      :rules="passwordRules"
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
      :rules="passwordRules"
      maxlength="72"
      counter="72"
      color="grey darken-3"
      label="new password"
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
      color="grey darken-3"
      label="new password (confirmation)"
      tabindex="1"
    >
    </v-text-field>
    <v-btn tabindex="1" @click="change">update</v-btn>
  </v-form>
</template>

<script lang="ts">
// TODO: validation
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      valid: true,
      passwordModel: {
        current_password: "" as string,
        new_password: "" as string,
        password_confirmation: "" as string,
      },
      passwordRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) =>
          /^[A-Za-z0-9]*$/.test(v) ||
          "Must be using half-width alphanumeric characters.",
        (v: string) => v.length >= 8 || "Must be more than 8 characters",
        (v: string) => v.length <= 72 || "Must be less than 72 characters",
      ],
    };
  },
  methods: {
    async change() {
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
            message: `updated completely your password.`,
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