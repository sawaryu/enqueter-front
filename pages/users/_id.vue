<template>
  <v-row justify="center">
    <!-- profile -->
    <v-col cols="12" sm="4">
      <!-- main -->
      <v-card class="pa-2" style="position: sticky; top: 76px">
        <div class="d-flex justify-center">
          <div>
            <v-avatar size="60">
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
          </div>
          <div class="pt-2">
            <v-btn plain :ripple="false">
              <v-sheet>
                <div class="text-subtitle-1 font-weight-black">11</div>
                <small>sample</small>
              </v-sheet>
            </v-btn>
          </div>
          <div class="pt-2">
            <v-btn plain :ripple="false">
              <v-sheet>
                <div class="text-subtitle-1 font-weight-black">11</div>
                <small>sample</small>
              </v-sheet>
            </v-btn>
          </div>
          <div class="pt-2">
            <v-btn plain :ripple="false">
              <v-sheet>
                <div class="text-subtitle-1 font-weight-black">11</div>
                <small>sample</small>
              </v-sheet>
            </v-btn>
          </div>
        </div>
        <div class="d-flex justify-center">
          <v-card width="340" elevation="0">
            <div class="pa-0 text-subtitle-2">sample123</div>
            <div class="pa-0 text-caption">sample</div>
            <div class="pt-1 pb-0 mb-3">
              Lorem ipsum, dolor sissumenda sed quia nostrum ab sunt, quaerat
              quidem dolorum nihil earum.
            </div>
          </v-card>
        </div>
      </v-card>
    </v-col>

    <!-- user`s questions and so on. -->
    <v-col cols="12" sm="8">
      <!-- navigation -->
      <v-bottom-navigation background-color="grey lighten-4" shift grow>
        <v-btn>
          <span>My questions</span>
          <v-icon>mdi-file-question</v-icon>
        </v-btn>
        <v-btn>
          <span>Answerd</span>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <v-select
        color="black"
        dense
        value="new"
        class="mt-2 ml-2"
        item-color="black"
        :items="items"
        outlined
        style="width: 150px; height: 50px"
      ></v-select>
      <!-- questions -->
      <v-row class="pa-3">
        <v-col class="pt-0" v-for="n in 24" :key="n" cols="12" sm="6">
          <!-- a question. -->
          <Question />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return { items: ["new", "popular", "old"] };
  },
});
</script>

<style>
</style>