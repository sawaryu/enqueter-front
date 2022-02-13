<template>
  <!-- before sent email. -->
  <v-form v-if="!sent" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      tabindex="1"
      :value="$auth.user.email"
      label="Current E-mail"
      color="grey darken-3"
      disabled
    ></v-text-field>

    <v-text-field
      tabindex="1"
      v-model="emailModel.email"
      :rules="emailRules"
      label="E-mail"
      color="grey darken-3"
      counter="255"
      max-length="255"
    ></v-text-field>

    <div class="text-caption mb-5">
      ※ Confirmation email are sent to your new E-mail.
    </div>

    <v-btn tabindex="1" @click="submit">submit</v-btn>
  </v-form>

  <!------------------->

  <!-- after sent email. -->
  <v-form v-else>
    <v-alert type="info">
      Please check your E-mail and enter the <strong>token</strong> to the
      field.
      <div>
        <small>* A token is expired within 30 minutes after mailed.</small>
      </div>
    </v-alert>

    <v-text-field
      tabindex="1"
      v-model="tokenModel.token"
      label="Token"
      color="grey darken-3"
      counter="50"
      max-length="50"
    ></v-text-field>

    <v-btn dark color="grey darken-2" class="mr-4" @click="reset">cancel</v-btn>
    <v-btn class="ml-4" tabindex="1" @click="update">update</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      valid: true as boolean,
      sent: false as boolean,
      emailModel: {
        email: "" as string,
      },
      tokenModel: {
        token: "" as string,
      },
      emailRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required.",
        (v: string) =>
          (!!v &&
            /^(?!.*…)[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
              v
            )) ||
          "Incorrect email format.",
        (v: string) => v.length <= 255 || "Must be less than 255 characters.",
      ],
    };
  },
  methods: {
    // submit new email.
    async submit(): Promise<void> {
      if (!this.$refs.form.validate()) {
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
    // update with token.
    async update(): Promise<void> {
      try {
        const res = await this.$axios.$put(
          "/auth/update_email",
          this.tokenModel
        );
        this.sent = false;
        this.reset();
        this.$auth.fetchUser();
        this.$accessor.flash.showMessage(
          {
            message: "E-mail has been successfully updated.",
            type: "info",
            status: true,
          },
          { root: true }
        );
      } catch (error) {}
    },
    reset(): void {
      Object.assign(this.$data, this.$options.data());
    },
  },
});
</script>

<style>
</style>