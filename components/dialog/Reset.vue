<template>
  <v-dialog
    :value="resetInfo"
    persistent
    width="500"
    transition="fade-transition"
  >
    <v-card class="rounded-lg">
      <v-card-title class="py-8 justify-center">
        <v-icon size="48" color="grey darken-4"> mdi-lock </v-icon>
        Reset password
      </v-card-title>

      <v-card-text class="d-flex justify-center pb-15">
        <v-form
          class="text-center"
          ref="form"
          v-model="valid"
          lazy-validation
          style="width: 300px"
        >
          <v-text-field
            type="password"
            v-model="passwordModel.password"
            :rules="passwordRules"
            maxlength="72"
            counter="72"
            label="New password"
            persistent-hint
            tabindex="1"
          >
          </v-text-field>
          <v-text-field
            type="password"
            v-model="passwordModel.password_confirmation"
            :rules="passwordConfirmationRules"
            maxlength="72"
            counter="72"
            label="New password (confirmation)"
            tabindex="1"
          >
          </v-text-field>

          <submit class="mt-3" @click="submit"></submit>

          <v-divider class="my-5"></v-divider>

          <v-btn
            tabindex="1"
            @click="$emit('close')"
            small
            outlined
            color="grey darken-3"
            dark
            rounded
          >
            cancel
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
interface resetInfo {
  token: string;
  email: string;
}
export default Vue.extend({
  props: {
    resetInfo: {
      default: null,
      type: Object,
    } as PropOptions<resetInfo>,
  },
  data() {
    return {
      valid: true as boolean,
      passwordModel: {
        password: "",
        password_confirmation: "",
      } as object,
      passwordRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) =>
          /^[A-Za-z0-9]*$/.test(v) ||
          "Must be using half-width alphanumeric characters.",
        (v: string) => v.length >= 8 || "Must be more than 8 characters",
        (v: string) => v.length <= 72 || "Must be less than 72 characters",
      ],
    };
  },
  methods: {
    async submit(): Promise<void> {
      if (!(this.$refs.form as any).validate()) {
        return;
      }
      try {
        const res = await this.$axios.$put(
          "/auth/password_reset",
          Object.assign(this.resetInfo, this.passwordModel)
        );
        this.$emit("close");
        this.$accessor.alert.setAlert({
          type: "success",
          message: "Your password has been successfully reset. please login.",
        });
      } catch (error) {
        this.$emit("close");
        if (error.response.data.message === "expired") {
          this.$accessor.alert.setAlert({
            type: "warning",
            message: "The link is expired. please start over.",
          });
        }
      }
    },
  },
  computed: {
    passwordConfirmationRules() {
      return [
        (v: string) =>
          this.passwordModel.password == v || `Not match with the password.`,
      ];
    },
  },
});
</script>