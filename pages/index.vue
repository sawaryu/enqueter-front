<template>
  <v-row>
    <v-col cols="12" sm="5">
      <v-card height="200" class="d-flex justify-space-around align-center">
        <div class="font-weight-bold text-center text-h4">
          <div><NumberDrumRoll :count="78" /></div>
          <div>users</div>
        </div>
        <div class="font-weight-bold text-center text-h4">
          <div><NumberDrumRoll :count="78" /></div>
          <div>questions</div>
        </div>
        <div class="font-weight-bold text-center text-h4">
          <div><NumberDrumRoll :count="78" /></div>
          <div>answeres</div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" sm="7">
      <v-card> </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    this.$accessor.submodule.initialise();
  },
});
</script>

<style>
</style>