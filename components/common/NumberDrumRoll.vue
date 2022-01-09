<template>
  <span>{{ startCount }}</span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    // target number from parent.
    count: {
      type: Number,
      required: true
    },
  },
  data: function () {
    return {
      // start and result number.
      startCount: 0 as number,
      // ?
      intervalId: 0 as number,
    };
  },
  created(){
    this.performDrumRolling()
  },
  methods: {
    performDrumRolling(): void {
      // Time length of finishing drumroll.
      const countInterval = Math.abs(Math.floor((this.count - this.startCount) / 100)) || 1;

      // setInterval メソッドを使用して、0.01秒間隔で数値の変更処理を実行する
      this.intervalId = window.setInterval((): void => {
        this.countUp(countInterval);
      }, 10);
    },
    terminateDrumRolling(): void {
      this.startCount = this.count;
      clearInterval(this.intervalId);
    },
    countUp(countInterval: number): void {
      if (this.count <= this.startCount) {
        this.terminateDrumRolling();
        return;
      }
      this.startCount = this.startCount + countInterval;
    }
  },
});
</script>
