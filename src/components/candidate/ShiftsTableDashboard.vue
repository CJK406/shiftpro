<!-- This example requires Tailwind CSS v2.0+ -->
<template>

    <Loader :loader_flag="loader_flag" />
    <div class="map" :class="{ 'map_view': map_view }" ref="mapDivRef"></div>


    <div class="map_list_view_buttons flex mobile_view_flex">
        <button @click="map_view=false" class="biotif flex" ><MenuIcon class="w-5 mr-2"></MenuIcon>List View</button>
        <button @click="map_view=true" class="biotif flex"><MenuIcon class="w-5 mr-2"></MenuIcon>Map View</button>
        </div>
   
    <div class="grid lg:grid-cols-8 md:grid-cols-8 gap-1 pt-4 mb-8 search-bar">
        <div class="lg:col-span-8 md:col-span-8 wrapper-select2">
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
            <!-- <button  @click="set_filter" class="p-2  rounded-2xl w-9 text-center btn-search"><img class="w-8" :src="require('../../assets/images/search.png')" /></button> -->
        </div>
        <div
            v-click-away="onClickAway"
            class="lg:col-span-4 md:col-span-4 flex items-center relative  justify-center"
        >
            <button
                class="flex secondary_button ml-8"
                v-on:click="filter_open"
            >
                Filters
                <ChevronDownIcon class="w-4 h-4 ml-2" />
            </button>
            <div class="filter-list" v-show="filterBox">
                <div class="distance pt-2.5 pb-2.5 filter_split" >
                    <div class="flex items-center" v-on:click="filter_rating">
                        <p class="font-semibold filter-string">Rate (£)</p>
                        <ChevronDownIcon class="w-4 h-4 ml-2" />
                    </div>
                    <div v-show="filterRating" class="pt-2.5 pb-2.5">
                        <div class="flex">
                            <div>
                                <input
                                    class="w-full"
                                    type="range"
                                    min="10"
                                    max="50"
                                    v-model="ratingValue"
                                />
                                <div class="flex justify-between">
                                    <p class="min filter_value_string">£8.00</p>
                                    <p class="max filter_value_string">£50.00</p>
                                </div>
                            </div>
                            <div class="ml-2">
                                <span class="text-gray-500">{{
                                    this.ratingValue
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="distance pt-2.5 pb-2.5 filter_split">
                    <div class="flex items-center" v-on:click="filter_distance">
                        <p class="font-semibold filter-string">Distance</p>
                        <ChevronDownIcon class="w-4 h-4 ml-2 " />
                    </div>
                    <div v-show="filterDistance" class="pt-2.5 pb-2.5">
                        <div class="flex">
                            <div>
                                <input
                                    class="w-full"
                                    type="range"
                                    min="1"
                                    max="20"
                                    v-model="distanceValue"
                                />
                                <div class="flex justify-between">
                                    <p class="min filter_value_string">1mi</p>
                                    <p class="max filter_value_string">20mi</p>
                                </div>
                            </div>
                            <div class="ml-2">
                                <span class="filter_value_string">{{
                                    this.distanceValue
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center apply pb-2.5 pt-2.5 pb-2.5">
                    <!-- <button class="filter-apply" v-on:click="filter">Apply</button> -->
                    <button class="main_button m-auto" v-on:click="filter"><span>Apply</span></button>

                </div>
            </div>
        </div>
    </div>
    
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
                <div
                    class="overflow-hidden border-b border-gray-200 sm:rounded-lg"
                >
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
                               <div class="flex mb-3 cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">RATE</span>
                               </div>
                               <div class="flex cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
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
                    <table
                        class="table_view min-w-full divide-y divide-gray-200"
                        id="datatable"
                    >
                        <thead class="bg-gray-50">
                            <tr class="grid md:grid-cols-shift-table_dashboard">
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
                                    RATE
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Distance
                                </th>
                                <th scope="col" id="back_none" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <span > </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <Row
                                v-for="shift in markers"
                                :key="shift.data.id"
                                :shift="shift"
                                :actionType="actionType"
                                 @click_shift="click_marker"
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
import Loader from '@common/Loader.vue'
import Row from "./ShiftsTable_dashboard/Row";
import RowMobile from "./ShiftsTable_dashboard/Row_mobile";
import RowPanel from "./ShiftsAppliedTable/RowPanel";
import { mapGetters, mapActions } from "vuex";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { mixin as VueClickAway } from "vue3-click-away";
import $ from "jquery";
import { ChevronDownIcon, MenuIcon } from "@heroicons/vue/outline";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import { ref, onMounted } from "vue";
export default {
    components: {
        Row,
        RowMobile,
        RowPanel,
        ChevronDownIcon,
        Loader,
        VPagination,
        // CalendarIcon,
        MenuIcon
    },
    data() {
        return {
            // page: 1,
            loader_flag: false,
            shift_data: [],
            table: "",
            getShiftFilterValues: { distance: 100 },
            filterBox: false,
            filterRating: false,
            filterReliability: false,
            filterDistance: false,
            ratingValue: 50,
            reliabilityValue: "",
            distanceValue: 20,
            shift_filter: "",
            placeholder: "Search for role...",
            myOptions:[],

            open_suggestList:false,
            // pagination_length:0,
            value: [20, 40],
            searchIconFlag:false,
            page: 1,
            page_data:[],
            open_sortbyFlag:false,
            con:'https://shiftpro.dev/assets/images/profile/171-1636541429.png',
            center: '',
            selectedKey: null,
            zoom:14,
            map_view:true,
            marker_info_id: '',
        };
    },
    computed: {
        ...mapGetters({
            filteredShifts: "candidate/getFilteredShiftsDashboard",
            shiftPanelData: "candidate/getCurrentPanel",
            getShiftRole: "candidate/getShiftRole",
        }),
    },
    watch: {
        filteredShifts: function () {
            this.updateHandler();
            this.updatePagination();
        },
        getShiftFilterValues: function () {
            this.updateHandler();
        },
        getShiftRole: function () {
            this.changeKeyObject();
        },
    },
    mixins: [VueClickAway],
    methods: {
        ...mapActions({
            FetchgetShiftsDashboard: "candidate/FetchgetShiftsDashboard",
            fetachShiftRole: "candidate/fetachShiftRole",
        }),
        marker_click(position,marker_data){
            this.map_view=false;
            this.center = position;
            this.zoom=17;
            setTimeout(() => {
                this.map_view=true
            }, 10);
            setTimeout(() => {
                this.marker_info_data = marker_data;
                this.marker_info_id=marker_data.id;
            }, 100);
            
        },
      
        changeIcon(key){
            if (this.selectedKey === key) return this.mapMarkerActive;
                return this.mapMarker;
        },
        updatePagination() {
            this.page_data=[];
            let a = this.filteredShifts.length<this.page*10 ? this.filteredShifts.length :this.page*10;
            for(let i=(this.page-1)*10;  i<a; i++){
                this.page_data.push(this.filteredShifts[i]);
            }
        },
        updateHandler() {
            this.shift_data = [];
            if (this.table != "") {
                $("#datatable").DataTable().destroy();
            }
            for (let i = 0; i < this.filteredShifts.length; i++) {
                let miles = parseFloat(
                    this.filteredShifts[i]["distance"].split(" miles")[0]
                );
                if (
                    parseFloat(this.distanceValue) >= miles &&
                    this.filteredShifts[i]["role"].includes(
                        this.shift_filter
                    ) &&
                    parseFloat(this.ratingValue) >=
                        parseFloat(this.filteredShifts[i]["rate"])
                )
                this.shift_data.push(this.filteredShifts[i]);

            }
            this.addMarkers(this.shift_data);
            setTimeout(() => {
                this.table = $("#datatable").DataTable({
                    "language": {
                      "emptyTable": "No shifts matching your criteria",
                      paginate: {
                                previous: '&#x2190; Previous',
                                next: 'Next &#x2192;',
                            },
                        "pageLength" : 5,
                    }
                });
            }, 10);
        },
        changeSearchInput(){
            let obj = this.getShiftRole;
            let list = [];
            for (let i = 0; i < obj.length; i++) {
                if(obj[i]["role"].toLowerCase().includes(this.shift_filter.toLowerCase())){
                    obj[i]["text"] = obj[i]["role"];
                    list.push(obj[i]);
                }
            }
            this.myOptions = list;
            this.open_suggestList = true;
        },
        onClickAway(){
            this.filterBox = false;
        },
        onClickAway2() {
            this.open_sortbyFlag = false;
        },
        onClickAway1(){
            this.open_suggestList = false;
        },
        set_clear() {
            this.loader_flag = true;
            this.shift_filter = "";
            this.updateHandler();
            setTimeout(() => {
                this.loader_flag = false;
            }, 500);
            this.searchIconFlag = false;

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
        open_sortbyDropdown(){
            this.open_sortbyFlag = !this.open_sortbyFlag;
        },
        
        filter() {
            this.updateHandler();
            this.filterBox = !this.filterBox;
        },
        filter_rating() {
            this.filterRating = !this.filterRating;
        },
        filter_reliability() {
            this.filterReliability = !this.filterReliability;
        },
        filter_distance() {
            this.filterDistance = !this.filterDistance;
        },
    },
    
    mounted() {
        this.changeKeyObject();
        this.fetachShiftRole();
        this.FetchgetShiftsDashboard("", "");
    },
    props: {
        actionType: {
            type: String,
            default: "View",
        },
    },
    setup() {
        const map = ref(null);
        const markers = ref(null);

        const mapDivRef = ref(null);
        onMounted(() => {
            const googleMapScript = document.createElement("SCRIPT");
            googleMapScript.setAttribute(
                "src",
                `https://maps.googleapis.com/maps/api/js?key=AIzaSyCigXLM6UHvJwKztbWOOgm8--cLbHPw0qY&callback=initMap`
            );
            googleMapScript.setAttribute("defer", "");
            googleMapScript.setAttribute("async", "");
            document.head.appendChild(googleMapScript);
        });
        
        window.initMap = () => {
            map.value = new window.google.maps.Map(mapDivRef.value, {
                mapTypeId: "roadmap",
                zoom: 14,
                disableDefaultUI:  true,
                center: { lat: 38.0, lng: -77.01 }
            });
        };
        const click_marker = (marker) => {
            var infowindow = new window.google.maps.InfoWindow();
            var content = `
                <div class="flex">
                    <img src="`+marker.data.employer_photo+`" style="width:80px; border-radius:50%">
                    <div class=" ml-2">
                        <div class="text-base font-semibold text_username">
                            `+marker.data.role+`
                        </div>
                        <span class="text-sm  text-main-light flex items-center mt-1 mb-1">
                            <span>`+marker.data.shift_time_formatted+`</span>
                        </span>
                        <span class="p-2 rate_span inline-block lg:py-2 text-sm lg:px-4 text-main font-bold rounded-full">£`+marker.data.rate+` per hour </span>
                    </div>
                </div>
            `;
            marker.setIcon(require('../../assets/images/marker_active.png'));
            infowindow.setContent(content);
            infowindow.open(map.value, marker);
            map.value.setZoom(15);
            map.value.setCenter(marker.position);

            window.google.maps.event.addListener(infowindow,'closeclick',function(){
                marker.setIcon(require('../../assets/images/marker.png'));
            });
        }

        

        const addMarkers = (shifts) => {
            var bounds = new window.google.maps.LatLngBounds();
            let marker_array = [];
            for(let i=0; i<shifts.length; i++){
                var location = new window.google.maps.LatLng(shifts[i]['lat'], shifts[i]['lon']);
                var marker = new window.google.maps.Marker({
                    position: location,
                    map: map.value,
                    data:shifts[i],
                    icon: require('../../assets/images/marker.png')
                });
                marker_array.push(marker);
                bounds.extend(marker.position);
                // window.google.maps.event.addListener(marker, 'mouseover', (function(marker) {
                //     return function() {
                //         marker.setIcon(require('../../assets/images/marker_active.png'));
                //     }
                // })(marker, i));
                // window.google.maps.event.addListener(marker, 'mouseout', (function(marker) {
                //     return function() {
                //         marker.setIcon(require('../../assets/images/marker.png'));
                //     }
                // })(marker, i));
                window.google.maps.event.addListener(marker, 'click', (function(marker) {
                    return function() {
                        click_marker(marker);
                        
                    }
                })(marker, i));

            }
            markers.value = marker_array;
            map.value.fitBounds(bounds);
            var listener = window.google.maps.event.addListener(map.value, "idle", function () {
                map.value.setZoom(11);
                window.google.maps.event.removeListener(listener);
            });
           
        }
        return {
            mapDivRef,
            addMarkers,
            click_marker,
            markers
        };  
    }
};
</script>

