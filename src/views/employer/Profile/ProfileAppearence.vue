<template>
  <div class="grid lg:grid-cols-9 gap-8">  
    <div class="grid lg:col-span-6">
      <div class="relative">
       
                <Public />
                <Personal />
                <!-- <Security /> -->
      </div>
    </div>
    <div class="grid lg:col-span-3">
      <div class="relative  px-2 rounded-3xl ">
          <!-- <CardWithIcon iconName="ShieldCheckIcon" iconPosition="center">
              <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Compliance check </h2>
              <div class="flex">
                <div class="p-2 w-10 h-10 self-center" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div class="ml-3">
                  <p class="text-gray-900 text-base">Liability insurance check</p>
                  <p class="text-desc mt-1 text-sm">Check passed.</p>
                </div>
              </div>
              <div class="flex mt-8">
                <div class="p-3 w-10 h-10 self-center" style="border:2px solid rgb(4,154,89); border-radius:100px">
                  <div style="background-color:rgb(4,154,89); border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">Safety in the workplace</p>
                  <p class="text-desc mt-1 text-sm"><span style="color:#049A59;" class="font-bold">Upload</span> your policies regarding Health and Safety, Fire Strategies and anything else your staff needs to know.</p>
                </div>
              </div>
              <div class="flex mt-8">
                <div class="p-3 w-10 h-10 self-center" style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-500">Signed contract</p>
                  <p class="text-gray-500 mt-1 text-sm">Check your e-mail and return signed contract to us.</p>
                </div>
              </div>
              <div class="flex mt-8">
                <div class="p-3 w-10 h-10 self-center" style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-500">Direct Debit set up</p>
                  <p class="text-gray-500 mt-1 text-sm">Set up your direct debit to automate wage payment process <span class="font-bold">here.</span></p>
                </div>
              </div>
              <div class="flex mt-8">
                <div class="p-3 w-10 h-10 self-center" style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-500">Compliance check passed</p>
                  <p class="text-gray-500 mt-1 text-sm">Get your profile ready and browse available staff here.</p>
                </div>
              </div>
              
          </CardWithIcon> -->
       <Compliance />
          

          <CardWithIcon class="mt-10" iconName="ChartBarIcon" iconPosition="center">
              <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Reviews </h2>
              <div class="mb-8" v-for="review in review_view" :key="review">
                <div class="flex">
                      <p class="text-black text-lg font-semibold  self-center" style="color:#111827">{{review.username}}</p>
                  </div>
                  <star-rating active-color="#F1DF43" inactive-color="#D9DAE4" :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="true" :star-size="20" :rating="5"></star-rating>
                <p class="mt-4" style="color:727497;">{{review.review}}</p>
              </div>
               <div v-if="reviews.length===0" class="text-center text-gray-500 text-base">
                  <span>There is no reviews</span>
              </div>
             
              <div class="pagination_div">
              <v-pagination
                  v-if="reviews.length!==0"
                  v-model="page"
                  :pages="Math.ceil(this.reviews.length/3)"
                  :range-size="1"
                  active-color="#DCEDFF"
                  @update:modelValue="updateHandler"
                />
          </div>
             
              
          </CardWithIcon>
      </div>
      
    </div>
  </div>
</template>
<style type="text/css">
@import "../../../common.css";
</style>
<script>

import Compliance from './Compliance.vue'

import {mapGetters,mapActions} from "vuex";
// import Security from '@employer/Profile/Security'
import Personal from '@employer/Profile/CompanyDetail'
import Public from '@employer/Profile/Keydetail'
import CardWithIcon from '@common/CardWithIcon'
import StarRating from 'vue-star-rating'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {
  APIfetchUserReview,
} from '@/api/candidate/api'
export default {
  components: {
    // Security,
    Personal,
    Public,
    Compliance,
    CardWithIcon,
    StarRating,
    VPagination
  },
   data: () => ({
     page:1,
     reviews:[],
     review_view:[]
  }),
  computed: {
    ...mapGetters({
        user_detail:'authentication/getUserDetails',

    }),
  },
  methods: {
    ...mapActions({
    }),
    updateHandler() {
        this.review_view=[];
        let a = this.reviews.length<this.page*3 ? this.reviews.length :this.page*3;
        for(let i=(this.page-1)*3;  i<a; i++){
          this.review_view.push(this.reviews[i]);
        }
    }
  },
  mounted() {
    APIfetchUserReview(this.user_detail.user_id)
      .then(response => {
        this.reviews = response.data.results

        let a = this.reviews.length<this.page*3 ? this.reviews.length :this.page*3;
        for(let i=(this.page-1)*3;  i<a; i++){
          this.review_view.push(this.reviews[i]);
        }
          this.loader_flag=false;
      });    
  }
  
}
</script>