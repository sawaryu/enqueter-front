<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      color="grey darken-3"
      v-model="profileModel.public_id"
      label="user id"
      maxlength="15"
      counter="15"
      hint="Please type using half-width characters."
      persistent-hint
    ></v-text-field>

    <v-text-field
      color="grey darken-3"
      v-model="profileModel.name"
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

    <v-btn @click="update">change</v-btn>
  </v-form>
</template>

<script lang="ts">
// TODO: validation
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      profileModel: {
        public_id: "",
        name: "",
        introduce: "",
      },
    };
  },
  created() {
    this.profileModel.public_id = this.$auth.user.public_id;
    this.profileModel.name = this.$auth.user.name;
    this.profileModel.introduce = this.$auth.user.introduce;
  },
  methods: {
    async update() {
      try {
        const res = await this.$axios.$put("/auth", this.profileModel);
        this.$auth.fetchUser();
        this.$accessor.flash.showMessage(
          {
            message: `updated completly your profile.`,
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