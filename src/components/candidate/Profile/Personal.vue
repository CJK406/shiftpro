<template>
<Loader :loader_flag="loader_flag" />
  <Form @submit="save_change" class="bg-white shadow-sm rounded-xl p-10 mt-8" :validation-schema="schema" v-slot="{ errors }">
      <div class="">
        <p class=" text-gray-900 text-3xl mb-6 Biotif-bold">Edit personal details</p>
        <p class="text-sm text-desc mt-3 "><span class="font-bold text-black text-main">Please note:</span> 
        If you wish to edit any of the details below, please bear in mind we will have to verify your account and conduct a compliance check. You will be asked to provide a reason and proof of these changes, so for your own convenience, please do not edit these unless you have to.
        </p>
      
      </div>
      <div class="mt-4">
       
        
        <div >
          <div class="grid lg:grid-cols-2 gap-8 mb-4"> 
            <div class=" mb-1">
              <label class="block " style="color:#111827">First name</label>
              <Field v-model="first_name" name="first_name" type="text" class="h-10 form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.first_name }" />
                  <div class="invalid-feedback">{{errors.first_name}}</div>

            </div>
            <div class= "mb-1">
               <label class="block " style="color:#111827">Last name</label>
              <Field v-model="last_name" name="last_name" type="text" class="h-10 form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.last_name }" />
                  <div class="invalid-feedback">{{errors.last_name}}</div>

            </div>
            <div class=" mb-1">
              <label class="block " style="color:#111827">Date of birth</label>
              
                <Field v-model="birthday" name="birthday" type="date" class="h-10 form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.birthday }" />
            </div>
            <div class=" mb-1">
               <label class="block " style="color:#111827">National Insurance Number</label>
              <Field v-model="ni_no"   name="ni_no" type="text" class="h-10 form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.ni_no }" />
                  <div class="invalid-feedback">{{errors.ni_no}}</div>

            </div>
          </div>
          <label class="biotif text-xl">Address</label>
          <div class="grid lg:grid-cols-2 mt-2 gap-8"> 
            <div>
                  <label class="block " style="color:#111827">Address line 1:</label>
                  <div class="mt-1">
                  <Field v-model="address1" name="address1" type="text" class="h-10 form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.address1 }" />
                  <div class="invalid-feedback">{{errors.address1}}</div>
                  </div>
            </div>
            <div>
                  <label class="block " style="color:#111827">Address line 2:</label>
                  <div class="mt-1">
                   <Field v-model="address2" name="address2" type="text" class="h-10 form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                   />
                  </div>
            </div>
            <div>
                  <label class="block " style="color:#111827">Town:</label>
                  <div class="mt-1">
                  <Field v-model="town" name="town" type="text" class="h-10 form-control  text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.town }" />
                  <div class="invalid-feedback">{{errors.town}}</div>
                  </div>
            </div>
            <div>
                  <label class="block " style="color:#111827">City/County:</label>
                  <div class="mt-1">
                    <Field v-model="city" name="city" type="text" class="h-10 form-control  text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.city }" />
                  <div class="invalid-feedback">{{errors.city}}</div>
                  </div>
            </div>
            <div>
                  <label class="block " style="color:#111827">Postcode:</label>
                  <div class="mt-1">
                    <Field v-model="postcode" name="postcode" type="text" class="h-10 form-control  text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.postcode }" />
                  <div class="invalid-feedback">{{errors.postcode}}</div>
                  </div>
            </div>
          </div>
        </div> 
        <div class="text-right">
        <button @click="save_change" class="btn primary_button lg:ml-auto h-10 pb-2 w-60 ml-auto mb-4 mt-4">
              Request changes
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
  APIdoUpdateProfile
} from '@/api/candidate/api'
import Loader from '@common/Loader.vue'

export default {
  components: {
    Form,
    Field,
    Loader, 
  },
  data: () => ({
    first_name:'',
    last_name:'',
    loader_flag:false,
    address1:'',
    address2:'',
    town:'',
    city:'',
    postcode:'',
    birthday:'',
    passport:'',
    ni_no:''

  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
      }),
    },
    mounted () {
      this.key_skill=this.user_detail.skills;
      this.qualifications=this.user_detail.qualifications;
      this.languages = this.user_detail.languages;
      this.first_name = this.user_detail.firstname;
      this.last_name = this.user_detail.surname;
      this.address1 = this.user_detail.address1;
      this.address2 = this.user_detail.address2===null ? "" : this.user_detail.address2;
      this.town = this.user_detail.town===null ? "" : this.user_detail.town;
      this.city = this.user_detail.county;
      this.postcode = this.user_detail.postcode;
      this.birthday = this.user_detail.dob.replace(/[/]/g, '-');
      this.ni_no = this.user_detail.ni_no;
    },
     watch: {
    },
    methods: {
      ...mapActions({
        doGetUserData: "authentication/doGetUserData",

      }),
    
      save_change(){
          let post_data = {
            firstname:this.first_name,
            surname : this.last_name,
            address1 : this.address1,
            address2 : this.address2,
            county : this.city,
            town : this.town,
            postcode : this.postcode,
            ni_no : this.ni_no,
            dob : this.birthday,
            form:2
          }
          this.loader_flag=true;
          APIdoUpdateProfile(post_data).then((res) => {
              this.loader_flag=false;
              if(res.data.success===true){
              this.$swal(
                {
                  title:'Successfully Updated',
                  icon: 'success',
                  confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                  customClass: {
                    confirmButton: 'SuccessClosebutton'
                  }
                }
              );
              this.doGetUserData(2);
              }
              else{
                        this.$swal({title:"Oops!",
                                  icon: 'error',
                                  text:"There is an error on update",
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
    setup() {

        const schema = Yup.object().shape({
                first_name: Yup.string()
                    .required('First name is required'),
                last_name: Yup.string()
                    .required('Last name is required'),
                birthday: Yup.string()
                    .required('Birthday is required'),
                passport: Yup.string()
                    .required('NI Number / Passport number: is required'),
                address1: Yup.string()
                    .required('Address1 is required'),
                town: Yup.string()
                    .required('Town is required'),
                city: Yup.string()
                    .required('City is required'),
                postcode: Yup.string()
                    .required('Postcode is required'),
                ni_no: Yup.string()
                    .required('Postcode is required'),
            });
      return {
        schema,
      }
    }
}
</script>