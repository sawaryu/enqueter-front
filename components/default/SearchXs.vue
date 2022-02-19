<template>
  <span>
    <v-btn icon @click="openDialog">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-dialog v-if="dialog" v-model="dialog" transition="fade-transition">
      <v-card class="rounded-lg">
        <!-- common -->
        <v-card-title>
          <v-text-field
            v-model="search"
            placeholder="Search users"
            outlined
            rounded
            dense
            color="black"
            clearable
            style="height: 40px"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-card-title>
        <v-divider></v-divider>

        <!-- history -->
        <v-list v-if="!search" height="300" class="overflow-y-auto">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light"
                >History</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
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
            </v-list-item-action>
          </v-list-item>
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

          <v-list-item v-if="!usersHistory.length">
            <v-list-item-content class="text-center">
              <v-list-item-subtitle
                >No recent search histories.</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- Searching -->
        <v-list v-else height="300" class="overflow-y-auto">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light">
                Result
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="loading">
            <Loading />
          </v-list-item>

          <v-list-item
            v-else-if="users.length"
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

          <v-list-item v-else>
            <v-list-item-content class="text-center">
              <v-list-item-subtitle>No search results.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </span>
</template>

<script lang="ts">
import { User } from "@/common/entity/User";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      loading: false,
      dialog: false as boolean,
      search: "" as string,
      users: [] as User[],
      usersHistory: [] as User[],
    };
  },
  methods: {
    openDialog() {
      this.getHistory();
      this.dialog = true;
    },
    // Get histories
    async getHistory() {
      try {
        const res = await this.$axios.$get("/users/search/history");
        this.usersHistory = res;
      } catch (error) {}
    },
    // Create History
    async goProfile(user_id: number) {
      try {
        const res = await this.$axios.$post("/users/search/history", {
          user_id: user_id,
        });
        this.dialog = false;
        this.search = "";
        this.$router.push(`/users/${user_id}`);
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
  },
  watch: {
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

<style>
</style>