<template>
  <v-dialog
    :value="$accessor.dialog.getSignupDialog"
    @input="$accessor.dialog.setSignupDialog(false)"
    width="500"
    transition="fade-transition"
  >
    <v-card class="rounded-lg">
      <v-card-title class="pb-0">
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setSignupDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="d-flex justify-center pb-15">
        <v-form ref="form" class="text-center" style="width: 300px">
          <div class="text-center">
            <v-icon class="mx-auto" size="48" color="grey darken-4">
              mdi-account-plus
            </v-icon>
            <span class="font-weight-bold text-h6 text--primary">SignUp</span>
          </div>

          <v-text-field
            tabindex="1"
            v-model="signupModel.username"
            :rules="rules.usernameRules"
            label="Username"
            counter="15"
            maxlength="15"
            persistent-hint
          ></v-text-field>

          <v-text-field
            tabindex="1"
            type="email"
            v-model="signupModel.email"
            :rules="rules.emailRules"
            label="E-mail"
            counter="255"
            max-length="255"
          ></v-text-field>

          <v-text-field
            tabindex="1"
            type="password"
            v-model="signupModel.password"
            :rules="rules.passwordRules"
            label="password"
            counter="72"
            persistent-hint
          ></v-text-field>

          <v-text-field
            tabindex="1"
            type="password"
            v-model="signupModel.password_confirmation"
            :rules="rules.passwordConfirmationRules"
            label="password (confirmation)"
            counter="72"
          ></v-text-field>

          <div class="d-flex justify-center mb-5">
            <v-checkbox v-model="agree" hide-details color="black"></v-checkbox>
            <span class="mt-5"
              >I agree with the
              <span class="pointer underline blue--text" @click="term = true"
                >Terms.</span
              ></span
            >
          </div>

          <submit class="mt-2" @click="submit" :disabled="!agree">
            signup
          </submit>
          <v-divider class="my-5"></v-divider>
          <div class="text-primary mb-1">
            In case of already having the account.
          </div>
          <v-btn
            @click="closeOpen"
            small
            tabindex="1"
            outlined
            color="grey darken-3"
            dark
            rounded
          >
            login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <Term :term="term" @close="term = false" />
  </v-dialog>
</template>

<script lang="ts">
import {
  usernameRules,
  emailRules,
  passwordRules,
} from "@/common/validators/validator";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    term: false,
    agree: false,
    signupModel: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    rules: {},
  }),
  methods: {
    submit(): void {
      this.rules = {
        usernameRules: usernameRules,
        emailRules: emailRules,
        passwordRules: passwordRules,
        passwordConfirmationRules: this.passwordConfirmationRules,
      };

      this.$nextTick(() => {
        if ((this.$refs.form as any).validate()) {
          this.signUp();
        }
      });
    },
    async signUp(): Promise<void> {
      try {
        this.$accessor.overlay.setOverlay(true);
        const res = await this.$axios.$post("/auth", this.signupModel);
        this.$accessor.dialog.setSignupDialog(false);
        Object.assign(this.$data, (this.$options as any).data());
        this.$accessor.alert.setAlert({
          type: "info",
          message: "Please check your email to activate the account.",
        });
      } catch (e) {
      } finally {
        this.$accessor.overlay.setOverlay(false);
      }
    },
    closeOpen() {
      this.$accessor.dialog.setSignupDialog(false);
      setTimeout(() => {
        this.$accessor.dialog.setLoginDialog(true);
      }, 200);
    },
  },
  computed: {
    passwordConfirmationRules() {
      return [
        (v: string) =>
          this.signupModel.password == v || `Not match with the password.`,
      ];
    },
  },
});
</script>