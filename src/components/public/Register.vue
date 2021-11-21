<template>
<Loader :loader_flag="loader_flag" />

    <div  class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         
      <PartOne v-if="!firstStage_complete"  @collectFields='collectFields'/>
      <div v-if="firstStage_complete">
        <div >
          <label for="company" class="block text-md font-bold text-gray-900">
            Subscription type
          </label>
          <p class="biotif text-2xl mt-2" style="color:#050A4D">£{{subscription.sub_price}} {{subscription.sub_period}}</p>
          <!-- <label class="text-gray-600">Save 30% by paying annually</label> -->
          <select v-model="subscription" class="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm">
            <option v-for="sub in subscriptions" :key="sub.id" :value="sub">{{sub.sub_name}}</option>
          </select>
        </div>
        <div class="mt-2">
          <label for="company" class="block text-md font-bold text-gray-900">
            Card information
          </label>
          <div class="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" >
            <StripeElement :element="cardElement" @change="event = $event" />
          </div>
        </div>
        <div class="mt-2">
          <label for="company" class="block text-md font-bold text-gray-900">
            Name on card
          </label>
          <input  name="company" id="company" type="text"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm"/> 
        </div>
        <div class="flex justify-center mt-4">
          <button @click="submitRegistration" class="btn btn-full bg-emerald">
            Make a payment
          </button>
        </div>
        <p class="text-center mt-4 text-sm">
          By confirming your subscription, you allow ShiftPRO to charge your card for this payment and future payments in accordance with their terms</p>

      </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import PartOne from './Register/PartOne'
import {mapGetters,mapActions} from "vuex";
import { useStripe, StripeElement } from 'vue-use-stripe'
import Loader from '@common/Loader.vue'

import {
  APIdoGetSubscription
} from '@/api/common/api'

import {
  APIdoRegistration
} from '@/api/authentication/api'

export default {
  components: {
    PartOne,
    StripeElement,
    Loader
  },
  
   data: () => ({
     fields_part1:[],
     firstStage_complete:false,
     subscriptions:[],
     subscription:{},
     register_result:{},
            loader_flag: false,

   }),
  mounted () {
     
    },
     watch: {
    },
    methods: {
      ...mapActions({
        doLogin :'authentication/doLogin'
      }),
      collectFields(fields){
          this.loader_flag=true;
          this.fields_part1 = fields;
          this.submitRegistration(fields)
      },
      get_subscription(){
        APIdoGetSubscription(this.fields_part1.usergroup).then((res) => {
            this.subscriptions  = res.data.results;
            this.subscription = this.subscriptions[0];
        });
      },
      backtofirst(){
          this.firstStage_complete=false;
      },
      submitRegistration(fields){
        let post_data = new FormData();
        post_data.append('email', fields.email);
        post_data.append('username', fields.username);
        post_data.append('firstname', fields.forename);
        post_data.append('surname', fields.surname);
        post_data.append('company', fields.company);
        post_data.append('password', fields.password);
        post_data.append('confirm', fields.confirm_password);
        post_data.append('postcode', fields.post_code);
        post_data.append('usergroup', fields.usergroup);
        post_data.append('action', 'register');
       setTimeout(() => {
         APIdoRegistration(post_data).then((res) => {
          this.loader_flag=false;
            if(res.data.results[0]['success']!==false){
                this.register_result = res.data.results[0];
                // this.registerCard(res.data.results[0].clientSecret);
                this.doLogin({
                  username: fields.username, 
                  password: fields.password,
                  action: 'login'
                })
            }
            else{
              this.$swal({title:"Oops!",
                        icon: 'error',
                        text:'Error creating account',
                        confirmButtonText: 'Try again',
                            customClass: {
                              confirmButton: 'ErrorClosebutton'
                            }
                        }
                    );
            }
            
        });
       }, 100);
      }
    },
    computed: {
      ...mapGetters({
      }),
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
    
     const registerCard = (clientSecret) => {
        // Refer to the official docs to see all the Stripe instance properties.
        // E.g. https://stripe.com/docs/js/setup_intents/confirm_card_setup
        stripe.value.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement.value,
          },
        })
    }
   

    return {
      registerCard,
      cardElement,
      isEmailTaken:      computed(() => store.state.authentication.isEmailTaken),
      getRegisterFailure: computed(() => store.getters['authentication/getRegisterFailure']),
      getIsFirstStageVisible: computed(() => store.getters['authentication/getIsFirstStageVisible']) 
    }
  },
}
</script>
