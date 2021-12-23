<template>
  <v-card>
    <v-card-title>
      {{this.$accessor.submodule.getText}}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created(){
    this.$accessor.submodule.initialise()
  }
})
</script>

<style>

</style>