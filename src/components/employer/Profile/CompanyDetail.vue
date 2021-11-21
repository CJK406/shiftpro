<template>
    <Loader :loader_flag="loader_flag" />
  <Form @submit.prevent class="bg-white shadow-sm rounded-xl p-10" :validation-schema="schema" v-slot="{ errors }">
      <div class="">
        <p class=" text-gray-900 text-3xl mb-6 Biotif-bold">Edit company details</p>
        <p class="text-sm text-desc"><span class="font-bold text-main">Please note:</span> If you wish to edit any of the details below, please bear in mind we will have to verify these changes. You will be asked to provide a proof that these details have changed. For your own convenience, please do not edit these unless you have to.</p>
      </div>
      <div class="mt-8">
       
        <div>
            <div class="grid lg:grid-cols-2 lg:w-full gap-4 lg:pr-8 mb-8">
                <div>
                    <label class="block " style="color:#111827">Company name:</label>
                    <div class="mt-1">
                    <Field v-model="company_name" type="text" name="company_name"  
                      class="form-control text-gray-500 shadow-sm  focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                      :class="{ 'is-invalid': errors.company_name }" />
                        <div class="invalid-feedback">{{errors.company_name}}</div>
                    </div>
                </div>
                  <div>
                      <label class="block " style="color:#111827">Company registration number:</label>
                      <div class="mt-1">
                      <Field v-model="company_reg" type="text" name="company_reg"  
                          class="form-control text-gray-500 shadow-sm  focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                          :class="{ 'is-invalid': errors.company_reg }" />
                      <div class="invalid-feedback">{{errors.company_reg}}</div>
                    </div>
                   

                </div>
            </div>
            <p class="text-main text-2xl biotif mb-2">Contact person</p>
            <div class="grid lg:grid-cols-2 lg:w-full gap-4 lg:pr-8 mb-8">
                
                   <div>
                        <label class="block " style="color:#111827">Contact person’s first name</label>
                        <div class="mt-1">
                         <Field v-model="first_name" type="text" name="first_name"  
                            class="form-control text-gray-500 shadow-sm  focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                            :class="{ 'is-invalid': errors.first_name }" />
                              <div class="invalid-feedback">{{errors.first_name}}</div>
                        </div>
                    </div>
                    <div>
                        <label class="block " style="color:#111827">Contact person’s last name</label>
                        <div class="mt-1">

                        <Field v-model="last_name" type="text" name="last_name"  
                        class="form-control text-gray-500 shadow-sm  focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                        :class="{ 'is-invalid': errors.last_name }" />
                        <div class="invalid-feedback">{{errors.last_name}}</div>
                      </div>
                    </div>
                    <div>
                        <label class="block " style="color:#111827">Position</label>
                        <div class="mt-1">
                        <Field v-model="position" type="text" name="position"  
                            class="form-control text-gray-500 shadow-sm  focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                            :class="{ 'is-invalid': errors.position }" />
                        <div class="invalid-feedback">{{errors.position}}</div>
                          </div>
                    </div>
                    <div>
                        <label class="block " style="color:#111827">Phone number</label>
                        <div class="mt-1">
                          <Field v-model="phone_number" type="text" name="phone_number"  
                              class="form-control text-gray-500 shadow-sm  focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                              :class="{ 'is-invalid': errors.phone_number }" />
                          <div class="invalid-feedback">{{errors.phone_number}}</div>
                        </div>
                    </div>

            </div>
            <p class="text-main text-2xl biotif mb-2">Registered address</p>

            <div class="mb-4">
                <div class="grid lg:grid-cols-2 gap-2 mb-4">
                    <div>
                        <label class="block text-main">Address line 1</label>
                        <div class="mt-1">
                         <Field v-model="address1" type="text" name="address1"  class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.address1 }" />
                        <div class="invalid-feedback">{{errors.address1}}</div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-main" >Address line 2</label>
                        <div class="mt-1">
                        <input  type="text" v-model="address2"
                                class="text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"  />
                        </div>
                    </div>
                </div>
                
                <div class="grid lg:grid-cols-2 mt-2 gap-2">
                     <div>
                        <label class="block text-main" >Town</label>
                        <div class="mt-1">
                        <Field v-model="town" name="town" type="text" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.town }" />
                            <div class="invalid-feedback">{{errors.town}}</div>
                            
                        </div>
                    </div>
                    <div>
                        <label class="block text-main" >City/County</label>
                        <div class="mt-1">
                        <Field v-model="county" name="county" type="text" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.county }" />
                        <div class="invalid-feedback">{{errors.county}}</div>
                 
                        </div>
                    </div>
                    <div>
                        <label class="block text-main" >Postcode</label>
                        <div class="mt-1">
                        <Field v-model="postcode" name="postcode" type="text" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.postcode }" />
                        <div class="invalid-feedback">{{errors.postcode}}</div>
                 
                         </div>
                    </div>
                </div>

              </div>
        </div> 
        <button @click="save_change" class="btn btn-full ml-auto bg-secondary hover:bg-secondary-light h-10 pb-2 w-40 ml-auto mb-4 biotif-regular">
              Save changes
        </button>
      </div>
    </Form>
