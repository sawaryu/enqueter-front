<template>
  <v-dialog
    :value="$accessor.dialog.getFollowingDialog"
    @input="$accessor.dialog.setFollowingDialog(false)"
    transition="fade-transition"
    width="500"
  >
    <v-card class="rounded-lg">
      <v-card-title class="font-weight-light">
        Following
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setFollowingDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-list class="overflow-y-auto" height="320">
        <VueLoading
          v-if="loading"
          type="bars"
          color="#333"
          :size="{ width: '30px', height: '30px' }"
        />

        <v-card-text
          v-else-if="!users.length && !loading"
          class="text-center mt-10 pt-10"
        >
          <div class="font-weight-bold text-h6">
            You aren't following anyone yet
          </div>
          <div class="text-caption">
            When you do, they'll be listed here and you'll see their Questions
            in timeline.
          </div>
        </v-card-text>

        <template v-else>
          <v-list-item v-for="user in users" :key="user.id">
            <v-list-item-avatar
              class="pointer"
              size="37"
              @click="goProfile(user.id)"
            >
              <v-img :src="$avatar(user.avatar)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span
                  class="underline pointer"
                  @click="goProfile(user.id)"
                  v-text="user.username"
                ></span>
              </v-list-item-title>
              <v-list-item-subtitle
                v-text="user.nickname"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <FollowButton :user="user" @follow="follow(user.id)" />
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { VueLoading } from "vue-loading-template";

import { User } from "@/common/entity/User";
import Vue from "vue";
export default Vue.extend({
  components: { VueLoading },
  data() {
    return {
      loading: true,
      users: [] as User[],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init(): Promise<void> {
      try {
        const res = await this.$axios.$get(
          `/users/${this.$route.params.id}/followings`
        );
        this.users = res;
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
    follow(user_id: number): void {
      this.users.every((user: User, index: number) => {
        if (user.id === user_id) {
          this.users[index].is_following = !this.users[index].is_following;
          // stop
          return false;
        } else {
          // continue
          return true;
        }
      });
    },
    goProfile(user_id: number): void {
      this.$accessor.dialog.setFollowingDialog(false);
      this.$router.push(`/users/${user_id}`);
    },
  },
});
</script>

<style>
</style>