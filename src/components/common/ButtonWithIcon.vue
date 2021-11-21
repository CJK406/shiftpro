<template>
<Loader :loader_flag="loader_flag" />

  <button  type="button" :class="usergroup==='3'?'img_upload_btn_em':'img_upload_btn'" class="bg-white border border-solid border-gray-200 px-4 py-2 rounded-full">
    <IconGenerator :iconName="iconAttrs.iconName" :iconClasses="iconAttrs.iconClasses" />
    <span class="text-sm font-medium text-gray-700"></span>
    <input class="opacity-0  absolute file" id="file" style="width:30px; left:0" @change="updateProfile($event)" type="file" ref="inputRef" >
  </button>
</template>

<script>
import { mapActions } from "vuex";

// import { ref } from 'vue'
import IconGenerator from '@common/IconGenerator'
import {
  APIdoUpdateProfileImage
} from '@/api/common/api'

import {
  APIdoUploadGallery
} from '@/api/candidate/api'



import Loader from '@common/Loader.vue'

export default {
  props: {
    iconAttrs: {
        iconName: String,
        iconClasses: String
    },
    usergroup:String,
    type_button: String
  },
  data: () => ({
      loader_flag: false,
  }),
  components: {
    IconGenerator,
    Loader
  },
  methods: {
     ...mapActions({
            doGetUserData: "authentication/doGetUserData",
        }),
      updateProfile() {
        const form = new FormData();
        this.loader_flag=true;
        if(this.type_button==="Upload gallery"){
        const imagefile = document.querySelector('#file1');
          form.append('upload', imagefile.files[0]);
          APIdoUploadGallery(form)
            .then(response => {
                if(response.data.success)
                {
                  this.$emit("updategallery");
                  this.loader_flag=false;
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
                  this.loader_flag=false;
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

            })
        }
        else{
        const imagefile = document.querySelector('#file');
          form.append('photo', imagefile.files[0]);
          this.loader_flag=true;
          APIdoUpdateProfileImage(form)
            .then(response => {
                if(response.data.success)
                {
                  let userType = this.usergroup ==="3" ? 3 : 2;
                  this.doGetUserData(userType);
                  this.loader_flag=false;
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
                  this.loader_flag=false;
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
  }
}
</script>