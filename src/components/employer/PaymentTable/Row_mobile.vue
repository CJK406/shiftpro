<template>
    <div class="p-4 mobile_td" >
      <div class="flex items-center mb-3">
        <div class="lg:ml-1">
          <div class="text-base font-semibold text_username">
            {{ payment.role }}
          </div>
          
        </div>
        <div class="ml-auto text-sm  text-main-light">
           {{ payment.employer_status }}
        </div>
      </div>
   
      <span class="mb-3 text-sm  text-main-light flex items-center h-full">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ payment.shift_time_formatted  }}</span>
      </span>
      
      <div class="flex items-center">
          <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
            <img @click="viewProfile(payment.user_id)" class="h-8 w-8 rounded-full mt-10" :src="payment.photo" :alt="payment.photo" />
          </div>
          <div class="lg:ml-2">
            <div class="text-sm font-semibold text_username cursor-pointer">
              <span @click="viewProfile(payment.user_id)">{{ payment.company }}</span>
            </div>
          </div>
        </div>
      <div class="flex text-main-light items-center mt-3">
        <div >
           {{ payment.transaction_title }}
        </div>
        <button type="button" class="ml-auto biotif text-right lg:text-left  whitespace-nowrap text-main  text-base font-extrabold"
        >
        Total: £{{parseFloat(payment.agreed_total).toFixed(2)}}
     

      </button>
      </div>
      </div>
</template>

<script>
import { CalendarIcon } from "@heroicons/vue/solid"
// import { CheckIcon,ExclamationIcon,ClipboardCheckIcon,ClipboardListIcon,ClipboardIcon  } from "@heroicons/vue/outline";

import {mapGetters,mapActions} from "vuex";

  
export default {
  components: {
    CalendarIcon,
  
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
          if(this.shift.status==="c_waiting")
          {
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'CandidateSubmitTimeSheetModalContent',
                        title: '',
                        data:{modal_type:"small",timesheet:this.shift}
                    };
              this.fetchtSetModalConfigs(data);
          }

          if(this.shift.status==="c_approve"){
            
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'CandidateAcceptTimeSheetModalContent',
                        title: '',
                        data:{modal_type:"small",timesheet:this.shift}
                    };
              this.fetchtSetModalConfigs(data);
          }
            
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
    payment: {
      id: String,
      position: String,
      shiftInterval: String,
      paidBy: String,
      date: String,
      amount: Number,
      role:String
    },
    actionType: String
  },
}
</script>

<style>

</style>