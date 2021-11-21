<!-- This example requires Tailwind CSS v2.0+ -->
<template>
<Loader :loader_flag="loader_flag" />

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed inset-0 overflow-hidden" @close="closePanel" :open="open">
      
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0 bg-black opacity-30" />
        <div class="fixed inset-y-0 right-0 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="w-screen max-w-md">
              <div class="h-full pt-20 flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="mt-2 m-auto text-3xl text-center text-main  Biotif-bold">
                      {{shift.role}}
                    </DialogTitle>
                    <div class="ml-3 h-7 flex items-center absolute right-6">
                      <button class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none border border-gray-300 rounded-full p-1" @click="closePanel">
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-2  px-10">
                  <div class="py-2">
                    <div class="flex">
                        <div class="mr-4 flex-shrink-0 self-center">
                             <img class="inline-block h-14 w-14 rounded-full" v-bind:src="shift.employer_photo" :alt="shift.company" />
                        </div>
                        <div>
                          <h4 class="text-gray-900 text-lg mb-1 font-medium">{{shift.company}}</h4>
                          <!-- <p>{{ shift.role }}</p> -->
                          <star-rating  :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="true" :star-size="25" 
                          :rating="shift.rating/20"></star-rating> 
                        </div>
                      </div>   
                     <div class="flex items-center pt-6 pb-4">
                        <button type="button" class="btn primary_button w-full justify-center" v-if="shift.applied===false"  v-on:click="action_accept">{{shift.user_status==="requested" ? "Accept shift " : "Apply now"}}</button>
                        <button type="button" style="background-color:#83D3B1" class="btn shadow-around-sm primary_button w-40 justify-center" v-if="shift.applied===true" disabled >Applied</button>
                        <button v-if="shift.applied===true" type="button"
                        class="flex m-auto mt-2 hover:text-emerald secondary_button shadow-around-sm w-40 justify-center">
                          <XIcon class=" w-5 " > </XIcon>
                          <span class="ml-1">Witdraw</span>
                        </button>
                       <!-- <button @click="viewProfile(shift.user_id)" type="button"
                        class="flex m-auto mt-2 hover:text-emerald secondary_button shadow-around-sm w-40 justify-center">
                          <UserIcon class=" w-5 " > </UserIcon>
                          <span class="ml-1">View Profile</span>
                        </button> -->
                       <!-- <a href="/" class="flex items-center p-3 text-gray-700  border border-solid border-gray-200 rounded-3xl shadow-lg">
                          <AnnotationIcon class="  w-6 h-6" /><span class="ml-2">Message</span>
                       </a> -->
                    </div>
                  </div>
                  <!-- Section -->
                  <div class="py-3 border-t border-b border-solid border-gray-200 ">
                   <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift ID: </span><span class="">{{shift.id}}</span></p>

                    <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift starts: </span><span class="">{{shift.start_time_formatted}}</span></p>
                    <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift ends: </span><span class="">{{shift.end_time_formatted}} </span></p>
                    <p class="flex pb-2"><span class="text-gray-900 font-bold  mr-2">Rate: </span><span>&pound;{{shift.rate}}</span></p>
                    <p class="flex pb-2"><span class="text-gray-900 font-bold  mr-2">Hours: </span><span>{{shift.duration.hours}}</span></p>

                    <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Location: </span><span>{{shift.postcode}}</span></p>
                    <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Uniform required: </span><span>{{shift.uniform===0 ? "No" : "Yes"}}</span></p>
                  </div> 
                  <!-- Section --> 
                  <div class="py-6">
                    <h3 class="text-gray-900 mb-2 font-bold">Shift Description: </h3>
                    <div v-html="shift.description" class="text-base text-main-light">  </div>
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
import {useStore} from 'vuex'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'
import { SET_PANEL_STATE } from '@/store/modules/candidate/elements/mutation-types'
import StarRating from 'vue-star-rating'
import Loader from '@common/Loader.vue'

import {mapGetters,mapActions} from "vuex";
import {
  APIapplyShift,
  // APIacceptShift
} from '@/api/candidate/api'
export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    StarRating,
    Loader
  },
   data: () => ({
        loader_flag: false,
        rating:3.5,
        duration_min:0

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
    }),
  },
  mounted() {
     if(this.shift.rating!==undefined)
        this.rating = this.shift.rating/20;
  },
   methods: {
      ...mapActions({
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchSetEmployerModalConfigs: 'candidate/fetchSetEmployerModalConfigs',
      closePanelModal: 'candidate/closePanelModal',
      FetchgetShiftsDashboard: "candidate/FetchgetShiftsDashboard",

        }),
        action_accept(){
          APIdoGetSubscriptionActive().then((res) => {
            if(res.data.results[0].compliance_complete===0){
              this.closePanelModal();
              const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'InactiveComplianceModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
              this.fetchtSetModalConfigs(data);
            }
            else if(res.data.results[0].sub_status===0){
              this.closePanelModal();
              const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'InactiveSubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
              this.fetchtSetModalConfigs(data);

            }
            else{
                if(this.shift.status==="open"){
                  this.loader_flag=true;
                  APIapplyShift({shift_id:this.shift.id}).then((res) => {
                    this.loader_flag=false;
                    if(res.data.success===true){
                      this.FetchgetShiftsDashboard("", "");
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
            }
          })
         
        },
        viewProfile(userid){
          this.closePanelModal();
          this.fetchSetEmployerModalConfigs({user_id:userid})
          const data = {
                    isOpen: true,
                    iconName: 'UserIcon',
                    componentName: 'EmployerProfile',
                    title: '',
                    data:{modal_type:'base'},
                  };
          this.fetchtSetModalConfigs(data);
        },
  },
  watch: {
    open : function(){
    }
  },
  setup(props) {
    const store = useStore() 
    const closePanel = () => {
      
    store.commit('candidate/' + SET_PANEL_STATE, {
        isOpen: false
      })
    }

    return {
      open: computed(() => store.getters['candidate/getPanelState']),
      closePanel,
      getIsUniformRequired: computed(() => props.shift.uniform ? 'Yes' : 'No'),
      getActionType: computed(() => props.actionType === 'accept' ? 'Accept shift' : 'Apply now')
    }
  },
}
</script>