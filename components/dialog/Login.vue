<template>
  <v-dialog
    :value="$accessor.dialog.getLoginDialog"
    @input="$accessor.dialog.setLoginDialog(false)"
    width="500"
    transition="fade-transition"
  >
    <v-card class="rounded-lg">
      <v-card-title class="pb-0">
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setLoginDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="d-flex justify-center pb-15">
        <keep-alive>
          <LoginForm v-if="!forgotten" @open="forgotten = true" />
          <EmailForm v-else @close="forgotten = false" />
        </keep-alive>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    forgotten: false,
  }),
});
</script>