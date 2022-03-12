<template>
  <InfiniteQuestions
    :url="`/users/${$route.params.id}/questions/answered`"
  >
    <template v-slot:nothing> There are no answered questions. </template>
  </InfiniteQuestions>
</template>