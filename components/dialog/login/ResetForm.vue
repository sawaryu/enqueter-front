<template>
  <v-form class="text-center" style="width: 300px">
    <div class="text-center">
      <v-icon class="mx-auto" size="48" color="grey darken-4">
        mdi-lock
      </v-icon>
      <span class="font-weight-bold text-h6 text--primary">Reset</span>
    </div>

    <v-text-field
      tabindex="1"
      v-model="emailModel.email"
      :rules="emailRules"
      label="E-mail"
      required
      color="grey darken-3"
      hint="Send email to your registered E-mail."
      persistent-hint
    ></v-text-field>

    <v-btn class="mt-5" tabindex="1" color="grey darken-3" dark @click="submit">
      send
    </v-btn>

    <v-divider class="my-5"></v-divider>

    <v-btn
      @click="$emit('close')"
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
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      emailModel: {
        email: "",
      } as object,
      emailRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required.",
        (v: string) =>
          (!!v && /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v)) ||
          "Incorrect email format.",
        (v: string) => v.length <= 255 || "Must be less than 255 characters.",
      ],
    };
  },
  methods: {
    async submit() {
      try {
        const res = await this.$axios.$post(
          `/auth/password/reset`,
          this.emailModel
        );
        this.$accessor.dialog.setLoginDialog(false);
      } catch (error) {}
    },
  },
});
</script>

<style>
</style>