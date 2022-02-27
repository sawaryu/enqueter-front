<template>
  <v-form ref="form" class="text-center" style="width: 300px">
    <div class="text-center">
      <v-icon class="mb-3" size="48" color="grey darken-4"> mdi-lock </v-icon>
      <span class="font-weight-bold text-h6 text--primary">Reset password</span>
    </div>

    <v-text-field
      tabindex="1"
      type="email"
      v-model="emailModel.email"
      :rules="emailRules"
      label="E-mail"
      required
      hint="Send email to your registered E-mail."
      persistent-hint
    ></v-text-field>

    <submit class="mt-5" @click="submit"> send </submit>

    <v-divider class="my-5"></v-divider>

    <v-btn
      @click="$emit('close')"
      tabindex="1"
      small
      outlined
      color="grey darken-3"
      dark
      rounded
    >
      cancel
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { emailRules } from "@/common/validators/validator";
type EmailModel = {
  email: string;
};
export default Vue.extend({
  data() {
    return {
      emailModel: {
        email: "",
      } as EmailModel,
      emailRules: emailRules as any[],
    };
  },
  methods: {
    async submit(): Promise<void> {
      if (!(this.$refs.form as any).validate()) {
        return;
      }

      this.$accessor.overlay.setOverlay(true);
      try {
        const res = await this.$axios.$post(
          `/auth/password_reset`,
          this.emailModel
        );
        this.$accessor.dialog.setLoginDialog(false);
        this.$accessor.alert.setAlert({
          type: "info",
          message: res.message,
        });
      } catch (error) {
      } finally {
        this.$accessor.overlay.setOverlay(false);
      }
    },
  },
});
</script>

<style>
</style>