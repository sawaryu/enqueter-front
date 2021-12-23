<template>
  <v-dialog
    :value="$accessor.dialog.getFollowerDialog"
    @input="$accessor.dialog.setFollowerDialog(false)"
    width="500"
  >
    <v-card>
      <v-card-title>
        Follower
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setFollowerDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- content -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>