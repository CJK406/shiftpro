<template>
 <Loader :loader_flag="loader_flag" />

  <div>
    <div v-if="directOfferFlag" class="text-center lg:p-20">
    <button v-on:click="back" class="text-green-600 font-bold flex mb-4"><ArrowLeftIcon class="w-5 mr-1 self-center" /> <span>Back</span></button>
      <p class="Biotif-bold text-2xl mb-4">Direct Offer</p>
      <p>Pick a shift you would like to offer to {{employer_data.username}}.</p>
        <select v-model="shift_select" 
            class="  text-gray-700 lg:mt-0 mt-2 mb-4 flex text-md border rounded p-2 w-full" style="border-color:#D1D5DB">
          <option v-for="shift in shifts" :key="shift" :value="shift.id">{{shift.role}} {{shift.start_time_formatted}} - {{shift.end_time_formatted}} {{shift.postcode}}</option>
      </select>  
      <button @click="sendDirectOffer" class="primary_button" type="button">Send {{employer_data.username}} a Direct Offer</button>
    </div>
    <div v-if="!directOfferFlag">
          <button v-if="getModalData.FromStaffSearch" v-on:click="back_searchStaff" class="text-green-600 font-bold flex mb-4"><ArrowLeftIcon class="w-5 mr-1 self-center" /> <span>Back</span></button>
        
         <div class="grid lg:grid-cols-3 gap-12">
          <div class="lg:col-span-3 mt-10">
              <div class="mb-8 pb-1 ">
                  <ProfileStats :stats="employer_data"/>
              </div>
            
              <p class="text-center" v-if="!getFlag">There is an error to get employer profile detail</p>
              <div class="flex mt-6 mb-4 border-b border-solid border-gray-300 pb-8">
                  <span @click="changeTab(1)" class="lg:mr-8 mr-2 text-base cursor-pointer p-2" :class="{'profile_tab_active': activeTab===1, 'profile_tab_inactive' : activeTab!==1}">About me</span>
                  <span @click="changeTab(2)" class="lg:mr-8 mr-2 text-base cursor-pointer p-2" :class="{'profile_tab_active': activeTab===2, 'profile_tab_inactive' : activeTab!==2}">Summarised CV</span>
                  <span @click="changeTab(3)" class="lg:mr-8 mr-2 text-base cursor-pointer p-2" :class="{'profile_tab_active': activeTab===3, 'profile_tab_inactive' : activeTab!==3}">Reviews</span>
                  <button @click="openModal( employer_data.user_id, employer_data.photo, employer_data.username)" type="button" class="desk_view main_button">
                      <MailIcon class=" w-6 self-center" > </MailIcon>
                      <span class="mt-1 ml-1 self-center">Message</span>
                  </button>
              </div>
          </div>
      </div>

      <div v-if="activeTab===2">
              
      </div>
      <div v-if="activeTab===1">
              <Aboutus v-if="load_flag" :employer_data="employer_data" />
      </div>
      <div v-if="activeTab===3">
              <Review v-if="load_flag" :employer_data="employer_data" />
      </div>
      <div v-if="activeTab===2">
              <Summarised v-if="load_flag" :employer_data="employer_data" />
      </div>
      <div class="flex mt-4">
          <div class="text-right lg:ml-auto mr-4">
            <!-- <button @click="clickDirectOffer" class="text-white btn bg-emerald biotif-regular" type="button">Send {{employer_data.username}} a Direct Offer</button> -->
            <button @click="clickDirectOffer" class="primary_button" type="button">Make an offer</button>

          </div>
          <button @click="doFavorite(employer_data.user_id)" type="button" class="main_button">
              <StarIcon class=" w-6" > </StarIcon>
              <span>Favourites</span>
          </button>
      </div>
    </div>
   
    
  </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>

import {mapGetters,mapActions} from "vuex";
import Aboutus from '@common/candidateProfile-elements/About'
import Review from '@common/candidateProfile-elements/Review'
import Summarised from '@common/candidateProfile-elements/Summarised'
import "../../common.css";
import ProfileStats from '@common/ProfileStats'

