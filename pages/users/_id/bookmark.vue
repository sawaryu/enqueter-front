<template>
  <InfiniteQuestions :url="`/users/${$route.params.id}/questions/bookmark`">
    <template v-slot:nothing> There are no no bookmarks </template>
  </InfiniteQuestions>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>