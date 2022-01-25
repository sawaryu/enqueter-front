<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-alert
        v-if="$accessor.alert.getAlert"
        class="text-center"
        dense
        outlined
        :type="$accessor.alert.getAlert.type"
      >
        {{ $accessor.alert.getAlert.message }}
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

    <Login />
    <Signup />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  auth: false,
  data: () => ({
    res: null as object,
  }),
  created() {
    this.$accessor.alert.setAlert(null);
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
        this.$accessor.alert.setAlert({
          type: res.type,
          message: res.message,
        });
      } catch (error) {}
    }
  },
});
</script>