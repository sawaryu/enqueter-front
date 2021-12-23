<template>
  <div>
    <v-row class="justify-center">
      <!-- NO -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        width="300"
        height="300"
        link
        @click="$router.push(`/questions/${$route.params.id}/answered`)"
      >
        <v-icon color="red" size="100">mdi-circle-outline</v-icon>
      </v-card>

      <!-- YES -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        width="300"
        height="300"
        link
        @click="$router.push(`/questions/${$route.params.id}/answered`)"
      >
        <v-icon color="blue" size="100">mdi-close</v-icon>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>