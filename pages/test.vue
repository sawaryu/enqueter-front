<template>
  <v-card>
    <v-card-title>Form test</v-card-title>

    <v-form ref="form">
      <v-text-field :rules="rules.firstName" @keyup.enter="onSubmit" />
      <v-btn @click="onSubmit">Submit</v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      rules: {},
    };
  },
  methods: {
    onSubmit() {
      //replace empty rules with real rules
      this.rules = {
        firstName: [(v) => !!v || "Required"],
      };
      //let the DOM update
      this.$nextTick(() => {
        //manually trigger Vuetify validation
        if (this.$refs.form.validate()) {
          //it’s valid, do work
        }
        //if not valid, errors will be automatically displayed
      });
    },
  },
});
</script>

<style>
</style>