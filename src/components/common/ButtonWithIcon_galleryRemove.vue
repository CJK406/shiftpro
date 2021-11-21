<template>
<Loader :loader_flag="loader_flag" />

  <button @click="remove_gallery" type="button" class="cursor-pointer  bg-white border border-solid border-gray-200 px-4 py-2 rounded-full img_remove_btn">
    <IconGenerator :iconName="iconAttrs.iconName" :iconClasses="iconAttrs.iconClasses" />
    <span class="text-sm font-medium text-gray-700"></span>
  </button>
</template>

<script>
import { mapActions } from "vuex";

// import { ref } from 'vue'
import IconGenerator from '@common/IconGenerator'

import {
  APIRemoveGallery
} from '@/api/candidate/api'



import Loader from '@common/Loader.vue'

export default {
  props: {
    iconAttrs: {
        iconName: String,
        iconClasses: String
    },
    gallery_id:Object,
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
      remove_gallery() {
        this.$swal({
            title: 'Do you want to delete this picture?',
            // text: "Are you sure you want to remove this gallery?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#049A59',
            cancelButtonColor: 'transparent',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',

            }).then((result) => {
                if (result.isConfirmed) {
                 this.loader_flag=true;
                  APIRemoveGallery(this.gallery_id)
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

            })
          
      }
  }
}
</script>