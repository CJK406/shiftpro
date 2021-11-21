<!-- This example requires Tailwind CSS v2.0+ -->
<template>

  <div v-if="!shift_detail_flag" class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            
            <Loader :loader_flag="loader_flag" />
           <div class="mobile_view large_content_shadow min-w-full divide-y divide-gray-200 bg-white" style="border:1px solid #E5E7EB">
                <div class="relative" v-click-away="onClickAway2">
                    <div class="flex items-center p-2 pl-4 mobile_td cursor-pointer" @click="open_sortbyDropdown">
                        <img 
                                class=""
                                style="width:9px; height:12px"
                                :src="require('../../../assets/images/sort.svg')"
                            />
                        <span class="self-center ml-2 mobile_sortBy">SORT BY</span>
                    </div>
                    <div v-if="open_sortbyFlag" class="open_sortby_list">
                        <div class="flex mb-3 cursor-pointer">
                            <img 
                                class="w-3"
                                :src="require('../../../assets/images/sort.svg')"
                            />
                            <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">ROLE</span>
                        </div>
                        <div class="flex mb-3 cursor-pointer">
                            <img 
                                class="w-3"
                                :src="require('../../../assets/images/sort.svg')"
                            />
                            <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold"> RATE</span>
                        </div>
                        <div class="flex mb-3 cursor-pointer">
                            <img 
                                class="w-3"
                                :src="require('../../../assets/images/sort.svg')"
                            />
                            <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">LOCATION</span>
                        </div>
                        <div class="flex cursor-pointer">
                            <img 
                                class="w-3"
                                :src="require('../../../assets/images/sort.svg')"
                            />
                            <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">DISTANCE</span>
                        </div>
                    </div>
                </div>
                
                <div v-if="page_data.length===0" class="text-center pt-3">
                    <span class="text-sm text-center" style="color:#727497">No shifts matching your criteria</span>
                </div>
                <RowMobile 
                    v-for="shift in page_data"
                    @applyEvent="applyEvent"
                    :key="shift.id"
                    :shift="shift"
                    :actionType="actionType"
                ></RowMobile>
                <div class="pagination_div pb-10 pt-4">
                    <v-pagination
                        v-model="page"
                        :pages="Math.ceil(this.shift_data.length/5)"
                        :range-size="1"
                        active-color="#DCEDFF"
                        @update:modelValue="updatePagination"
                        />
                    </div>
            </div>
          <table class="large_content_shadow min-w-full divide-y divide-gray-200 datatable" id="datatable">
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
                <th scope="col" id="back_none" class="relative px-6 py-3">
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
            <p class="flex items-center pb-2"><span class="text-black font-bold  mr-2 w-32">Shift starts: </span><span class="">{{shiftPanelData.start_time_formatted}}</span></p>
            <p class="flex items-center pb-2"><span class="text-black font-bold  mr-2 w-32">Shift ends: </span><span class="">{{shiftPanelData.end_time_formatted}} </span></p>
            
            <p class="flex pb-2"><span class="text-black font-bold w-32 mr-2">Rate: </span><span>&pound;{{shiftPanelData.rate}} ({{shiftPanelData.duration.hours}} hours {{shiftPanelData.duration.minutes}} mins)</span></p>
            <p class="flex pb-2"><span class=" text-black font-bold w-32 mr-2">Location: </span><span>{{shiftPanelData.postcode}}</span></p>
            <p class="flex pb-2"><span class="text-black font-bold w-32 mr-2">Distance: </span><span>{{shiftPanelData.distance}}</span></p>
            <p class="flex pb-2"><span class="text-black font-bold w-32 mr-2">Uniform required: </span><span>{{shiftPanelData.uniform===0 ? "No" : "Yes"}}</span></p>
        </div>
        <div class="lg:col-span-1 mt-5">
          <span class="text-black font-bold  mr-2">Shift Description: </span>
          <div v-html="shiftPanelData.description" class="text-base text-main-light">  </div>
          <button type="button" class="primary_button mt-4" v-if="shiftPanelData.applied===false"  v-on:click="action_accept">{{shiftPanelData.user_status==="requested" ? "Accept shift " : "Apply now"}}</button>

        </div>

    </div>
  </div>
</template>

<script>
import Loader from '@common/Loader.vue'
import Row from './Row'
import RowMobile from "./Row_mobile";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {mapGetters,mapActions} from "vuex";
import 'jquery/dist/jquery.min.js';
import { mixin as VueClickAway } from "vue3-click-away";

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { ArrowLeftIcon  } from '@heroicons/vue/outline'
import {
  APIgetShiftsDashboard,
  APIapplyShift
} from '@/api/candidate/api'
import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'
export default {
  components: {
    Row,
    ArrowLeftIcon,
    Loader,
    VPagination,
    RowMobile

  },
   props: {
        employer_data: {
            user_id: String,
        },
        actionType:String,
  },
  watch: {
  },
    mixins: [VueClickAway],

  data() {
        return {
        shift_data:[],
        table:"",
        loader_flag: false,
        shift_detail_flag:false,
        page: 1,
        page_data:[],
        open_sortbyFlag:false
        };
    },
     computed: {
      ...mapGetters({
        shiftPanelData:'candidate/getCurrentPanel',
      }),
    },
   
    methods: {
      ...mapActions({
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',

      }),
      updatePagination() {
            this.page_data=[];
            let a = this.shift_data.length<this.page*5 ? this.shift_data.length :this.page*5;
            for(let i=(this.page-1)*5;  i<a; i++){
                this.page_data.push(this.shift_data[i]);
            }
        },
      applyEvent(){
        this.shift_detail_flag=true;
      },
      onClickAway2() {
          this.open_sortbyFlag = false;
      },
      open_sortbyDropdown(){
          this.open_sortbyFlag = !this.open_sortbyFlag;
      },
      action_accept(){
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
            }
           })
        },
        back(){
        this.shift_detail_flag=false;

        }
    },
    mounted() {
        if(this.table!="")
        $('.datatable').DataTable().destroy();
        this.loader_flag=true;
        APIgetShiftsDashboard("",this.employer_data.user_id)
            .then(response => {
                this.shift_data = response.data.results
                setTimeout(() => {
                    this.table = $(".datatable").DataTable({
                        language: {
                            paginate: {
                            previous: '&#x2039',
                            next: '&#x203A;'
                            }
                        }
                    });
                    this.loader_flag=false;
                }, 20);
                this.updatePagination();
            });
        
    },
 
 
}
</script>