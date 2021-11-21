<template>
    <div class="p-4 mobile_td" >
      <div class="flex items-center mb-3">
        <div class="lg:ml-1">
          <div class="text-base font-semibold text_username">
            {{ shift.role }}
          </div>
          <div class="text-sm text-main-light">
            {{ shift.company }}
          </div>
        </div>
        <div class="ml-auto">
          <span class="text-sm  text-main-light flex items-center h-full">
            {{shift.status}}
          </span>
        </div>
      </div>
     <div class="text-sm text-left flex items-center h-full mb-3">
        <span class="rate_span inline-block lg:py-2 text-sm lg:px-4 text-main font-bold rounded-full">£{{ shift.rate }} per hour </span>
      </div>
      <span class="mb-3 text-sm  text-main-light flex items-center h-full pt-4">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.shift_time_formatted  }}</span>
      </span>
       <span class="mb-3 text-sm  text-main-light flex items-center h-full">
        <ClockIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.duration.hours }}hrs {{shift.duration.minutes!==0 ? shift.duration.minutes+'min' : ''}}</span>
      </span>
      
      <div class="flex text-main-light items-center">
        <div class="flex items-center">
        <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img @click="viewProfile(shift.candidate_id)" class="h-8 w-8 rounded-full mt-10" :src="shift.photo" :alt="shift.employer_photo" />
        </div>
        <div class="lg:ml-2">
          <div class="text-sm font-semibold text_username cursor-pointer">
            <span @click="viewProfile(shift.candidate_id)">{{ shift.username }}</span>
          </div>
          <div class="text-sm text-main-light">
           {{ shift.candidate_role }}
          </div>
        </div>
      </div>
      </div>
      </div>
</template>

<script>
import { CalendarIcon,ClockIcon } from "@heroicons/vue/solid"
import {mapGetters,mapActions} from "vuex";

  
export default {
  components: {
    CalendarIcon,
    ClockIcon,
  },
   data: () => ({
  }),
  
  computed: {
    ...mapGetters({
    
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
    openTimesheet(userid, candidate_id,shift_id){
        // this.fetchSetEmployerModalConfigs({user_id:userid})
        const data = {
                    isOpen: true,
                    iconName: 'ClipboardCheckIcon',
                    componentName: 'ConfirmTimeSheetModal',
                    title: '',
                    data:{userid:userid, candidate_id:candidate_id, shift_id:shift_id, modal_type:"small"}
                };
        // if(this.shift.due_status !=="pending"){
          this.fetchtSetModalConfigs(data);
        // }

    },
    viewProfile(userid){
      this.fetchSetEmployerModalConfigs({user_id:userid})
      const data = {
                isOpen: true,
                iconName: 'UserIcon',
                componentName: 'CandidateProfile',
                title: '',
                data:{modal_type:'big'}
               };
      this.fetchtSetModalConfigs(data);
    },
      populatePanel_action(){
          this.populatePanel({
            shift: this.shift,
            isOpen: true
          })
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
    actionType: String
  },
}
</script>

<style>

</style>