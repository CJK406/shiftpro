<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <Loader :loader_flag="loader_flag" />

   <div class="relative mb-2">
          <input v-model="filter"  placeholder="Search..." 
          class="wage_search_field message_search_field w-full h-10 rounded-full p-2  focus:border-gray-400" />
          <button
                @click="set_clear"
                class="p-2 pt-3 ml-2 w-9 rounded-2xl text-center btn-cancel absolute  right-1"
            >
                <SearchIcon style="color:#049A59" class="text-white w-5 m-auto" />
            </button>
          <!-- <input
              v-model="filter"
              class="border p-2 border-gray-300 focus:border-gray-300 rounded w-full"
              placeholder="Search..."
          />
          <button  @click="set_filter" class="p-2  rounded-full w-24 h-12 ml-4 text-center" style="background-color:#049A59">
            <SearchIcon class="text-white w-6 m-auto" />
          </button> -->
        </div>
  <ul class="divide-y divide-gray-100  px-4 py-2">
    <li v-for="contact in contact_data" :key="contact.username" class="py-4 flex">
      <div class="mr-4 self-center">
          <div class="float-right flex">
              <button @click="openModal( contact.user_id, contact.photo, user_detail.user_type===2 ? contact.company : contact.username)" type="button" class="text-gray-600 hover:text-emerald">
                <MailIcon class="p-1 rounded-full border cursor-pointer border-solid border-gray-300 w-8 " > </MailIcon>
              </button>
          </div>
      </div>
      
      <img class=" h-10 w-10 rounded-full" :src="`https://shiftpro.dev/`+contact.photo" :alt="contact.photo" />
      <div class="ml-3 self-center">
        <p class="text-sm font-medium text_username">{{ user_detail.user_type===2 ? contact.company : contact.username }}</p>
        <!-- <p class="text-sm break-all">{{ contact.email }}</p> -->
      </div>
      <div class="ml-auto">
          <div class="float-right flex">
              <button @click="removeFavourite(contact.favourite_id)" type="button" class="text-gray-600 hover:text-emerald">
                <XIcon style="color:#EA8D8D" class="p-1 rounded-full border cursor-pointer w-8 " > </XIcon>
              </button>
          </div>
      </div>
      
    </li>
  </ul>
  <p class="text-center" v-if="contact_data.length===0">You have no recent contacts</p>
  <div class="pagination_div">
    <v-pagination
      v-model="page"
      :pages="Math.ceil(this.contact_data.length/10)"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="updateHandler"
    />
  </div>

</template>

<script>

import { MailIcon,SearchIcon, XIcon } from '@heroicons/vue/solid'
import {mapGetters,mapActions} from "vuex";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {
  APIGetCandidateFavourite,APIRemoveCandidatefavourite
} from '@/api/candidate/api'
import {
  APIGetEmployerFavourite,APIRemoveEmployerfavourite
} from '@/api/employer/api'
import Loader from '@common/Loader.vue'

export default {
  
  components: {
    MailIcon,
    SearchIcon,
    VPagination,
    XIcon,
    Loader
  },
  data() {
      return {
        page: 1,
        contact_data:[],
        filter:"",
        loader_flag:false,

      };
  },
  computed: {
    ...mapGetters({
        user_detail:'authentication/getUserDetails',

    }),
  },
  methods: {
    ...mapActions({
      fetchUserReliability: 'candidate/fetchUserReliability',
      fetchMessageThread: 'candidate/fetchMessageThread',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',
    }),
    openModal (user_id, photo, username) {
      this.fetchUserReliability({id: 1})
      const message_data = {photo:'https://shiftpro.dev/'+photo,
                            reply_id:'', user_id: user_id, subject:'', user_name:username}
      const data = {
                isOpen: true,
                iconName: 'UserPhoto',
                componentName: 'NetworkModalContent',
                title: '',
                data:{modal_type:'base'}
                };
      this.fetchtSetModalConfigs(data);
      this.fetchtSetMessageModalConfigs(message_data);
    },
   
    set_filter(){
      this.updateHandler();
    },

    removeFavourite(id){
      this.$swal({
            title: 'Remove this favourite',
            text: "Are you sure you want to remove this favourite?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#049A59',
            cancelButtonColor: 'rgba(255,0,0,0.7)',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',

            }).then((result) => {
                
                if (result.isConfirmed) {
                  this.loader_flag = true;
                  if(this.user_detail.user_type === 2){
                      APIRemoveCandidatefavourite(id).then((res) => {
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
                  if(this.user_detail.user_type === 3){
                    APIRemoveEmployerfavourite(id).then((res) => {
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
                  
                }
            });
      
    },

    get_favourite(){
      if(this.user_detail.user_type === 2){
        APIGetCandidateFavourite().then((res) => {
            this.contact_data=res.data.results;
          });
      }
      if(this.user_detail.user_type === 3){
        APIGetEmployerFavourite().then((res) => {
            this.contact_data=res.data.results;
          });
      }
    }
  },
   mounted() {
      this.get_favourite();
    }
}
</script>