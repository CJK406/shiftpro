<template>
    
    <div class="text-center">
      <p class="Biotif-bold text-2xl mb-4 mt-12">Cancel subscription</p>
   </div>
   <p class="text-center">We are sad to see you go. Remember you can always reinstate your account with us by activating your subscription.</p>
   <div class="grid lg:grid-cols-2 gap-4 mt-12">
        <div @click="cancel_subscription" class="large_content_shadow p-2 subscription_select_div cursor-pointer grid lg:col-span-1 lg:mt-0 mt-4 text-center">
            <div class="text-center">
            <XCircleIcon class="w-16 m-auto" style="color:#F1DF43" />
            <p class="font-extrabold text-2xl pt-4" style="color:#111827">Cancel</p>
            </div>
            <p class="text-main  text-lg p-4" style="color:#727497">Cancel my subscription and quit the app</p>
        </div>
        <div @click="close_modal" class="large_content_shadow p-2 subscription_select_div cursor-pointer grid lg:col-span-1 lg:mt-0 mt-4 text-center">
            <div class="text-center">
            <EmojiHappyIcon class="w-16 m-auto" style="color:#F1DF43" />
            <p class="font-extrabold text-2xl pt-4" style="color:#111827">No, I want to stay!</p>
            </div>
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
  EmojiHappyIcon,
  XCircleIcon,
} from '@heroicons/vue/outline'
import { 
  XIcon
} from '@heroicons/vue/solid'
import {
  APIdoChangeSubscription
} from '@/api/common/api'
export default {
    
  components: {
      XIcon,
      EmojiHappyIcon,
      XCircleIcon
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
      cancel_subscription(){
        let post_data = {
               action:'cancel',
           }
        this.$swal({
            title: 'Cancel Subscription',
            text:"Are you sure you want to cancel current subscription?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#049A59',
            cancelButtonColor: 'rgba(255,0,0,0.7)',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',

            }).then((result) => {
                if (result.isConfirmed) {
                   APIdoChangeSubscription(post_data).then((res) => {
                      this.loader_flag = false;
                      if(res.data.success){
                        this.$swal(
                          {
                            title:'Successfully Canceled',
                            icon: 'success',
                            confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                            customClass: {
                              confirmButton: 'SuccessClosebutton'
                            }
                          }
                          );
                      }
                      else{
                        this.$swal({title:"Oops!",
                            icon: 'error',
                            text:res.data.message,
                            confirmButtonText: 'Try again',
                                customClass: {
                                  confirmButton: 'ErrorClosebutton'
                                }
                            }
                        );
                      }

                  })
                }
            })   
           
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