<template>
  <div>
    <div class="grid lg:grid-cols-2 gap-12">
          <Loader :loader_flag="loader_flag" />

        <div v-for="review in reviews" :key="review.id" class="lg:col-span-1 p-4" style=" box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); border-radius: 23px; ">
            <div class="flex">
                <img :src="review.photo" class="w-10 rounded-full" />
                <p class="text-black text-lg font-semibold ml-2 self-center" style="color:#111827">Georgi R.</p>
                <!-- <p class=" text-sm ml-auto mr-10 self-center">{{review.ago}}</p> -->
            </div>
            <star-rating active-color="#F1DF43" inactive-color="#D9DAE4" :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="true" :star-size="20" :rating="4"></star-rating>
           <p class="mt-4" style="color:727497;">{{review.review}}</p>
        </div>
        <p v-if="reviews.length===0">
          Employer does not have any reviews yet
        </p>
        
    </div>
            <ShiftsTable actionType="dashboard" />

  </div>
</template>

<script>

import {mapGetters,mapActions} from "vuex";
import StarRating from 'vue-star-rating'

import {
  APIfetchUserReview,
} from '@/api/candidate/api'
import Loader from '@common/Loader.vue'
export default {
  components: {
    StarRating,
    Loader
  },
  props: {
    employer_data: {
      user_id: String,
    },
  },
   data: () => ({
       reviews:[],
       loader_flag:false
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  watch: {
      employer_data : function(){
        APIfetchUserReview(this.employer_data.user_id)
            .then(response => {
                this.reviews = response.data.results
            });
      }
    },
  mounted() {
    this.loader_flag=true;
        APIfetchUserReview(this.employer_data.user_id)
        .then(response => {
            this.loader_flag=false;
            this.reviews = response.data.results
        });     
  }
  
}
</script>