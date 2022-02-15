<template>
  <v-dialog
    :value="$accessor.dialog.getReportDialog"
    @input="$accessor.dialog.setReportDialog(false)"
    transition="fade-transition"
    max-width="500"
  >
    <v-card class="rounded-lg">
      <v-subheader>
        <v-btn icon v-show="e1 > 1" @click="e1 -= 1">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setReportDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-subheader>

      <v-stepper v-model="e1">
        <v-stepper-items>
          <!-- item1 -->
          <v-stepper-content class="pa-5" step="1">
            <v-subheader class="font-weight-light"
              >The reason of the report</v-subheader
            >
            <v-divider></v-divider>
            <v-card height="200" flat>
              <v-list dense>
                <v-list-item
                  v-for="item in items"
                  :key="item.id"
                  @click="nextStep(item)"
                  :class="{
                    'v-item--active v-list-item--active': selected === item,
                  }"
                >
                  <v-list-item-content v-text="item.title">
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-stepper-content>

          <!-- item2 -->
          <v-stepper-content class="pa-5" step="2">
            <v-subheader class="font-weight-light"
              >The specific reason</v-subheader
            >
            <v-card class="overflow-y-auto" height="200" flat>
              <v-textarea
                v-model="content"
                auto-grow
                filled
                color="black"
                rows="4"
                hint="If possible, please write the specific reasons."
                persistent-hint
                counter="200"
                maxlength="200"
              ></v-textarea>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 3">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <!-- item3 -->
          <v-stepper-content class="pa-5" step="3">
            <v-subheader class="font-weight-light"
              >On the below, you go to report.</v-subheader
            >
            <v-divider></v-divider>
            <v-card class="overflow-y-auto" height="200" v-if="selected" flat>
              <v-card-text>
                <div class="black--text text-subtitle-2">
                  The reason of the report
                </div>
                <span class="text-caption">{{ selected.title }}</span>

                <div class="black--text text-subtitle-2 mt-5">
                  The specific reason
                </div>
                <span class="text-caption">{{ contentResult }}</span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit">submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      items: [
        {
          id: "improper",
          title: "1. Improper for this application.",
        },
        { id: "slander", title: "2. Slandering anyone." },
        { id: "impersonation", title: "3. Impersonating anyone." },
        { id: "other", title: "4. Other" },
      ],
      content: "",
      e1: 1,
    };
  },
  methods: {
    nextStep(item) {
      this.selected = item;
      this.e1 += 1;
    },
    submit() {
      this.$accessor.dialog.setReportDialog(false);
      this.$accessor.flash.showMessage(
        {
          message: `Thank you for your cooperation.`,
          type: "info",
          status: true,
        },
        { root: true }
      );
    },
  },
  computed: {
    contentResult() {
      if (this.content.trim() == "") return "blank";
      return this.content;
    },
    // for watch store.
    dialog() {
      return this.$accessor.dialog.getReportDialog;
    },
  },
  watch: {
    dialog() {
      // reset
      // solution for stepper bug of display.
      setTimeout(() => {
        this.selected = null;
        this.content = "";
        this.e1 = 1;
      }, 300);
    },
  },
};
</script>

<style>
</style>