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
                   
                    <div class="ml-3 h-7 flex items-center">
                      <button class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none border border-gray-300 rounded-full p-1" @click="closePanel">
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-1  px-10">
                  <div class="b-8">
                     <p class="text-center text-xl text-main font-semibold mt-2">{{shift.company}}</p>
                     <div class="flex items-center pt-1 mb-2">
                    </div>
                  </div>
                  <!-- Section -->
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
                    <button type="button" class="btn secondary_button flex border "><TrashIcon class="w-6 mr-1" style="color:#FFA1A1" /><span >Withdraw this offer</span></button>
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
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot ,XIcon} from '@headlessui/vue'
import { TrashIcon } from '@heroicons/vue/outline'
import Loader from '@common/Loader.vue'

import {mapGetters,mapActions} from "vuex";
import {
  APIapplyShift,
  // APIacceptShift
} from '@/api/candidate/api'
import {
  APIgetShiftCandidates,
} from '@/api/employer/api'
export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    // SearchIcon,
    TrashIcon,
    Loader
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
      FetchgetShiftsDashboard: "employer/FetchgetEmployerShifts",
      

        }),
        action_accept(){
          if(this.shift.status==="open"){
            this.loader_flag=true;
            APIapplyShift({shift_id:this.shift.id}).then((res) => {
              this.loader_flag=false;
              if(res.data.success===true){
               this.FetchgetShiftsDashboard("");
                
               this.$swal(
                          {
                              title:'Successfully applied',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
                this.closePanel();
                
              }
            });
          }
         
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