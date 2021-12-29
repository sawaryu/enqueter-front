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
          class="text-center"
          ref="form"
          v-model="valid"
          lazy-validation
          style="width: 300px"
        >
          <div class="text-center">
            <v-icon class="mx-auto" size="48" color="grey darken-4">
              mdi-login
            </v-icon>
            <span class="font-weight-bold text-h6 text--primary">Login</span>
          </div>

          <v-text-field
            tabindex="1"
            v-model="loginModel.public_id"
            label="user id"
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

          <v-btn @click="loginWithAuthModule" tabindex="1" color="grey darken-3" dark>
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    valid: true,
    loginModel: {
      public_id: "",
      password: "",
    },
  }),
  methods: {
    async loginWithAuthModule() {
      try {
        const res = await this.$auth.loginWith("local", {
          data: this.loginModel,
        });
        this.$accessor.dialog.setLoginDialog(false);
        this.$accessor.flash.showMessage(
          {
            message: `hello, ${this.$auth.user.name}!!`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {
        console.log(e);
      }
    },
    closeOpen() {
      this.$accessor.dialog.setLoginDialog(false);
      setTimeout(() => {
        this.$accessor.dialog.setSignupDialog(true);
      }, 200);
    },
  },
});
</script>