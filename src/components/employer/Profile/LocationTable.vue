<!-- This example requires Tailwind CSS v2.0+ -->
<template>
<Loader :loader_flag="loader_flag" />
  
  <div>

    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 mb-52"  id="datatable">
                <thead class="bg-gray-50">
                    <tr class="hidden lg:grid lg:grid-cols-shift-location-table">
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            LOCATION NAME
                        </th>
                        
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            ADDRESS
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <Row
                        v-for="location in location_data"
                        :key="location"
                        :location="location"
                    ></Row>
                </tbody>
        </table>
         <button @click="addNewLocation" class="mt-4 mb-4 text-gray-700 hover:text-emerald flex w-30 ml-auto border border-gray-300 rounded-full p-2"><OfficeBuildingIcon class="w-6" /> <span class="w-40">Add new location </span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
@import "../../../common.css";
</style>
<script>
import Row from './LocationTable/Row.vue'

import { OfficeBuildingIcon   } from "@heroicons/vue/outline";

 
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { mapGetters, mapActions } from "vuex";
import Loader from '@common/Loader.vue'

export default {
  components: {
    Row,
    OfficeBuildingIcon,
    Loader
  }, 
  data() {
    return{
      table: "",
      location_data:[],
      loader_flag:false
    }
  },
  computed: {
      ...mapGetters({
        getLocations: 'employer/getLocations',
      }),
  },
  watch: {
    getLocations: function () {
        this.location_data = this.getLocations;
        this.updateHandler();
    },
  },
   methods: {
        ...mapActions({
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
            fetchtLocations: 'employer/fetchtLocations',
        }),
        updateHandler() {
            if (this.table != "") {
                $("#datatable").DataTable().destroy();
            }
            setTimeout(() => {
                this.table = $("#datatable").DataTable({
                   language: {
                    paginate: {
                    previous: '&#x2039',
                    next: '&#x203A;'
                    }
                }
                });
            }, 10);
        },
        addNewLocation(){
            const data = {
                    isOpen: true,
                    iconName: 'OfficeBuildingIcon',
                    componentName: 'AddLocationModalContent',
                    title: '',
                    data:{modal_type:'base'}
                };
        this.fetchtSetModalConfigs(data);
        }

   },
   mounted() {
     this.loader_flag = true;
        this.fetchtLocations();
        this.loader_flag = false;
      
   },
}
</script>