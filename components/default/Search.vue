<template>
  <span class="mr-1" style="width: 180px" v-click-outside="closeMenu">
    <!-- search field -->
    <v-text-field
      v-model="search"
      dark
      placeholder="search"
      outlined
      rounded
      dense
      clearable
      style="height: 40px"
      prepend-inner-icon="mdi-magnify"
      @focus="openMenu"
    ></v-text-field>

    <!-- menu card -->
    <v-card light class="search-card" v-if="menu" width="300" elevation="10">
      <!-- history -->
      <template v-if="!search">
        <v-card-title class="pb-1">
          <div class="text-subtitle-1 font-weight-light">History</div>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            small
            v-if="usersHistory.length"
            text
            class="text-caption blue--text"
            :ripple="false"
            @click="deleteAll"
            >delete all</v-btn
          >
        </v-card-title>
        <v-divider></v-divider>

        <v-list v-if="usersHistory.length" height="250" class="overflow-y-auto">
          <v-list-item
            v-for="user in usersHistory"
            :key="user.id"
            @click.stop="goProfile(user.id)"
            :ripple="false"
          >
            <v-list-item-avatar class="pointer" size="30">
              <v-img :src="$avatar(user.avatar)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                class="text-subtitle-2"
                v-text="user.username"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-text="user.nickname"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click.stop="deleteOne(user.id)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-card-text v-else class="text-center text-caption mb-2">
          No recent search histories.
        </v-card-text>
      </template>

      <!-- searching -->
      <template v-else>
        <v-card-title class="pb-1">
          <div class="text-subtitle-1 font-weight-light">Result</div>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text v-if="loading">
          <Loading />
        </v-card-text>

        <v-list v-else-if="users.length" height="300" class="overflow-y-auto">
          <v-list-item
            v-for="user in users"
            :key="user.id"
            @click.stop="goProfile(user.id)"
            :ripple="false"
          >
            <v-list-item-avatar class="pointer" size="30">
              <v-img :src="$avatar(user.avatar)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                class="text-subtitle-2"
                v-text="user.username"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-text="user.nickname"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-text v-else class="text-center text-caption mt-3 mb-2">
          No search results.
        </v-card-text>
      </template>
    </v-card>
  </span>
</template>

<script lang="ts">
import { User } from "@/common/entity/User";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      menu: false as Boolean,
      loading: false,
      search: "" as String,
      usersHistory: [] as User[],
      users: [] as User[],
    };
  },
  methods: {
    openMenu() {
      this.menu = true;
      this.getHistory();
    },
    closeMenu() {
      this.menu = false;
    },
    // Get histories
    async getHistory() {
      try {
        const res = await this.$axios.$get("/users/search/history");
        this.usersHistory = res;
      } catch (error) {}
    },
    // Delete all histories
    async deleteAll() {
      try {
        const res = await this.$axios.$delete("users/search/history");
        this.usersHistory = [];
      } catch (error) {}
    },
    // Delete one history
    async deleteOne(user_id: number) {
      try {
        const res = await this.$axios.$delete(
          `/users/${user_id}/search/history`
        );
        this.usersHistory.forEach((user: User, index: number) => {
          if (user.id == user_id) {
            this.usersHistory.splice(index, 1);
          }
        });
      } catch (error) {}
    },
    // Go to profile and save new history.
    async goProfile(user_id: number) {
      try {
        const res = await this.$axios.$post("/users/search/history", {
          user_id: user_id,
        });
        this.menu = false;
        this.search = "";
        this.$router.push(`/users/${user_id}`);
      } catch (error) {}
    },
  },
  watch: {
    // Get search results
    async search(): Promise<void> {
      if (this.search && !this.loading) {
        this.loading = true;
        try {
          const res = await this.$axios.$post("/users/search", {
            search: this.search,
          });
          this.users = res;
        } catch (error) {
        } finally {
          setTimeout(() => {
            this.loading = false;
          }, 250);
        }
      }
    },
  },
});
</script>

<style scoped>
.search-card {
  position: absolute;
  top: 55px;
  right: 58px;
}
</style>