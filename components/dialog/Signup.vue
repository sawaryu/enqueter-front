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
            label="user id"
            color="grey darken-3"
            counter="15"
            maxlength="15"
          ></v-text-field>

          <v-text-field
            tabindex="1"
            v-model="signupModel.name"
            label="nickname"
            color="grey darken-3"
            maxlength="20"
            counter="20"
          ></v-text-field>

          <v-text-field
            tabindex="1"
            type="password"
            v-model="signupModel.password"
            label="password"
            color="grey darken-3"
            counter="72"
          ></v-text-field>

          <v-text-field
            tabindex="1"
            type="password"
            v-model="signupModel.password_confirmation"
            label="password (confirmation)"
            color="grey darken-3"
            counter="72"
          ></v-text-field>

          <v-btn tabindex="1" color="grey darken-3" dark> signup </v-btn>
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

<script>
export default {
  auth: false,
  data: () => ({
    valid: true,
    is_success: false,
    show: false,
    signupModel: {
      public_id: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
  }),
  methods: {
    closeOpen() {
      this.$accessor.dialog.setSignupDialog(false);
      setTimeout(() => {
        this.$accessor.dialog.setLoginDialog(true);
      }, 200);
    },
  },
};
</script>