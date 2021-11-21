<template>
  <tr class="grid lg:grid-cols-shift-location-table h-12 relative shadow-md py-4 lg:py-0  bg-white  " >
    <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="text-sm text-black">
            <span class="font-semibold">{{ location.company }}</span>
        </div>
    </td>
   
    <td style="width:20px" class="pl-12 px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap shifttable_second_td">
      <div class="text-sm text-main-light">
            <span class="font-semibold">{{ location.full_address }}</span>
        </div>
    </td>
    <td>
        <button @click="removeLocation(location.id)" class="cursor-pointer"><XIcon class="w-6" style="color:#DA7272" /></button>
    </td>
    
  </tr>
</template>

<script>
// import { StarIcon} from "@heroicons/vue/outline"
import "./confirmModal.css"

import {
  APIRemoveLocations,
} from '@/api/employer/api'

import {mapGetters,mapActions} from "vuex";
import { XIcon   } from "@heroicons/vue/outline";

export default {
  components: {
      XIcon,
  },
   data: () => ({
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
    removeLocation(id){
       this.$swal({
            title: 'Remove location',
            text: "Are you sure you want to remove this location?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#049A59',
            cancelButtonColor: 'transparent',
            confirmButtonText: 'Yes, remove it',
            cancelButtonText: 'No, don’t remove it',

            }).then((result) => {
                if (result.isConfirmed) {
                  APIRemoveLocations(id).then(() => {
                      this.fetchtLocations();
                          this.$swal(
                          {
                              title:'Successfully deleted',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
                  });
                }

            })
    }
  },
  
  props: {
    location: {
      id: Number,
      user_id: Number,
      full_address: String,
      company: String,
    },
  },
}
</script>

<style>

</style>