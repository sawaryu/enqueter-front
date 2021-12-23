<template>
  <span>{{ rollingCount }}</span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    count: {
      type: Number,
      default: () => null,
    },
  },
  data: function () {
    return {
      rollingCount: this.count as number,
      intervalId: 0 as number,
    };
  },
  watch: {
    // 親から送られてくる数値の変更を監視して、変更があればドラムロールを実行
    count(newVal: number, oldVal: number) {
      this.performDrumRolling(newVal, oldVal);
    },
  },
  methods: {
    // 0.5秒間で数値のドラムロールを実行するメソッド
    performDrumRolling(newVal: number, oldVal: number): void {
      // ドラムローリング中に再度値の変更があった場合を考えて、予め変更前の値でドラムローリングを終えたことにしておく
      this.terminateDrumRolling(oldVal);

      // 今回は0.5秒以内にドラムロールが完了するようにしているため、　その間にどれくらいずつ値を変化させていくかの数値。
      const countInterval = Math.abs(Math.floor((newVal - oldVal) / 50)) || 1;

      // setInterval メソッドを使用して、0.01秒間隔で数値の変更処理を実行する
      if (oldVal < newVal) {
        this.intervalId = window.setInterval((): void => {
          this.countUp(newVal, countInterval);
        }, 10);
      } else {
        this.intervalId = window.setInterval((): void => {
          this.countDown(newVal, countInterval);
        }, 10);
      }
    },
    // ドラムロール処理を最終値で完了して、タイマーを止める
    terminateDrumRolling(endVal: number): void {
      this.rollingCount = endVal;
      clearInterval(this.intervalId);
    },
    countUp(newVal: number, countInterval: number): void {
      if (newVal <= this.rollingCount) {
        this.terminateDrumRolling(newVal);
        return;
      }
      this.rollingCount = this.rollingCount + countInterval;
    },
    countDown(newVal: number, countInterval: number): void {
      if (newVal >= this.rollingCount) {
        this.terminateDrumRolling(newVal);
        return;
      }
      this.rollingCount = this.rollingCount - countInterval;
    },
  },
});
</script>
