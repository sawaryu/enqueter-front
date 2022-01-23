<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-alert
        v-if="isSent"
        class="text-center"
        icon="mdi-email"
        dense
        outlined
        type="info"
      >
        Please check your email to activate the account.
      </v-alert>

      <v-alert
        v-else-if="res"
        class="text-center"
        dense
        outlined
        :type="res.type"
      >
        {{ res.message }}
      </v-alert>
    </div>

    <div class="d-flex justify-center">
      <v-card class="pt-12 mt-12 text-center" flat color="rgb(0, 0, 0, 0)">
        <v-card-title class="text-h3 font-weight-bold text-center">
          Enqueter
        </v-card-title>
        <v-card-text>choose the majority.</v-card-text>
        <v-card-actions class="d-flex justify-center">
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

    <Login @sent="isSent = true" />
    <Signup @sent="isSent = true" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  auth: false,
  data: () => ({
    isSent: null,
    res: null as object,
  }),
  created() {
    this.init();
  },
  methods: {
    async init() {
      const query = this.$route.query.confirm;
      console.log(query);
      if (!query) {
        return;
      }
      try {
        const res = await this.$axios.$get(`/auth/${query}/confirm`);
        this.res = res;
      } catch (error) {}
    },
  },
});
</script>