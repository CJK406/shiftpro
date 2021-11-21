<!-- This example requires Tailwind CSS v2.0+ -->
<template>

  <div v-if="!shift_detail_flag" class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <Loader :loader_flag="loader_flag" />

          <table data-page-length='5' class="min-w-full divide-y divide-gray-200" id="datatable">
            <thead class="bg-gray-50">
              <tr class=" hidden lg:grid lg:grid-cols-shift-table">
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Rates
                </th>
                 <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Distance
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only"> edit </span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <Row v-for="shift in shift_data" @applyEvent="applyEvent" :key="shift.id" :shift="shift" actionType="dashboard"></Row>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-if="shift_detail_flag">
    <button v-on:click="back" class="text-green-600 font-bold flex mb-4"><ArrowLeftIcon class="w-5 mr-1 self-center" /> <span>Back</span></button>
    <span class="text-3xl Biotif-bold mt-1">{{shiftPanelData.company}}</span>
    <div class="grid lg:grid-cols-2 gap-12">
        <div class="lg:col-span-1 mt-6">
            <p class="flex items-center pb-2"><span class="text-black font-bold  mr-2 w-20">Shift time: </span><span class="">{{shiftPanelData.start_time_formatted}} -{{shiftPanelData.end_time_formatted}} </span></p>
            <p class="flex pb-2"><span class="text-black font-bold  mr-2">Hourly rate: </span><span>&pound;{{shiftPanelData.rate}} ({{shiftPanelData.duration.hours}} hours {{shiftPanelData.duration.minutes}} mins)</span></p>
            <p class="flex pb-2"><span class=" text-black font-bold  mr-2">Location: </span><span>{{shiftPanelData.postcode}}</span></p>
            <p class="flex pb-2"><span class="text-black font-bold  mr-2">Distance: </span><span>{{shiftPanelData.distance}}</span></p>
        </div>
        <div class="lg:col-span-1 mt-10">
          <span class="text-gray-900 font-bold  mr-2">Shift Description: </span>
          <div v-html="shiftPanelData.description" class="text-base text-main-light">  </div>
          <button type="button" class="btn primary_button mt-4" v-if="shiftPanelData.applied===false"  v-on:click="action_accept">{{shiftPanelData.user_status==="requested" ? "Accept shift " : "Apply now"}}</button>

        </div>

    </div>
  </div>
</template>

<script>

import Row from './Row'
import Loader from '@common/Loader.vue'
import {mapGetters,mapActions} from "vuex";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { ArrowLeftIcon  } from '@heroicons/vue/outline'
import {
  APIgetShiftsDashboard,
  APIapplyShift
} from '@/api/candidate/api'
export default {
  components: {
    Row,
    ArrowLeftIcon,
    Loader
  },
   props: {
        employer_data: {
            user_id: String,
        },
        actionType:String,
  },
  watch: {
  },
  data() {
        return {
        shift_data:[],
        table:"",
        loader_flag: false,
        shift_detail_flag:false,

        };
    },
     computed: {
      ...mapGetters({
        shiftPanelData:'candidate/getCurrentPanel',
      }),
    },
   
    methods: {
      ...mapActions({
      }),
      applyEvent(){
        this.shift_detail_flag=true;
      },
      action_accept(){
          if(this.shiftPanelData.status==="open"){
            this.loader_flag=true;
            APIapplyShift({shift_id:this.shiftPanelData.id}).then((res) => {
              this.loader_flag=false;
              if(res.data.success===true){
                this.$swal(
                          {
                              title:'Successfully applied',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );
              }
            });
          }
         
        },
        back(){
        this.shift_detail_flag=false;

        }
    },
    mounted() {
        if(this.table!="")
            $('#datatable').DataTable().destroy();
        this.loader_flag=true;
        APIgetShiftsDashboard("",this.employer_data.user_id)
            .then(response => {
                this.shift_data = response.data.results
                setTimeout(() => {
                    this.table= $('#datatable').DataTable({
                    "language": {
                      "emptyTable": "Currently there is no shifts available",
                      paginate: {
                                previous: '&#x2190; Previous',
                                next: 'Next &#x2192;',
                            },
                    }
                });
                    this.loader_flag=false;
                }, 20);
            });
        
    },
 
 
}
</script>