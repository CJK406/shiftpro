<template>
  <tr class="grid lg:grid-cols-shift-table1 relative shadow-md py-4 lg:py-0  bg-white  ">
    <td @click="populatePanel_action" class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
        <div class="">
          <div class="text-base font-semibold text_username cursor-pointer">
            {{ shift.role }}
          </div>
         
          <div class="text-sm text-main-light">
           <span >{{ shift.company }}</span> 
          </div>
        </div>
      </div>
    </td>
    <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
        <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img @click="viewProfile(shift.candidate_id)" class="h-8 w-8 rounded-full shift_table_image" :src="shift.photo" :alt="shift.employer_photo" />
        </div>
        <div class="lg:ml-2">
          <div class="text-sm font-semibold text_username cursor-pointer">
            <span @click="viewProfile(shift.candidate_id)">{{ shift.username }}</span>
          </div>
          <!-- <div class="text-sm text-main-light">
           {{ shift.candidate_role }}
          </div> -->
        </div>
      </div>
    </td>
    <td @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.shift_time_formatted }}</span>
      </span>
    </td>
    <td  @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.duration.hours }}hrs {{shift.duration.minutes!==0 ? shift.duration.minutes+'min' : ''}}
      </span>
    </td>
    
     <td  @click="populatePanel_action"  class="text-center pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="rate_span justify-center w-28 inline-block lg:py-2 text-sm lg:px-4 text-main font-bold rounded-full flex">
        £{{ shift.rate }} per hour
      </span>
    </td>
    
    <td class="self-center active:none px-2 sm:px-1 whitespace-nowrap text-sm font-medium">
      <button @click="populatePanel_action" type="button" class=" focus:outline-none font-bold text-gray-400" 
        :class="{'text-gray-400': actionType==='direct', 'text-emerald hover:text-secondary-light' 
        : actionType==='complete' || (actionType==='agree' && shift.due_status==='confirm') }">
         {{shift.user_status}}
      </button>
      <!-- <button @click="populatePanel_action" type="button" class="  focus:outline-none font-bold text-emerald hover:text-secondary-light" >Confirm</button> -->
    </td>
  </tr>
</template>

<script>
import { CalendarIcon  } from "@heroicons/vue/outline";
// import { CalendarIcon  } from "@heroicons/vue/solid";

// import { StarIcon} from "@heroicons/vue/outline"
import {mapGetters,mapActions} from "vuex";
  import { 
} from '@heroicons/vue/solid'

export default {
  components: {
    CalendarIcon
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
                componentName: 'CandidateProfile',
                title: '',
                data:{modal_type:'big'}
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