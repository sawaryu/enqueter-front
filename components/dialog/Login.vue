<template>
  <v-dialog
    :value="$accessor.dialog.getLoginDialog"
    @input="$accessor.dialog.setLoginDialog(false)"
    width="500"
    transition="fade-transition"
  >
    <v-card class="rounded-lg">
      <v-card-title class="pb-0">
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setLoginDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="d-flex justify-center pb-15">
        <v-form
          v-if="!forgotten"
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
            In case of resend E-mail. please click
            <span class="pointer underline blue--text" @click="resend"
              >here.</span
            >
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
            <span class="blue--text pointer underline" @click="forgotten = true"
              >here.</span
            >
          </div>

          <v-btn @click="login" tabindex="1" color="grey darken-3" dark>
            login
          </v-btn>

          <v-divider class="my-5"></v-divider>
          <div class="text-primary mb-1">
            In case of not having the account.
          </div>
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

        <!--------------->

        <v-form v-else class="text-center" style="width: 300px">
          <div class="text-center">
            <v-icon class="mx-auto" size="48" color="grey darken-4">
              mdi-lock
            </v-icon>
            <span class="font-weight-bold text-h6 text--primary"
              >Reset password</span
            >
          </div>

          <v-text-field
            tabindex="1"
            v-model="resetModel.email"
            label="E-mail"
            required
            color="grey darken-3"
            hint="Send email to your registered E-mail."
            persistent-hint
          ></v-text-field>

          <v-btn class="mt-5" tabindex="1" color="grey darken-3" dark>
            send
          </v-btn>

          <v-divider class="my-5"></v-divider>

          <v-btn
            @click="forgotten = false"
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    valid: true as boolean,
    forgotten: false,
    loginModel: {
      username_or_email: "" as string,
      password: "" as string,
    } as Object,
    resetModel: {
      email: "",
    } as object,
    user_id_not_confirmed: null as number,
  }),
  methods: {
    // login.
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
    // resend confirmation E-mail.
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
        this.reset();
        this.$emit("sent");
      } catch (error) {
      } finally {
        this.$accessor.overlay.setOverlay(false);
      }
    },
    // modal close, then open signup modal.
    closeOpen(): void {
      this.$accessor.dialog.setLoginDialog(false);
      setTimeout(() => {
        this.$accessor.dialog.setSignupDialog(true);
      }, 200);
    },
    // reset all data. rewrite initial object statement.
    reset(): void {
      Object.assign(this.$data, this.$options.data());
    },
  },
});
</script>