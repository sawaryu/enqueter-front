<template>
  <v-dialog
    :value="$accessor.dialog.getFollowingDialog"
    @input="$accessor.dialog.setFollowingDialog(false)"
    width="500"
  >
    <v-card>
      <v-card-title>
        Following
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setFollowingDialog(false)">
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