<template>
  <div>
    <v-list class="pa-0">
      <v-list-item
        class="pointer"
        @click="$router.push(`/users/${$auth.user.id}`)"
      >
        <v-list-item-avatar size="60">
          <v-img :src="$avatar($auth.user.avatar)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-bold"
            v-text="$auth.user.username"
          >
          </v-list-item-title>
          <v-list-item-subtitle
            v-text="$auth.user.nickname"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item nuxt @click="next">
          <v-list-item-icon>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Answer</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/questions">
          <v-list-item-icon>
            <v-icon>mdi-file-question</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Questions</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt :to="`/users/${$auth.user.id}`">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Page</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/setting">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Setting</v-list-item-title>
        </v-list-item>
        <v-divider class="my-4"></v-divider>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    async next(): Promise<void> {
      try {
        const res = await this.$axios.$get("/questions/next");
        if (res.data) {
          this.$router.push(`/questions/${res.data}`);
        } else {
          this.$router.push("/questions");
          this.$accessor.flash.showMessage(
            {
              message: `Sorry, there are no more answerable questions.`,
              type: "dark",
              status: true,
            },
            { root: true }
          );
        }
      } catch (error) {}
    },
    logout(): void {
      this.$auth.logout();
      this.$accessor.flash.showMessage(
        {
          message: `Logged out completely.`,
          type: "info",
          status: true,
        },
        { root: true }
      );
      this.$emit("logout");
      setTimeout(() => {
        (this as any).$resetStore();
      }, 300);
    },
  },
});
</script>