<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-icon>mdi-information</v-icon>Information
        </v-card-title>

        <v-card-text>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  // the api only for the question owner.
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/questions/${params.id}/owner`);
    console.log(res);
    return { question: res };
  },
});
</script>

<style>
</style>