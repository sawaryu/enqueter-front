<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="mx-auto">
          <v-list>
            <v-subheader><v-icon>mdi-cog</v-icon>Setting</v-subheader>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
                nuxt
                exact
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-card elevation="8">
          <v-toolbar color="grey lighten-4" elevation="2">
            <v-toolbar-title
              ><v-icon class="mr-2" large>{{ current.icon }}</v-icon
              >{{ current.title }}</v-toolbar-title
            >
          </v-toolbar>

          <v-sheet class="d-flex justify-center align-center" height="75vh">
            <v-card-text class="text-center" style="max-width: 400px">
              <NuxtChild keep-alive />
            </v-card-text>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Basic", icon: "mdi-account", to: "/setting" },
      { title: "Avatar", icon: "mdi-emoticon", to: "/setting/avatar" },
      { title: "Email", icon: "mdi-email", to: "/setting/email" },
      {
        title: "Password",
        icon: "mdi-key-variant",
        to: "/setting/password",
      },
      {
        title: "Delete",
        icon: "mdi-account-off",
        to: "/setting/delete",
      },
    ],
  }),
  computed: {
    current() {
      const index = this.items.findIndex((e) => e.to === this.$route.path);
      return this.items[index];
    },
  },
};
</script>