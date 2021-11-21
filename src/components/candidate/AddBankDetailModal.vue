<template>
    <Loader :loader_flag="loader_flag" />

  <div class="text-center">
      <p class="Biotif-bold text-2xl mb-4 mt-12">National Insurance and payment details</p>
      <p style="color:#727497" class="mb-4">Please submit your payment details so we can set you up with our payroll system. Please note all sensitive data is encrypted and will never display in your account.</p>
      <p class="mr-3 text-left mt-2 text-gray-900">National Insurance number:</p> 
      <input v-model="ins_num" class="p-2 w-full border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" />
      <p class="mr-3 text-left mt-2 text-gray-900">Account number:</p> 
      <input v-model="acc_num" class="w-full p-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" />
      <p class="mr-3 text-left mt-2 text-gray-900">Sort code:</p> 
      <input v-model="sort_code" @keyup="change_sort_code" class="w-full p-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" />
      <div class="text-right">
          <button @click="submit" class="mt-4 ml-auto primary_button ml-2">Confirm</button>
      </div>      
  </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>
import {  mapActions, mapGetters } from "vuex";
import Loader from '@common/Loader.vue'

import {
  APISecure
} from '@/api/candidate/api'
export default {
  components: {
    Loader
  },
   data: () => ({
     ins_num:'',
     acc_num:'',
     sort_code:'',
     loader_flag:false,
  }),
   computed: {
      ...mapGetters({
        getModalData: 'candidate/getModalData',
      }),
    },
     mounted () {
     },
  methods: {
       ...mapActions({
          fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
        }),
      closeModal(){
        const data = {
                    isOpen: false,
                    iconName: 'UserIcon',
                    componentName: 'AddBankDetailModal',
                    title: '',
                    data:{modal_type:"small"}
                };
        this.fetchtSetModalConfigs(data);
      },
      change_sort_code(){
        if(this.sort_code.length===2){
          this.sort_code=this.sort_code+'-';
        }
        if(this.sort_code.length===5){
          this.sort_code=this.sort_code+'-';
        }
      },
      submit(){
        this.loader_flag = true;
       let post_data = {
               acno:this.acc_num,
               nino:this.ins_num,
               scno:this.sort_code
           }
        APISecure(post_data).then((res) => {
          this.loader_flag = false;
          if(res.data.success){
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
                this.closeModal();
                }
                else{
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
        });
      }
  },
}
</script>