<template>
  <v-card class="pa-2">
    <div class="d-flex justify-space-around">
      <v-avatar size="60">
        <v-img :src="$avatar(user.avatar)"></v-img>
      </v-avatar>
      <v-btn class="mt-3" small plain text :ripple="false" disabled>
        <v-sheet>
          <div
            class="text-subtitle-1 font-weight-black"
            v-text="user.questions_count"
          ></div>
          <small>question</small>
        </v-sheet>
      </v-btn>
      <v-btn
        class="mt-3"
        small
        plain
        :ripple="false"
        @click="$accessor.dialog.setFollowingDialog(true)"
      >
        <div>
          <div
            class="text-subtitle-1 font-weight-black"
            v-text="user.following_count"
          >
            11
          </div>
          <small>following</small>
        </div>
      </v-btn>
      <v-btn
        class="mt-3"
        small
        plain
        :ripple="false"
        @click="$accessor.dialog.setFollowerDialog(true)"
      >
        <div>
          <div
            class="text-subtitle-1 font-weight-black"
            v-text="user.follower_count"
          ></div>
          <small>follower</small>
        </div>
      </v-btn>
    </div>

    <div class="d-flex ml-2">
      <v-card width="340" elevation="0">
        <div class="pa-0 text-subtitle-2" v-text="user.public_id"></div>
        <div class="pa-0 text-caption text--secondary" v-text="user.name"></div>
        <div class="pt-1 pb-0 mb-3" v-text="user.introduce"></div>
      </v-card>
    </div>

    <v-card-actions v-if="user.id !== $auth.user.id">
      <FollowButton
        :user="user"
        @follow="user.is_following = !user.is_following"
      />
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title
              ><v-icon>mdi-flag</v-icon> report</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
interface User {
  id: number;
  public_id: string;
  name: string;
  introduce: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  is_following: boolean;
  role: string;
}
export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true,
    } as PropOptions<User>
  },
});
</script>

<style>
</style>