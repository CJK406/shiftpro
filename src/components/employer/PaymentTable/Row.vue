<template>
  <tr class="cursor-pointer grid lg:grid-cols-timesheet relative shadow-md lg:py-0  bg-white  ">
    <td class=" px-6 lg:py-4 whitespace-nowrap font-medium text-gray-900">
      <div class="mt-2">
        <div class=" text-lg font-semibold text_username"> {{ payment.role }}</div>
        <div class="text-sm text-main-light"> {{ payment.company }}</div>
      </div>
    </td>
     <td class="lg:py-4 whitespace-nowrap text-sm text-gray-500">
      <div class="flex items-center">
        <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img @click="viewProfile(payment.candidate_id)" class="h-8 w-8 rounded-full shift_table_image" :src="payment.photo" :alt="payment.photo" />
        </div>
        <div class="lg:ml-2">
          <div class="text-sm font-semibold text_username">
            {{ payment.username }}
          </div>
        </div>
      </div>
    </td>
    <td style="color:#727497" class=" flex text-right lg:text-left pt-4  px-6 lg:py-4 whitespace-nowrap text-main  text-sm">
     <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{payment.shift_time_formatted}}</span>
    </td>

    
    <td style="color:#727497" class="  text-right lg:text-left pt-4  px-6 lg:py-4 whitespace-nowrap text-main  text-sm ">
     <div class="flex">
        <RefreshIcon class="w-5 mr-1" style="color:#A3A6CC" v-if="payment.employer_status==='processing'" /> 
        <CheckIcon class="w-5 mr-1" style="color:#A3A6CC" v-if="payment.employer_status!=='processing'" /> 
        {{payment.employer_status}}
     </div>
     
    </td>
    <td style="color:#727497" class="  text-right lg:text-left pt-4  px-6 lg:py-4 whitespace-nowrap text-main  text-sm">
     {{payment.transaction_title}}
    </td>
    <td style="color:#050A4D" class=" biotif text-right lg:text-left pt-4  px-6 lg:py-4 whitespace-nowrap text-main  text-base font-extrabold">
     £{{parseFloat(payment.agreed_total).toFixed(2)}}
    </td>
  </tr>
</template>

<script>
import { RefreshIcon ,CheckIcon } from "@heroicons/vue/solid";
import {mapActions} from "vuex";
import { CalendarIcon } from "@heroicons/vue/solid"

export default {
   components: {
    RefreshIcon,
    CheckIcon,CalendarIcon
  },
  methods: {
    ...mapActions({
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
                data:{modal_type:'big'}
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
      amount: Number
    }
  }
}
</script>