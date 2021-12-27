<template>
  <!-- NOTICE!: only be able to use in methods -->
  <span class="mr-1" style="width: 180px" v-click-outside="onClickOutside">
    <!-- search field -->
    <v-text-field
      v-model="search"
      dark
      placeholder="search"
      outlined
      rounded
      dense
      clearable
      style="height: 40px"
      prepend-inner-icon="mdi-magnify"
      @focus="menu = true"
    ></v-text-field>

    <!-- manu card -->
    <v-card
      color="white"
      light
      class="search-card"
      v-if="menu"
      width="300"
      height="300"
      elevation="10"
    >
      <!-- history -->
      <template v-if="!search">
        <v-card-title class="pb-1">
          <div class="text-subtitle-1 font-weight-black">Recent</div>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="text-center text-caption">
          No recent search history.
        </v-card-text>
      </template>

      <!-- searching -->
      <template v-else>
        <v-card-text class="text-center text-caption mt-3">
          No search results.
        </v-card-text>
      </template>
    </v-card>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      search: "" as string,
      menu: false as boolean,
    };
  },
  methods: {
    onClickOutside() {
      this.menu = false;
    },
  },
});
</script>

<style scoped>
.search-card {
  position: absolute;
  top: 55px;
  right: 58px;
}
</style>