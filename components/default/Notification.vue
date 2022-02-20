<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        overlap
        color="warning"
        :value="notWatchCount"
        :content="notWatchCount"
        offset-x="23"
        offset-y="22"
      >
        <v-btn icon v-bind="attrs" v-on="on" @click="watchAllNotifications">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card>
      <v-card-title class="font-weight-light text-subtitle-1 pb-1">
        Notifications
        <v-spacer></v-spacer>
        <v-btn
          rounded
          color="red"
          text
          small
          v-if="notifications.length"
          @click="deleteNotifications()"
        >
          delete all
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <!-- If there are any notifications. -->
      <v-list class="overflow-y-auto" height="230" width="300">
        <v-list-item
          v-for="notification in notifications"
          :key="notification.id"
        >
          <!-- AVATAR(COMMON) -->
          <v-list-item-avatar
            class="pointer"
            :size="35"
            @click="goProfile(notification.user.id)"
          >
            <v-img :src="$avatar(notification.user.avatar)"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <!-- FOLLOW -->
            <div v-if="notification.category == 'follow'" class="text-caption">
              followed by
              <span
                @click="goProfile(notification.user.id)"
                class="underline pointer font-weight-bold"
                v-text="notification.user.username"
              ></span>
            </div>

            <!-- ANSWER -->
            <div v-if="notification.category == 'answer'" class="text-caption">
              <span
                @click="goProfile(notification.user.id)"
                class="underline pointer font-weight-bold"
                v-text="notification.user.username"
              ></span>
              answered your
              <span
                @click="goQuestion(notification.question_id)"
                class="underline pointer font-weight-bold"
                >question.</span
              >
            </div>

            <!-- CREATED_AT(COMMON) -->
            <v-list-item-subtitle
              class="text-caption"
              v-text="beforeTime(notification.created_at)"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="mt-16" v-if="!notifications.length">
          <v-list-item-content>
            <v-list-item-subtitle class="text-center">
              <v-icon class="mb-2">mdi-bell-outline</v-icon>
              There are no notifications.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import moment from "moment";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      menu: null as null | boolean,
      notifications: [],
      notWatchCount: 0,
    };
  },
  created() {
    this.getAllNotifications();
  },
  methods: {
    async getAllNotifications(): Promise<void> {
      // loop out after logout
      if (!this.$auth.loggedIn) {
        return;
      }

      try {
        const res = await this.$axios.$get("/notifications");
        this.notifications = res;
        let count = 0;
        res.forEach((notice: any) => {
          if (!notice.watched) {
            count++;
          }
          this.notWatchCount = count;
        });
      } catch (e) {}
      // get all notifications every 15 minutes.
      setTimeout(() => {
        this.getAllNotifications();
      }, 1000 * 60 * 15);
    },
    // delete all notifications.
    async deleteNotifications(): Promise<void> {
      try {
        const res = await this.$axios.$delete("/notifications");
        this.notWatchCount = 0;
        this.notifications = [];
      } catch (e) {}
    },
    // update all notification status to "watched"
    async watchAllNotifications(): Promise<void> {
      if (this.notWatchCount == 0) {
        return;
      }

      try {
        const res = await this.$axios.$put("/notifications");
        this.notWatchCount = 0;
      } catch (e) {}
    },
    // display optimized created time
    beforeTime(created_at: string): String {
      moment.locale("en");
      return moment(created_at).fromNow();
    },
    // go profile and close the notifications menu.
    goProfile(user_id: number): void {
      this.menu = null;
      this.$router.push(`/users/${user_id}`);
    },
    // go question and close the notifications menu.
    goQuestion(question_id: number): void {
      this.menu = null;
      this.$router.push(`/questions/${question_id}`);
    },
  },
});
</script>

<style>
</style>