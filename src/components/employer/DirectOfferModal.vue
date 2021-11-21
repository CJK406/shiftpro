<template>
  <Loader :loader_flag="loader_flag" />
  <div>
    <div  class="text-center lg:p-20">
      <p class="Biotif-bold text-2xl mb-4">Direct Offer</p>
      <p>Pick a shift you would like to offer to {{employer_data.username}}.</p>
        <select v-model="shift_select" 
            class="  text-gray-700 lg:mt-0 mt-2 mb-4 flex text-md border rounded p-2 w-full" style="border-color:#D1D5DB">
          <option v-for="shift in shifts" :key="shift" :value="shift.id">{{shift.role}} {{shift.start_time_formatted}} - {{shift.end_time_formatted}} {{shift.postcode}}</option>
      </select>  
      <button @click="sendDirectOffer" class="primary_button" type="button">Send {{employer_data.username}} a Direct Offer</button>

    </div>
     
  </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>

import {mapGetters,mapActions} from "vuex";
import "../../common.css";
// import StarRating from 'vue-star-rating'
import {
 APIfetchCandidateProfile,APIgetEmployerShifts, APIdoSendRequestOffer
} from '@/api/employer/api'
import Loader from '@common/Loader.vue'
import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'
export default {
  components: {
    // StarRating,
    Loader
  },
   data: () => ({
     employer_data : {rating:""},
     activeTab:3,
     getFlag:true,
     shift_select:"",
     shifts:[],
     loader_flag:false,
  }),
  computed: {
    ...mapGetters({
      getEmployerModalProperty:'candidate/getEmployerModalProperty',
    }),
  },
  methods: {
    ...mapActions({
    }),
    sendDirectOffer(){
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
                        text:res.data.message,
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
      });
    },
    updateEvent(){
        APIfetchCandidateProfile(this.getEmployerModalProperty.user_id)
            .then(response => {
                if(response.data.success===true){

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
                this.loader_flag= false;
             }
                  
          });
    }
  
  },
  mounted() {
    this.loader_flag= true;
    setTimeout(() => {
        this.updateEvent()
    }, 100);
  }
  
}
</script>