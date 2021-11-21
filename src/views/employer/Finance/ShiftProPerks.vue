<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
    <PerksCard v-for="perks in getPerks" :key="perks.id" :info="perks"/>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import PerksCard from '@candidate/PerksCard'


export default {
  components: {
    PerksCard
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      if (store.getters['candidate/getPerks'].length > 0) return
      else store.dispatch('candidate/fetchShiftProPerks')
    })
  
    return {
      getPerks: computed(() => store.getters['candidate/getPerks'])
    }
  }
}
</script>
