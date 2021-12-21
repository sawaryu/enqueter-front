<template>
  <div>
    <Yes />
    <No />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Yes from "~/components/shared/Yes.vue";
import No from "~/components/shared/No.vue";
export default Vue.extend({
  components: { Yes, No },
});
</script>
