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
              
              <div class="h-full pt-4 flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                 <div class="ml-3 h-7 flex items-center ml-auto mr-4">
                      <button class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none border border-gray-300 rounded-full p-1" @click="closePanel">
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-center">
                    <DialogTitle class="text-3xl text-center text-main  Biotif-bold">
                      {{shift.role}}
                    </DialogTitle>
                   
                   
                  </div>
                </div>
                <div class="mt-1  px-10">
                  <div class="b-8">
                     <p class="text-center text-gray-500">{{shift.company}}</p>
                  </div>
                  <!-- Section -->
                   <div class="py-6" v-if="shift.applicants.length>0">
                    <h3 class="text-gray-900 mb-2 font-bold">Applicants: </h3>
                    <div class="flex">
                      <div v-if="shift.applicants.length>0" class="w-12 h-12 bg-gray-400 rounded-full border-2 border-white">
                        <img @click="viewProfile(shift.applicants[0].user_id)" class="rounded-full w-full" :src="shift.applicants[0].photo" />
                      </div>
                      <div v-if="shift.applicants.length>1" style="margin-left:-14px" class="w-12 h-12 bg-gray-400 rounded-full border-2 border-white">
                        <img @click="viewProfile(shift.applicants[1].user_id)" class="rounded-full w-full" :src="shift.applicants[1].photo" />
                      </div>
                      <div v-if="shift.applicants.length>2" style="margin-left:-14px" class="w-12 h-12 bg-gray-400 rounded-full border-2 border-white">
                        <img @click="viewProfile(shift.applicants[2].user_id)" class="rounded-full w-full" :src="shift.applicants[2].photo" />
                      </div>
                      <div v-if="shift.applicants.length>3" style="margin-left:-14px" class="w-12 h-12 bg-gray-400 rounded-full border-2 border-white">
                        <img @click="viewProfile(shift.applicants[3].user_id)" class="rounded-full w-full" :src="shift.applicants[3].photo" />
                      </div>
                       <div v-if="shift.applicants.length>4" style="margin-left:-14px" class="w-12 h-12 bg-gray-400 rounded-full border-2 border-white">
                        <img @click="viewProfile(shift.applicants[4].user_id)" class="rounded-full w-full" :src="shift.applicants[4].photo" />
                      </div>
                      <div v-if="shift.applicants.length>5" style="margin-left:-14px" class="flex text-center w-12 h-12 bg-gray-600 rounded-full border-2 border-white">
                        <span class="self-center m-auto text-white text-lg font-bold">5+</span>
                      </div>

                       <button  type="button" @click="openApplicantsModal"
                        class="flex ml-2 text-gray-600 hover:text-emerald secondary_button">
                          <UsersIcon class=" w-5 " > </UsersIcon>
                          <span class="ml-2 ">Applicants</span>
                        </button>

                    </div>
                    
                  </div>      
                  <div class="py-2 flex justify-center">
                    <button type="button" class="btn primary_button w-full justify-center flex" v-on:click="openStaffSearchModal"><SearchIcon class="w-6 mr-1" /><span>Search for staff</span></button>
                  </div>  
                  <div class="py-6 border-t border-b border-solid border-gray-200 ">
                    <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift ID: </span><span class="">{{shift.id}}</span></p>
                    <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift starts: </span><span class="">{{shift.start_time_formatted}}</span></p>
                    <p class="flex items-center pb-2"><span class="text-gray-900 font-bold  mr-2">Shift ends: </span><span class="">{{shift.end_time_formatted}} </span></p>
                    <p class="flex pb-2"><span class="text-gray-900 font-bold  mr-2">Rate: </span><span>&pound;{{shift.rate}}</span></p>
                    <p class="flex pb-2"><span class="text-gray-900 font-bold  mr-2">Hours: </span><span>{{shift.duration.hours}} </span></p>
                    
                    <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Location: </span><span class="text-sm">{{shift.postcode}}</span></p>
                    <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Uniform required: </span><span>{{shift.uniform}}</span></p>
                    
                    <!-- <p class="flex pb-2"><span class=" text-gray-900 font-bold  mr-2">Distance: </span><span>{{shift.distance}}</span></p> -->
                  </div> 
                  <!-- Section --> 
                  <div class="py-6">
                    <h3 class="text-gray-900 font-bold mb-2 ">Shift description: </h3>
                    <div v-html="shift.description" class="text-base text-main-light">  </div>
                  </div>    
                  <div class="flex items-center pt-3">
                       
                       <button @click="EditShift(shift.id)" type="button"
                        class="flex m-auto mt-2 w-40 justify-center hover:text-emerald secondary_button">
                          <PencilAltIcon class=" w-6 " > </PencilAltIcon>
                          <span class="ml-2 self-center">Edit</span>
                        </button>

                        <button @click="openDuplicateShiftModal(shift.id)" type="button"
                        class="flex m-auto mt-2 w-40 justify-center hover:text-emerald secondary_button">
                          <PencilAltIcon class=" w-6 " > </PencilAltIcon>
                          <span class="ml-2 self-center">Duplicate</span>
                        </button>
                       
                    </div>
                  <div class="py-1 flex justify-center">
                    <button type="button" class="secondary_button hover:text-emerald flex" ><TrashIcon class="w-6 mr-1" style="color:#FFA1A1" /><span>Remove</span></button>
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
import { PencilAltIcon ,SearchIcon,TrashIcon } from '@heroicons/vue/outline'
import {UsersIcon, XIcon } from '@heroicons/vue/solid'

// import StarRating from 'vue-star-rating'
// import {/* StarIcon ,*/ PhoneIcon, AnnotationIcon } from '@heroicons/vue/outline'
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
    SearchIcon,
    TrashIcon,
    PencilAltIcon,
    UsersIcon,
    Loader
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
        openApplicantsModal(){
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'ApplicantsModalContent',
                        title: '',
                        data:{shift_id:this.shift.id,modal_type:'big'}
                    };
            this.closePanelModal();
            this.fetchtSetModalConfigs(data);
            this.fetchtSetEditShiftModalConfigs({id:this.shift.id});
        },
        openStaffSearchModal(){
            const data = {
                        isOpen: true,
                        iconName: 'SearchIcon',
                        componentName: 'StaffSearchModalContent1',
                        title: '',
                        data:{shift_id:this.shift.id,modal_type:'big'}

                    };
            this.closePanelModal();
            this.fetchtSetModalConfigs(data);
            this.fetchtSetEditShiftModalConfigs({id:this.shift.id});
        },
        
        action_accept(){
          if(this.shift.status==="open"){
            this.loader_flag=true;
            APIapplyShift({shift_id:this.shift.id}).then((res) => {
              this.loader_flag=false;
              if(res.data.success===true){
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
        get_shiftCandidate(){
            APIgetShiftCandidates(this.shift.id).then((res) => {
                this.shiftcandidate = res.data.results;
            })
        },
        EditShift(id){
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'EditShiftModalContent',
                        title: '',
                        data:{type:'edit',modal_type:'base'}


                    };
            this.fetchtSetModalConfigs(data);
            this.fetchtSetEditShiftModalConfigs({id:id});
            this.closePanel();
        },
        openDuplicateShiftModal(id){
        const data = {
                    isOpen: true,
                    iconName: 'ClipboardCheckIcon',
                    componentName: 'EditShiftModalContent',
                    title: '',
                    data:{type:'duplicate',modal_type:'base'}

                };
        this.fetchtSetModalConfigs(data);
        this.fetchtSetEditShiftModalConfigs({id:id});
        this.closePanel();
    },
        closePanel(){
          this.closePanelModal();
        }
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