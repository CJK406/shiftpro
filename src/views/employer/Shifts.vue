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
  { name: 'Open Shifts', routeAlias: 'EmployerYourShifts' },
  { name: 'Direct Offers', routeAlias: 'EmployerDirectOffers' },
  { name: 'Agreed Shifts', routeAlias: 'EmployerShiftApplicants' },
  { name: 'Completed Shifts', routeAlias: 'EmployerShiftsHistory' }

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