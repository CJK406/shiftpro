<template>
 <Loader :loader_flag="loader_flag" />
  <div class="py-4 px-4">
      <!-- <div class="mb-8 pb-6 border-b border-solid border-gray-200">
          <ProfileStats :stats="userReliability"/>
      </div> -->
      <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold mb-4">Add location</p>
      <Form @submit.prevent :validation-schema="schema" v-slot="{ errors }">

      <div class="grid lg:grid-cols-2 gap-8">
        <div>
          <div class="flex mb-2">
              <label class="w-40 block font-extrabold self-center mr-3" style="color:#111827">Company name:</label>
              <div>
                <Field v-model="company_name" type="text" name="company_name"  class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                :class="{ 'is-invalid': errors.company_name }" />
                  <div class="invalid-feedback">{{errors.company_name}}</div>  
              </div>
          </div>
           <div class="flex mb-2">
              <label class="w-40 block font-extrabold self-center mr-3" style="color:#111827">Address line 1:</label>
              <div>
                 <Field v-model="address1" type="text" name="address1"  class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.address1 }" />
                <div class="invalid-feedback">{{errors.address1}}</div>  
              </div> 
            </div>
           <div class="flex mb-2">
              <label class="w-40 block font-extrabold self-center mr-3" style="color:#111827">Address line 2:</label>
               <input  type="text" v-model="address2"
              class="w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block sm:text-sm border-gray-300 rounded-md"  />
          </div>
          
        </div>
        <div>
          <div class="flex mb-2">
              <label class="w-36 block font-extrabold self-center mr-3" style="color:#111827">Town:</label>
             <div>
             <Field v-model="town" type="text" name="town"  class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
              :class="{ 'is-invalid': errors.town }" />
                <div class="invalid-feedback">{{errors.town}}</div>  
             </div>
          </div>
         <div class="flex mb-2">
              <label class="w-36 block font-extrabold self-center mr-3" style="color:#111827">City/County:</label>
             <div> 
               <Field v-model="city" type="text" name="city"  class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
              :class="{ 'is-invalid': errors.city }" />
                <div class="invalid-feedback">{{errors.city}}</div>  
              </div>
          </div>
          <div class="flex">
              <label class="w-36 block font-extrabold self-center mr-3" style="color:#111827">Postcode:</label>
              <div>
                <Field v-model="postcode" type="text" name="postcode"  class="form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.postcode }" />
                <div class="invalid-feedback">{{errors.postcode}}</div>  
              </div>
        </div>
        </div>
      </div>
      </Form>
  
      <div class="text-right">
        <button @click="addLocation" class="btn  mt-4 primary_button" type="button">Add location</button>
      </div>
      <!-- </form> -->
  </div>
</template>

<script>
// import { computed } from 'vue'
import {mapGetters,mapActions} from "vuex";
import {
  APIAddLocation
} from '@/api/employer/api'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import Loader from '@common/Loader.vue'

export default {
  components: {
    // Calendar,
    Form,
    Field,
    Loader
  },
  data: () => ({
     company_name:'',
     address1:'',
     address2:'',
     town:'',
     city:'',
     postcode:'',
     loader_flag:false

  }),
  
  computed: {
    ...mapGetters({
    }),
  },
  mounted() {
	},
  methods: {
    ...mapActions({
        fetchtLocations: 'employer/fetchtLocations',
    }),
    addLocation() {
    if(this.company_name!=="" && this.address1 !=="" && this.town!=="" && this.city!=="" && this.postcode!==""){
        this.loader_flag = true;
   
        let post_data = new FormData();
        post_data.append('company',this.company_name);
        post_data.append('address1',this.address1);
        post_data.append('address2',this.address2);
        post_data.append('city',this.city);
        post_data.append('postcode',this.postcode);
        post_data.append('town',this.town);

        APIAddLocation(post_data).then((res) => {
            this.loader_flag = false;
            if(res.data.success){
              this.$swal(
                          {
                              title:'Successfully added',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
              this.fetchtLocations();
            }
            else{
              this.$swal({title:"Oops!",
                        icon: 'error',
                        text:this.data.message,
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
    viewProfile(userid){
      this.fetchSetEmployerModalConfigs({user_id:userid})

      const data = {
                isOpen: true,
                iconName: 'AnnotationIcon',
                componentName: 'EmployerProfile',
                title: '',
                data:{modal_type:'base'}
               };
      this.fetchtSetModalConfigs(data);

    },
  },
  setup() {
        const schema = Yup.object().shape({
                company_name: Yup.string()
                    .required('Company name is required'),
                address1: Yup.string()
                    .required('Address is required'),
                city: Yup.string()
                    .required('City is required'),
                town: Yup.string()
                    .required('town is required'),
                postcode: Yup.string()
                    .required('Postcode is required'),
            });
      return {
        schema,
      }
    }

}
</script>