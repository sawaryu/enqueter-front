<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        overlap
        color="warning"
        :value="11"
        :content="11"
        offset-x="23"
        offset-y="22"
      >
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-title>No notifications.</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      menu: null as null | boolean,
    };
  },
});
</script>

<style>
</style>