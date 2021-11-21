<template>

  <div class="relative max-w-7xl w-full mx-auto sm:px-6  px-4 lg:px-8 pt-12 pb-8 bg-white shadow-sm rounded-lg">
    <div style="box-shadow: 0px 4px 6px -2px #0000000D;box-shadow: 0px 10px 15px -3px #0000001A;" 
    class="absolute flex items-center justify-center w-14 h-14 top-0  transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-around-sm"
      :class="getIconPosition">
      <IconGenerator :iconName="iconName" class="h-8 w-8 text-tertiary" />
    </div>
    <slot> </slot>
  </div>
</template>

<script>
import { computed } from 'vue'
import IconGenerator from '@common/IconGenerator.vue'

export default {
  props: {
    //  left | center | right
    iconPosition: String,
    iconName: String
  },
  components: {
    IconGenerator
  },
  setup(props) {

    const getIconPosition = computed(() => {
      switch(props.iconPosition) {
        case 'left':
          return 'left-14'
        case 'right':
          return 'right-0'
        case 'center':
          return ' left-1/2'
        default:
          return 'left-0'
        }
    })

    return {
      getIconPosition
    }
  }
}
</script>
