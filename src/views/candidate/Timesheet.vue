<template>
  <div>
    <h1 class="page-title Biotif-bold">Timesheets</h1>
   <PanelController :navigationList="navigationList" key1='finance'/>
   <router-view> </router-view>
  </div>
</template>

<script>
import PanelController from '@common/PanelController'

const navigationList = [
  { name: 'Pending timesheets', routeAlias: 'CandidatePendingTimesheet'},
  { name: 'Completed timesheets', routeAlias: 'CandidateCompleteTimesheet' },
  // { name: 'Shift Pro Perks', routeAlias: 'ShiftProPerks' },
]

export default {
  components: {
    PanelController
  },
  setup() {
    return {
      navigationList
    }
  }
}
</script>