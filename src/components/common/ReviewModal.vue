<template>
<Loader :loader_flag="loader_flag" />

  <div class="text-center">
      <p class="Biotif-bold text-2xl mb-4 mt-12">How was your shift?</p>
      <div class="flex">
        <img :src="user_photo" class="w-12 rounded-full" />
        <span class="text-lg ml-3 self-center text-base font-semibold text_username">
            {{ user_name }}
          </span>
      </div>
      <div class="flex mt-3">
        <p class="mr-3 self-center text-gray-900">Rate and review this {{user_detail.user_type===2 ? 'employer' :'candidate'}}:</p> 
        <star-rating v-model:rating="starRatingValue" class="self-center" active-color="#F1DF43" inactive-color="#D9DAE4" :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="false" :star-size="30" :rating="rate"></star-rating>
      </div>
      <textarea v-model="review_text" class="mt-4 h-40 w-full border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm"></textarea>
      <div v-if="user_detail.user_type===3" class="flex  mt-4">
        <p class="mr-3 self-center text-gray-900">Did the candiate show up on time?</p> 
        <select v-model="punctual" class="border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm">
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>
      <div  class="flex text-center justify-center mt-8 mb-6">
          <button v-on:click="closeModal()" class="secondary_button flex"><XIcon class="w-5 self-center mr-1" style="color:#6B7280"></XIcon><span class="self-center">Close this window</span></button>
          <button @click="submit" class="primary_button ml-2">Send review</button>
      </div>
      
  </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>
import { XIcon } from '@heroicons/vue/solid'
import { useStore } from 'vuex'
import {  mapActions, mapGetters } from "vuex";
import { computed } from 'vue'
import StarRating from 'vue-star-rating'
import {
  APIfetchCandidateProfile,APIdoEmployerReview
} from '@/api/employer/api'
import Loader from '@common/Loader.vue'

import {
  APIfetchEmployerProfile,APIdoReview
} from '@/api/candidate/api'
export default {
    
  components: {
      XIcon,
      StarRating,
      Loader
  },
   data: () => ({
     starRatingValue:5,
     user_photo:'',
     user_name:'',
     punctual:'0',
     loader_flag:false
  }),
   computed: {
      ...mapGetters({
        getModalData: 'candidate/getModalData',
      }),
     
    },
     mounted () {
       if(this.user_detail.user_type===2){
         APIfetchEmployerProfile(this.getModalData.user_id)
            .then(response => {
                this.loader_flag = false;
                if(response.data.results.length>0){
                    this.user_photo = response.data.results[0].photo;
                    this.user_name = response.data.results[0].fullname;
                }
            });
       }
       else{
          APIfetchCandidateProfile(this.getModalData.user_id)
            .then(response => {
                if(response.data.success===true){
                    this.user_photo = response.data.object.photo;
                    this.user_name = response.data.object.username;

                }
            });
       }
     },
  methods: {
       ...mapActions({
            fetachShiftRole: "candidate/fetachShiftRole",
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
        }),
        submit(){
          this.loader_flag=true;
          if(this.user_detail.user_type===2){
            let post_data = {
              review:this.review_text,
              user_id:this.getModalData.user_id,
              rating:this.starRatingValue*20,
            }
            APIdoReview(post_data)
            .then(response => {
                this.loader_flag=false;
                if(response.data.success){
                  this.$swal(
                    {
                      title:'Successfully Submitted',
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
                      text:response.data.message,
                      confirmButtonText: 'Try again',
                          customClass: {
                            confirmButton: 'ErrorClosebutton'
                          }
                      }
                  );
                }
            });
          }
          if(this.user_detail.user_type===3){
            let post_data = {
              review:this.review_text,
              user_id:this.getModalData.user_id,
              rating:this.starRatingValue*20,
              punctual:this.punctual
            }
            APIdoEmployerReview(post_data)
            .then(response => {
                this.loader_flag=false;
                if(response.data.success){
                  this.$swal(
                    {
                      title:'Successfully Submitted',
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
                      text:response.data.message,
                      confirmButtonText: 'Try again',
                          customClass: {
                            confirmButton: 'ErrorClosebutton'
                          }
                      }
                  );
                }
            });
          }

        },
     
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