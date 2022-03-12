<template>
  <InfiniteQuestions :url="`/users/${$route.params.id}/questions/bookmark`">
    <template v-slot:nothing> There are no bookmarks </template>
  </InfiniteQuestions>
</template>