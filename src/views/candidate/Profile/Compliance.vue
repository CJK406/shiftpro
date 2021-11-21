<template>
<Loader :loader_flag="loader_flag" />

   <CardWithIcon iconName="ShieldCheckIcon" iconPosition="center">
              <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Compliance check </h2>
              <div class="flex">
                
                <div v-if="compliance.compliance_profile===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_profile===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900 text-base">Fill out your profile</p>
                  <p v-if="compliance.compliance_profile===1" class="text-desc mt-1 text-sm">Check passed.</p>
                  <p v-if="compliance.compliance_profile===0" class="text-desc mt-1 text-sm">Fill out your public and private profiles</p>

                </div>
              </div>
              <div class="flex mt-8">
               
                <div v-if="compliance.compliance_photo===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_photo===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">Photo ID</p>
                  <p v-if="compliance.compliance_photo===0" class="text-desc mt-1 text-sm"><span style="color:#049A59;" class="font-bold">Upload</span> your passport image so we can identify you. if you upload a UK passport, you do not need to upload right to work documents below.</p>
                  <p v-if="compliance.compliance_photo===1" class="text-desc mt-1 text-sm">Check passed.</p>
                  
                  <p class="text-sm text-red-700 mt-2" v-if="compliance.compliance_photo_msg!==''">{{compliance.compliance_photo_msg}}</p>
                    <button v-if="compliance.compliance_photo===0" type="button" class="secondary_button flex mt-3">
                        <UploadIcon style="color:#6B7280" class="w-6 self-center" /> 
                        <span class="text-gray-700 self-center">Upload</span>
                        <input class="opacity-0  absolute" id="file1" style="width: 100px;left: 90px;height: 40px;" @change="updateProfile('photo_id')" type="file" ref="inputRef" >
                    </button>    
              </div>
              </div>
              <div class="flex mt-8">
                <div v-if="compliance.compliance_work===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_work===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">Right to Work in the UK</p>
                  <p v-if="compliance.compliance_work===0" class="text-desc mt-1 text-sm"><span style="color:#049A59;" class="font-bold">Upload</span> your documents proving you have the right to work in the UK such as your working visa, right to remain or any other official document proving your right to work.</p>
                  <p v-if="compliance.compliance_work===1" class="text-desc mt-1 text-sm">Check passed.</p>
                  <p v-if="compliance.compliance_work_msg!==''" class="text-sm text-red-700 mt-2">{{compliance.compliance_work_msg}}</p>
                  <button v-if="compliance.compliance_work===0" type="button" class="secondary_button flex mt-3">
                      <UploadIcon style="color:#6B7280" class="w-6 self-center" /> 
                      <span class="text-gray-700 self-center">Upload</span>
                      <input class="opacity-0  absolute" id="file2" style="width: 100px;left: 90px;height: 40px;" @change="updateProfile('work_doc')" type="file" ref="inputRef" >
                    </button>
                </div>
              </div>
              <div class="flex mt-8">
                <div v-if="compliance.compliance_bank===1" class="p-2 w-10 h-10" style="background-color:rgb(4,154,89); border-radius:100px">
                    <CheckIcon class="w-6 text-white" />
                </div>
                <div v-if="compliance.compliance_bank===0" class="p-3 w-10 h-10 " style="border:2px solid #D1D5DB; border-radius:100px">
                  <div style="background-color:white; border-radius:100px" class="w-3 h-3"> </div>
                </div>
                <div class="ml-3">
                  <p class="text-gray-900">National Insurance and payment details</p>
                  <p v-if="compliance.compliance_bank===0" class="text-desc mt-1 text-sm">Provide us with your National Insurance number and bank account details for your wages</p>
                  <p v-if="compliance.compliance_bank===1" class="text-desc mt-1 text-sm">Check passed.</p>
                  <p v-if="compliance.compliance_bank_msg!==''" class="text-sm text-red-700 mt-2">{{compliance.compliance_bank_msg}}</p>
                  <button @click="add_bank_detail" v-if="compliance.compliance_bank===0" type="button" class="secondary_button flex mt-3">
                      <PlusIcon style="color:#6B7280" class="w-6 self-center" /> 
                      <span class="text-gray-700 self-center">Add details</span>
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
                  <p class="text-gray-900">Signed Contract</p>
                  <p v-if="compliance.compliance_contract===1" class="text-gray-500 mt-1 text-sm">Check passed.</p>
                  <p v-if="compliance.compliance_contract===0" class="text-gray-500 mt-1 text-sm">Check your e-mail and return signed contract to us.</p>
                  <p v-if="compliance.compliance_contract_msg!==''" class="text-sm text-red-700 mt-2">{{compliance.compliance_work_msg}}</p>

                  <button v-if="compliance.compliance_contract===0" type="button" class="secondary_button flex mt-3">
                      <UploadIcon style="color:#6B7280" class="w-6 self-center" /> 
                      <span class="text-gray-700 self-center">Upload</span>
                      <input class="opacity-0  absolute" id="file2" style="width: 100px;left: 90px;height: 40px;" @change="updateProfile('contract_doc')" type="file" ref="inputRef" >
                    </button>
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
                  <p v-if="compliance.compliance_complete===0" class="text-gray-500 mt-1 text-sm">Get your profile ready and browse available shifts.</p>
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
  CheckIcon,UploadIcon ,PlusIcon
} from '@heroicons/vue/solid'
import {mapGetters,mapActions} from "vuex";
import CardWithIcon from '@common/CardWithIcon'
import {
  APIgetCompliance,APIdoUploadDocument
} from '@/api/candidate/api'
export default {
  components: {
    CardWithIcon,
    UploadIcon,
    CheckIcon ,
    PlusIcon,
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
        fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',

    }),
    updateHandler(){
      APIgetCompliance()
      .then(response => {
       this.compliance = response.data.results[0];
      });   
    },
    add_bank_detail(){
        const data = {
                        isOpen: true,
                        iconName: 'UserIcon',
                        componentName: 'AddBankDetailModal',
                        title: '',
                        data:{modal_type:"small"}
                    };
            this.fetchtSetModalConfigs(data);
    },
    updateProfile(type) {
        {
        const form = new FormData();
        let imagefile;
        if(type==='work_doc'){
            imagefile = document.querySelector('#file2');
        }
        else{
           imagefile = document.querySelector('#file1');
        }
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