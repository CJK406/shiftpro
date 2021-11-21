<template>
  <div>
    <h1 class="page-title Biotif-bold">Wages</h1>
   <PanelController :navigationList="navigationList" key1='finance'/>
   <router-view> </router-view>
  </div>
</template>

<script>
import PanelController from '@common/PanelController'

const navigationList = [
  { name: 'Pending payments', routeAlias: 'CandidatePaymentPending'},
  { name: 'Payment history', routeAlias: 'CandidatePaymentHistory'},
  // { name: 'Employment details', routeAlias: 'CandidateBankDetails' },
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