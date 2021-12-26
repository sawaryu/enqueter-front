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
      <v-divider></v-divider>

      <!-- content -->
      <v-list class="overflow-y-auto" style="max-height: 320px">
        <v-list-item v-for="n in 30" :key="n">
          <v-list-item-avatar size="37">
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>test123</v-list-item-title>
            <v-list-item-subtitle>test</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <FollowButton />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>