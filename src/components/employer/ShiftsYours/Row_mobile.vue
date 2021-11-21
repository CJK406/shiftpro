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
        <span class="text-sm  text-main-light flex items-center h-full">
         <UsersIcon class="w-4 mr-1" />{{ shift.applied }} applicants
      </span>
        <button @click="populatePanel_action" type="button" class="ml-auto focus:outline-none font-bold biotif-regular text-emerald hover:text-secondary-light ">
        View Shift</button>
      </div>
      </div>
</template>

<script>
import { CalendarIcon,ClockIcon,UsersIcon } from "@heroicons/vue/solid"
import {mapGetters,mapActions} from "vuex";

  
export default {
  components: {
    CalendarIcon,
    ClockIcon,
    UsersIcon
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
    populatePanel_action(){
        this.populatePanel({
          shift: this.shift,
          isOpen: true
        })
    },
    viewProfile(userid){
      this.fetchSetEmployerModalConfigs({user_id:userid})
      const data = {
                isOpen: true,
                iconName: 'UserIcon',
                componentName: 'EmployerProfile',
                title: '',
                data:{modal_type:'base'}
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
    actionType: String
  },
}
</script>

<style>

</style>