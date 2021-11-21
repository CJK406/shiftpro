<script>
import { h } from 'vue'
import { CheckIcon, ArrowsExpandIcon,  ClipboardCheckIcon, ExclamationCircleIcon, DotsHorizontalIcon } from '@heroicons/vue/outline'

export default {
  props: {
    iconName: String,
    isActive: Boolean
  },
  setup(props) {
    return () => {
      if (props.isActive) {
        return h(ExclamationCircleIcon, {
          class: 'text-yellow-300'
        })
      } else {
        switch(props.iconName) {
          case 'CheckIcon':
            return h(CheckIcon)
          case 'ClipboardCheckIcon':
            return h(ClipboardCheckIcon)
          case 'DotsHorizontalIcon':
            return h(DotsHorizontalIcon)
          case 'ArrowsExpandIcon':
              return h(ArrowsExpandIcon)
          default: 
            return h(ExclamationCircleIcon)
        }
      }
    }
  },
}
</script>