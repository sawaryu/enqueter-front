<template>
  <v-container>
    <Submit @click="test">
      test
    </Submit>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    
  }),
  methods: {
    test(){
      console.log("click from child")
    }
  }
});
</script>

<style>
</style>