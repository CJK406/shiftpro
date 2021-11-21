<template>
  <div class="text-center">
      <p class="Biotif-bold text-2xl mb-4 mt-12">Compliance is not complete</p>
      <p style="color:#727497">Click below to complete your compliance</p> 
      <div class="flex text-center justify-center mt-8 mb-6">
          <button v-on:click="closeModal()" class="secondary_button flex"><XIcon class="w-5 self-center mr-1" style="color:#6B7280"></XIcon><span class="self-center">Cancel</span></button>
          <button @click="completeCompliance" class="primary_button ml-2">Complete compliance</button>
      </div>
  </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>
import { XIcon } from '@heroicons/vue/solid'
import { useStore } from 'vuex'
import {  mapActions } from "vuex";
import { computed } from 'vue'

export default {
    
  components: {
      XIcon
  },
   data: () => ({
  }),
  methods: {
       ...mapActions({
            fetachShiftRole: "candidate/fetachShiftRole",
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',

        }),
      completeCompliance(){
        const data = {
                        isOpen: false,
                        iconName: 'TicketIcon',
                        componentName: 'SubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small",closeFlag:true}
                    };
            this.fetchtSetModalConfigs(data);
         window.location.href = this.user_detail.user_type===2 ? '#/candidate/profile' : '#/employer/profile'
      }
  },
  setup() {
    const store = useStore()  

        const closeModal = () => {
          store.commit('candidate/SET_MODAL_PROPS', {
            isOpen: false,
            iconName: '',
            componentName: '',
            title: ''
          })
        }
      return {
         user_detail: computed(() => store.getters['authentication/getUserDetails']),
        closeModal
      }
    }
}
</script>