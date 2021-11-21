<template>
    <div class="p-4 mobile_td" >
      <div class="flex items-center mb-3">
        <div class="flex items-center  transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img class="h-8 w-8 rounded-full mt-10" :src="shift.photo" :alt="shift.photo" />
        </div>
        <div class="lg:ml-1">
          <div class="text-base font-semibold text_username">
            {{ shift.username }}
          </div>
          <div class="text-sm text-main-light">
            {{ shift.role }}
          </div>
        </div>
       
      </div>
     <div class="text-sm text-left flex items-center h-full mb-3 ">
        <span class="rate_span justify-center flex w-24 inline-block lg:py-2 text-sm lg:px-4 text-main font-bold lg:bg-violet rounded-full flex">
      <StarIcon class="w-6 h-6 pr-1 fill-current text-yellow-400" /> <span class="self-center"> {{ shift.rating/20 }} </span>
      </span>
      </div>
       <span class="font-semibold text-gray-900 flex items-center h-full">
        {{ shift.reliability }} %
      </span>
      <div class="flex text-main-light items-center">

        <span class="text-sm  text-main-light flex items-center h-full">
          {{ shift.distance }} 
        </span>
        
          <button @click="viewProfile(shift.user_id)" type="button" class="ml-auto focus:outline-none font-bold text-gray-400" 
              :class="{'text-gray-400': actionType==='direct', 'text-emerald hover:text-secondary-light' 
              : actionType==='complete' || (actionType==='agree' && shift.due_status==='confirm') }">
              View
            </button>
      </div>
      </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import { StarIcon} from "@heroicons/vue/outline"

  
export default {
  components: {
    StarIcon
  },
   data: () => ({
  }),
  
  computed: {
    ...mapGetters({
      getModalData: 'candidate/getModalData',
    
    }),
  },
  mounted() {
	},
  methods: {
    ...mapActions({
      populatePanel: 'candidate/populatePanel',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchSetEmployerModalConfigs: 'candidate/fetchSetEmployerModalConfigs'
    }),
    viewProfile(userid){
      this.fetchSetEmployerModalConfigs({user_id:userid})
      const data = {
                isOpen: true,
                iconName: 'UserIcon',
                componentName: 'CandidateProfile',
                title: '',
                data:{FromStaffSearch:true,FromStaffSearchContent:this.rowtype,shift_id:this.getModalData.shift_id,modal_type:'big'}
               };
      this.fetchtSetModalConfigs(data);

    },
  },
  
  props: {
    shift: {
      id: Number,
      company: String,
      role: String,
      address1: String,
      address2: String,
      address3: String,
      city: String,
      postcode: String,
      lat: Number,
      lon: Number,
      start_time: String,
      start_time_formatted: String,
      end_time: String,
      rate: Number,
      description: String,
      status: String,
      employer_photo: String,
    },
    actionType: String,
    rowtype:String,
  },
}
</script>

<style>

</style>