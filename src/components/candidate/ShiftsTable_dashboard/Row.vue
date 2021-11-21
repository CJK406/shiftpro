<template>
  <tr @click="populatePanel_action" class="cursor-pointer grid md:grid-cols-shift-table_dashboard relative shadow-md py-4 lg:py-0  bg-white  ">
    <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
        <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img @click="viewProfile(shift.data.user_id)" class="h-8 w-8 rounded-full shift_table_image" :src="shift.data.employer_photo" :alt="shift.employer_photo" />
        </div>
        <div class="lg:ml-1">
          <div class="text-base font-semibold text_username">
            {{ shift.data.role }}
          </div>
          <div class="text-sm text-main-light">
            {{ shift.data.company }}
          </div>
        </div>
      </div>
    </td>
    <td class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.data.shift_time_formatted  }}</span>
      </span>
    </td>
    <td   class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.data.duration.hours }}hrs {{shift.data.duration.minutes!==0 ? shift.data.duration.minutes+'min' : ''}}
      </span>
    </td>
    <td class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
      <div class="text-sm text-left flex items-center h-full">
        <span class="rate_span inline-block lg:py-2 text-sm lg:px-4 text-main font-bold rounded-full">£{{ shift.data.rate }} per hour </span>
      </div>
    </td>
    
    <td class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.data.distance }}
      </span>
    </td>
    <td class="absolute right-4 top-1/2 transform active:none -translate-y-1/2 px-2 sm:px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button  type="button" class=" focus:outline-none font-bold " :class="{'text-gray-400': shift.data.applied,'text-emerald hover:text-secondary-light' : !shift.data.applied }">{{actionType!=="dashboard" ? "View" : !shift.data.applied ? "View" : "Applied"}}</button>
    
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
  props: {
    shift: {
      data:{
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
    },
      actionType: String

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
        this.$emit("click_shift",this.shift);
        this.populatePanel({
          shift: this.shift.data,
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
                data:{modal_type:'big'}
               };
      this.fetchtSetModalConfigs(data);

    },
  },
}
</script>

