<template>
  <tr class="grid lg:grid-cols-shift-table-em_dashboard relative shadow-md py-4 lg:py-0  bg-white  ">
    <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
        <!-- <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img class="h-8 w-8 rounded-full shift_table_image" src="https://shiftpro.dev/assets/images/profile/beer-pub-logo-round-linear-black-background-eps-159871030.jpg" :alt="shift.employer_photo" />
        </div> -->
        <div class="">
          <div class="text-lg font-semibold text_username cursor-pointer">
            {{ shift.role }}
          </div>
         
          <div class="text-sm text-main-light">
           <span ></span> {{ shift.company }}
          </div>
        </div>
      </div>
    </td>
    
    <td  @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        <CalendarIcon class="w-5 mr-1" style="color:#A3A6CC" /> <span>{{ shift.shift_time_formatted }}</span>
      </span>
    </td>
    <td  @click="populatePanel_action" class="pl-12 px-2 lg:px-6 py-0 lg:py-4 whitespace-nowrap shifttable_second_td">
       <span class="text-sm  text-main-light flex items-center h-full">
        {{ shift.duration.hours }}hrs {{shift.duration.minutes!==0 ? shift.duration.minutes+'min' : ''}}
      </span>
    </td>

    <td class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <span class="text-sm  text-main-light flex items-center h-full">
         <UsersIcon class="w-4 mr-1" />{{ shift.applied }}
      </span>
    </td>
    <td class="self-center active:none px-2 sm:px-1 whitespace-nowrap text-sm font-medium text-right">
      <button @click="populatePanel_action" type="button" class=" focus:outline-none font-bold text-gray-400 text-emerald hover:text-secondary-light">
         View shift
      </button>
    </td>
  </tr>
</template>

<script>
// import { TrashIcon  } from "@heroicons/vue/outline";
import { UsersIcon } from "@heroicons/vue/solid";
import { CalendarIcon} from "@heroicons/vue/outline"
import {mapGetters,mapActions} from "vuex";
  import { 
} from '@heroicons/vue/solid'

export default {
  components: {
    UsersIcon,CalendarIcon
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
      fetchtSetEditShiftModalConfigs: 'candidate/fetchtSetEditShiftModalConfigs',

    }),
    populatePanel_action(){
      this.populatePanel({
          shift: this.shift,
          isOpen: true
        })
    },
    EditShift(id){
        const data = {
                    isOpen: true,
                    iconName: 'ClipboardCheckIcon',
                    componentName: 'EditShiftModalContent',
                    title: '',
                    data:{type:'edit', modal_type:'base'}
                };
        this.fetchtSetModalConfigs(data);
        this.fetchtSetEditShiftModalConfigs({id:id});
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