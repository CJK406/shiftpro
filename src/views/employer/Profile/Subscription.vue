<template>
      <div class="lg:grid lg:grid-cols-4 gap-8">  
          <div class="lg:grid lg:col-span-3">
            <div class="lg:grid lg:grid-cols-2 gap-8 bg-white shadow-lg rounded-3xl">  
                <div>
                    <div :class="{'subscription_active_image_div':user_detail.sub_status==='active','subscription_inactive_image_div':user_detail.sub_status!=='active',}" class="lg:p-8 lg:pt-16 pt-16 p-4 pb-8 relative">
                        <img v-if="user_detail.sub_status==='active'" class="w-24 text-right absolute top-4 right-4" :src="require('../../../assets/sp-logo-w.png')" />
                        <img v-if="user_detail.sub_status!=='active'" class="w-24 text-right absolute top-4 right-4" :src="require('../../../assets/sp-logo.png')" />
                        <span 
                        :class="{'text-white':user_detail.sub_status==='active','text-blue-900':user_detail.sub_status!=='active'}"
                        class=" biotif-regular font-bold text-xl">{{user_detail.username}}</span>
                        <p 
                        :class="{'text-white':user_detail.sub_status==='active','text-blue-900':user_detail.sub_status!=='active'}"
                        class="text-sm font-semibold">Employer subscription</p>

                        <div v-if="user_detail.sub_status==='active'" class="grid grid-cols-2 mt-4">  
                            <div>
                                <p class="text-sm text-white-900">SUBSCRIPTION TYPE: </p>
                                <p class="text-white text-xs">
                                    {{user_detail.sp_plan_name}}
                                </p>
                            </div>
                            <div class="ml-auto"> 
                                <p class="text-sm text-white-800">Next PAYMENT:</p>
                                <p class="text-white text-xs">
                                    {{user_detail.sub_expires}}
                                </p>
                            </div>

                        </div>    
                        <div v-if="user_detail.sub_status!=='active'" class="mt-10">
                            <p class="text-sm text-blue-900">SUBSCRIPTION INACTIVE </p>
                        </div>    
                        

                    </div>
                </div>
                <div>
                     <div class="relative mt-2  px-6 xl:px-10 py-4 xl:py-4  ">
                        <div>
                            <div class="grid lg:grid-cols-1 gap-8">
                                <div class="grid lg:grid-col-1">
                                    <div v-if="user_detail.sub_status==='active'" class="flex">
                                        <div>
                                            <p style="color:#727497 ">Your subscription is</p>   
                                            <p class="text-4xl mb-2 text-black font-bold">Active</p>
                                        </div>
                                        <div class="p-3 w-12 h-12 self-center ml-16" style="background-color:rgb(4,154,89); border-radius:100px">
                                            <CheckIcon class="w-6 text-white" />
                                        </div>
                                    </div>
                                    <div v-if="user_detail.sub_status!=='active'" class="flex">
                                        <div>
                                            <p style="color:#727497 ">Your subscription is</p>   
                                            <p class="text-4xl mb-2 text-black font-bold">Inactive</p>
                                        </div>
                                        <div class="p-3 w-12 h-12 self-center ml-16" style="background-color:#A3A6CC; border-radius:100px">
                                            <XIcon class="w-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div> 
                        <button @click="changeSubscription" class="btn btn-full outline-none border-none bg-secondary hover:bg-secondary-light h-10 pb-2 lg:w-80 w-70 mt-8 lg:ml-auto m-auto biotif-regular">
                            {{user_detail.sub_status==='active' ? 'Change my subscription type':'Make a payment'}}
                        </button>
                    </div>   
                </div>
            </div>
            
          </div>
          <div class="grid lg:grid-span-1">
            <div class="relative lg:mt-2 mt-8  px-1 py-4 xl:py-4 bg-white shadow-lg rounded-3xl ">
                 <CardWithIcon iconName="LightBulbIcon" iconPosition="center">
                    <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Top tips</h2>
                    <div>
                        <h3 class="font-bold mb-2" style="color: #111827">Security</h3>
                        <p class="text-gray-500 mb-5 text-sm">This is some text about changing New e-mail address? Need a new password? No worries. Simply fill out the fields you’d like to change and press save changes.</p>
                        <p class="text-gray-500 text-sm">Note: you will need to provide existing password to save these changes.</p>
                    </div>
                </CardWithIcon>
            </div>
          </div>
          
      </div>
      
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import CardWithIcon from '@common/CardWithIcon'
import {
  APIdoGetSubscription
} from '@/api/common/api'
import { 
  CheckIcon,XIcon
} from '@heroicons/vue/solid'
export default {
  components: {
      CardWithIcon,
      CheckIcon,
      XIcon
  },
  data: () => ({
    subscribe_type : "1",
    business_size:'1',
    monthly_fee:60,
    annual_fee:504,
    subscriptions:[],
  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
      }),
     
    },
    mounted () {
        this.doGetUserData(3)
        APIdoGetSubscription(2).then((res) => {
            this.subscriptions  = res.data.results;
            this.subscription = this.subscriptions[0];
        });
    },
     watch: {
    },
    methods: {
      ...mapActions({
        // getShifts: 'candidate/getShifts',
        storeShiftKey :'candidate/storeShiftKey',
        fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
        doGetUserData: "authentication/doGetUserData",

       }),
       subscribeChange(event){
           this.subscribe_type = event.target.value;
            this.calculate_fee()
        },
       businessSizeChange(event){
           this.business_size = event.target.value;
           this.calculate_fee()
       },
       changeSubscription(){
           if(this.user_detail.sub_status==='active'){
               const data = {
                  isOpen: true,
                  iconName: 'TicketIcon',
                  componentName: 'SubscriptionModalContent',
                  title: '',
                  data:{modal_type:"small",action_type:'change',closeFlag:true}

              };
             this.fetchtSetModalConfigs(data);
           }
           else{
                const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'SubscriptionModalContent,closeFlag:true',
                        title: '',
                        data:{modal_type:"small"}
                    };
             this.fetchtSetModalConfigs(data);
           }
        //    const data = {
        //                 isOpen: true,
        //                 iconName: 'TicketIcon',
        //                 componentName: 'SubscriptionModalContent',
        //                 title: '',
        //                 data:{modal_type:"small",action_type:'change'}
        //             };
        //     this.fetchtSetModalConfigs(data);
       },
       calculate_fee(){
           if(this.business_size==="1"){
               this.monthly_fee = 60;
               this.annual_fee = 504;
           }
           if(this.business_size==="2-4"){
               this.monthly_fee = 110;
               this.annual_fee = 924;
           }
           if(this.business_size==="5-9"){
               this.monthly_fee = 160;
               this.annual_fee = 1344;
           }
           if(this.business_size==="10+"){
               this.monthly_fee = 220;
               this.annual_fee = 1680;
           }
       }
    }
 
}
</script>