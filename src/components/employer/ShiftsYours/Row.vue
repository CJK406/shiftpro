<template>
  <tr class="grid lg:grid-cols-shift-table1 relative shadow-md py-4 lg:py-0  bg-white  " >
    <td  @click="populatePanel_action" class="pl-12 w-full px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
        <!-- <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img class="h-8 w-8 rounded-full shift_table_image" src="https://shiftpro.dev/assets/images/profile/beer-pub-logo-round-linear-black-background-eps-159871030.jpg" :alt="shift.employer_photo" />
        </div> -->
        <div class="">
         <div class="text-lg font-semibold text_username cursor-pointer">
            {{ shift.role }}
          </div>
          <div class="text-sm text-main-light">
            <span >{{ shift.company }}</span>
          </div>
        </div>
      </div>
    </td>
    <td  @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.shift_time_formatted  }}</span>  
      </span>
    </td>
    <td  @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.duration.hours }}hrs {{shift.duration.minutes!==0 ? shift.duration.minutes+'min' : ''}}
      </span>
    </td>
     
     <td  @click="populatePanel_action"  class="text-center pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="rate_span justify-center w-28 inline-block lg:py-2 text-sm lg:px-4 text-main font-bold flex">
        £{{ shift.rate }} per hour
      </span>
    </td>
    <!-- <td  @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.address1 }}
      </span>
    </td> -->
     
    <td  @click="populatePanel_action" style="width:20px" class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
        <!-- {{ shift.applied }} -->
        <p class="text-sm" v-if="shift.applicants.length===0">0</p>
        <div class="flex">
            <div v-if="shift.applicants.length>0" class="w-8 h-8 bg-gray-400 rounded-full border-2 border-white">
              <img  class="rounded-full w-full" :src="shift.applicants[0].photo" />
            </div>
            <div v-if="shift.applicants.length>1" style="margin-left:-8px" class="w-8 h-8 bg-gray-400 rounded-full border-2 border-white">
              <img  class="rounded-full w-full" :src="shift.applicants[1].photo" />
            </div>
            <div v-if="shift.applicants.length>2" style="margin-left:-8px" class="w-8 h-8 bg-gray-400 rounded-full border-2 border-white">
              <img  class="rounded-full w-full" :src="shift.applicants[2].photo" />
            </div>
            <div v-if="shift.applicants.length>3" style="margin-left:-8px" class="w-8 h-8 bg-gray-400 rounded-full border-2 border-white">
              <img  class="rounded-full w-full" :src="shift.applicants[3].photo" />
            </div>
              <div v-if="shift.applicants.length>4" style="margin-left:-8px" class="w-8 h-8 bg-gray-400 rounded-full border-2 border-white">
              <img  class="rounded-full w-full" :src="shift.applicants[4].photo" />
            </div>
            <div v-if="shift.applicants.length>5" style="margin-left:-8px" class="flex text-center w-8 h-8 bg-gray-600 rounded-full border-2 border-white">
              <span class="self-center m-auto text-white text-lg font-bold">5+</span>
            </div>
        </div>
      </span>
    </td>
    <td  @click="populatePanel_action" style="width:20px" class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
        {{shift.status}}
      </span>
    </td>
    <!-- <td :style="`z-index:`+shift.index" class="relative flex  px-2 sm:px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Dropdown :shift_id="shift.id" />
    </td> -->
    
  </tr>
</template>

<script>
// import { StarIcon} from "@heroicons/vue/outline"
import {mapGetters,mapActions} from "vuex";
// import Dropdown from '@employer/ShiftsYours/Dropdown';
import { CalendarIcon  } from "@heroicons/vue/outline";

export default {
  components: {
      // Dropdown,
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
    }),
    populatePanel_action(){
        this.populatePanel({
          shift: this.shift,
          isOpen: true
        })
    }
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