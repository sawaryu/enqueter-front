<template>
  <v-dialog
    :value="term"
    @input="$emit('close')"
    width="400"
    transition="fade-transition"
  >
    <v-card class="rounded-lg">
      <v-card-title class="font-weight-light">
        Terms of this service.
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="mb-5"></v-divider>

      <v-card-text class="overflow-y-auto" style="max-height: 250px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sit commodi doloribus in dolore ipsam ut? Placeat
        veniam suscipit minus beatae labore, accusantium doloremque, porro
        perferendis deleniti nobis asperiores quasi quidem! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Aut reprehenderit earum
        laboriosam quasi doloribus, unde a, voluptatem non illo eos eligendi
        tempore nemo exercitationem corporis amet quisquam, quia excepturi
        reiciendis.
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    term: {
      type: Boolean,
      required: true,
    } as PropOptions<boolean>,
  },
});
</script>