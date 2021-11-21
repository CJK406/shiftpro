<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <Loader :loader_flag="loader_flag" />
    <!-- <div v-click-away="onClickAway1"  class="lg:col-span-4 md:col-span-4 flex items-center relative  justify-center mb-8">
            <button class="flex w-full biotif font-bold text-gray-700 justify-center items-center bg-white biotif-regular pl-8 pr-4  rounded-full border border-gray-400 ml-8"
                v-on:click="top_filter_open">
                <span class=" p-2 w-full border-r-2 border-gray-400">
                    Grill chef 11 June 2021 10AM-8PM WD3 6EG
                </span>
                <ChevronDownIcon class="pl-2 w-8 h-4 ml-auto text-gray-500 " />
            </button>
            <div class="filter-list" style="width:95%;left: 35px;top:45px" v-show="topfilterBox">
                <button class="p-2 font-bold hover:text-emerald">Grill chef 11 June 2021 10AM-8PM WD3 6EG</button>
            </div>
        </div> -->
    <div class="overflow-x-auto">
        <div class="flex mt-4 mb-4 overflow-x-auto" style="min-width:500px;">
            <button @click="addShift" type="button"
                class="flex mt-2  mr-2  p-2 hover:text-emerald p-1 cursor-pointer secondary_button  w-36 justify-center">
                <span class="flex"><span>
                <PlusSmIcon class="w-4" /></span> <span class=" ml-1 self-center text-sm">Add new shift</span></span>
            </button>
            <button  type="button"
                class="flex mt-2  mr-2  p-2 hover:text-emerald p-1 cursor-pointer secondary_button  w-36 justify-center">
                <span class="flex"><span>
                <PencilAltIcon class="w-4" /></span> <span class=" ml-1 self-center text-sm">Fill timesheets</span></span>
            </button>
            <button  type="button"
                class="flex mt-2  mr-2  p-2 hover:text-emerald p-1 cursor-pointer secondary_button  w-36 justify-center">
                <a href="#/employer/finance/payment">
                    <span class="flex"><span>
                    <OfficeBuildingIcon class="w-4" /></span> <span class=" ml-1 self-center text-sm">Wages</span></span>
                </a>
            </button>
        </div>
        <div></div>
    </div>

    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div class="mobile_view large_content_shadow min-w-full divide-y divide-gray-200 bg-white" style="border:1px solid #E5E7EB">
                        <div class="relative" v-click-away="onClickAway2">
                            <div class="flex items-center p-2 pl-4 mobile_td cursor-pointer" @click="open_sortbyDropdown">
                                <img 
                                        class=""
                                        style="width:9px; height:12px"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                <span class="self-center ml-2 mobile_sortBy">SORT BY</span>
                            </div>
                            <div v-if="open_sortbyFlag" class="open_sortby_list">
                               <div class="flex mb-3 cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">ROLE</span>
                               </div>
                               <div class="flex mb-3 cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold"> SHIFT TIMES</span>
                               </div>
                               <div class="flex mb-3 cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">DURATION</span>
                               </div>
                               
                               <div class="flex cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">APPLICANTS</span>
                               </div>
                            </div>
                        </div>
                        
                        <div v-if="page_data.length===0" class="text-center pt-3">
                            <span class="text-sm text-center" style="color:#727497">No shifts matching your criteria</span>
                        </div>
                        <RowMobile 
                            v-for="shift in page_data"
                            :key="shift.id"
                            :shift="shift"
                            :actionType="actionType"
                        ></RowMobile>
                        <div class="pagination_div pb-10 pt-4">
                            <v-pagination
                                v-model="page"
                                :pages="Math.ceil(this.shift_data.length/10)"
                                :range-size="1"
                                active-color="#DCEDFF"
                                @update:modelValue="updatePagination"
                                />
                            </div>
                    </div>
                    <table class="min-w-full divide-y divide-gray-200"  id="datatable">
                        <thead class="bg-gray-50">
                            <tr class="hidden lg:grid lg:grid-cols-shift-table-em_dashboard">
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ROLE
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                   SHIFT TIMES
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    DURATION
                                </th>
                                <th  scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    APPLICANTS
                                </th>
                                <th  scope="col" id="back_none"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                                    
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <Row
                                v-for="shift in shift_data"
                                :key="shift.id"
                                :shift="shift"
                                actionType="complete"
                            ></Row>
                        </tbody>
                    </table>
                  
                    <RowPanel
                        :shift="shiftPanelData"
                        :actionType="actionType"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>
