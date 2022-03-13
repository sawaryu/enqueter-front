<template>
  <div class="mb-15">
    <!-- loading -->
    <template v-if="loading">
      <v-overlay></v-overlay>
      <v-progress-circular size="110" indeterminate></v-progress-circular>
    </template>

    <template v-else>
      <!-- current avatar -->
      <v-avatar v-if="!avatar" size="110">
        <v-img :src="$avatar($auth.user.avatar)"></v-img>
      </v-avatar>

      <!-- selected avatar -->
      <v-avatar v-else size="110" class="mb-3">
        <v-img :src="avatar"></v-img>
      </v-avatar>
    </template>

    <v-file-input
      ref="inputFile"
      counter
      small-chips
      show-size
      :rules="rules"
      accept="image/png, image/jpeg, image/jpg"
      prepend-icon="mdi-camera"
      color="grey darken-3"
      v-on:change="fileSelected"
    ></v-file-input>

    <div class="mt-5">
      <v-btn small class="mr-5" outlined @click="resetRandom">reset at random</v-btn>
      <submit class="ml-5" :disabled="isDisabled" @click="update"
        >update</submit
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      rules: [
        (value: any) =>
          !value || value.size < 2000000 || "File size must be less than 2MB.",
      ],
      loading: false as boolean,
      avatar: "" as any,
    };
  },
  methods: {
    async update(): Promise<void> {
      if (!(this.$refs as any).inputFile.validate() || this.avatar == "") {
        return;
      }

      this.loading = true;
      const formData = new FormData();
      formData.append("image", this.avatar);
      try {
        const res = await this.$axios.$post("/upload", formData, {});
        this.avatar = "";
        (this.$refs as any).inputFile.reset();
        this.$auth.fetchUser();
        this.$accessor.flash.showMessage(
          {
            message: `Updated completely your avatar.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
    async resetRandom(): Promise<void> {
      try {
        this.loading = true;
        await this.$axios.$put("/upload");
        this.avatar = "";
        (this.$refs as any).inputFile.reset();
        this.$auth.fetchUser();
        this.$accessor.flash.showMessage(
          {
            message: `Reset completely your avatar.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
    fileSelected(event: any): void {
      if (event !== undefined && event !== null) {
        if (event.name.lastIndexOf(".") <= 0) {
          return;
        }
        const file = new FileReader();
        file.readAsDataURL(event);
        file.addEventListener("load", () => {
          this.avatar = file.result;
        });
      } else {
        this.avatar = "";
      }
    },
  },
  computed: {
    isDisabled(): boolean {
      return this.avatar == "";
    },
  },
});
</script>