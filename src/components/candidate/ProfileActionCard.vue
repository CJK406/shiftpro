<template>
  <div @click="openModal"  class="w-full bg-white shadow-around-sm p-6 hover:shadow-xl cursor-pointer">
      <p class="text-sm max-w-3/4 xl:h-6">{{helperText}}</p>
      <div class="flex items-center justify-between">
        <p class="text-xl sm:text-2xl text-gray-900 Biotif-bold">{{mainText}}</p>
        <IconGenerator :iconName="iconAttrs.iconName" :iconClasses="iconAttrs.iconClasses"/>
      </div>
  </div>
</template>

<script>
import IconGenerator from '@common/IconGenerator'
import { useStore } from 'vuex'


export default {
  components: {
    IconGenerator
  },
  props: {
    helperText: String,
    mainText: String,
    iconAttrs: {
      iconName: String,
      iconClasses: String
    },
    modal: {
      modalBody: String,
      iconName: String,
      title: String
    }
  },
  setup(props) {
    const store = useStore()

    const openModal = () => {
      store.commit('candidate/SET_MODAL_PROPS', {
        isOpen: true,
        iconName: props.iconAttrs.iconName,
        componentName: props.modal.modalBody,
        title: props.modal.title
      })
    }

    return {
      openModal
    }
  }
}
</script>