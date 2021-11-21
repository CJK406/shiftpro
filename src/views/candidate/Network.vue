<template>
  <div>
   <h1 class="page-title Biotif-bold">Messages</h1>
  <div class="grid lg:grid-cols-3 gap-12">
    <div class="lg:col-span-2">
        <PanelController :navigationList="navigationList" key1="message"/>
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
  </div>
</template>

<script>
import NetworkStackedList from '@common/NetworkStackedList'
import PanelController from '@common/PanelController'
import CardWithIcon from '@common/CardWithIcon'

import {mapGetters,mapActions} from "vuex";


const MODULE_NAME = 'candidate'

export default {
  components: {
    PanelController,
    NetworkStackedList,
    CardWithIcon
  },
   data: () => ({
      navigationList : [
        { name: 'Inbox', routeAlias: 'CandidateMessages'},
        // { name: 'Sent', routeAlias: 'CandidateContacts' },
        { name: 'Sent', routeAlias: 'CandidateSent' },

      ]
  }),
  computed: {
    ...mapGetters({
      getFormerCompanies: `${MODULE_NAME}/getFormerCompanies`,
      get_message_filter:'candidate/getMessageFilter',

    }),
  },
  methods: {
    ...mapActions({
      fetchFormerCompanies: 'candidate/fetchFormerCompanies',
      fetchNetworkMessages: 'candidate/fetchNetworkMessages',
      fetchNetworkSentMessages: 'candidate/fetchNetworkSentMessages',
    }),
  },
  mounted() {
     this.fetchFormerCompanies();
     this.fetchNetworkMessages(this.get_message_filter);
     this.fetchNetworkSentMessages(this.get_message_filter);

  }
  
}
</script>