<template>
  <div>
    <!-- question -->
    <v-row>
      <v-card class="mt-4">
        <v-card-title class="pb-1 font-weight-bold">
          <v-icon color="black" size="40">mdi-file-question</v-icon>
          Question.
          <v-spacer></v-spacer>
          <v-avatar size="30">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img
          ></v-avatar>
          <div class="pl-1">
            <div class="text-caption">
              <span class="font-weight-medium"> sample123 </span>
              <span>• 数秒前</span>
            </div>
          </div>
        </v-card-title>
        <v-card-title class="pt-0"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates,
          voluptate ducimus rerum at exercitationem cumque similique aliquid,
          eligendi expedita possimus odio? Itaque, accusamus ipsam corrupti
          voluptatum nihil atque quisquam rerum.?</v-card-title
        >
      </v-card>
    </v-row>
    <!-- choice -->
    <v-row class="justify-center">
      <Yes />
      <No />
    </v-row>

    <!-- ratio -->
    <v-row>
      <Ratio />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
