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
      :rules="introduceRules"
      placeholder="Hi, my name is john."
      maxlength="140"
      counter="140"
      dense
      class="my-4"
      light
    ></v-textarea>

    <submit @click="update" :disabled="isDisable">update</submit>
  </v-form>
</template>

<script lang="ts">
import {
  usernameRules,
  nicknameRules,
  introduceRules,
} from "@/common/validators/validator";
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
      usernameRules: usernameRules,
      nicknameRules: nicknameRules,
      introduceRules: introduceRules,
    };
  },
  computed: {
    isDisable(): boolean {
      const profileModel = {
        username: this.$auth.user.username,
        nickname: this.$auth.user.nickname,
        introduce: this.$auth.user.introduce,
      };
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
      if (!(this.$refs.form as any).validate()) {
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