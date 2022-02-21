<template>
  <v-form>
    <v-alert type="info">
      Please check your E-mail and enter the <strong>code</strong> to the field.
      <div>
        <small>* A code is expired within 30 minutes after mailed.</small>
      </div>
    </v-alert>

    <div>
      <div class="ma-auto position-relative" style="max-width: 300px">
        <v-otp-input
          type="number"
          tabindex="1"
          length="6"
          v-model="code"
          label="Code"
          :disabled="$accessor.overlay.getOverlay"
          @finish="finish"
        ></v-otp-input>
      </div>
    </div>
    <v-btn dark color="grey darken-2" class="mr-4" @click="reset">cancel</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    code: "",
  }),
  methods: {
    finish(event: string) {
      console.log(event);
      this.$accessor.overlay.setOverlay(true);
      setTimeout(() => {
        this.$accessor.overlay.setOverlay(false);
        console.log("submitted");
        // Object.assign(this.$data, this.$options.data());
      }, 500);
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
    },
  },
});
</script>

<style>
</style>