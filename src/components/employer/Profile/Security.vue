<template>
<Loader :loader_flag="loader_flag" />
  <Form @submit="save_change"  class="bg-white shadow-lg rounded-3xl p-10 mt-8 space-y-6" :validation-schema="schema" v-slot="{ errors }">
        <p class=" text-gray-900 text-3xl mb-6 Biotif-bold">Security</p>
        <div class="grid lg:grid-cols-1 gap-8">
            <div class="grid lg:grid-col-1">
                <p class="biotif text-xl mb-2">Change e-mail address</p>
                <div class="grid lg:grid-cols-2 lg:w-full gap-8  mb-1">
                    <div>
                        <label class="block font-extrabold" style="color:#111827">New e-mail address</label>
                        <div class="mt-1">
                        <Field v-model="email" name="email" type="email" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                            :class="{ 'is-invalid': errors.email }" />
                        <div class="invalid-feedback">{{errors.email}}</div>
                        
                        </div>
                    </div>
                    <div>
                        <label class="block font-extrabold" style="color:#111827">Repeat new e-mail address</label>
                        <div class="mt-1">
                        <Field v-model="email_c" name="email_c" type="text" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                            :class="{ 'is-invalid': errors.email_c }" />
                        <div class="invalid-feedback">{{errors.email_c}}</div>
                        </div>
                    </div>
                </div>
               
                <p class="biotif text-xl mb-2">Change password</p>
                <div class="grid lg:grid-cols-2 lg:w-full gap-8  mb-8">
                    <div>
                        <label class="block font-extrabold" style="color:#111827">New password</label>
                        <div class="mt-1">
                        <Field v-model="password" name="password" @keyup="pass_change" type="password" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                            :class="{ 'is-invalid': errors.password }" />
                        <div v-if="password_error_flag" class="invalid-feedback">{{password_error_string}}</div>
                        </div>
                    </div>
                    <div>
                        <label class="block font-extrabold" style="color:#111827">Repeat new password</label>
                        <div class="mt-1">
                        <Field v-model="password_c" name="password_c"  @keyup="pass_change" type="password" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                            :class="{ 'is-invalid': errors.password_c }" />
                        <div v-if="password_error_flag" class="invalid-feedback">{{password_error_string}}</div>

                        </div>
                    </div>
                </div>
                <p class="biotif text-xl mb-2">Preferences</p>
                <div class="flex">
                  <input class="self-center" type="checkbox" />
                <span class="self-center ml-2">E-mail notifications turned on</span>
                </div>
                

                
            </div>
            <div class="text-right">
          <button @submit="save_change" class="btn primary_button lg:ml-auto h-10 pb-2 w-40 ml-auto mb-4 mt-4">
                Save changes
          </button>
        </div>
        </div>
      </Form>
</template>

<script>

import {mapGetters,mapActions} from "vuex";
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import {
  APIdoUpdateSecurity,
} from '@/api/authentication/api'
import Loader from '@common/Loader.vue'

export default {
  components: {
    Form,
    Field,
    Loader
  },
  data: () => ({
    email:'',
   email_c:'',
   password:"",
   password_c:"",
   email_error_flag:false,
   email_error_string:"",
   password_error_flag:false,
   password_error_string:"",
    loader_flag:false

  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
      }),
     
    },
    mounted () {
     this.email ="";
               this.email_c="";
               this.password ="";
               this.password_c ="";
    },
   
    methods: {
      ...mapActions({
        doGetUserData: "authentication/doGetUserData",
      }),
      pass_change(){
        this.password_error_flag= false
      },
      save_change(){
          let post_data = {flag:false};
          if(this.email!==""){
            if(this.email === this.email_c){
              this.email_error_flag=false;
              post_data.email = this.email;
              post_data.email_confirm = this.email_c;
              post_data.flag=true;
            }
          }
          if(this.password!==""){
              if(this.password !== this.password_c){
                  post_data.flag=false;
                  this.password_error_flag=true;
                  this.password_error_string="Password confirm does not match";
              }
              else{
                  this.password_error_flag=false;
                  post_data.password = this.password;
                  post_data.password_confirm = this.password_c;
                  post_data.flag=true;
              }
          }
          if(post_data.flag){
            this.loader_flag=true;
            APIdoUpdateSecurity(post_data).then((res) => {
              this.loader_flag=false;
              if(res.data.success===true){
               this.$swal(
                {
                    title:'Successfully updated',
                    icon: 'success',
                    confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                    customClass: {
                      confirmButton: 'SuccessClosebutton'
                    }
                  }
                );
               this.email ="";
               this.email_c="";
               this.password ="";
               this.password_c ="";
              }
            });
          }

          


      }
    },
    setup() {

        const schema = Yup.object().shape({
               email: Yup.string()
                  .email('Email is invalid'),
               email_c: Yup.string()
                  .oneOf([Yup.ref('email'), null], 'Email must match')
              
               
            });
      return {
        schema,
      }
    }
}
</script>