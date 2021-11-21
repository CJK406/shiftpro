<template>
 <Loader :loader_flag="loader_flag" />
  <div class="py-4 px-4">
      <!-- <div class="mb-8 pb-6 border-b border-solid border-gray-200">
          <ProfileStats :stats="userReliability"/>
      </div> -->
      <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold">{{getModalData.type==="edit" ? "Edit this shift" : "Duplicate this shift"}}</p>
      <p class="text-sm text-center mt-3 mb-4">Specify the details of the shift you are advertising and add any additional information essential to potential candidates.</p>
      <Form @submit="handleSubmit" :validation-schema="new_location_flag ? schema1: schema" v-slot="{ errors }">
      
      <div class="grid lg:grid-cols-2 gap-8">
        <div>
          <div class="grid lg:grid-cols-5 gap-2 mb-2">
              <label class="lg:col-span-2 block font-extrabold self-center mr-3 text-sm" style="color:#111827">Shift role:</label>
                <select v-model="role" 
                      class="lg:col-span-3  font-semibold form-control w-full text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md">
                <option class="font-semibold" v-for="role in roles" :key="role" :value="role.role">{{role.role}}</option>
                </select>
          </div>
          <div class="grid lg:grid-cols-5 gap-2 mt-3">
              <label class="lg:col-span-2 w-32 block font-extrabold self-center mr-3 text-sm" style="color:#111827">Shift starts:</label>
              <!-- <date-picker v-model="time2" type="datetime"></date-picker> -->
             <div class="lg:col-span-3 h-10">
                <date-picker v-if="start!==''" @change="start_error=false" class="text-sm" format="YYYY-MM-DD HH:mm:ss" 
                display-format="DD/MM/YYYY HH:mm:ss"
                :min="today_date"
                locale="en,fa" type="datetime" v-model="start" ></date-picker>
                <div v-if="start_error" class="invalid-feedback">Start Date is required</div>
              </div>
          </div>
          <div class="grid lg:grid-cols-5 mt-3">
              <label class="text-sm lg:col-span-2 w-32 block font-extrabold self-center mr-3" style="color:#111827">Duration:</label>
              <div class="lg:col-span-3 ml-1">
                 <div class="flex">
                  <Field min="4" v-model="end_hour" name="end_hour" type="number" class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.end_hour }" />
                  <span class="font-extrabold ml-3 self-center text-sm ">hrs</span>
                  <select  v-model="end_min" name="end_min" type="number" class=" font-semibold form-control ml-3 w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md">
                    <option class="font-semibold text-sm " value="0">0 </option>
                    <option class="font-semibold text-sm" value="30">30</option>
                  </select>
                  <span class="font-extrabold ml-3 self-center text-sm">min</span>
                </div>
                <div class="invalid-feedback">{{errors.end_hour}}</div>
              </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-5">
              <label class="lg:col-span-2 w-60 block font-extrabold self-center mr-3 text-sm" style="color:#111827">Hourly rate:</label>
             
             <!-- <input  type="number" v-model="rate" -->
              <!-- class="w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md"  /> -->
             <div class="lg:col-span-3">
                <Field :min="user_detail.min_rate" v-model="rate" name="rate" type="number" class="font-semibold form-control w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.rate }" />
                <div class="invalid-feedback">{{errors.rate}}</div>
             </div>
          </div>
         
          <div class="grid lg:grid-cols-5 mt-1">
              <label class="lg:col-span-2 w-32 block font-extrabold self-center mr-3 text-sm" style="color:#111827">Uniform?</label>
              <select   v-model="uniform"
                    class="lg:col-span-3 font-semibold form-control w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md" >
                  <option class="font-semiboid text-sm" value="1">Provided</option>
                  <option class="font-semiboid text-sm" value="2">Not provided</option>

              </select>
          </div>
           <div class="grid lg:grid-cols-5 mt-2">
              <label class="lg:col-span-2 w-32 block font-extrabold self-center mr-3 text-sm" style="color:#111827">Publish?</label>
              <select   v-model="publish"
                    class="font-semibold  lg:col-span-3 w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md" >
                   <option class="font-semiboid text-sm"  value="open">Yes</option>
                  <option class="font-semiboid text-sm" value="hidden">No</option>

              </select>
          </div>
        </div>
      </div>
      <!-- <div class="flex mt-2">
        <div>
          <div class="lg:flex">
              <label class="w-60 block font-extrabold self-center mr-8 text-sm" style="color:#111827">Location:</label>
              <select v-model="location" 
                    class="ml-3 text-gray-500 font-semibold  shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md w-full" >
                  <option class="font-semibold text-sm" v-for="location in locations" :key="location" :value="location.id">{{location.full_address}}</option>
              </select>    
              <a 
              @click="addNewLocation"
              class="flex w-96 cursor-pointer text-sm justify-center items-center secondary_button  pl-1 pr-1 pt-2 pb-2 ml-8">
              Manage locations <PencilIcon class="w-4 ml-2 cursor-pointer" />
              </a>
          </div>
        </div>
      </div> -->
      <div class="mt-2">
          <label class="w-60 block font-extrabold self-center mr-3 text-sm" style="color:#111827">Shift description:</label>
          <Field  v-model="note" name="note" as="textarea" type="text" class="font-semibold form-control w-full text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm border-gray-300 rounded-md" :class="{ 'is-invalid': errors.note }" />
          <!-- <textarea type="text" v-model="note" :class="{ 'is-invalid': errors.note }" class="h-18 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full text-sm border-gray-300 rounded-md"></textarea> -->
          <div class="invalid-feedback">{{errors.note}}</div>      
      </div>
      <div class="text-right">
        <button @click="handleSubmit" class="btn mt-4 primary_button" type="button">{{getModalData.type==="edit" ? "Edit this shift" : "Duplicate this shift"}}</button>
      </div>
    </Form>
  </div>
