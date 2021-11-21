<template>
 <Loader :loader_flag="loader_flag" />
  <tr class="grid lg:grid-cols-shift-table-applicant relative shadow-md py-4 lg:py-0  bg-white  ">
    <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
       
       <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img class="h-8 w-8 rounded-full shift_table_image" :src="shift.photo" :alt="shift.photo" />
        </div>
        <div class="lg:ml-2">
          <div class="text-lg font-semibold text_username">
            {{ shift.username }}
          </div>
          <div class="text-sm text-main-light">
           {{ shift.role }}
          </div>
        </div>
      </div>
    </td>
     <td class="text-center pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="justify-center flex w-24 inline-block lg:py-2 text-sm lg:px-4 text-main font-bold lg:bg-violet rounded-full flex">
      <StarIcon class="w-6 h-6 pr-1 fill-current text-yellow-400" /> <span class="self-center"> {{ shift.rating/20 }} </span>
      </span>
    </td>
    <td class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="font-semibold text-gray-900 flex items-center h-full">
        {{ shift.reliability }} %
      </span>
    </td>
    <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.distance }} 
      </span>
    </td>
    
    <td class="text-right self-center active:none px-2 sm:px-1 whitespace-nowrap text-sm font-medium">
      <button @click="viewProfile(shift.user_id)" type="button" class=" focus:outline-none font-bold text-gray-400" 
        :class="{'text-gray-400': actionType==='direct', 'text-emerald hover:text-secondary-light' 
        : actionType==='complete' || (actionType==='agree' && shift.due_status==='confirm') }">
        View
      </button>
      <!-- <button @click="populatePanel_action" type="button" class="  focus:outline-none font-bold text-emerald hover:text-secondary-light" >Confirm</button> -->
    </td>
    <!-- <td class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-base  text-main-light flex items-center h-full">
              <TrashIcon class="w-6 ml-4" style="color:#FFD1D1" />

      </span>
    </td> -->
  </tr>
</template>

<script>

import { StarIcon} from "@heroicons/vue/outline"
import {mapGetters,mapActions} from "vuex";
  import { 
} from '@heroicons/vue/solid'
// import {
//  APIdoSendRequestOffer
// } from '@/api/employer/api'
import Loader from '@common/Loader.vue'

export default {
  components: {
      StarIcon,
      Loader
  },
   data: () => ({
     loader_flag:false,

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
    populatePanel_action(){
        this.populatePanel({
          shift: this.shift,
          isOpen: true
        })
        let pos = {lat:this.shift.lat,lng:this.shift.lon}
        this.$emit("click_shift",pos);
    },
    viewProfile(userid){
      this.fetchSetEmployerModalConfigs({user_id:userid})
      const data = {
                isOpen: true,
                iconName: 'UserIcon',
                componentName: 'CandidateProfile',
                title: '',
                data:{modal_type:'big',FromStaffSearch:true,FromStaffSearchContent:this.rowtype,shift_id:this.getModalData.shift_id}
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