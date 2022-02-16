<template>
  <v-row justify="center">
    <!-- Basic -->
    <v-col cols="12" md="4">
      <div style="position: sticky; top: 76px">
        <Profile :user="user" />
        <Stats class="mt-5" />
      </div>
    </v-col>

    <v-col cols="12" md="8">
      <v-bottom-navigation shift grow>
        <v-btn v-for="(n, index) in navigations" exact :to="n.to" :key="index">
          <span v-text="n.title"></span>
          <v-icon v-text="n.icon"></v-icon>
        </v-btn>
      </v-bottom-navigation>
      <NuxtChild keep-alive />
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
    try {
      const res = await $axios.$get(`/users/${params.id}`);
      return { user: res };
    } catch (error) {}
  },
  computed: {
    navigations(): Object[] {
      let navigations: Object[] = [
        {
          title: "Questions",
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
          title: "Bookmarks",
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