import Row from "./ShiftsDashboardTable/Row";
import RowMobile from "./ShiftsDashboardTable/Row_mobile";

import RowPanel from "./ShiftsYours/RowPanel";
import { mapGetters, mapActions } from "vuex";
import { mixin as VueClickAway } from "vue3-click-away";
import { PlusSmIcon,PencilAltIcon,OfficeBuildingIcon} from "@heroicons/vue/solid";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import Loader from '@common/Loader.vue'
 import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
export default {
    components: {
        Row,
        RowPanel,
        PlusSmIcon,
        PencilAltIcon,
        OfficeBuildingIcon,
        Loader,
        VPagination,
        RowMobile
    },
    data() {
        return {
            // page: 1,
            loader_flag: false,
            shift_data: [],
            table: "",
            getShiftFilterValues: { distance: 100 },

            filterBox: false,
            topfilterBox:false,

            filterRating: false,
            // filterReliability: false,
            filterDistance: false,
            ratingValue: 50,
            // reliabilityValue: '',
            distanceValue: 20,
            myValue: "",
            shift_filter: "",
            page: 1,
            page_data:[],
            open_sortbyFlag:false
            // pagination_length:0,
        };
    },
    computed: {
        ...mapGetters({
            shiftPanelData: "candidate/getCurrentPanel",
            getShiftRole: "candidate/getShiftRole",
            filteredShifts: "employer/getFilteredShifts",

        }),
    },
    watch: {
       filteredShifts : function(){
            this.updateHandler();
            this.updatePagination();
      }
    },
    mixins: [VueClickAway],

    methods: {
        ...mapActions({
            fetachShiftRole: "candidate/fetachShiftRole",
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
            FetchgetShiftsDashboard: "employer/FetchgetEmployerShifts",

        }),
        updatePagination() {
            this.page_data=[];
            let a = this.filteredShifts.length<this.page*10 ? this.filteredShifts.length :this.page*10;
            for(let i=(this.page-1)*10;  i<a; i++){
                this.page_data.push(this.filteredShifts[i]);
            }
        },
        onClickAway2() {
            this.open_sortbyFlag = false;
        },
        open_sortbyDropdown(){
            this.open_sortbyFlag = !this.open_sortbyFlag;
        },
        updateHandler() {
            this.shift_data = [];
            if (this.table != "") {
                $("#datatable").DataTable().destroy();
            }
          
             for (let i = 0; i < this.filteredShifts.length; i++) {
                this.filteredShifts[i]['index']=9999-i;
                this.shift_data.push(this.filteredShifts[i]);
            }
            setTimeout(() => {
                this.table = $("#datatable").DataTable({
                "language": {
                            "emptyTable": "You currently have no open shifts",
                            paginate: {
                                previous: '&#x2190; Previous',
                                next: 'Next &#x2192;',
                            },
                        }
                });
            }, 10);
        },
        addShift(){
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
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'AddShiftModalContent',
                        title: '',
                        data:{modal_type:'base'}
                    };
                this.fetchtSetModalConfigs(data);
            }
            })
        },
        
    },
    mounted() {
        this.fetachShiftRole();
        this.FetchgetShiftsDashboard("");
    //    this.updateHandler();
    },
    props: {
        actionType: {
            type: String,
            default: "View",
        },
    },
};
</script>
