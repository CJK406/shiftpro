<template>
  <!-- <tr class="cursor-pointer grid lg:grid-cols-8 lg:table-row shadow-md py-4 lg:py-0  bg-white  "> -->
  <tr class="cursor-pointer grid lg:grid-cols-timesheet-complete relative shadow-md lg:py-0  bg-white  ">
    <td class="lg:py-4 whitespace-nowrap font-medium text-gray-900">
      <div>
        <div class=" text-lg font-semibold text_username"> {{ payment.role }}</div>
        <div class="text-sm text-main-light"> {{ payment.company }}</div>
      </div>
    </td>
    <td class="lg:py-4 whitespace-nowrap text-sm text-gray-500">
      <div class="flex items-center">
        <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img @click="viewProfile(payment.employer_id)" class="h-8 w-8 rounded-full shift_table_image" :src="payment.photo" :alt="payment.photo" />
        </div>
        <div class="lg:ml-1">
          <div class="text-sm font-semibold text_username">
            {{ payment.company }}
          </div>
        </div>
      </div>
    </td>
    <td style="color:#727497"  class="pt-4   lg:py-4 whitespace-nowrap text-sm">
      <p class="text-sm flex"><CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{payment.shift_time_formatted}}</span></p>
    </td>
    <td style="color:#727497"  class="pt-4   lg:py-4 whitespace-nowrap text-sm">
      <p class="text-sm">{{total_hour}}hrs <span v-if="total_min!==0"> {{total_min}}min</span></p>
    </td>
    <td style="color:#727497" class="pb-4 lg:py-4 whitespace-nowrap text-sm">
      <span class="flex" v-if="payment.status==='c_waiting'"><ClipboardIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>Candidate waiting</span></span>
      <span class="flex" v-if="payment.status==='e_waiting'"><ClipboardListIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span> Employer waiting</span></span>
      <span class="flex" v-if="payment.status==='c_approve'"><ClipboardCheckIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>To be confirmed</span></span>
      <span class="flex"  v-if="payment.status==='disputed'"><ExclamationIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>Disputed</span></span>
      <span class="flex" v-if="payment.status==='confirmed'"><CheckIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>Completed</span></span>
    </td>
    
    <td style="color:#050A4D" class="text-right pt-4  px-6 lg:py-4 whitespace-nowrap text-main  text-sm">
     <button @click="submit" type="button" class=" focus:outline-none text-gray-400" 
        :class="{'text-gray-400': payment.status==='e_waiting', 'biotif-regular font-bold text-emerald hover:text-secondary-light' 
        : (payment.status==='c_approve' || payment.status==='c_waiting') }">
        {{payment.status==='c_waiting' || payment.status==='c_approve'? 'Submit':'Sent'}}
      </button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";

import { CheckIcon,ExclamationIcon,ClipboardCheckIcon,ClipboardListIcon,ClipboardIcon,CalendarIcon  } from "@heroicons/vue/outline";

export default {
  components: {
    ClipboardIcon,
    ClipboardListIcon,
    ClipboardCheckIcon,
    ExclamationIcon,
    CheckIcon,
    CalendarIcon
    },
   props: {
    payment: {
      id: String,
      role: String,
      photo: String,
      status: String,
      shift_time_formatted: String,
      hours: Number,
      history:Array,
    }
  },
   methods: {
        ...mapActions({
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
        }),
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
        submit(){
          if(this.payment.status==="c_waiting")
          {
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'CandidateSubmitTimeSheetModalContent',
                        title: '',
                        data:{modal_type:"small",timesheet:this.payment}
                    };
              this.fetchtSetModalConfigs(data);
          }

          if(this.payment.status==="c_approve"){
            
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'CandidateAcceptTimeSheetModalContent',
                        title: '',
                        data:{modal_type:"small",timesheet:this.payment}
                    };
              this.fetchtSetModalConfigs(data);
          }
            
        }
   },
   data: () => ({
      total_hour:'',
      total_min:'',
    }),
    mounted() {
      let history = this.payment.history
      setTimeout(() => {
         this.total_hour = history[0]['work_hours'];
        this.total_min = history[0]['work_minutes'];
      }, 10);
       
    }
}
</script>