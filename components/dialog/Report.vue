<template>
  <v-dialog
    :value="$accessor.dialog.getReportDialog"
    @input="$accessor.dialog.setReportDialog(false)"
    max-width="500"
  >
    <v-card>
      <v-subheader>
        <v-btn icon v-if="e1 > 1" @click="e1 -= 1">
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
          <v-stepper-content step="1">
            <v-subheader class="black--text text-subtitle-1 font-weight-bold">The reason of the report</v-subheader>
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
          <v-stepper-content step="2">
            <v-subheader class="black--text text-subtitle-1 font-weight-bold">The specific reason</v-subheader>
            <v-card class="overflow-y-auto" height="200" flat>
              <v-textarea
                v-model="content"
                color="black"
                filled
                rows="3"
                hint="If possible, write the specific reasons."
                persistent-hint
                counter="200"
                maxlength="200"
              ></v-textarea>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-2" dark @click="e1 = 3"
                  >Confirm</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <!-- item3 -->
          <v-stepper-content step="3">
            <v-subheader class="black--text text-subtitle-1 font-weight-bold"
              >On the below, you go to report.</v-subheader
            >
            <v-card class="overflow-y-auto" height="200" v-if="selected" flat>
              <v-card-text>
                <div class="black--text">The reason of the report</div>
                <span>{{ selected.title }}</span>

                <div class="black--text mt-5">The specific reason</div>
                <span>{{ contentResult }}</span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-2" dark @click="submit">submit</v-btn>
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
    submit(){
      this.$accessor.dialog.setReportDialog(false)
    }
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
      this.selected = null
      this.content = "";
      this.e1 = 1;
    },
  },
};
</script>

<style>
</style>