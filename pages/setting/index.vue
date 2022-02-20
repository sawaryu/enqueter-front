<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="profileModel.username"
      :rules="usernameRules"
      label="Username"
      maxlength="15"
      counter="15"
      persistent-hint
    ></v-text-field>

    <v-text-field
      v-model="profileModel.nickname"
      :rules="nicknameRules"
      label="Nickname"
      maxlength="20"
      counter="20"
    ></v-text-field>

    <v-textarea
      label="Introduce"
      v-model="profileModel.introduce"
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
        username: "",
        nickname: "",
        introduce: "",
      },
      usernameRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) => v.length <= 15 || "Must be less than 15 characters",
        (v: string) =>
          /^[A-Za-z0-9]*$/.test(v) ||
          "Must be using half-width alphanumeric characters.",
      ],
      nicknameRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) => v.length <= 20 || "Must be less than 20 characters",
      ],
    };
  },
  computed: {
    isDisable() {
      const profileModel = {
        username: this.$auth.user.username,
        nickname: this.$auth.user.nickname,
        introduce: this.$auth.user.introduce,
      };

      // 'Json.stringify()' make another instances of Object to be able to compare.
      return JSON.stringify(profileModel) === JSON.stringify(this.profileModel);
    },
  },
  created() {
    this.profileModel.username = this.$auth.user.username;
    this.profileModel.nickname = this.$auth.user.nickname;
    this.profileModel.introduce = this.$auth.user.introduce;
  },
  methods: {
    async update(): Promise<void> {
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
      } catch (e) {}
    },
  },
});
</script>

<style>
</style>