<template>
    <div class="p-4 mobile_td" >
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
              <img class="h-8 w-8 rounded-full mt-10" :src="actionType==='dashboard' ? shift.employer_photo : `https://shiftpro.dev/`+shift.employer_photo" :alt="shift.employer_photo" />
            </div>
            <div class="lg:ml-4">
              <div class="text-lg font-semibold text_username">
                {{ shift.role }}
              </div>
              <div class="text-sm text-main-light">
                {{ shift.start_time_formatted }}
              </div>
            </div>
          </div>
      </div>
      <div class="text-sm text-left flex items-center h-full mb-3">
        <span class="rate_span inline-block lg:py-2 text-sm lg:px-4 text-main font-bold rounded-full">£{{ shift.rate }} per hour </span>
      </div>
      <span class="mb-3 text-sm  text-main-light flex items-center h-full pt-4">
        {{ shift.address1 }}
      </span>
      
      <div class="flex text-main-light items-center">
         
        <LocationMarkerIcon class="w-5 mr-1" style="color:#A3A6CC" />
        <span class="text-sm text-main-light flex items-center h-full">
            {{ shift.distance }}
        </span>
        <button @click="populatePanel_action" type="button" class="ml-auto focus:outline-none font-bold " :class="{'text-gray-400': shift.applied,'text-emerald hover:text-secondary-light' : !shift.applied }">{{!shift.applied ? "Apply" : "Applied"}}</button>
    
      </div>
      </div>
</template>

<script>
import { LocationMarkerIcon  } from "@heroicons/vue/solid"
import {mapGetters,mapActions} from "vuex";

  
export default {
  components: {
   
    LocationMarkerIcon 
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
          isOpen: false
        })
      this.$emit("applyEvent")
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