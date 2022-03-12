<template>
  <!-- before sent email. -->
  <v-form v-if="!sent" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      tabindex="1"
      type="email"
      :value="$auth.user.email"
      label="Current E-mail"
      disabled
    ></v-text-field>

    <v-text-field
      tabindex="1"
      type="email"
      v-model="emailModel.email"
      :rules="emailRules"
      label="New E-mail"
      counter="255"
      max-length="255"
    ></v-text-field>

    <div class="text-caption text--secondary mb-5 mt-3">
      * Confirmation email are sent to your new E-mail.
    </div>

    <submit @click="submit">submit</submit>
  </v-form>

  <!------------------->

  <!-- after sent email. -->
  <v-form v-else>
    <v-alert color="info" outlined class="d-flex justify-start">
      Please check your E-mail and enter the <strong>code</strong> in the field.
      <div>
        <small>* The code is expired within 30 minutes after mailed.</small>
      </div>
    </v-alert>

    <v-otp-input
      class="mb-5"
      type="number"
      tabindex="1"
      length="6"
      v-model="codeModel.code"
      label="Code"
      :disabled="$accessor.overlay.getOverlay"
    ></v-otp-input>

    <v-btn dark color="grey darken-2" class="mr-4" @click="reset" outlined
      >cancel</v-btn
    >
    <submit
      class="ml-4"
      :disabled="!(codeModel.code.length === codeLength)"
      @click="update"
      >update</submit
    >
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { emailRules } from "@/common/validators/validator";
export default Vue.extend({
  data() {
    return {
      valid: true as boolean,
      sent: false as boolean,
      emailModel: {
        email: "" as string,
      },
      emailRules: emailRules,
      codeModel: {
        code: "" as string,
      },
      codeLength: 6,
    };
  },
  methods: {
    // submit new email.
    async submit(): Promise<void> {
      if (!(this.$refs as any).form.validate()) {
        return;
      }
      this.$accessor.overlay.setOverlay(true);
      try {
        const res = await this.$axios.$post(
          "/auth/update_email",
          this.emailModel
        );
        this.$accessor.flash.showMessage(
          {
            message: "Please check your email.",
            type: "info",
            status: true,
          },
          { root: true }
        );
        this.sent = true;
      } catch (error) {
      } finally {
        this.$accessor.overlay.setOverlay(false);
      }
    },
    // update with code.
    async update(): Promise<void> {
      try {
        const res = await this.$axios.$put(
          "/auth/update_email",
          this.codeModel
        );
        this.sent = false;
        this.reset();
        this.$auth.fetchUser();
        this.$accessor.flash.showMessage(
          {
            message: "E-mail has been successfully updated.",
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (error) {}
    },
    reset(): void {
      Object.assign(this.$data, (this.$options as any).data());
    },
  },
});
</script>