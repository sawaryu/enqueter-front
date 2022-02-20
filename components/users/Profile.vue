<template>
  <v-card class="d-flex justify-center overflow-y-auto" height="200">
    <v-card class="py-3" width="400" flat>
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

      <v-card elevation="0">
        <v-card-actions>
          <div>
            <div class="text-subtitle-2" v-text="user.username"></div>
            <div
              class="text-caption text--secondary"
              v-text="user.nickname"
            ></div>
          </div>
          <v-spacer></v-spacer>
          <span v-if="user.id !== $auth.user.id">
            <FollowButton
              :user="user"
              @follow="user.is_following = !user.is_following"
            />
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  @click="
                    $accessor.dialog.setReportDialog({
                      value: true,
                      id: user.id,
                    })
                  "
                >
                  <v-list-item-title
                    ><v-icon>mdi-flag</v-icon> report</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </span>
        </v-card-actions>
        <v-card-text class="pt-1">
          <v-divider></v-divider>
          <div class="mt-2" v-html="introduceLinked" style="white-space: pre-wrap"></div>
        </v-card-text>
      </v-card>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { autoLink } from "vue-highlights";
import { User } from "@/common/entity/User";
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true,
    } as PropOptions<User>,
  },
  computed: {
    introduceLinked() {
      return autoLink(this.user.introduce);
    },
  },
});
</script>

<style>
</style>