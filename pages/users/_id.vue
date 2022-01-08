<template>
  <v-row justify="center">
    <!-- profile -->
    <v-col cols="12" sm="4">
      <!-- profile -->
      <div style="position: sticky; top: 76px">
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
              <div
                class="pa-0 text-caption text--secondary"
                v-text="user.name"
              ></div>
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
                <!-- TODO -->
                <!-- <v-list-item>
                  <v-list-item-title
                    ><v-icon>mdi-delete</v-icon> delete</v-list-item-title
                  >
                </v-list-item> -->
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>

        <!-- information -->
        <v-card class="mt-5">
          <v-card-title
            >Stats
            <v-spacer></v-spacer>
            <v-btn
              v-for="period in periods"
              color="grey darken-2"
              dark
              :key="period.id"
              v-text="period.text"
              :text="period.id != $accessor.ranking.getCurrentPeriod"
              @click="$accessor.ranking.setCurrentPeriod(period.id)"
              x-small
            ></v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            Not implemented.
          </v-card-text>
        </v-card>
      </div>
    </v-col>

    <!-- user`s questions and so on. -->
    <v-col cols="12" sm="8">
      <!-- navigation -->
      <v-bottom-navigation background-color="grey lighten-4" shift grow>
        <v-btn v-for="(n, index) in navigations" exact :to="n.to" :key="index">
          <span v-text="n.title"></span>
          <v-icon v-text="n.icon"></v-icon>
        </v-btn>
      </v-bottom-navigation>

      <NuxtChild />
    </v-col>
    <Following v-if="$accessor.dialog.getFollowingDialog" />
    <Follower v-if="$accessor.dialog.getFollowerDialog" />
  </v-row>
</template>

<script lang="ts">
import ordinal from "ordinal";
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/users/${params.id}`);
    return { user: res };
  },
  data() {
    return {
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "all", text: "all" },
      ] as Array<object>,
    };
  },
  computed: {
    navigations(): Object[] {
      // general.
      let navigations: Object[] = [
        {
          title: "My questions",
          icon: "mdi-file-question",
          to: `/users/${this.$route.params.id}`,
        },
        {
          title: "Answered",
          icon: "mdi-checkbox-marked-circle",
          to: `/users/${this.$route.params.id}/answered`,
        },
      ];

      // if current_user profile.
      if (this.$auth.user.id == this.$route.params.id) {
        navigations.push({
          title: "Bookmark",
          icon: "mdi-bookmark",
          to: `/users/${this.$route.params.id}/bookmark`,
        });
      }

      return navigations;
    },
  },
  methods: {
    ordinal(number: number) {
      return ordinal(number);
    },
  },
});
</script>

<style>
</style>