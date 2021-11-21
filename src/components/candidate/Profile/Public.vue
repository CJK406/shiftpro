<template>
<Loader :loader_flag="loader_flag" />
<div class="bg-white shadow-sm rounded-xl" >
      <div class="absolute h-20 w-full rounded-t-xl" style="background-color:#111827"></div>
      <div class="" >
        <div class="flex items-center  mb-6 transform ml-10 pt-8 " >
          <div class="flex items-center  mb-10 transform">
            <div class="h-16 w-16 rounded-full mr-4 flex justify-center align-center" style="background-color:#F0F1F9">
               <Avatar class="" :imgURL="user_detail.photo" :htmlAlt="user_detail.photo"/>
            </div>
            <ButtonWithIcon 
              type_button="Edit image"
              usergroup = '2'
              :iconAttrs="{
                iconName: 'CameraIcon',
                iconClasses: 'inline-block w-5 text-white cursor-pointer  self-center'
              }"
              />
          </div>
            <p class="biotif-regular -mt-10 font-bold text-xl text-white">{{user_detail.fullname}}</p>
            <!-- <PencilIcon class="w-4 ml-2 cursor-pointer" style="color:rgb(4,154,89)" /> -->
        </div>
      </div>
      <div class="mb-4 pl-10 pb-6">
        <div class="relative grid  sm:grid-cols-8  max-w-3xl  ">
            <div class="col-span-2"> 
              <h3 class="font-bold text-lg sm:mb-2 text-gray-900 text-left">
                 Your rating
              </h3>
              <Stars :count="user_detail.rating/20"/>
            </div>
            <div class="col-span-3">
              <ProgressBar :title="user_detail.username" :percentage="user_detail.reliability"/>
            </div>
            <div class="col-span-2">
              <Numeric title="Successful shifts" :number="user_detail.completed" />
            </div>
          </div>
      </div>

  </div>
  <Form @submit="save_change" class="bg-white shadow-sm rounded-xl p-10" :validation-schema="schema" v-slot="{ errors }">
      <div class="">
        <p class=" text-gray-900 text-3xl mb-1 Biotif-bold">Edit public profile</p>
        <p class="text-sm text-desc">Change the information seen by the employers</p>
      </div>
      <div class="mt-4">
         <p class="text-main mb-4 text-md">Your gallery</p>
        <div class="grid lg:grid-cols-profile_images grid-cols-3 gap-1 mt-2">
          <div class="flex items-center  mb-10 transform">
            <div class="h-16 w-16 rounded-full mr-4 flex justify-center align-center" style="background-color:#F0F1F9">
              <CameraIcon class="w-8 text-white" />
            </div>
            <ButtonWithIconGallery 
              type_button="Upload gallery" 
              usergroup = '2'
              :iconAttrs="{
                iconName: 'PlusIcon',
                iconClasses: 'inline-block w-5 text-white cursor-pointer  self-center'
              }"
              @updategallery="get_gallery"
            />
          </div>
          <div v-for="x in gallery" :key="x" class="flex items-center  mb-10 transform hover:gallery_image_hover gallery_image">
            <Avatar class="mr-4" :imgURL="x.image" :htmlAlt="x.image"/>
            <ButtonWithIconGalleryRemove 
              type_button="Upload gallery" 
              usergroup = '2'
              :gallery_id ="x.id" 
              :iconAttrs="{
                iconName: 'XIcon',
                iconClasses: 'inline-block w-5 text-white cursor-pointer  self-center'
              }"
              @updategallery="get_gallery"
            />
          </div>
         </div>
        <div >
          <div class="lg:pr-8 mb-8">
              <label class="block mb-2 " style="color:#111827">Your job title(s)</label>
                <select v-model="role" 
                        class="focus:ring-emerald w-1/2 focus:border-emerald col-span-1 h-10 text-gray-700 lg:mt-0 mt-2 flex text-sm border rounded p-2" style="border-color:#D1D5DB"
                        @change="changeRoleSelect($event)"
                >
                        <option value="" disabled>Add a job title</option>
                        <option v-for="role in roles" :key="role" :value="role.role">{{role.role}}</option>
                </select>
                  <div class="mt-3 flex gap-2"> 
                    <div v-for="role in roles_selected" :key="role" class="rounded-full mt-2 lg:mt-0 p-1 px-2 flex  ml-1" >
                      <span class="flex rounded-full" style="background-color:#F3F4F6; padding:5px 10px">
                        <span class="self-center text-sm  font-semibold">{{role}}  </span>
                        <XIcon  @click="clearRole(role)" class="w-6 ml-2 cursor-pointer" style="color:rgb(4,154,89)" />
                      </span>
                    </div>
                  </div>
            </div>
          <div class="grid lg:grid-cols-1 lg:w-1/2 gap-4 lg:pr-8 mb-8">
            <label class="font-bold biotif text-xl text-gray-900">Languages</label>
            <div>
              <select class="focus:ring-emerald focus:border-emerald text-sm h-10 border border-gray-300 rounded placeholder-gray-300::placeholder focus:outline-none" 
                   @change="changeLanguageSelect($event)"
                   v-model="language" 
                   placeholder="asefasef">
                  <option value="" disabled>Add a language</option>
                  <option value="English">English</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="French">French</option>

              </select>
              <div class="lg:flex mt-3">
                <div v-for="language in languages" :key="language" class="rounded-full mt-2 lg:mt-0 p-1 px-3 flex w-30 ml-2" style="background-color:#F3F4F6">
                  <span class="self-center font-semibold text-sm">{{language}}  </span>
                  <XIcon  @click="clearLanguage(language)" class="w-6 ml-2 cursor-pointer" style="color:rgb(4,154,89)" />
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="font-bold biotif text-xl text-gray-900">Preferences</label>
            <div class="grid lg:grid-cols-3 gap-8 mt-2">
              <div>
                    <label class="block " style="color:#111827">Minimum salary:</label>
                    <div class="mt-1">
                       <select v-model="min_salary"
                        class="col-span-1 h-10 focus:ring-emerald focus:border-emerald text-gray-500 lg:mt-0 mt-2 flex text-sm border rounded p-2 w-full" style="border-color:#D1D5DB"
                        >
                          <option value="0">Any rate</option>
                          <option value="10.00">£10.00 per hour</option>
                          <option value="20.00">£20.00 per hour</option>
                          <option value="30.00">£30.00 per hour</option>
                          <option value="40.00">£40.00 per hour</option>
                          <option value="50.00">£50.00 per hour</option>
                       </select>
                    </div>
              </div>
              <div>
                    <label class="block " style="color:#111827">DBS check:</label>
                    <div class="mt-1">
                       <select v-model="dbs_check"
                        class="col-span-1 h-10 focus:ring-emerald focus:border-emerald text-gray-500 lg:mt-0 mt-2 flex text-sm border rounded p-2 w-full" style="border-color:#D1D5DB"
                        >
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                       </select>
                    </div>
              </div>
              <div>
                    <label class="block " style="color:#111827">Distance willing to travel:</label>
                    <div class="mt-1">
                       <select v-model="distance_willing"
                        class="col-span-1 h-10 focus:ring-emerald focus:border-emerald text-gray-500 lg:mt-0 mt-2 flex text-sm border rounded p-2 w-full" style="border-color:#D1D5DB"
                        >
                          <option value="1">Within 1 mile</option>
                          <option value="3">Within 3 miles</option>
                          <option value="5">Within 5 miles</option>
                          <option value="10">Within 10 miles</option>
                          <option value="20">Within 20 miles</option>
                          <option value="30">Within 30 miles</option>
                          <option value="50">Within 50 miles</option>
                          <option value="5000">Nationwide</option>

                       </select>
                    </div>
              </div>
              <div>
                    <label class="block " style="color:#111827">Driving licence:</label>
                    <div class="mt-1">
                       <select v-model="licence"
                        class="col-span-1 h-10 focus:ring-emerald focus:border-emerald text-gray-500 lg:mt-0 mt-2 flex text-sm border rounded p-2 w-full" style="border-color:#D1D5DB"
                        >
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                       </select>
                    </div>
              </div>
              <div>
                    <label class="block " style="color:#111827">Access to a car:</label>
                    <div class="mt-1">
                       <select v-model="access_car"
                        class="col-span-1 h-10 focus:ring-emerald focus:border-emerald text-gray-500 lg:mt-0 mt-2 flex text-sm border rounded p-2 w-full" style="border-color:#D1D5DB"
                        >
                         <option value="1">Yes</option>
                          <option value="0">No</option>
                       </select>
                    </div>
              </div>
              <div>
                    <label class="block " style="color:#111827">Closest train station:</label>
                    <div class="mt-1">
                       <Field v-model="closest_train_station" name="closest_train_station" type="text" class="h-10 form-control text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                      :class="{ 'is-invalid': errors.closest_train_station }" />
                      <div class="invalid-feedback">{{errors.closest_train_station}}</div>
                    </div>
              </div>
              
            </div>

          </div>

          <label class="font-bold biotif text-xl text-gray-900">About you</label>
          <div class="grid lg:grid-cols-1 gap-8 mt-2">
            <div>
                  <label class="block " style="color:#111827">Key information:</label>
                  <div class="mt-1">
                  <Field v-model="keyinfo" name="keyinfo" as="textarea" class="form-control h-24 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.keyinfo }" />
                  <div class="invalid-feedback">{{errors.keyinfo}}</div>
                  </div>
            </div>
            <div>
                  <label class="block " style="color:#111827">Additional certifications:</label>
                  <div class="mt-1">
                  <Field v-model="certifications" name="certifications" as="textarea" class="form-control h-24 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.certifications }" />
                  <div class="invalid-feedback">{{errors.certifications}}</div>
                  </div>
            </div>
            <div>
                  <label class="block " style="color:#111827">Personal statement:</label>
                  <div class="mt-1">
                  <Field v-model="statement" name="statement" as="textarea" class="form-control h-24 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.statement }" />
                  <div class="invalid-feedback">{{errors.statement}}</div>
                  </div>
            </div>
            <div>
                  <label class="block " style="color:#111827">Work experience:</label>
                  <div class="mt-1">
                  <Field v-model="experience" name="experience" as="textarea" class="form-control h-24 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md" 
                  :class="{ 'is-invalid': errors.experience }" />
                  <div class="invalid-feedback">{{errors.experience}}</div>
                  </div>
            </div>
          </div>
        </div> 
       

        <div class="text-right">
          <button @click="save_change" @submit="save_change" class="btn primary_button lg:ml-auto h-10 pb-2 w-50 ml-auto mb-4 mt-4">
                Save changes
          </button>
        </div>
      </div>
  </Form>
