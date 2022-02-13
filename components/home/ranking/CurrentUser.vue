<template>
  <span v-if="stats">
    <v-avatar
      class="pointer mr-1"
      size="40"
      @click="$router.push(`/users/${$auth.user.id}`)"
    >
      <v-img :src="$avatar($auth.user.avatar)"></v-img
    ></v-avatar>

    <div class="text-caption" v-text="ordinal(current_user_stats[0])"></div>

    <span class="mx-1 text-caption">/</span>

    <div class="text-caption" v-text="current_user_stats[1] + 'pt'"></div>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    stats: {
      type: Object,
      default: null
    }
  }
});
</script>

<style>
</style>