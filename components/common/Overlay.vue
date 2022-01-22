<template>
  <v-overlay :value="$accessor.overlay.getOverlay" z-index="999">
    <v-progress-circular color="black" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>