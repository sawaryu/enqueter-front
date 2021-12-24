<template>
  <span>{{ startCount }}</span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    count: {
      type: Number,
      required: true
    },
  },
  data: function () {
    return {
      startCount: 0 as number,
      intervalId: 0 as number,
    };
  },
  created(){
    this.performDrumRolling()
  },
  methods: {
    performDrumRolling(): void {
      // 今回は0.5秒以内にドラムロールが完了するようにしているため、　その間にどれくらいずつ値を変化させていくかの数値。
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
