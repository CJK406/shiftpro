<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <Loader :loader_flag="loader_flag" />
    <div class="grid lg:grid-cols-8 md:grid-cols-8 gap-1 mb-8 search-bar">
        <div class="lg:col-span-6 md:col-span-8 wrapper-select2">
            <div class="relative" v-click-away="onClickAway1">
                <input v-model="shift_filter" @focus="changeSearchInput" @keyup="changeSearchInput" placeholder="Search for role..." class="wage_search_field w-full h-10 rounded-full p-2  focus:border-gray-400" />
                <div v-if="open_suggestList" class="search_suggest_list">
                    <p v-for="option in myOptions" 
                        :key="option.text"
                        @click="mySelectEvent(option.text)"
                        >{{option.text}}
                    </p>
                    <span v-if="myOptions.length===0">No roles matching your criteria </span>
                </div>
            </div>
            <button
                @click="set_clear"
                class="p-2 ml-2 w-9 rounded-2xl text-center btn-cancel"
            >
                <img v-if="searchIconFlag"
                    class="w-4"
                    :src="require('../../assets/images/clear.png')"
                />
                <img v-if="!searchIconFlag"
                    class="w-4"
                    :src="require('../../assets/images/search.png')"
                />
            </button>
        </div>
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
                            <tr class="hidden lg:grid lg:grid-cols-shift-table_history">
                                 <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ROLE
                                </th>
                                <th  scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    CANDIDATE
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
                                    RATE
                                </th>
                                <!-- <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    LOCATION
                                </th> -->
                                
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
import Row from "./ShiftsTable/Row";
import RowPanel from "./ShiftsTable/RowPanel";
import RowMobile from "./ShiftsTable/Row_mobile";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { mapGetters, mapActions } from "vuex";
import { mixin as VueClickAway } from "vue3-click-away";
import Loader from '@common/Loader.vue'
import {
  APIgetEmployerShiftsComplete,
} from '@/api/employer/api'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
export default {
    components: {
        Row,
        RowPanel,
        Loader,
        RowMobile,
        VPagination
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
             open_suggestList:false,
            myOptions:[],
            shift_data_backup:[],
            searchIconFlag:false,
            page: 1,
            page_data:[],
            open_sortbyFlag:false
        };
    },
    computed: {
        ...mapGetters({
            shiftPanelData: "candidate/getCurrentPanel",
            getShiftRole: "candidate/getShiftRole",
        }),
    },
    watch: {
        getShiftRole: function () {
            this.changeKeyObject();
        },
    },
    mixins: [VueClickAway],

    methods: {
        ...mapActions({
            fetachShiftRole: "candidate/fetachShiftRole",
        }),
        updatePagination() {
            this.page_data=[];
            let a = this.shift_data.length<this.page*10 ? this.shift_data.length :this.page*10;
            for(let i=(this.page-1)*10;  i<a; i++){
                this.page_data.push(this.shift_data[i]);
            }
            console.log("this.page_data",this.page_data)
        },
        onClickAway2() {
            this.open_sortbyFlag = false;
        },
        open_sortbyDropdown(){
            console.log("seefesfsefsefsef");
            this.open_sortbyFlag = !this.open_sortbyFlag;
        },
        updateHandler() {
            this.shift_data = [];
            if (this.table != "") {
                $("#datatable").DataTable().destroy();
            }
            for (let i = 0; i < this.shift_data_backup.length; i++) {
                if(this.shift_data_backup[i]["role"].includes(this.shift_filter)){
                    this.shift_data.push(this.shift_data_backup[i]);
                }
            }
            setTimeout(() => {
                this.table = $("#datatable").DataTable({
                     "language": {
                      "emptyTable": "You currently have no completed shifts",
                      paginate: {
                                previous: '&#x2190; Previous',
                                next: 'Next &#x2192;',
                            },
                    }
                });
            }, 10);
        },
        // set_filter (){
        //       this.loader_flag=true;
        //       this.updateHandler();
        //       setTimeout(() => {
        //       this.loader_flag=false
        //       }, 500);
        // },

        onClickAway() {
            this.filterBox = false;
        },
        set_clear() {
            this.loader_flag = true;
            this.myValue = "";
            this.shift_filter = "";
            this.updateHandler();
            setTimeout(() => {
                this.loader_flag = false;
            }, 500);
            this.searchIconFlag = false;

        },
        myChangeEvent() {},
        onClickAway1(){
            this.open_suggestList = false;
        },
        changeSearchInput(){
            console.log("efe");
            let obj = this.getShiftRole;
            let list = [];
            for (let i = 0; i < obj.length; i++) {
                if(obj[i]["role"].toLowerCase().includes(this.shift_filter.toLowerCase())){
                    obj[i]["text"] = obj[i]["role"];
                    list.push(obj[i]);
                }
            }
            console.log("list",list,this.shift_filter);
            this.myOptions = list;
            this.open_suggestList = true;
        },
        mySelectEvent(role) {
            this.open_suggestList = false;
            this.shift_filter = role;
            this.loader_flag = true;
            this.updateHandler();
            setTimeout(() => {
                this.loader_flag = false;
            }, 500);
            this.searchIconFlag = true;

        },
        changeKeyObject() {
            let obj = this.getShiftRole;
            for (let i = 0; i < obj.length; i++) {
                obj[i]["text"] = obj[i]["role"];
            }
            this.myOptions = obj;
        },
        filter_open() {
            this.filterBox = !this.filterBox;
        },
        top_filter_open() {
            this.topfilterBox = !this.topfilterBox;

        },
        filter() {
            this.updateHandler();
            this.filterBox = !this.filterBox;
        },
        filter_rating() {
            this.filterRating = !this.filterRating;
        },
        // filter_reliability() {
        //     this.filterReliability = !this.filterReliability;
        // },
        filter_distance() {
            this.filterDistance = !this.filterDistance;
        },
    },
    mounted() {
        this.fetachShiftRole();
        this.loader_flag=true;
        APIgetEmployerShiftsComplete().then((res) => {
           this.shift_data = res.data.results;
           this.shift_data_backup = res.data.results;
            this.loader_flag=false;
           this.updateHandler();
           this.updatePagination();
        });
    },
    props: {
        actionType: {
            type: String,
            default: "View",
        },
    },
};
</script>
