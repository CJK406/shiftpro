<template>
 <Loader :loader_flag="loader_flag" />

<div class="grid lg:grid-cols-6 gap-8">  
  <div class="grid lg:col-span-4 relative mt-2 p-8 bg-white shadow-sm rounded-lg ">
      <div class="">
        <p class="text-gray-900 Biotif-regular font-extrabold text-2xl ">Add or change your bank details</p>
        <p class="text-desc text-sm mt-2">Safety of your information is very important to us. We handle your bank details via well renowned system to ensure that highest level of safety.</p>
      </div>
      <div class="grid lg:grid-cols-8 gap-2 mt-2 lg:h-36 pb-8 ">
          <div class="lg:col-span-2 text-center">
              <div class="text-center h-20">
              <img  class="w-20 h-20 m-auto" :src="require('../../../assets/images/stripe_heading.png')" />
              </div>
              <p class="text-main font-semibold text-sm ">Click button below to access our Stripe page:</p>
              <button @click="goStripe" class="primary_button w-36 m-auto mt-2"> Go to Stripe </button>
          </div>
          <div class="lg:col-span-1 lg:mt-0 mt-4 text-center self-center">
            <img v-if="!isMobile()" class="w-16 h-12 m-auto" :src="require('../../../assets/images/left_arraw.png')" />
            <img v-if="isMobile()" class="w-8 h-12 m-auto" :src="require('../../../assets/images/down_arraw.png')" />

          </div>
          <div class="lg:col-span-2 lg:mt-0 mt-4 text-center">
              <div class="text-center h-20">
              <img class="w-10 h-15 pt-4 m-auto" :src="require('../../../assets/images/stripe_2.png')" />

              </div>
              <p class="text-main font-semibold text-sm ">Provide the bank details you would like to use for employee payments</p>
          </div>
          <div class="lg:col-span-1 lg:mt-0 mt-4 text-center self-center">
            <img  v-if="!isMobile()" class="w-16 h-12 m-auto" :src="require('../../../assets/images/left_arraw.png')" />
            <img v-if="isMobile()" class="w-8 h-12 m-auto" :src="require('../../../assets/images/down_arraw.png')" />

          </div>
          <div class="lg:col-span-2 text-center">
              <div class="text-center h-20">
              <img class="w-10 h-15 pt-4 m-auto" :src="require('../../../assets/images/stripe_3.png')" />
              </div>
              <p class="text-main font-semibold text-sm ">All set! If you need to change the details, just repeat the same process.</p>
          </div>
      </div>
    </div>
  <div class="grid lg:col-span-2">
    <div class="relative mt-2  px-2 py-4 xl:py-4 rounded-3xl ">
            <CardWithIcon iconName="InformationCircleIcon" iconPosition="center">
            <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">The platform we use</h2>
            <div>
                <h3 class="font-bold mb-2 text-main">Stripe</h3>
                <p style="color:#727497" class=" text-sm">
                    Stripe has been audited by a PCI-certified auditor and is certified to PCI Service Provider Level 1. This is the most stringent level of certification available in the payments industry.
                    </p>
                    <p style="color:#727497" class="mb-5 text-sm mt-4">
                    Learn more about Stripe <a style="color:#049A59" class="font-bold" href="https://stripe.com/gb">here.</a>
                    </p>
            </div>
        </CardWithIcon>
    </div>
    </div>
</div>
</template>

<script>
import CardWithIcon from '@common/CardWithIcon'
import Loader from '@common/Loader.vue'

import {
  APIdoChangeSubscription
} from '@/api/common/api'
export default {
  components: {
      CardWithIcon,
      Loader
  },
   data: () => ({
    loader_flag:false,
   
  }),
  mounted() {
    let result = this.$route.query.result;
    if(result==="success"){
      this.$swal(
      {
          title:'Success',
          icon: 'success',
          confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
          customClass: {
            confirmButton: 'SuccessClosebutton'
          }
        }
      );
    }
    else if(result==="error"){
      this.$swal({title:"Oops!",
          icon: 'error',
          text:'Something went wrong!',
          confirmButtonText: 'Try again',
              customClass: {
                confirmButton: 'ErrorClosebutton'
              }
          }
      );
    }
	},
  methods: {
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    goStripe(){
      this.loader_flag = true;
      let post_data = {
        action:'session',
      }
      APIdoChangeSubscription(post_data).then((res) => {
          this.loader_flag = false;
          if(res.data.success){
            window.location.href = res.data.object.url;
          }
      })
    },
}
  
}
</script>