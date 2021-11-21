<template>
    <div class="p-4 mobile_td" >
      <div class="flex items-center mb-3">
        <div class="lg:ml-1">
          <div class="text-base font-semibold text_username">
            {{ shift.role }}
          </div>
          
        </div>
      </div>
   
      <span class="mb-3 text-sm  text-main-light flex items-center h-full">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.shift_time_formatted  }}</span>
      </span>
       <span class="mb-3 text-sm  text-main-light flex items-center h-full">
        <ClockIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.agreed_hours }}hrs {{shift.agreed_minutes!==0 ? shift.agreed_minutes+'min' : ''}}</span>
      </span>
      <div class="flex items-center">
          <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
            <img @click="viewProfile(shift.candidate_id)" class="h-8 w-8 rounded-full mt-10" :src="shift.photo" :alt="shift.photo" />
          </div>
          <div class="lg:ml-2">
            <div class="text-sm font-semibold text_username cursor-pointer">
              <span @click="viewProfile(shift.candidate_id)">{{ shift.company }}</span>
            </div>
          </div>
        </div>
      <div class="flex text-main-light items-center mt-3">
        <div >
          <span class="flex" v-if="shift.status==='c_waiting'"><ClipboardIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>Candidate waiting</span></span>
          <span class="flex" v-if="shift.status==='e_waiting'"><ClipboardListIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span> Employer waiting</span></span>
          <span class="flex" v-if="shift.status==='c_approve'"><ClipboardCheckIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>To be confirmed</span></span>
          <span class="flex"  v-if="shift.status==='disputed'"><ExclamationIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>Disputed</span></span>
          <span class="flex" v-if="shift.status==='confirmed'"><CheckIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>Completed</span></span>
        </div>
        <button @click="submit" type="button" class="ml-auto focus:outline-none text-gray-400" 
          :class="{'text-gray-400': shift.status==='e_waiting', 'biotif-regular font-bold text-emerald hover:text-secondary-light' 
          : shift.status==='e_waiting'}">
          {{shift.status==='e_waiting'? 'Submit':'Sent'}}
        </button>
      </div>
      </div>
</template>

<script>
import { CalendarIcon,ClockIcon } from "@heroicons/vue/solid"
import { CheckIcon,ExclamationIcon,ClipboardCheckIcon,ClipboardListIcon,ClipboardIcon  } from "@heroicons/vue/outline";

import {mapGetters,mapActions} from "vuex";

  
export default {
  components: {
    CalendarIcon,
    ClockIcon,
    ClipboardIcon,
    ClipboardListIcon,
    ClipboardCheckIcon,
    ExclamationIcon,
    CheckIcon,
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
    submit(){
          if(this.payment.status==="e_waiting")
          {
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'EmployerSubmitTimeSheetModalContent',
                        title: '',
                        data:{modal_type:"small",timesheet:this.shift,user_type:"employer"}
                    };
              this.fetchtSetModalConfigs(data);
          }
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
  },
  
  props: {
    shift: {
      id: String,
      role: String,
      photo: String,
      status: String,
      shift_time_formatted: String,
      hours: Number,
      history:Array,

    },
    actionType: String
  },
}
</script>

<style>

</style>