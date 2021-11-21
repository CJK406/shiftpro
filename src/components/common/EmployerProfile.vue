<template>
<Loader :loader_flag="loader_flag" />

    <input style="position:absolute; bottom:9999999px" />

  <div>
    <div class="grid lg:grid-cols-3 gap-12">
        <div class="lg:col-span-3 mt-10">
            <div class="desk_view flex ml-4" >
                <div>
                    <img :src="employer_data.photo" class="w-24 rounded-full" />
                </div>
                <div class=" ml-8">
                    <p class="text-black text-3xl Biotif-bold">{{employer_data.username}}</p>
                    <div v-if="employer_data.rating!==''" class="flex rounded-3xl p-1 pl-4 pr-4 mt-2 pb-2" style="background-color:#A3A6CC"> 
                        <star-rating active-color="#F1DF43" inactive-color="#D9DAE4" v-if="employer_data.rating" :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="true" :star-size="20" :rating="employer_data.rating/20"></star-rating>
                        <span class="ml-1 mt-2 biotif self-center" style="color:#050A4D">{{employer_data.rating/20}}</span>
                    </div>
                    <div class="flex rounded-3xl p-1 pl-4 pr-4 mt-2 " style="background-color:#A3A6CC" v-if="employer_data.rating===''">
                      <p class="text-white">Not yet rated</p>
                    </div>
                </div>
                
            </div>
            <div class="mobile_view ml-4 text-center" >
                    <p class="text-black text-3xl Biotif-bold">{{employer_data.username}}</p>

                    <img :src="employer_data.photo" class="m-auto w-24 mt-4 rounded-full" />
                    <div v-if="employer_data.rating!==''" class="w-40 m-auto mt-4 flex rounded-3xl p-1 pl-4 pr-4 mt-2 pb-2" style="background-color:#A3A6CC"> 
                        <star-rating active-color="#F1DF43" inactive-color="#D9DAE4" v-if="employer_data.rating" :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="true" :star-size="20" :rating="employer_data.rating/20"></star-rating>
                        <span class="ml-1 mt-2 biotif self-center" style="color:#050A4D">{{employer_data.rating/20}}</span>
                    </div>
                    <div class="flex rounded-3xl p-1 pl-4 pr-4 mt-2 " style="background-color:#A3A6CC" v-if="employer_data.rating===''">
                      <p class="text-white">Not yet rated</p>
                    </div>
                
            </div>
            <p class="text-center" v-if="!getFlag">There is an error to get employer profile detail</p>
            <div class="flex mt-16 mb-8 border-b border-solid border-gray-300 pb-8">
                <span @click="changeTab(1)" class="lg:mr-8 mr-2 text-base cursor-pointer p-2" :class="{'profile_tab_active': activeTab===1, 'profile_tab_inactive' : activeTab!==1}">About us</span>
                <span @click="changeTab(2)" class="lg:mr-8 mr-2 text-base cursor-pointer p-2" :class="{'profile_tab_active': activeTab===2, 'profile_tab_inactive' : activeTab!==2}">Open shifts</span>
                <span @click="changeTab(3)" class="lg:mr-8 mr-2 text-base cursor-pointer p-2" :class="{'profile_tab_active': activeTab===3, 'profile_tab_inactive' : activeTab!==3}">Reviews</span>
                <!-- <button @click="openModal( employer_data.user_id, employer_data.photo, employer_data.username)" type="button" class="main_button">
                    <MailIcon class=" w-6 self-center" > </MailIcon>
                    <span class="mt-1 ml-1 self-center">Message</span>
                </button> -->
            </div>
        </div>
    </div>

    <div v-if="activeTab===2">
            <ShiftsTable :employer_data="employer_data" actionType="dashboard" ></ShiftsTable>
    </div>
    <div v-if="activeTab===1">
            <Aboutus :employer_data="employer_data" />
    </div>
    <div v-if="activeTab===3">
            <Review :employer_data="employer_data" />
    </div>
    <button @click="doFavorite(employer_data.user_id)" type="button" class="main_button ml-auto">
        <StarIcon class=" w-6" > </StarIcon>
        <span>Favourites</span>
    </button>
  </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>

import {mapGetters,mapActions} from "vuex";
import ShiftsTable from '@common/emplyerProfile-elements/Shifts'
import Aboutus from '@common/emplyerProfile-elements/About'
import Review from '@common/emplyerProfile-elements/Review'
import "../../common.css";
import Loader from '@common/Loader.vue'

import StarRating from 'vue-star-rating'
// import { MailIcon  } from '@heroicons/vue/solid'
import { StarIcon } from "@heroicons/vue/solid"
import {
  APIfetchEmployerProfile,
} from '@/api/candidate/api'

import {
  APIdoCandidatefavourite,
} from '@/api/candidate/api'
export default {
  components: {
    ShiftsTable,
    StarRating,
    // MailIcon,
    StarIcon,
    Aboutus,
    Review,
    Loader


  },
   data: () => ({
     employer_data : {rating:""},
     activeTab:1,
     getFlag:true,
     loader_flag:false
  }),
  computed: {
    ...mapGetters({
      getEmployerModalProperty:'candidate/getEmployerModalProperty',
    }),
  },
  methods: {
    ...mapActions({
      fetchUserReliability: 'candidate/fetchUserReliability',
      fetchMessageThread: 'candidate/fetchMessageThread',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',
    }),
    doFavorite(user_id){
      this.loader_flag= true;
      let post_data = {
            user_id : user_id
          };
      APIdoCandidatefavourite(post_data)
        .then(response => {
          this.loader_flag = false;
          if(response.data.success===false){
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
          else{
            this.$swal(
                {
                  title:'Successfully Added',
                  icon: 'success',
                  confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                  customClass: {
                    confirmButton: 'SuccessClosebutton'
                  }
                }
              );
          }
        })
    },
    changeTab(index){
        if(this.getFlag)
            this.activeTab=index;
    },
    updateEvent(){
        APIfetchEmployerProfile(this.getEmployerModalProperty.user_id)
            .then(response => {
                this.loader_flag = false;
                if(response.data.results.length>0){
                    this.employer_data = response.data.results[0];
                    this.getFlag=true;
                }
                else
                    this.getFlag=false
                    
            });
    },
     openModal (user_id, photo, username) {
      this.fetchUserReliability({id: 1})
      const message_data = {photo:photo,
                            reply_id:'', user_id: user_id, subject:'', user_name:username}
      const data = {
                isOpen: true,
                iconName: 'UserPhoto',
                componentName: 'NetworkModalContent',
                title: '',
                data:{modal_type:'base'}
                };
      this.fetchtSetModalConfigs(data);
      this.fetchtSetMessageModalConfigs(message_data);
    },
  },
  mounted() {
    this.loader_flag = true;
    setTimeout(() => {
        this.updateEvent()
    }, 1000);
  }
  
}
</script>