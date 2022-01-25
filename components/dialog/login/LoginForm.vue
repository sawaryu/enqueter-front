<template>
  <v-form
    class="text-center"
    ref="form"
    v-model="valid"
    lazy-validation
    style="width: 300px"
  >
    <div v-if="user_id_not_confirmed" class="mb-5">
      <v-alert color="warning" outlined prominent border="left">
        <div>You are not confirmed. please check your email.</div>
      </v-alert>
      If you need to resend email. please click
      <span class="pointer underline blue--text" @click="resend">here.</span>
    </div>

    <div class="text-center">
      <v-icon class="mx-auto" size="48" color="grey darken-4">
        mdi-login
      </v-icon>
      <span class="font-weight-bold text-h6 text--primary">Login</span>
    </div>

    <v-text-field
      tabindex="1"
      v-model="loginModel.username_or_email"
      label="Username (E-mail)"
      required
      color="grey darken-3"
    ></v-text-field>

    <v-text-field
      tabindex="1"
      type="password"
      v-model="loginModel.password"
      label="password"
      required
      color="grey darken-3"
    ></v-text-field>

    <div class="mb-5">
      If you forget the password, click
      <span class="blue--text pointer underline" @click="$emit('open')"
        >here.</span
      >
    </div>

    <v-btn @click="login" tabindex="1" color="grey darken-3" dark>
      login
    </v-btn>

    <v-divider class="my-5"></v-divider>
    <div class="text-primary mb-1">In case of not having the account.</div>
    <v-btn
      @click="closeOpen"
      tabindex="1"
      small
      outlined
      color="grey darken-3"
      dark
      rounded
    >
      signup
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      valid: true as boolean,
      user_id_not_confirmed: null as number,
      loginModel: {
        username_or_email: "" as string,
        password: "" as string,
      } as Object,
    };
  },
  methods: {
    async login(): Promise<any> {
      try {
        const res = await this.$auth.loginWith("local", {
          data: this.loginModel,
        });
        this.$accessor.dialog.setLoginDialog(false);
        this.$router.push("/");
        this.$accessor.flash.showMessage(
          {
            message: `Hello, ${this.$auth.user.nickname}.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {
        this.user_id_not_confirmed = e.response.data.user_id_not_confirmed;
      }
    },
    async resend(): Promise<any> {
      this.$accessor.overlay.setOverlay(true);
      try {
        const res = await this.$axios.$post(
          `/auth/${this.user_id_not_confirmed}/confirm/resend`
        );
        this.$accessor.dialog.setLoginDialog(false);
        this.$accessor.flash.showMessage(
          {
            message: `Resent the E-mail, please check your email.`,
            type: "info",
            status: true,
          },
          { root: true }
        );
        Object.assign(this.$data, this.$options.data());
        this.$accessor.alert.setAlert({
          type: "info",
          message: "Please check your email to activate the account.",
        });
      } catch (error) {
      } finally {
        this.$accessor.overlay.setOverlay(false);
      }
    },
    closeOpen(): void {
      this.$accessor.dialog.setLoginDialog(false);
      setTimeout(() => {
        this.$accessor.dialog.setSignupDialog(true);
      }, 200);
    },
  },
});
</script>

<style>
</style>