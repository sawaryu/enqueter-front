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
        <v-form
          class="text-center"
          ref="form"
          v-model="valid"
          lazy-validation
          style="width: 300px"
        >
          <div class="text-center">
            <v-icon class="mx-auto" size="48" color="grey darken-4">
              mdi-account-plus
            </v-icon>
            <span class="font-weight-bold text-h6 text--primary">SignUp</span>
          </div>

          <v-text-field
            tabindex="1"
            v-model="signupModel.public_id"
            :rules="publicIdRules"
            label="user_id"
            color="grey darken-3"
            counter="15"
            maxlength="15"
            persistent-hint
          ></v-text-field>

          <v-text-field
            tabindex="1"
            v-model="signupModel.email"
            :rules="emailRules"
            label="E-mail"
            color="grey darken-3"
            counter="255"
            max-length="255"
          ></v-text-field>

          <v-text-field
            tabindex="1"
            v-model="signupModel.name"
            :rules="nameRules"
            label="nickname"
            color="grey darken-3"
            maxlength="20"
            counter="20"
          ></v-text-field>

          <v-text-field
            tabindex="1"
            type="password"
            v-model="signupModel.password"
            :rules="passwordRules"
            label="password"
            color="grey darken-3"
            counter="72"
            persistent-hint
          ></v-text-field>

          <v-text-field
            tabindex="1"
            type="password"
            v-model="signupModel.password_confirmation"
            :rules="passwordConfirmationRules"
            label="password (confirmation)"
            color="grey darken-3"
            counter="72"
          ></v-text-field>

          <v-btn tabindex="1" color="grey darken-3" dark @click="signup">
            signup
          </v-btn>
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
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    valid: true,
    signupModel: {
      public_id: "",
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
    publicIdRules: [
      (v: string) => (!!v && /\S/.test(v)) || "Must be required.",
      (v: string) =>
        /^[A-Za-z0-9]*$/.test(v) ||
        "Must be using half-width alphanumeric characters.",
      (v: string) => v.length <= 15 || "Must be less than 15 characters.",
    ],
    emailRules: [
      (v: string) => (!!v && /\S/.test(v)) || "Must be required.",
      (v: string) =>
        (!!v && /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v)) ||
        "Incorrect email format.",
      (v: string) => v.length <= 255 || "Must be less than 255 characters.",
    ],
    nameRules: [
      (v: string) => (!!v && /\S/.test(v)) || "Must be required.",
      (v: string) => v.length <= 20 || "Must be less than 20 characters.",
    ],
    passwordRules: [
      (v: string) => (!!v && /\S/.test(v)) || "Must be required.",
      (v: string) =>
        /^[A-Za-z0-9]*$/.test(v) ||
        "Must be using half-width alphanumeric characters.",
      (v: string) => v.length >= 8 || "Must be more than 8 characters.",
      (v: string) => v.length <= 72 || "Must be less than 72 characters.",
    ],
  }),
  methods: {
    async signup(): Promise<any> {
      if (this.$refs.form.validate()) {
        this.$accessor.overlay.setOverlay(true);
        try {
          const res = await this.$axios.$post("/auth", this.signupModel);
          this.$accessor.dialog.setSignupDialog(false);
          this.$accessor.flash.showMessage(
            {
              message: "Account created. please check your email.",
              type: "info",
              status: true,
            },
            { root: true }
          );
          this.$emit("sent");
        } catch (e) {
          console.log(e);
        } finally {
          this.$accessor.overlay.setOverlay(false);
        }
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
      // is same with "password" ?
      return [
        (v: string) =>
          this.signupModel.password == v || `Not match with the password.`,
      ];
    },
  },
});
</script>