<template>
  <div>
    <h1 class=" page-title Biotif-bold">Shifts</h1>
    <PanelController :navigationList="navigationList" :key1="key" />
    <router-view> </router-view>
  </div>
</template>

<script>
import PanelController from '@common/PanelController'


const navigationList = [
  { name: 'Applied Shifts', routeAlias: 'CandidateOpenShifts' },
  { name: 'Direct Offers', routeAlias: 'CandidateShiftsDirectOffers' },
  { name: 'Agreed Shifts', routeAlias: 'CandidateAgreedShifts' },
  // { name: 'Your availability', routeAlias: 'CandidateShiftsAvailability' },
  { name: 'Shifts History', routeAlias: 'CandidateShiftsHistory' }
]
const key = "shift"
export default {
  components: {
    PanelController
  },
  setup() {
    return {
      navigationList,
      key
    }
  }
}
</script>