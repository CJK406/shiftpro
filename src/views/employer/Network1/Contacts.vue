<template>
  <div>
      <NetworkList :isRounded="true" :networkList="getNetworkContacts" />
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import NetworkList from '@common/NetworkList'

const MODULE_NAME = 'employer'
export default {
  components: {
    NetworkList
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      if (store.getters[`${MODULE_NAME}/getNetworkContacts`].length > 0) return
      else  store.dispatch(`${MODULE_NAME}/fetchtNetworkContacts`)
    })

    return {
      getNetworkContacts: computed(() => store.getters[`${MODULE_NAME}/getNetworkContacts`])
    }
  }
}
</script>
