<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="getIsModalOpen">
    <Dialog   as="div" 
              static   
              :open="getIsModalOpen"  
              @close="closeModal"
              class="fixed inset-0 overflow-y-auto"
              style="z-index:99999999"
              >
              
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild  as="template" 
                          enter="ease-out duration-300" 
                          enter-from="opacity-0" 
                          enter-to="opacity-100" 
                          leave="ease-in duration-200" 
                          leave-from="opacity-100" 
                          leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen " aria-hidden="true">&#8203;</span>
        <TransitionChild  as="template" 
                          enter="ease-out duration-300" 
                          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
                          enter-to="opacity-100 translate-y-0 sm:scale-100" 
                          leave="ease-in duration-200" 
                          leave-from="opacity-100 translate-y-0 sm:scale-100" 
                          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" 
          :class="{'sm:max-w-xl': getModalData.modal_type==='small','sm:max-w-4xl': getModalData.modal_type==='base', 'sm:max-w-7xl': getModalData.modal_type==='big'}">
            <!-- Start Modal Head -->
            <div v-if="getIconName!=='UserPhoto'" class="absolute flex items-center justify-center w-14 h-14 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-around-sm">
                  <IconGenerator :iconName="getIconName" class="h-8 w-8 text-tertiary" />
            </div>
            <div v-if="getIconName=='UserPhoto'" class="rounded-full	 absolute flex items-center justify-center w-20 h-14 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-md shadow-around-sm">
                  <img :src="MessageModalData.photo" class="rounded-full	" />
            </div>
            <DialogTitle v-if="getIconName!=='UserPhoto'" as="h3" class="text-xl  text-gray-900 font-bold"> {{getTitle}} </DialogTitle>
            <!-- Start Body -->
            <component v-bind:is="getModalBody" />
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { 
  Dialog, 
  DialogOverlay, 
  DialogTitle, 
  TransitionChild, 
  TransitionRoot
} from '@headlessui/vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import IconGenerator from '@common/IconGenerator'

// Below is a list of the components that can be rendered in the modal body
import EmploymentDetailsForm from '@candidate/forms/EmploymentDetailsForm'
import SettingsForm from '@candidate/forms/SettingsForm'
import SubscriptionForm from '@candidate/forms/SubscriptionForm'
import NetworkModalContent from '@candidate/NetworkModalContent'
import EmployerProfile from '@common/EmployerProfile'
import CandidateProfile from '@common/CandidateProfile'
import InactiveSubscriptionModalContent from '@common/InactiveSubscriptionModalContent'
import InactiveComplianceModalContent from '@common/InactiveComplianceModalContent'
import SubscriptionModalContent from '@common/SubscriptionModalContent'
import AddShiftModalContent from '@employer/AddShiftModalContent'
import EditShiftModalContent from '@employer/EditShiftModalContent'
import ApplicantsModalContent from '@employer/ApplicantsModalContent'

import StaffSearchModalContent1 from '@employer/StaffSearchModalContent1'
import DirectOfferModal from '@employer/DirectOfferModal'
import ConfirmTimeSheetModal from '@employer/ConfirmTimeSheetModal'
import AddLocationModalContent from '@employer/Profile/LocationTable/AddLocationModalContent'
import ManageSubscriptionModalContent from '@common/ManageSubscriptionModalContent'
import CancelSubscriptionModalContent from '@common/CancelSubscriptionModalContent'
import EmployerSubmitTimeSheetModalContent from '@employer/SubmitTimeSheetModalContent'
import CandidateSubmitTimeSheetModalContent from '@candidate/SubmitTimeSheetModalContent'
import SubmitIncorrectTimeSheetModalContent from '@employer/SubmitIncorrectTimeSheetModalContent'
import CandidateAcceptTimeSheetModalContent from '@candidate/CandidateAcceptTimeSheetModalContent'
import ReviewModal from '@common/ReviewModal'
import AddBankDetailModal from '@candidate/AddBankDetailModal'


import {mapGetters,mapActions} from "vuex";
export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    IconGenerator,
    EmploymentDetailsForm,
    SettingsForm,
    SubscriptionForm,
    NetworkModalContent ,
    EmployerProfile,
    CandidateProfile,
    AddShiftModalContent,
    EditShiftModalContent,
    ApplicantsModalContent,
    StaffSearchModalContent1,
    DirectOfferModal,
    ConfirmTimeSheetModal,
    AddLocationModalContent,
    InactiveSubscriptionModalContent,
    InactiveComplianceModalContent,
    SubscriptionModalContent,
    ManageSubscriptionModalContent,
    CancelSubscriptionModalContent,
    EmployerSubmitTimeSheetModalContent,
    CandidateSubmitTimeSheetModalContent,
    SubmitIncorrectTimeSheetModalContent,
    CandidateAcceptTimeSheetModalContent,
    ReviewModal,
    AddBankDetailModal
  },
  computed: {
    ...mapGetters({
      getModalData: 'candidate/getModalData',
    }),
  },
  methods: {
    ...mapActions({
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
    }),
    closeModal(){
      let closeF = true;
      if(this.getModalBody==="CandidateProfile" && this.getModalData.FromStaffSearch){
          closeF = false;
          const data = {
            isOpen: true,
            iconName: 'SearchIcon',
            componentName: this.getModalData.FromStaffSearchContent==="staffSearch" ? 'StaffSearchModalContent1': 'ApplicantsModalContent',
                        title: '',
            data:{shift_id:this.getModalData.shift_id,modal_type:'big'}
          };
          this.fetchtSetModalConfigs(data);
      }
      if(this.getModalBody==="SubscriptionModalContent" && !this.getModalData.closeFlag){
          closeF = false;
      }
      if(closeF)
      {
        const data = {
          isOpen: false,
          iconName: '',
          componentName: '',
          title: '',
          data:{}

        };
        this.fetchtSetModalConfigs(data);
      }
    }
  },

  setup() {
    const store = useStore()  
 
    return {
      getModalBody:   computed(() => store.state.candidate.modal_body ),
      getIsModalOpen: computed(() => store.state.candidate.modal_is_open),
      getTitle:       computed(() => store.state.candidate.modal_title),
      getIconName:    computed(() => store.state.candidate.modal_icon_name),
      MessageModalData:    computed(() => store.state.candidate.message_data),
    }
  }
}
</script>