</template>

<script>
import { 
  XIcon 
} from '@heroicons/vue/solid'
import { CameraIcon  } from "@heroicons/vue/outline";
import ButtonWithIcon from '@common/ButtonWithIcon'
import ButtonWithIconGallery from '@common/ButtonWithIcon_gallery'
import ButtonWithIconGalleryRemove from '@common/ButtonWithIcon_galleryRemove'




import Avatar from '@common/Avatar'
import {mapGetters,mapActions} from "vuex";
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import ProgressBar from '@common/ProfileStats/ProgressBar'
import Numeric from '@common/ProfileStats/Numeric'
import Stars from '@common/ProfileStats/Stars'
import {
  APIgetRole
} from '@/api/employer/api'
import {
  APIdoUpdateProfile,APIgetGallery
} from '@/api/candidate/api'
import Loader from '@common/Loader.vue'
export default {
  components: {
    Form,
    Field,
    Avatar,
    XIcon,
    Loader,
    ProgressBar,
    Numeric,
    Stars,
    CameraIcon,
    ButtonWithIcon,
    ButtonWithIconGallery,
    ButtonWithIconGalleryRemove
  },
  data: () => ({
    languages:[],
    language:'',
    keyinfo:'',
    certifications:'',
    experience:'',
    statement:'',
    roles:[],
    role:'',
    roles_selected:[],
    gallery:[],
    nickname:'',
    loader_flag:false,
    employer_data:{},
    min_salary:9,
    dbs_check:0,
    distance_willing:1,
    licence:1,
    access_car:0,
    closest_train_station:''

  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
      }),
     
    },
    mounted () {
      this.keyinfo=this.user_detail.keyinfo;
      this.certifications=this.user_detail.certifications;
      
      this.languages = this.user_detail.languages;
      this.roles_selected = this.user_detail.roles;
      this.statement = this.user_detail.statement;
      this.experience = this.user_detail.experience;

      this.min_salary = this.user_detail.min_wage;

      this.distance_willing = this.user_detail.max_distance;
      this.dbs_check = this.user_detail.dbs_check;
      this.closest_train_station = this.user_detail.closest_station;
      this.access_car = this.user_detail.access_car;
      this.licence = this.user_detail.driver_license;
      this.get_role();
      this.get_gallery();
    },
     watch: {
    },
    methods: {
      ...mapActions({
        doGetUserData: "authentication/doGetUserData",

      }),
      changeLanguageSelect(event){
        this.language = "";
        if(!this.languages.includes(event.target.value)){
          this.languages.push(event.target.value)
        }

      },
      changeRoleSelect(event){
        this.role = "";

        if(!this.roles_selected.includes(event.target.value)){
          this.roles_selected.push(event.target.value)
        }
      },
      get_role(){
       APIgetRole().then((res) => {
            this.roles = res.data.results;
            this.role = '';
        });
    },
    get_gallery(){
        APIgetGallery().then((res) => {
            this.gallery = res.data.results;
        });
      },
    clearRole(role){
        const index = this.roles_selected.indexOf(role);
        if (index > -1) {
          this.roles_selected.splice(index, 1);
        }
      },
      clearLanguage(lang){
        const index = this.languages.indexOf(lang);
        if (index > -1) {
          this.languages.splice(index, 1);
        }
      },
      save_change(){
          let post_data = {
            languages : this.languages.join(","),
            roles : this.roles_selected.join(","),
            role : this.roles_selected.join(","),
            keyinfo : this.keyinfo,
            certifications : this.certifications,
            statement : this.statement,
            experience : this.experience,
            min_wage:this.min_salary,
            dbs_check:this.dbs_check,
            closest_station:this.closest_train_station,
            max_distance:this.distance_willing,
            driver_license:this.licence,
            access_car:this.access_car,
            form:1
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
            });
        }
    },
    setup() {

        const schema = Yup.object().shape({
                nickname: Yup.string()
                    .required('Nick name is required'),
                keyinfo: Yup.string()
                    .required('Key information is required'),
                // certifications: Yup.string()
                //     .required('Certifications is required'),
                statement: Yup.string()
                    .required('Personal statement is required'),
                // experience: Yup.string()
                //     .required('Work experience is required'),
                //  job_title: Yup.string()
                //     .required('Job title is required'),
               
            });
      return {
        schema,
      }
    }
}
</script>