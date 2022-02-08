<template>
  <div>
    <div class="d-flex justify-center top-alert">
      <v-alert
        v-if="$accessor.alert.getAlert"
        class="text-center"
        :type="$accessor.alert.getAlert.type"
      >
        {{ $accessor.alert.getAlert.message }}
      </v-alert>
    </div>

    <div class="d-flex justify-start">
      <v-card class="pt-12 mt-12" flat color="rgb(0, 0, 0, 0)">
        <v-card-title class="text-h3 text-sm-h1 font-weight-bold">
          Enqueter
        </v-card-title>
        <v-card-text style="width: 80vw"
          >Lorem ipsum dolor sit repudiandae quam repellat, amet voluptas
          incidunt nesciunt illum maxime ut?</v-card-text
        >
        <v-card-actions class="d-flex justify-start">
          <v-btn
            x-large
            color="grey darken-2"
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
    resetInfo: null as object,
  }),
  created() {
    this.$accessor.alert.setAlert(null);
    this.init();
  },
  methods: {
    async init() {
      // confirmation
      const confirmId = this.$route.query.confirm;
      if (confirmId) {
        this.authConfirm(confirmId);
      }

      // password reset
      const token = this.$route.query.token;
      const email = this.$route.query.email;
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
.top-alert {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
}
</style>