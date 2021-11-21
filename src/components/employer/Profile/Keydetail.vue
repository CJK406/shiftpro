<template>
    <Loader :loader_flag="loader_flag" />
  <!-- <form @submit.prevent> -->
    <div class="bg-white shadow-sm rounded-xl" >
      <div class="absolute h-24 w-full rounded-t-xl" style="background-color:#111827"></div>
      <div class="" >
        <div class="flex items-center pb-6 mb-0 lg:mb-6 transform ml-10 pt-10 " >
          
          <Avatar class="mr-4 " :imgURL="user_detail.photo" :htmlAlt="user_detail.photo"/>
          <ButtonWithIcon 
            type_button="Edit image" 
            usergroup = '3'
            :iconAttrs="{
              iconName: 'CameraIcon',
              iconClasses: 'inline-block w-5 text-white cursor-pointer  self-center'
            }"
             />
            <p class="biotif-regular mt-1 font-bold text-xl text-white">{{user_detail.fullname}}</p>
            <Stars  class="ml-3 desc_profile_rate_view" count="4"/>
            <!-- <PencilIcon class="w-4 ml-2 cursor-pointer" style="color:rgb(4,154,89)" /> -->
        </div>
        <div class="mobile_view flex">
            <span class="ml-10 text-main text-lg self-center">Your rating</span><Stars  class="ml-6 mt-2 mobile_profile_rate_view" count="4"/>
        </div>

      </div>
  </div>
  <Form @submit.prevent class="bg-white mt-4 shadow-sm rounded-xl p-10" :validation-schema="schema" v-slot="{ errors }">
      <div class="">
        <p class=" text-gray-900 text-3xl Biotif-bold">Edit public profile</p>
        <p class="text-sm text-desc mb-4">Change the information seen by the candidates</p>
      </div>
         <div class="">
              <div class="mb-4">
                  <label class="block text-main">Who we are:</label>
                  <div class="mt-1">
                  <Field v-model="bio" name="bio" as="textarea" class="form-control h-24 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.bio }" />
                  <div class="invalid-feedback">{{errors.bio}}</div>
                  </div>
              </div>
              <div>
                  <label class="block text-main">Establishment name</label>
                  <div class="mt-1">
                    <Field v-model="establishment" type="text" name="establishment"  class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.establishment }" />
                  <div class="invalid-feedback">{{errors.establishment}}</div>
                  </div>
              </div>
              <div class="mt-3">
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
                        <Field v-model="town" name="town" type="text" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" />
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
                     <div>
                        <label class="block text-main" >Website</label>
                        <div class="mt-1">
                        <Field v-model="website" name="website" type="url" class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" />
                 
                         </div>
                    </div>
                </div>

              </div>
        
        <button @click="save_change" class="btn btn-full primary_button w-40 ml-auto mt-4">
              Save changes
        </button>
      </div>
    </Form>
</template>

<script>
import Loader from '@common/Loader.vue'
import Stars from '@common/ProfileStats/Stars'
import ButtonWithIcon from '@common/ButtonWithIcon'


import Avatar from '@common/Avatar'
import {mapGetters,mapActions} from "vuex";
import {
  APIdoUpdateProfile,
} from '@/api/employer/api'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
export default {
  components: {
    Avatar,
    Form,
    Field,
    Loader,
    Stars,
    ButtonWithIcon
  },
  data: () => ({
    bio:'',
    address1:'',
    address2:'',
    town:'',
    county:'',
    postcode:'',
    loader_flag:false,
    website:''
  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
      }),
     
    },
    mounted () {
      this.bio = this.user_detail.bio;
      this.address1 = this.user_detail.address1;
      this.address2 = this.user_detail.address2;
      this.town = this.user_detail.town;
      this.county = this.user_detail.county;
      this.postcode = this.user_detail.postcode;
      this.establishment = this.user_detail.establishment;
      this.website = this.user_detail.website;
      this.doGetUserData(3);

    },
     watch: {
    },
  
    methods: {
      ...mapActions({
        doGetUserData: "authentication/doGetUserData",
      }),
      save_change(){
        if(this.bio!=="" && this.address1!=="" && this.county!=="" && this.postcode!=="" )
        {
          let post_data = {
            address1:this.address1,
            address2 : this.address2,
            town : this.town,
            county : this.county,
            postcode : this.postcode,
            bio : this.bio,
            establishment:this.establishment,
            website:this.website,
            form:1
          }
          this.loader_flag=true;
          
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
                bio: Yup.string()
                    .required('This field is required'),
                address1: Yup.string()
                    .required('Address is required'),
                county: Yup.string()
                    .required('County is required'),
                postcode: Yup.string()
                    .required('Postcode is required'),
                establishment: Yup.string()
                    .required('Establishment name is required'),
            });
      return {
        schema,
      }
    }
}
</script>