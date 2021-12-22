<template>
  <v-row>
    <v-col v-for="n in 24" :key="n" cols="4">
      <!-- a question. -->
      <v-card>
        <v-card-title class="font-weight-bold">
          <v-icon color="black" size="40">mdi-file-question</v-icon>
          Question.
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-title class="pt-0"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates,
          voluptate ducimus rerum rerum?</v-card-title>
        <v-card-actions>
          <v-avatar size="40">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img
          ></v-avatar>
          <div class="pl-1">
            <div class="text-caption">
              <span class="font-weight-medium"> sample123 </span>
              <span>• few seconds ago</span>
            </div>
          </div>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>