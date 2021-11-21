<template>
  <div>
    <Loader :loader_flag="loader_flag" />
    <h1 class="page-title Biotif-bold">Hello {{user_detail.firstname}}   </h1>
    <div class="flex flex-col xl:grid xl:grid-cols-3 lg:gap-10">
      <div class="order-2 xl:order-1 xl:col-span-2">
       <ShiftsTable actionType="dashboard" />
      </div>
      <div class="order-1 xl:order-2 xl:col-span-1">
        <CardWithIcon v-if="taskGroup.length>0" class="mb-2 mt-8" iconName="ClipboardCheckIcon" iconPosition="center">
           <UserTask class="mb-2" :taskGroup='taskGroup' />
        </CardWithIcon>
        <CardWithIcon iconName="UserGroupIcon" class="desk_view mt-12" iconPosition="center">
            <h3 class="text-center text-main text-xl font-bold mb-4 Biotif-bold">Previously worked for</h3>
            <PreviousCandidates class="shadow-md" />
        </CardWithIcon>
      </div>
    </div>
    <CardWithIcon iconName="UserGroupIcon" class="mobile_view mt-12" iconPosition="center">
        <h3 class="text-center text-main text-xl font-bold mb-4 Biotif-bold">Previously worked for</h3>
        <PreviousCandidates class="shadow-md" />
    </CardWithIcon>
  </div>
</template>

<script>
import ShiftsTable from '@candidate/ShiftsTableDashboard'
import PreviousCandidates from '@candidate/PreviousCandidates'
import CardWithIcon from '@common/CardWithIcon'
import UserTask from '@common/Todo'

import Loader from '@common/Loader.vue'
import {mapGetters,mapActions} from "vuex";
export default {
  name: 'CandidateDashboard',
  components: {
    ShiftsTable,
    CardWithIcon,
    PreviousCandidates,
    UserTask,
    Loader
  },
  data: () => ({
      loader_flag:false,
      shift_filter:"",
      myValue: '',
  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
        unread_message:'authentication/getUnreadMessage',
        getShiftFilterKey:'candidate/getShiftFilterKey',
        taskGroup:'candidate/getTaskList'
      }),
     
    },
    mounted () {
     this.FetchgetTaskList();
    },
     watch: {
    },
    methods: {
      ...mapActions({
        // getShifts: 'candidate/getShifts',
        storeShiftKey :'candidate/storeShiftKey',
        FetchgetTaskList:'candidate/FetchgetTaskList'


    }),
  }
}
</script>
