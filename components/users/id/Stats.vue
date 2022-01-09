<template>
  <v-card class="mt-5">
    <v-card-title
      >Stats
      <v-spacer></v-spacer>
      <v-btn
        v-for="period in periods"
        color="grey darken-2"
        dark
        :key="period.id"
        v-text="period.text"
        :text="period.id != currentId"
        @click="currentId = period.id"
        x-small
      ></v-btn>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      23pt
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      currentId: "week",
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "all", text: "all" },
      ] as Array<object>,
    };
  },
  watch: {
    currentId(){
      // call API
      console.log(this.currentId)
    }
  }
});
</script>

<style>
</style>