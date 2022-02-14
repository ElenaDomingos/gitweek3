<template>
  <button :class="['c-button btn', `theme-green`, {'hover-text': withHoverText}]"
  :data-hover-text="hoverText">
  <span class="btn-text"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'button',
  props: {
    hoverText: {
      type: String
    }
  },
  computed: {
    withHoverText () {
      return this.hoverText && this.hoverText.length
    }
  }
}
</script>
<style lang="scss" scoped>

.theme-green {
  background: #31ae54;
}

.c-button {
  border-radius: 5px;
  color:#fff;
  border:none;
  font-size:16px;
  font-weight: 700;
  margin:0 auto;
}

.btn {
  width: 270px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  border:1px solid;
  border-radius: 5px;
  &.green {
    background-color: #31AE54;
    &:hover {
      background-color: #208C32;
    }
  }
  &.grey {
    background-color: #9e9e9e;
    &:hover {
      background-color: #7c7c7c
    }
  }
  &.small {
    width: 115px;
  }
}
</style>
