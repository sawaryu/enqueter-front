<template>
  <v-btn
    fixed
    right
    bottom
    class="mb-8 mr-2"
    fab
    dark
    large
    color="grey darken-3"
    @click="$accessor.dialog.setQuestionDialog(true)"
  >
    <v-icon dark>mdi-pencil</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>