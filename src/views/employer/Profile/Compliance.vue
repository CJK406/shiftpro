<template>
<Loader :loader_flag="loader_flag" />

   <CardWithIcon iconName="ShieldCheckIcon" iconPosition="center">
              <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Compliance check </h2>
              <div class="flex">
                
                <div v-if="compliance.compliance_liability===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_liability===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900 text-base">Fill out your profile</p>
                  <p v-if="compliance.compliance_liability===0" class="text-desc mt-1 text-sm">Fill out your public and private profiles</p>
                  <p v-if="compliance.compliance_liability===1" class="text-desc mt-1 text-sm">Check passed.</p>
                </div>
              </div>
              <div class="flex mt-8">
                <!-- <div class="p-3 w-10 h-10 " style="border:2px solid rgb(4,154,89); border-radius:100px">
                  <div style="background-color:rgb(4,154,89); border-radius:100px" class="w-3 h-3"> </div>
                </div> -->
                <div v-if="compliance.compliance_policies===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_policies===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">Safety in the workplace</p>
                  <p v-if="compliance.compliance_policies===0" class="text-desc mt-1 text-sm"><span style="color:#049A59;" class="font-bold">Upload</span> your policies regarding Health and Safety, Fire Strategies and anything else your staff needs to know.</p>
                  <p v-if="compliance.compliance_policies===1" class="text-desc mt-1 text-sm">Check passed.</p>
                  
                  <p class="text-sm text-red-700 mt-2" v-if="compliance.compliance_docs_msg!==''">{{compliance.compliance_docs_msg}}</p>
                    <button v-if="compliance.compliance_policies===0" type="button" class="secondary_button flex mt-3">
                        <UploadIcon style="color:#6B7280" class="w-6 self-center" /> 
                        <span class="text-gray-700 self-center">Upload</span>
                        <input class="opacity-0  absolute" id="file1" style="width: 100px;left: 90px;height: 40px;" @change="updateProfile('compliance_doc')" type="file" ref="inputRef" >
                    </button>    
              </div>
              </div>
           
              <div class="flex mt-8">
                <div v-if="compliance.compliance_contract===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_contract===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">Signed contract</p>
                  <p v-if="compliance.compliance_contract===1" class="text-gray-500 mt-1 text-sm">Check passed.</p>
                  <p v-if="compliance.compliance_contract===0" class="text-gray-500 mt-1 text-sm">Check your e-mail and return signed contract to us.</p>
                  
                  <p class="text-sm text-red-700 mt-2" v-if="compliance.compliance_contract_msg!==''">{{compliance.compliance_contract_msg}}</p>
                    <button v-if="compliance.compliance_contract===0" type="button" class="secondary_button flex mt-3">
                        <UploadIcon style="color:#6B7280" class="w-6 self-center" /> 
                        <span class="text-gray-700 self-center">Upload</span>
                        <input class="opacity-0  absolute" id="file1" style="width: 100px;left: 90px;height: 40px;" @change="updateProfile('contract_doc')" type="file" ref="inputRef" >
                    </button>   
                </div>
              </div>
              <div class="flex mt-8">
                 <div v-if="compliance.compliance_dd===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_dd===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">Direct Debit set up</p>
                  <p v-if="compliance.compliance_dd===1" class="text-gray-500 mt-1 text-sm">Check passed.</p>
                  <p v-if="compliance.compliance_dd===0" class="text-gray-500 mt-1 text-sm">Set up your direct debit to automate wage payment process <span class="font-bold">here.</span></p>
                  <button v-if="compliance.compliance_dd===0" @click="goStripe" class="secondary_button flex mt-3">Direct Debit set up </button>
                
                </div>
              </div>
              <div class="flex mt-8">
                 <div v-if="compliance.compliance_complete===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_complete===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">Compliance check passed</p>
                  <p v-if="compliance.compliance_complete===1" class="text-gray-500 mt-1 text-sm">Check passed.</p>
                  <p v-if="compliance.compliance_complete===0" class="text-gray-500 mt-1 text-sm">Get your profile ready and create shifts.</p>
                </div>
              </div>
              
        </CardWithIcon>
</template>
<style type="text/css">
@import "../../../common.css";
</style>
<script>
import Loader from '@common/Loader.vue'

import { 
  CheckIcon,UploadIcon 
} from '@heroicons/vue/solid'
import {mapGetters,mapActions} from "vuex";
import CardWithIcon from '@common/CardWithIcon'
import {
  APIgetCompliance,APIdoUploadDocument
} from '@/api/employer/api'
import {
  APIdoChangeSubscription
} from '@/api/common/api'
export default {
  components: {
    CardWithIcon,
    UploadIcon,
    CheckIcon ,
    Loader
  },
   data: () => ({
       compliance:{},
      loader_flag: false,

  }),
  computed: {
    ...mapGetters({
        user_detail:'authentication/getUserDetails',
    }),
  },
  methods: {
    ...mapActions({
    }),
    updateHandler(){
      APIgetCompliance()
      .then(response => {
       this.compliance = response.data.results[0];
      });   
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
    updateProfile(type) {
        {
        const form = new FormData();
        let imagefile = document.querySelector('#file1');
        form.append('upload', imagefile.files[0]);
        form.append('field', type);
        this.loader_flag=true;
        APIdoUploadDocument(form)
            .then(response => {
                this.loader_flag=false;
                if(response.data.success)
                {
                  this.updateHandler();
                  this.$swal(
                          {
                              title:'Successfully Upload',
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
    }
   
  },
  mounted() {
     this.updateHandler();
  }
  
}
</script>