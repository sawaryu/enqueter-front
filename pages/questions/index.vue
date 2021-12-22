<template>
  <v-row>
    <v-col v-for="n in 24" :key="n" cols="12" sm="6" md="4">
      <!-- a question. -->
      <Question />
    </v-col>

    <!-- flota btn for creating th question. -->
    <v-btn
      fixed
      right
      bottom
      class="mb-8 mr-2"
      fab
      dark
      large
      color="grey darken-3"
    >
      <v-icon dark>mdi-file-question</v-icon>
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>