</template>

<script>
import Loader from '@common/Loader.vue'
import {mapGetters,mapActions} from "vuex";
import {
  APIdoUpdateProfile,
} from '@/api/employer/api'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
export default {
  components: {
  Form,
    Field,
    Loader,
  },
  data: () => ({
    first_name:'',
    last_name:'',
    company_name:'',
    company_reg:'',
    position:'',
    phone_number:'',
    loader_flag:false,
    address1:'',
    address2:'',
    town:'',
    county:'',
    postcode:'',
    Loader
    
  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
      }),
     
    },
    mounted () {
      this.updateHandler();
    },
     watch: {
        user_detail: function () {
        this.updateHandler();
      },
    },
    methods: {
      ...mapActions({
        doGetUserData: "authentication/doGetUserData",
      }),
      updateHandler(){
        this.first_name = this.user_detail.firstname;
        this.last_name = this.user_detail.surname;
        this.company_name = this.user_detail.company;
        this.company_reg = this.user_detail.company_reg;
        this.position = this.user_detail.position;
        this.phone_number = this.user_detail.phone;

        this.address1 = this.user_detail.reg_address1;
        this.address2 = this.user_detail.reg_address2;
        this.town = this.user_detail.reg_town;
        this.county = this.user_detail.reg_county;
        this.postcode = this.user_detail.reg_postcode;
      },
      save_change(){
        if(this.first_name!=="" && this.last_name!=="" && this.company_name!=="" && this.company_reg!=="" && this.phone_number!=="")
        {
          this.loader_flag=true;
          let post_data = {
            form:2,
            firstname:this.first_name,
            surname : this.last_name,
            phone : this.phone_number,
            company:this.company_name,
            company_reg : this.company_reg,
            position:this.position,
            reg_address1:this.address1,
            reg_address2:this.address2,
            reg_town:this.town,
            reg_county:this.county,
            reg_postcode:this.postcode
          }
             APIdoUpdateProfile(post_data).then((res) => {
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
                this.doGetUserData(3);
              }
            });
        }
      }
    },
    setup() {
        const schema = Yup.object().shape({
                company_name: Yup.string()
                    .required('Company name is required'),
                first_name: Yup.string()
                    .required('First name is required'),
                last_name: Yup.string()
                    .required('Last name is required'),
                company_reg: Yup.string()
                    .required('Company registration number is required'),
                position: Yup.string()
                    .required('Position is required'),
                phone_number: Yup.string()
                    .required('Phone number is required'),
                address1: Yup.string()
                    .required('Address is required'),
                county: Yup.string()
                    .required('County is required'),
                postcode: Yup.string()
                    .required('Postcode is required'),
            });
      return {
        schema,
      }
    }
}
</script>