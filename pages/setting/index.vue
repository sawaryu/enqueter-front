<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      color="grey darken-3"
      v-model="profileModel.public_id"
      :rules="publicIdRules"
      label="user id"
      maxlength="15"
      counter="15"
      hint="Please type using half-width alphanumeric characters."
      persistent-hint
    ></v-text-field>

    <v-text-field
      color="grey darken-3"
      v-model="profileModel.name"
      :rules="nameRules"
      label="nickname"
      maxlength="20"
      counter="20"
    ></v-text-field>

    <v-textarea
      label="introduce"
      v-model="profileModel.introduce"
      color="grey darken-3"
      placeholder="Hi, my name is john."
      maxlength="140"
      counter="140"
      dense
      class="my-4"
      light
    ></v-textarea>

    <v-btn @click="update" :disabled="isDisable">update</v-btn>
  </v-form>
</template>

<script lang="ts">
// TODO: validation
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      valid: true,
      profileModel: {
        public_id: "",
        name: "",
        introduce: "",
      },
      publicIdRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) => v.length <= 15 || "Must be less than 15 characters",
        (v: string) =>
          /^[A-Za-z0-9]*$/.test(v) ||
          "Must be using half-width alphanumeric characters.",
      ],
      nameRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) => v.length <= 20 || "Must be less than 20 characters",
      ],
    };
  },
  computed: {
    isDisable() {
      const profileModel = {
        public_id: this.$auth.user.public_id,
        name: this.$auth.user.name,
        introduce: this.$auth.user.introduce,
      };

      // 'Json.stringify()' make another instances of Object to be able to compare.
      return JSON.stringify(profileModel) === JSON.stringify(this.profileModel);
    },
  },
  created() {
    this.profileModel.public_id = this.$auth.user.public_id;
    this.profileModel.name = this.$auth.user.name;
    this.profileModel.introduce = this.$auth.user.introduce;
  },
  methods: {
    async update() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        const res = await this.$axios.$put("/auth", this.profileModel);
        this.$auth.fetchUser();
        this.$accessor.flash.showMessage(
          {
            message: `updated completely your profile.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style>
</style>