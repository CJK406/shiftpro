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


import {mapGetters,mapActions} from "vuex";
import Compliance from './Compliance.vue'

// import Security from '@candidate/Profile/Security'
import Personal from '@candidate/Profile/Personal'
import Public from '@candidate/Profile/Public'
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
    Compliance,
    Personal,
    Public,
    CardWithIcon,
    StarRating,
    VPagination,
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