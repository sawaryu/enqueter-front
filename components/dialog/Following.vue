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
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-avatar size="37">
            <v-img :src="$avatar(user.avatar)"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.public_id"></v-list-item-title>
            <v-list-item-subtitle v-text="user.name"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <FollowButton :user="user" @follow="follow(user.id)" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const res = await this.$axios.$get(
          `/users/${this.$route.params.id}/followings`
        );
        this.users = res;
      } catch (error) {
        console.log(error);
      }
    },
    follow(user_id: number){
      this.users.every((user: {id: number}, index: number) => {
        if (user.id === user_id) {
          this.users[index].is_following = !this.users[index].is_following
          // stop
          return false
        } else {
          // continue
          return true
        }
      });
    }
  },
});
</script>

<style>
</style>