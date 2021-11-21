<template>
    <Loader :loader_flag="loader_flag" />

  <div class="text-center">
      <p class="Biotif-bold text-2xl mb-4 mt-12">{{ModalData.action_type==="change" ? 'Change your subscription' : 'Pay for your subscription'}}  </p>
  </div>
  <div > 
    <div v-if="ModalData.action_type==='change'" class="mb-8">
        <p class="mb-2 text-sm self-center" style="color:#727497">Your current subscription:</p>
        <div class="flex">
          <div class="w-6 h-6 self-center mr-2" style="background-color:#A5DC86; border-radius:100px">
              <CheckIcon class="w-6 text-white" />
          </div>
          <span class="text-black font-extrabold text-lg">{{getUserDetails.sp_plan_name}}</span>
        </div>
    </div>
    <div class="mb-2">
        <p class="font-bold  text-md self-center" style="color:#111827">{{ModalData.action_type==="change" ? 'Change' : ''}} Subscription type</p>
    </div>
    <select v-model="subscription" class="focus:ring-emerald focus:border-emerald text-gray-700 lg:mt-0 mt-4 font-semibold flex text-md border rounded-full p-2 w-full" style="border-color:#D1D5DB">
        <option v-for="sub in subscriptions" :key="sub.id" :value="sub">{{sub.sub_name}}</option>
    </select>
   </div>
   <div v-if="ModalData.action_type!=='change'" class="mt-4">
        <label for="company" class="block text-md font-bold text-gray-900">
        Card information
        </label>
        <div class="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" >
        <StripeElement :element="cardElement" @change="event = $event" />
        </div>
    </div>

    <div class="mt-4">
        <label for="company" class="block text-md font-bold text-gray-900">
       Discount code
        </label>
        <input v-model="discount_code" name="discount_code" id="discount_code" type="text"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm"/> 
    </div>
    <div class="text-center">
      <div class="flex text-center justify-center mt-8 mb-6">
          <button @click="makePayment" :disabled="button_disable" :class="{'disabled_button':button_disable}" class="primary_button ml-2 w-full">Make a {{ModalData.action_type==="change" ? 'change' : 'payment'}}</button>
      </div>
          <p class="w-4/5 m-auto" style="color:#727497">By confirming your subscription, you allow ShiftPRO to charge your card for this payment and future payments in accordance with their terms</p>

    </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>

<script>
// import { XIcon } from '@heroicons/vue/solid'
import Loader from '@common/Loader.vue'
import { useStore } from 'vuex'
import {
  APIdoGetSubscription,APIdoChangeSubscription
} from '@/api/common/api'
import {mapGetters, mapActions} from "vuex";
import { computed } from 'vue'
import { 
  CheckIcon 
} from '@heroicons/vue/solid'
import { useStripe, StripeElement } from 'vue-use-stripe'

export default {
    
  components: {
    //   XIcon
    StripeElement,
    Loader,
    CheckIcon
  },
   data: () => ({
       subscription:'',
       subscriptions:[],
       loader_flag:false,
       discount_code:'',
       button_disable:false
       
  }),
  computed: {
    ...mapGetters({
      getUserDetails: 'authentication/getUserDetails',
      getModalData: 'candidate/getModalData',

    }),
  },
  methods: {
      ...mapActions({
          fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      }),
      makePayment(){
          this.loader_flag = true;
          this.button_disable = true;
          let post_data = {
               action:this.ModalData.action_type ==="change" ? 'update' : 'create',
               price_id:this.subscription.price_id,
               code:this.discount_code
           }
            APIdoChangeSubscription(post_data).then((res) => {
                this.loader_flag = false;
                if(res.data.success){
                    if(this.ModalData.action_type!=="change"){
                      this.registerCard(res.data.object.clientSecret).then(
                        value => this.show_alert(value)
                      );
                    }
                    else{
                      const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'SubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small",closeFlag:true}
                      };
                      this.fetchtSetModalConfigs(data);
                      this.$swal(
                          {
                              title:'Successfully Changed',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
                    }
                }
                else{
                    this.button_disable = false;
                    const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'SubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small",closeFlag:false}
                      };
                      this.fetchtSetModalConfigs(data);

                    this.$swal({title:"Oops!",
                        icon: 'error',
                        text:res.data.message,
                        confirmButtonText: 'Try again',
                            customClass: {
                              confirmButton: 'ErrorClosebutton'
                            }
                        }).then((result) => {
                          if (result.isConfirmed) {
                            const data = {
                              isOpen: true,
                              iconName: 'TicketIcon',
                              componentName: 'SubscriptionModalContent',
                              title: '',
                              data:{modal_type:"small",closeFlag:true}
                            };
                            this.fetchtSetModalConfigs(data);
                          }
                        });
                }
            });
      },
      show_alert(value){
          const data = {
            isOpen: true,
            iconName: 'TicketIcon',
            componentName: 'SubscriptionModalContent',
            title: '',
            data:{modal_type:"small",closeFlag:value}
          };
          this.fetchtSetModalConfigs(data);
          if(value==="true")
            {
              
              this.$swal(
                          {
                              title:'Successfully Created',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
            }
          else
            {
              this.button_disable = false;
              this.$swal({title:"Oops!",
                          icon: 'error',
                          text:value,
                          confirmButtonText: 'Try again',
                              customClass: {
                                confirmButton: 'ErrorClosebutton'
                              }
                          }
                        ).then((result) => {
                          if (result.isConfirmed) {
                            const data = {
                              isOpen: true,
                              iconName: 'TicketIcon',
                              componentName: 'SubscriptionModalContent',
                              title: '',
                              data:{modal_type:"small",closeFlag:true}
                            };
                            this.fetchtSetModalConfigs(data);
                          }
                        });
            }
    }
  },
  mounted () {
        APIdoGetSubscription(this.getUserDetails.user_type).then((res) => {
            this.subscriptions  = res.data.results;
            this.subscription = this.subscriptions[0]
        });
    },
  setup() {
    const store = useStore()
    
    const {
      stripe,
      elements: [cardElement],
    } = useStripe({
      key: 'pk_test_51JGNTQFhwUUTqVBDAqC7nYWpgQVH9F9E29gFMoZ6InLi2sxWQSrl8tLMVbpkuH8CCF1sXUpbvNv0G6FpZDNhKkdJ00UIXlPlGh',
      elements: [{ type: 'card', options: {} }],
    })
    const registerCard = async (clientSecret) =>{
        let result1 = await stripe.value.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement.value,
          },
        }).then((result) => {
          if(result.error) {
            return result.error.message;
            } else {
              return "true";
						}
        })
        return result1
    }
    const closeModal = () => {
        store.commit('candidate/SET_MODAL_PROPS', {
        isOpen: false,
        iconName: '',
        componentName: '',
        title: ''
        })
    }
        
      return {
        stripe,
        registerCard,
        closeModal,
        ModalData:    computed(() => store.state.candidate.modal_data),
        cardElement,
      }
    }
}
</script>