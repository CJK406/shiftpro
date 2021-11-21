<template>
    
    <div class="text-center">
      <p class="Biotif-bold text-2xl mb-4 mt-12">Manage subscription</p>
   </div>
   <p class="text-center">What would you like to do?</p>
   <div class="grid lg:grid-cols-2 gap-4 mt-12">
        <div @click="change_subscription" class="large_content_shadow p-2 subscription_select_div cursor-pointer grid lg:col-span-1 lg:mt-0 mt-4 text-center">
            <div class="text-center">
            <SwitchVerticalIcon class="w-16 m-auto" style="color:#F1DF43" />
            <p class="font-extrabold text-xl pt-6" style="color:#111827">Change</p>
            </div>
            <p class="text-main  text-lg p-6" style="color:#727497">I want to change my subscription type</p>
        </div>
        <div @click="cancel_subscription" class="large_content_shadow p-2 subscription_select_div cursor-pointer grid lg:col-span-1 lg:mt-0 mt-4 text-center">
            <div class="text-center">
            <XCircleIcon class="w-16 m-auto" style="color:#F1DF43" />
            <p class="font-extrabold text-xl pt-6" style="color:#111827">Cancel & Quit</p>
            </div>
            <p class="text-main  text-lg p-6" style="color:#727497">Cancel my subscription and quit the app</p>
        </div>
   </div>
   <div class="text-center">
    <button @click="close_modal" class="secondary_button flex mt-8 m-auto"><XIcon style="color:#6B7280" class="w-5 mr-1 self-center" /> <span class="self-center text-gray-700">Close this window</span></button>
   </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
 

<script>
import {mapGetters,mapActions } from "vuex";
import { 
  SwitchVerticalIcon,
  XCircleIcon,
} from '@heroicons/vue/outline'
import { 
  XIcon
} from '@heroicons/vue/solid'
export default {
    
  components: {
      SwitchVerticalIcon,
      XCircleIcon,
      XIcon
  },
   data: () => ({
   }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
      ...mapActions({
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
        }),
      change_subscription(){
          const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'SubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small",action_type:'change',closeFlag:true}
                    };
            this.fetchtSetModalConfigs(data);
      },
      cancel_subscription(){
          const data = {
                        isOpen: true,
                        iconName: 'EmojiSadIcon',
                        componentName: 'CancelSubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
            this.fetchtSetModalConfigs(data);
      },
      close_modal(){
          const data = {
                        isOpen: false,
                        iconName: '',
                        componentName: '',
                        title: '',
                        data:{modal_type:'base'}
                    };
            this.fetchtSetModalConfigs(data);
      }
  },
  mounted () {
    
  },
}
</script>