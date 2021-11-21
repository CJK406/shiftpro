<template>
  <tr class=" grid lg:grid-cols-timesheet border-b border-solid border-gray-200 hover:bg-gray-50">
    <td class="px-6 lg:py-4 whitespace-nowrap font-medium text-gray-900">
      <div>
        <div class=" text-lg font-semibold text_username"> {{ payment.role }}</div>
        <!-- <div class="text-sm text-main-light"> {{ payment.start_time_formatted }}</div> -->
      </div>
    </td>
    <td>
    <div class="flex items-center">
          <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
            <img @click="viewProfile(payment.user_id)" class="h-8 w-8 rounded-full " :src="payment.photo" :alt="payment.photo" />
          </div>
          <div class="lg:ml-2">
            <div class="text-sm font-semibold text_username cursor-pointer">
              <span @click="viewProfile(payment.user_id)">{{ payment.company }}</span>
            </div>
          </div>
        </div>
    </td>
    <td style="color:#727497" class=" flex text-right lg:text-left pt-4  px-6 lg:py-4 whitespace-nowrap text-main  text-sm">
     <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{payment.shift_time_formatted}}</span>
    </td>
    <td class="flex px-6 pb-4 lg:py-4 whitespace-nowrap text-sm text-gray-500">
       <RefreshIcon class="w-5 mr-1" style="color:#A3A6CC" v-if="payment.candidate_status==='processing'" /> 
        <CheckIcon class="w-5 mr-1" style="color:#A3A6CC" v-if="payment.candidate_status!=='processing'" /> 
      {{ payment.candidate_status }}
    </td>
    <td class="px-6 pt-4   lg:py-4 whitespace-nowrap text-sm text-gray-500">
       <span class="inline-block lg:hidden text-main  uppercase">Paid On</span> {{ payment.transaction_title }}
    </td>
    <td style="color:#050A4D" class="biotif text-right lg:text-left pt-4  px-6 lg:py-4 whitespace-nowrap text-main  text-base font-extrabold">
     £{{parseFloat(payment.agreed_total).toFixed(2)}}
    </td>
  </tr>
</template>

<script>
import { RefreshIcon ,CheckIcon } from "@heroicons/vue/solid";
import {mapGetters,mapActions} from "vuex";
import { CalendarIcon } from "@heroicons/vue/solid"

export default {
   components: {
    RefreshIcon,
    CheckIcon,
    CalendarIcon
  },
  computed: {
    ...mapGetters({
    
    }),
  },
  props: {
    payment: {
      id: String,
      position: String,
      shiftInterval: String,
      paidBy: String,
      date: String,
      amount: Number
    }
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
}
</script>