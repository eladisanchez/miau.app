<template>
  <div class="minesweeper-cell" :class="getClass()">
    <div v-if="cell.isOpen && cell.bombCount">
      <span>{{ cell.bombCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "minesweeper-cell",
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getClass() {
      const { cell } = this;
      if (cell.isOpen && cell.hasBomb) {
        return "minesweeper-bomb";
      }
      if (cell.isOpen) {
        return "minesweeper-open n" + cell.bombCount;
      }
      if (cell.hasFlag) {
        return "minesweeper-flag";
      }
      return "";
    },
  },
};
</script>
<style lang="scss">
.minesweeper {
  &-cell {
    padding-top: 100%;
    box-shadow: 0 0 5px rgba(22, 39, 49, 0.2) inset;
    border-radius: 3px;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: relative;
    span {
      font-weight: bold;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
    }
  }
  &-bomb {
    background-color: #ff1427;
    background-image: url("../../scss/img/bomb-white.svg");
    background-size: 60% auto;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: none;
    -webkit-animation-name: tada;
    animation-name: tada;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  &-open {
    background: #eee;
    box-shadow: none;
    &.n1 {
      color: blue;
    }
    &.n2 {
      color: green;
    }
    &.n3 {
      color: rgb(214, 0, 0);
    }
    &.n4 {
      color: rgb(155, 1, 116);
    }
  }
  &-flag {
    background-image: url("../../scss/img/flag.svg");
    background-size: 65% auto;
    background-position: center;
    background-repeat: no-repeat;
  }
}
@keyframes tada {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -6deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 6deg);
  }
  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -6deg);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>