</template>

<script>
// import { computed } from 'vue'
import {mapGetters,mapActions} from "vuex";
import DatePicker from 'vue3-persian-datetime-picker'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import {
  APIgetLocations,APIdoEditShift,APIgetRole,APIgetShiftid,APIdoAddShift
} from '@/api/employer/api'
import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'

import Loader from '@common/Loader.vue'

export default {
  components: {
    DatePicker,
    Form,
    Field,
    Loader
  },
  data: () => ({
      message_content:"",
      message_subject:"",
      locations:[],
      location:'',
      roles:[],
      role:'',
      start:"",
      end_hour:0,
      end_min:0,
      rate:'',
      note:'',
      company_name:'',
      address1:'',
      address2:'',
      address3:'',
      city:'',
      postcode:'',
      uniform:'1',
      publish:'',
      new_location_flag:false,
      shift:{},
      dateMoment:"2021-11-02 12:00:00",
      today_date:'',
    loader_flag:false

  }),
  
  computed: {
    ...mapGetters({
      messageThread: 'candidate/getMessageThread',
      userReliability: 'candidate/getUserReliability',
      messageData: 'candidate/getMessageModalData',
      getEditshiftModal_id: 'candidate/getEditshiftModal_id',
      getModalData: 'candidate/getModalData',
      user_detail:'authentication/getUserDetails',


    }),
  },
  mounted() {
    this.message_subject = this.messageData.subject ;
    this.get_shift_detail();
    let today = new Date();
    this.today_date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();

	},
  methods: {
    ...mapActions({
      fetchSendMessage: 'candidate/fetchSendMessage',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchSetEmployerModalConfigs: 'candidate/fetchSetEmployerModalConfigs',
      FetchgetShiftsDashboard: "employer/FetchgetEmployerShifts",

    }),
    get_locations(){
        APIgetLocations().then((res) => {
            this.locations = res.data.results;
             this.location = this.shift.location_id;

        });
    },  
    get_shift_detail(){
        this.loader_flag = true;
        setTimeout(() => {
          APIgetShiftid(this.getEditshiftModal_id).then((res) => {
            this.shift = res.data.object;
            this.rate = this.shift.rate;
            this.start = this.shift.start_time;
            this.end_hour = this.shift.duration.hours;
            this.end_min = this.shift.duration.minutes;
            this.uniform = this.shift.uniform === "no" ? "0" : "1";
            this.publish = this.shift.status;
            this.note = this.shift.description;
            this.get_role();
        });
        }, 100);
    },
    get_role(){
       APIgetRole().then((res) => {
            this.roles = res.data.results;
            this.role = this.shift.role;
            this.loader_flag = false;
        });

    },
    addNewLocation(){
      // this.new_location_flag = !this.new_location_flag ;
      //  const data = {
      //               isOpen: false,
      //               iconName: 'AnnotationIcon',
      //               componentName: 'EmployerProfile',
      //               title: '',
      //               data:{}
      //             };
      //       this.fetchtSetModalConfigs(data);
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
              const data = {
                        isOpen: false,
                        iconName: 'TicketIcon',
                        componentName: 'InactiveSubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
              this.fetchtSetModalConfigs(data);
              this.$router.push({ name: 'EmployerProfileLocations' })
            }
       })
    },
    handleSubmit() {
      this.FetchgetShiftsDashboard("");
      let error_flag= false;
      if(this.start===""){
        error_flag=true;
        this.start_error = true;
      }
      if(this.end===""){
        error_flag=true;
        this.end_error = true;
      }
      if(this.rate==="" || this.note===""){
        error_flag = true;
      }
      if(!error_flag){
          this.loader_flag = true;
          let post_data = {
                role:this.role,
                start_time:this.start,
                hours:this.end_hour,
                rate:this.rate,
                description:this.note,
                status:this.publish,
                uniform:this.uniform,
                new_location: this.new_location_flag ? '1' : '0',
                // location_id: this.location,
                id:this.getEditshiftModal_id,
                minutes:this.end_min

              }
            
          if(this.getModalData.type==="edit"){
            APIdoEditShift(post_data,this.getEditshiftModal_id).then(() => {
              this.loader_flag = false;
              const data = {
                      isOpen: false,
                      iconName: 'AnnotationIcon',
                      componentName: 'EmployerProfile',
                      title: '',
                      data:{modal_type:'base'}

                    };
              this.fetchtSetModalConfigs(data);
              this.$swal(
                          {
                            title:'Successfully Edited',
                            icon: 'success',
                            confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                            customClass: {
                              confirmButton: 'SuccessClosebutton'
                            }
                          }
              );
            });
          }
          else{
            APIdoAddShift(post_data).then(() => {
              this.loader_flag = false;
              const data = {
                      isOpen: false,
                      iconName: 'AnnotationIcon',
                      componentName: 'EmployerProfile',
                      title: '',
                      data:{modal_type:'base'}
                    };
              this.fetchtSetModalConfigs(data);
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
            });
          }
          
      }
     
    },
  
  },
  setup() {
    const schema = Yup.object().shape({
            
          rate: Yup.string()
            .required('Rate is required'),
        location: Yup.string()
            .required('Location is required'),
        note: Yup.string()
            .required('Note is required'),
         end_hour: Yup.string()
                .required('Hour is required'),
    });
    const schema1 = Yup.object().shape({
           
            rate: Yup.string()
                .required('Rate is required'),
            
            note: Yup.string()
                .required('Note is required'),
            company_name: Yup.string()
                .required('Company name is required'),
            address1: Yup.string()
                .required('Address is required'),
            city: Yup.string()
                .required('City is required'),
            postcode: Yup.string()
                .required('Postcode is required'),
            end_hour: Yup.string()
                .required('Hour is required'),
        });
    return {
      schema,
      schema1,

    }
    }
}
</script>