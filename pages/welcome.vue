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
      if (confirmId) {
        this.authConfirm(confirmId);
      }

      // password reset
      const token: string | null = this.$route.query.token as string | null;
      const email: string | null = this.$route.query.email as string | null;
      if (token && email) {
        this.authResetPassword(token, email);
      }
    },
    async authConfirm(confirmId: string): Promise<void> {
      try {
        const res = await this.$axios.$get(`/auth/${confirmId}/confirm`);
        this.$accessor.alert.setAlert({
          type: res.type,
          message: res.message,
        });
      } catch (error) {}
    },
    async authResetPassword(token: string, email: string): Promise<void> {
      try {
        const res = await this.$axios.$get(`/auth/password_reset`, {
          params: {
            token: token,
            email: email,
          },
        });
        if (res.message === "expired") {
          this.$accessor.alert.setAlert({
            type: "warning",
            message: "The link is expired. please start over.",
          });
          return;
        }
        this.resetInfo = {
          token: token,
          email: email,
        };
      } catch (error) {}
    },
  },
});
</script>

<style scoped>
/* .top-alert {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
} */
</style>