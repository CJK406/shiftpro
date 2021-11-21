<template>
  <tr  @click="populatePanel_action" class="cursor-pointer grid lg:grid-cols-shift-table1 relative shadow-md py-4 lg:py-0  bg-white  ">
    <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
        <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img @click="viewProfile(shift.employer_id)" class="h-8 w-8 rounded-full shift_table_image" :src="shift.photo" />
        </div>
        <div class="lg:ml-4">
          <div class="text-lg font-semibold text_username">
            {{ shift.role }}
          </div>
          <div class="text-sm text-main-light">
            {{ shift.company }}
          </div>
        </div>
      </div>
    </td>
   <td class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.start_time_formatted }}</span>
      </span>
    </td>
    <td  @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.duration.hours }}hrs {{shift.duration.minutes!==0 ? shift.duration.minutes+'min' : ''}}
      </span>
    </td>
    <td class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
      <div class="text-sm text-left flex items-center h-full">
        <span class="rate_span inline-block lg:py-2 text-sm lg:px-4 text-main font-bold ">£{{ shift.rate }} per hour </span>
      </div>
    </td>
    
    <td class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.distance }}
      </span>
    </td>
    <td class="absolute right-4 top-1/2 transform active:none -translate-y-1/2 px-2 sm:px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button @click="populatePanel_action" type="button" class=" focus:outline-none font-bold " :class="{'text-gray-400': shift.applied,'text-emerald hover:text-secondary-light' : !shift.applied }">{{actionType!=="dashboard" ? "View" : !shift.applied ? "Apply" : "Applied"}}</button>
    </td>
  </tr>
</template>

<script>
import { CalendarIcon} from "@heroicons/vue/outline"
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