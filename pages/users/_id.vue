<template>
  <v-row justify="center">
    <!-- profile -->
    <v-col cols="12" sm="4">
      <!-- main TODO: profile design -->
      <v-card class="pa-4" style="position: sticky; top: 76px">
        <div class="d-flex justify-center">
          <div class="ml-4">
            <v-avatar size="60">
              <v-img :src="$avatar(user.avatar)"></v-img>
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
            <div class="pa-0 text-subtitle-2" v-text="user.public_id"></div>
            <div
              class="pa-0 text-caption text--secondary"
              v-text="user.name"
            ></div>
            <div class="pa-0 text-caption text--secondary">
              point: {{user.point}}pt / correct ratio: 32% / total answered: 131
            </div>
            <div class="pt-1 pb-0 mb-3" v-text="user.introduce"></div>
          </v-card>
        </div>

        <v-card-actions>
          <FollowButton />
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
              <v-list-item>
                <v-list-item-title
                  ><v-icon>mdi-delete</v-icon> delete</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
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

      <NuxtChild keep-alive />
    </v-col>
    <Following />
    <Follower />
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/users/${params.id}`);
    return { user: res };
  },
  computed: {
    navigations(): Object[] {
      return [
        {
          title: "My questions",
          icon: "mdi-file-question",
          to: `/users/${this.$route.params.id}`,
        },
        {
          title: "Answered",
          icon: "mdi-checkbox-marked-circle-outline",
          to: `/users/${this.$route.params.id}/answered`,
        },
        {
          title: "Bookmark",
          icon: "mdi-bookmark",
          to: `/users/${this.$route.params.id}/bookmark`,
        },
      ];
    },
  },
});
</script>

<style>
</style>