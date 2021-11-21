<template>
  <div>
    <h1 class="page-title Biotif-bold">Wages</h1>
   <PanelController :navigationList="navigationList" key1='finance'/>
   <router-view> </router-view>

   <!-- <div class="mt-8"> -->
   <!-- <PaymentHistory /> -->

   <!-- </div> -->
  </div>
</template>

<script>
import PanelController from '@common/PanelController'
// import PaymentHistory from '@/views/employer/Finance/PaymentHistory'
const navigationList = [
  { name: 'Pending payments', routeAlias: 'EmployerPaymentPending'},
  { name: 'Payment history', routeAlias: 'EmployerPaymentHistory'},

  // { name: 'Bank details', routeAlias: 'EmployerBankDetails' },
  // { name: 'Shift Pro Perks', routeAlias: 'ShiftProPerks' },
]

export default {
  components: {
    PanelController
  // PaymentHistory
},
  setup() {
    return {
      navigationList
    }
  }
}
</script>