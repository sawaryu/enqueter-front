<template>
  <v-form ref="form">
    <v-text-field
      v-model="profileModel.username"
      :rules="rules.usernameRules"
      label="Username"
      maxlength="15"
      counter="15"
      persistent-hint
    ></v-text-field>

    <v-text-field
      v-model="profileModel.nickname"
      :rules="rules.nicknameRules"
      label="Nickname"
      maxlength="20"
      counter="20"
    ></v-text-field>

    <v-textarea
      label="Introduce"
      v-model="profileModel.introduce"
      :rules="rules.introduceRules"
      placeholder="Hi, my name is john."
      maxlength="140"
      counter="140"
      dense
      class="my-4"
      light
    ></v-textarea>

    <v-btn class="mr-5" outlined @click="reset" :disabled="isDisable"
      >reset</v-btn
    >
    <submit class="ml-5" @click="submit" :disabled="isDisable">update</submit>
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
      profileModel: {
        username: "",
        nickname: "",
        introduce: "",
      },
      rules: {},
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
    this.reset();
  },
  methods: {
    // submit
    submit(): void {
      this.rules = {
        usernameRules: usernameRules,
        nicknameRules: nicknameRules,
        introduceRules: introduceRules,
      };
      this.$nextTick(() => {
        if ((this.$refs.form as any).validate()) {
          this.update();
        }
      });
    },
    async update(): Promise<void> {
      try {
        const res = await this.$axios.$put("/auth", this.profileModel);
        await this.$auth.fetchUser();
        this.reset();
        this.$accessor.flash.showMessage(
          {
            message: `Updated completely your profile.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {}
    },
    // reset
    async reset(): Promise<void> {
      await Object.assign(this.$data, (this.$options as any).data());
      this.profileModel.username = this.$auth.user.username;
      this.profileModel.nickname = this.$auth.user.nickname;
      this.profileModel.introduce = this.$auth.user.introduce;
    },
  },
});
</script>