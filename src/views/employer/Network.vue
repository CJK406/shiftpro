<template>
   <h1 class="page-title Biotif-bold">Messages</h1>
  <div class="grid lg:grid-cols-3 gap-12">
    <div class="lg:col-span-2">
        <PanelController :key1="key" :navigationList="navigationList" :key="key" />
        <router-view> </router-view>
    </div>
    <!-- This section is static -->
    <div class="lg:col-span-1 pt-12 lg:pt-24">
      <CardWithIcon iconName="StarIcon" iconPosition="center">
        <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Favourites</h2>
        <NetworkStackedList />
      </CardWithIcon>
    </div>
  </div>
</template>

<script>
import NetworkStackedList from '@common/NetworkStackedList'
import PanelController from '@common/PanelController'
import CardWithIcon from '@common/CardWithIcon'
const navigationList = [
  { name: 'Inbox', routeAlias: 'EmployerNetworkInbox'},
  { name: 'Sent', routeAlias: 'EmployerNetworkSent' },
]
const key = "message";
export default {
  components: {
    PanelController,
    NetworkStackedList,
    CardWithIcon
  },

  setup() {
    return {
      navigationList,
      key
    }
  }
}
</script>