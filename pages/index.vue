<template>
  <v-card>
    <v-card-title> <v-icon>mdi-home</v-icon> Home </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    this.$accessor.submodule.initialise();
  },
});
</script>

<style>
</style>