// import StarRating from 'vue-star-rating'
import { StarIcon,MailIcon  } from '@heroicons/vue/solid'
import { ArrowLeftIcon } from "@heroicons/vue/solid"
import {
  APIfetchCandidateProfile,APIgetEmployerShifts,APIdoSendRequestOffer,APIdoEmployerfavourite
} from '@/api/employer/api'

import Loader from '@common/Loader.vue'
import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'
export default {
  components: {
    // StarRating,
    MailIcon,
    StarIcon,
    Aboutus,
    Review,
    ProfileStats,
    Summarised,
    ArrowLeftIcon,
    Loader

  },
   data: () => ({
     employer_data : {},
     activeTab:1,
     gallery:[],
     getFlag:true,
     directOfferFlag:false,
     shift_select:"",
     shifts:[],
     loader_flag:false,
     load_flag:false
  }),
  computed: {
    ...mapGetters({
      getEmployerModalProperty:'candidate/getEmployerModalProperty',
      userReliability: 'candidate/getUserReliability',
      getModalData: 'candidate/getModalData',

    }),
  },
  methods: {
    ...mapActions({
      fetchUserReliability: 'candidate/fetchUserReliability',
      fetchMessageThread: 'candidate/fetchMessageThread',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',
    }),
    changeTab(index){
        if(this.getFlag)
            this.activeTab=index;
    },
    doFavorite(user_id){
      this.loader_flag=true;
      let post_data = {
            user_id : user_id
          };
      APIdoEmployerfavourite(post_data)
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
    openOfferModal(user_id){
          let post_data = {
            shift_id : this.getModalData.shift_id,
            user_id : user_id
          };
          this.$swal({
            title: 'Send direct offer',
            text: "Are you sure you want to send direct offer",
            showCancelButton: true,
            confirmButtonColor: '#049A59',
            cancelButtonColor: 'rgba(255,0,0,0.7)',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                  this.loader_flag=true;
                   APIdoSendRequestOffer(post_data)
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
                              title:'Successfully Sent',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
                      }
                  });
                }
            })
    },
    clickDirectOffer(){
      APIdoGetSubscriptionActive().then((res) => {
            if(res.data.results[0].compliance_complete===0){
              const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'InactiveComplianceModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
              this.fetchtSetModalConfigs(data);
            }
            else if(res.data.results[0].sub_status===0){
              const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'InactiveSubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
              this.fetchtSetModalConfigs(data);

            }
            else{
              if(this.getModalData.shift_id)
              {
                  this.shift_select = this.getModalData.shift_id;
                  this.sendDirectOffer();
              }
              else
                this.directOfferFlag=true;
            }
      })
    },
    back(){
      this.directOfferFlag=false;
    },
    back_searchStaff(){
      const data = {
                        isOpen: true,
                        iconName: 'SearchIcon',
                        componentName: this.getModalData.FromStaffSearchContent==="staffSearch" ? 'StaffSearchModalContent1': 'ApplicantsModalContent',
                        title: '',
                        data:{shift_id:this.getModalData.shift_id, modal_type:'big'}

                    };
            this.fetchtSetModalConfigs(data);
    },
    sendDirectOffer(){
      
                this.loader_flag = true;
                let post_data = {
                  shift_id : this.shift_select,
                  user_id : this.employer_data.user_id
                };
                APIdoSendRequestOffer(post_data)
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
                              title:'Successfully Sent',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
                    }
                  });
    },
    updateEvent(){
        APIfetchCandidateProfile(this.getEmployerModalProperty.user_id)
            .then(response => {
                this.loader_flag = false;
                if(response.data.success===true){
                    this.load_flag = true;
                    this.employer_data = response.data.object;
                    this.getFlag=true;
                }
                else
                    this.getFlag=false
                    
            });

        APIgetEmployerShifts()
          .then(response => {
              if(response.data.results.length>0){

                  this.shifts = response.data.results;
                  this.shift_select = response.data.results[0]['id'];
             }
                  
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
        this.updateEvent()
  }
}
</script>