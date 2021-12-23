<template>
  <v-row justify="center">
    <!-- profile -->
    <v-col cols="12" sm="4">
      <!-- main -->
      <v-card class="pa-2" style="position: sticky; top: 76px">
        <div class="d-flex justify-center">
          <div>
            <v-avatar size="60">
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
          </div>
          <div class="pt-2">
            <v-btn plain text :ripple="false" disabled>
              <v-sheet>
                <div class="text-subtitle-1 font-weight-black">31</div>
                <small>question</small>
              </v-sheet>
            </v-btn>
          </div>
          <div class="pt-2">
            <v-btn
              plain
              :ripple="false"
              @click="$accessor.dialog.setFollowingDialog(true)"
            >
              <v-sheet>
                <div class="text-subtitle-1 font-weight-black">11</div>
                <small>following</small>
              </v-sheet>
            </v-btn>
          </div>
          <div class="pt-2">
            <v-btn
              plain
              :ripple="false"
              @click="$accessor.dialog.setFollowerDialog(true)"
            >
              <v-sheet>
                <div class="text-subtitle-1 font-weight-black">11</div>
                <small>follower</small>
              </v-sheet>
            </v-btn>
          </div>
        </div>
        <div class="d-flex justify-center">
          <v-card width="340" elevation="0">
            <div class="pa-0 text-subtitle-2">sample123</div>
            <div class="pa-0 text-caption">sample</div>
            <div class="pt-1 pb-0 mb-3">
              Lorem ipsum, dolor sissumenda sed quia nostrum ab sunt, quaerat
              quidem dolorum nihil earum.
            </div>
            <v-btn
              :outlined="relationshipBtn.outlined"
              @click="isFollowing = !isFollowing"
              >{{relationshipBtn.text}}</v-btn
            >
          </v-card>
        </div>
      </v-card>
    </v-col>

    <!-- user`s questions and so on. -->
    <v-col cols="12" sm="8">
      <!-- navigation -->
      <v-bottom-navigation background-color="grey lighten-4" shift grow>
        <v-btn exact to="/users/1">
          <span>My questions</span>
          <v-icon>mdi-file-question</v-icon>
        </v-btn>
        <v-btn exact to="/users/1/answerd">
          <span>Answerd</span>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-btn>
        <v-btn exact to="/users/1/bookmark">
          <span>Bookmark</span>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <NuxtChild keep-alive />
    </v-col>
    <Following />
    <Follower />
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      isFollowing: false,
    };
  },
  computed: {
    relationshipBtn() {
      if (this.isFollowing) {
        return {
          outlined: true as boolean,
          text: "following" as string,
        };
      } else {
        return {
          outlined: false as boolean,
          text: "follow" as string,
        };
      }
    },
  },
});
</script>

<style>
</style>