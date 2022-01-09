<template>
  <v-card height="18vh">
    <v-card-title><v-icon>mdi-information</v-icon>Information</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="d-flex justify-space-around align-center">
      <div class="text-subtitle-1 black--text">
        <v-icon>mdi-file-question</v-icon>
        <div><NumberDrumRoll :count="321" /></div>
      </div>
      <div class="text-subtitle-1 black--text">
        <v-icon>mdi-message-reply-outline</v-icon>
        <div><NumberDrumRoll :count="821" /></div>
      </div>
      <div class="text-subtitle-1 black--text">
        <v-icon>mdi-account</v-icon>
        <div><NumberDrumRoll :count="121" /></div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>