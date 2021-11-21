<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Loader :loader_flag="loader_flag" />
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" style="z-index:999999999" static class="fixed inset-0 overflow-hidden" @close="closePanel" :open="open">
      
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0 bg-black opacity-30" />
        <div class="fixed inset-y-0 right-0 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="w-screen max-w-md">
              <div class="h-full pt-20 flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-center">
                    <DialogTitle class="text-3xl text-center text-main  Biotif-bold">
                      {{shift.role}}
                    </DialogTitle>
                  </div>
                </div>
                <div class="mt-1  px-10">
                  <div class="b-8">
                     <p class="text-center text-lg text-gray-500">{{shift.company}}</p>
                     <div class="flex items-center pt-1 mb-2">
                    </div>
                  </div>
                  <!-- Section -->
                  <div class="py-4">
                    <h3 class="text-gray-900 mb-2 font-bold">Shift completed by: </h3>
                    <div class="flex pt-2">
                      <div class="mr-4 flex-shrink-0 self-center">
                            <img @click="viewProfile(shift.candidate_id)" class="cursor-pointer inline-block h-14 w-14 rounded-full" v-bind:src="shift.photo" :alt="shift.photo" />
                      </div>
                      <div >
                        <h4 @click="viewProfile(shift.candidate_id)" class="cursor-pointer text-gray-900 text-xl mb-1 font-bold">{{shift.username}}</h4>
                        <star-rating  :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="true" :star-size="25" :rating="4"></star-rating>
                      </div>
                    </div>
                  </div>     
                  <div class="flex items-center pt-2 pb-4">
                      <button  type="button" style="background-color:#6fcba3" disabled="disabled"
                      class="flex m-auto mt-2 primary_button shadow-around-sm w-40 justify-center">
                        <span class="ml-2 font-bold self-center">Shift offered</span>
                      </button>
                    <button type="button" class="justify-center secondary_button flex border w-40 mt-1"><XIcon class="w-6 mr-1" /><span >Withdraw</span></button>

                      <!-- <button type="button" class="justify-center mt-1 secondary_button flex border w-40 "><XIcon class="w-6 mr-1" /><span >Cancel</span></button> -->
                  </div>
                  <div class="py-6 border-t border-b border-solid border-gray-200 ">
                   <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift ID: </span><span class="">{{shift.id}}</span></p>
                   <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift starts: </span><span class="">{{shift.start_time_formatted}}</span></p>
                    <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift ends: </span><span class="">{{shift.end_time_formatted}} </span></p>
                    <p class="flex pb-2"><span class="text-gray-900 font-bold  mr-2">Rate: </span><span>&pound;{{shift.rate}}</span></p>
                    <!-- <p class="flex pb-2"><span class="text-gray-900 font-bold  mr-2">Hours: </span><span>{{shift.duration.hours}} </span></p> -->
                    
                    <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Location: </span><span>{{shift.postcode}}</span></p>
                    <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Uniform required: </span><span>{{shift.uniform}}</span></p>
                    
                    <!-- <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Distance: </span><span>{{shift.distance}}</span></p> -->
                  </div> 
                  <!-- Section --> 
                  <div class="py-6">
                    <h3 class="text-gray-900 mb-2 font-bold">Shift Description: </h3>
                    <div v-html="shift.description" class="text-base text-main-light">  </div>
                  </div>  
                  
                 
                  <div class="py-4 flex justify-center">
                  </div>                    
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { computed } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import StarRating from 'vue-star-rating'

import {mapGetters,mapActions} from "vuex";

import {
  APIgetShiftCandidates,
} from '@/api/employer/api'
import Loader from '@common/Loader.vue'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    // SearchIcon,
    XIcon,
    Loader,
    StarRating,
    // PencilAltIcon,
    // UsersIcon
  },
   data: () => ({
        loader_flag: false,
        rating:3.5,
        duration_min:0,
        shiftcandidate:[],
   }),
  props: {
    shift: {
      role: String,
      company: String,
      address1: String,
      address2: String,
      address3: String,
      city: String,
      lat: Number,
      lon: Number,
      start_time: String,
      end_time: String,
      rate: Number,
      description: String,
      status: String,
      stars: Number,
      uniform: Boolean,
      number_of_workers: Number,
      duration:Object,
    },
    actionType: String
  },
  computed: {
    ...mapGetters({
        open: "candidate/getPanelState",

    }),
    
  },
  mounted() {
     if(this.shift.rating!==undefined)
        this.rating = this.shift.rating/20;
      this.get_shiftCandidate();
      
  },
   methods: {
      ...mapActions({
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchtSetEditShiftModalConfigs: 'candidate/fetchtSetEditShiftModalConfigs',
      closePanelModal: 'candidate/closePanelModal',
      fetchSetEmployerModalConfigs: 'candidate/fetchSetEmployerModalConfigs'
      

        }),
       
        viewProfile(userid){
          this.closePanel();
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
        
        closePanel(){
          this.closePanelModal();
        },
        get_shiftCandidate(){
            APIgetShiftCandidates(this.shift.id).then((res) => {
                this.shiftcandidate = res.data.results;
            })
        },
  },
  watch: {
    open : function(){
      if(this.open===true)
        this.get_shiftCandidate();
      else{
        this.shiftcandidate=[];
      }
    }
  },
  setup(props) {
 
    return {
      getIsUniformRequired: computed(() => props.shift.uniform ? 'Yes' : 'No'),
      getActionType: computed(() => props.actionType === 'accept' ? 'Accept shift' : 'Apply now')
    }
  },
}
</script>