<template>
  <v-footer v-if="$route.path.includes('/welcome')" color="grey lighten-1" light>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Enqueter</strong>
      <span>
        <v-icon size="25"> mdi-twitter </v-icon>
      </span>
      <span>
        <v-icon size="25"> mdi-instagram </v-icon>
      </span>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style>
</style>