<template>
  <div>
    <div class="d-flex justify-center" style="min-height: 74px">
      <v-alert
        v-if="$accessor.alert.getAlert"
        :type="$accessor.alert.getAlert.type"
        outlined
      >
        {{ $accessor.alert.getAlert.message }}
      </v-alert>
    </div>

    <div class="d-flex justify-start">
      <v-card class="mt-10" flat color="rgb(0, 0, 0, 0)">
        <v-card-title class="text-h3 text-sm-h1 font-weight-bold">
          Enqueter
        </v-card-title>
        <v-card-text class="text-subtitle-1 text-sm-h6" style="width: 80vw"
          >Lorem ipsum dolor sit, amet voluptas incidunt nesciunt illum maxime
          ut?</v-card-text
        >
        <v-card-actions class="d-flex justify-start">
          <v-btn
            x-large
            elevation="0"
            color="grey darken-2"
            rounded
            dark
            @click="$accessor.dialog.setSignupDialog(true)"
            >start</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>

    <Login />
    <Signup />
    <Reset :resetInfo="resetInfo" @close="resetInfo = null" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  auth: false,
  data: () => ({
    resetInfo: null as object | null,
  }),
  created() {
    this.$accessor.alert.setAlert(null);
    this.init();
  },
  methods: {
    async init(): Promise<void> {
      // confirmation
      const confirmId: string | null = this.$route.query.confirm as
        | string
        | null;

      // password reset
      const token: string | null = this.$route.query.token as string | null;
      const email: string | null = this.$route.query.email as string | null;

      if (confirmId) {
        this.authConfirm(confirmId);
      } else if (token && email) {
        this.openResetModal(token, email);
      }
    },
    // ---Judge whether confirmId is valid or not.---
    async authConfirm(confirmId: string): Promise<void> {
      try {
        const res = await this.$axios.$get(`/auth/${confirmId}/confirm`);
        this.$accessor.alert.setAlert({
          type: "success",
          message: "You are confirmed now. please login. ",
        });
      } catch (error: any) {
        // Expired
        if (error.response.data.message === "expired") {
          this.$accessor.alert.setAlert({
            type: "error",
            message:
              "That link is expired. If you need to resend E-mail, please login firstly.",
          });
        }
        // Illegal
        else if (error.response.data.message === "illegal") {
          this.$accessor.alert.setAlert({
            type: "error",
            message: "Illegal operation was found.",
          });
        }
        // Already
        else if (error.response.data.message === "already") {
          this.$accessor.alert.setAlert({
            type: "info",
            message: "You are already confirmed.",
          });
        }
      }
    },
    // ---Judge whether token and email are valid or not. ---
    async openResetModal(token: string, email: string): Promise<void> {
      try {
        const res = await this.$axios.$get(`/auth/password_reset`, {
          params: {
            token: token,
            email: email,
          },
        });
        this.resetInfo = {
          token: token,
          email: email,
        };
      } catch (error: any) {
        // Expired
        if (error.response.data.message === "expired") {
          this.$accessor.alert.setAlert({
            type: "error",
            message: "The link is expired. please start over.",
          });
        }
        // Illegal
        else if (error.response.data.message === "illegal") {
          this.$accessor.alert.setAlert({
            type: "error",
            message: "The link is not correct or expired.",
          });
        }
      }
    },
  },
});
</script>