<template>
   <Icon name="spinner" />
</template>

<script>
import { icon as Icon } from '../../icons'

export default {
  components: {
    Icon
  }
}
</script>
<style lang="scss">
.spinner {
  color: #31AE54;
  display: inline-block;
  width: 44px;
  height: 44px;
  animation: rotate 1.3s linear infinite;
  &.btn {
    color: #fff;
    width: 20px;
    height: 20px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
