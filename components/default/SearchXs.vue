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
            placeholder="Search"
            outlined
            rounded
            dense
            clearable
            style="height: 40px"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-card-title>
        <v-divider></v-divider>

        <!-- history -->
        <v-list height="300" class="overflow-y-auto">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-light"
                v-text="search ? 'Result' : 'History'"
              ></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="usersHistory.length && !search">
              <v-btn
                rounded
                x-small
                text
                class="text-caption blue--text"
                :ripple="false"
                @click="deleteAll"
                >delete all</v-btn
              >
            </v-list-item-action>
          </v-list-item>

          <v-list-item class="mt-10" v-if="loading">
            <Loading />
          </v-list-item>

          <v-list-item
            v-else-if="currentUsers.length"
            v-for="user in currentUsers"
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

            <v-list-item-action v-if="!search">
              <v-btn icon @click.stop="deleteOne(user.id)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item v-else>
            <v-list-item-content class="text-center">
              <v-list-item-subtitle class="mt-10">
                <v-icon>mdi-magnify</v-icon>
                <span
                  v-text="
                    search
                      ? 'No search result.'
                      : 'No recent search histories. '
                  "
                ></span>
              </v-list-item-subtitle>
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
  computed: {
    currentUsers(): [] {
      return this.search ? this.users : this.usersHistory;
    },
  },
  methods: {
    openDialog(): void {
      this.getHistory();
      this.dialog = true;
    },
    // Get histories
    async getHistory(): Promise<void> {
      if (this.search) {
        return;
      }
      try {
        this.loading = true;
        const res = await this.$axios.$get("/users/search/history");
        this.usersHistory = res;
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 250);
      }
    },
    // Create History
    async goProfile(user_id: number): Promise<void> {
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
    async deleteAll(): Promise<void> {
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