<template>
 <Loader :loader_flag="loader_flag" />
  <div class="py-4 px-4">
     
      <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold">Quick Search</p>
      <p class="text-sm text-center mt-3 mb-4">Search for available candidates in your area</p>
      
      <div v-if="1===2" class="grid lg:grid-cols-8 md:grid-cols-8 gap-1 mb-8 search-bar">
            <div class="lg:col-span-6 md:col-span-8 wrapper-select2 whitebackground_search">
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
                    class="p-2 ml-2 w-9 rounded-2xl text-center staffSearch btn-cancel"
                >
                    <img v-if="searchIconFlag"
                    class="w-8"
                    :src="require('../../assets/images/clear.png')"
                    />
                    <img v-if="!searchIconFlag"
                        class="w-8"
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
                
                    <div class="distance pt-2.5 pb-2.5 filter_split">
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
                                    <span class="filter_value_string">{{
                                        this.ratingValue
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="reliability pt-2.5 pb-2.5 filter_split">
                        <div class="flex items-center cursor-pointer" v-on:click="filter_reliability">
                            <p class="font-semibold filter-string">Reliability</p>
                            <ChevronDownIcon class="w-4 h-4 ml-2" />
                        </div>
                        <div v-show="filterReliability">
                            <div class="flex items-center">
                                <input type="radio" name="reliability" v-bind:value="'90'" v-model="reliabilityValue">
                                <p class="cursor-pointer pl-2.5 py-2.5">90%</p>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="reliability" v-bind:value="'75'" v-model="reliabilityValue">
                                <p class="cursor-pointer pl-2.5 py-2.5">75%</p>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="reliability"  v-bind:value="'50'" v-model="reliabilityValue">
                                <p class="cursor-pointer pl-2.5 py-2.5" >50%</p>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="reliability" v-bind:value="'0'" v-model="reliabilityValue">
                                <p class="cursor-pointer pl-2.5">No reliability filter</p>
                            </div>
                        </div>
                    </div>
                    <div class="distance pt-2.5 pb-2.5 filter_split" >
                        <div class="flex items-center" v-on:click="filter_distance">
                            <p class="font-semibold filter-string">Distance</p>
                            <ChevronDownIcon class="w-4 h-4 ml-2" />
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
                        <button class="main_button m-auto" v-on:click="filter"><span>Apply</span></button>
                    </div>
                </div>
            </div>
        </div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="map_list_view_buttons flex mobile_view_flex">
                    <button @click="map_view=false" class="biotif flex" ><MenuIcon class="w-5 mr-2"></MenuIcon>List View</button>
                    <button @click="map_view=true" class="biotif flex"><MenuIcon class="w-5 mr-2"></MenuIcon>Map View</button>
                </div>
                <div class="modal_map grid lg:grid-cols-2 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                 
                    <div class="lg:col-span-1 lg:mt-0 mt-4 mobile_view large_content_shadow min-w-full divide-y divide-gray-200 bg-white" style="border:1px solid #E5E7EB">
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
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">CANDIDATE</span>
                               </div>
                               <div class="flex mb-3 cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold"> RATING</span>
                               </div>
                               <div class="flex mb-3 cursor-pointer">
                                   <img 
                                        class="w-3"
                                        :src="require('../../assets/images/sort.svg')"
                                    />
                                    <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">RELIABILITY</span>
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
                            actionType="complete"
                            rowtype="staffSearch"
                        ></RowMobile>
                        <div class="pagination_div pb-10 pt-4">
                            <v-pagination
                                v-model="page"
                                :pages="Math.ceil(this.shift_data1.length/10)"
                                :range-size="1"
                                active-color="#DCEDFF"
                                @update:modelValue="updatePagination"
                                />
                            </div>
                    </div>
                    <table id="datatable1" class="table_view lg:col-span-1 min-w-full divide-y divide-gray-200 datatable1">
                        <thead class="bg-gray-50">
                            <tr class="hidden lg:grid lg:grid-cols-shift-table-applicant">
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    CANDIDATE
                                </th>
                                <th  scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    RATING
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    RELIABILITY
                                </th>
                                <th  scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                                    DISTANCE
                                </th>
                                <th  scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <Row
                                v-for="shift1 in shift_data1"
                                :key="shift1"
                                :shift="shift1"
                                actionType="complete"
                                rowtype="staffSearch"
                                @click_shift="marker_click"
                            ></Row>
                        </tbody>
                    </table>
                    <div class="map modal_map" :class="{ 'map_view': map_view }" ref="mapDivRef"></div>
              
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
import Row from "./ShiftApplicant/Row";
import RowMobile from "./ShiftApplicant/Row_mobile";
import { ref, onMounted } from "vue";

import {
  APIfetchStaffs
} from '@/api/employer/api'
import { ChevronDownIcon ,MenuIcon} from "@heroicons/vue/outline";
import { mixin as VueClickAway } from "vue3-click-away";
import Loader from '@common/Loader.vue'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  components: {
    // Calendar,
    Row,
    ChevronDownIcon,
    MenuIcon,
    Loader,
    RowMobile,
    VPagination
  },
  data: () => ({
    shift_backup:[],
    shift_data1: [],
    loader_flag:false,
    table:"",
    getShiftFilterValues: { distance: 100 },
    filterBox: false,
    filterRating: false,
    filterReliability: false,
    filterDistance: false,
    ratingValue: 50,
    reliabilityValue: '',
    distanceValue: 20,
    myValue: "",
    shift_filter: "",
    open_suggestList:false,
    myOptions:[],
    searchIconFlag:false,
    page: 1,
    page_data:[],
    open_sortbyFlag:false,
    markers: [],
    zoom:14,
    map_view:true,
    center: '',
  
  }),
  
  computed: {
    ...mapGetters({
      getEditshiftModal_id: 'candidate/getEditshiftModal_id',
      getShiftRole: "candidate/getShiftRole",
      getModalData: 'candidate/getModalData',
    }),
  },
  watch: {
        getShiftRole: function () {
            this.changeKeyObject();
        },
    },
mixins: [VueClickAway],

  mounted() {
     this.fetachShiftRole();
		APIfetchStaffs(this.getModalData.shift_id).then((res) => {
            this.shift_backup = res.data.results;
            this.loader_flag=false;
            this.updateHandler();
            this.updatePagination();
            // this.changeKeyObject();
    });
 
	},
  methods: {
    ...mapActions({
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
                this.marker_info_id=marker_data.user_id;
            }, 100);
            
        },
        updateHandler(){
            this.shift_data1 = [];
            if (this.table !== "") {
                $("#datatable1").DataTable().destroy();
            }
            this.shift_backup.sort( this.compare );
            for (let i = 0; i < this.shift_backup.length; i++) {
                this.shift_data1.push(this.shift_backup[i]);
            }
            this.addMarkers(this.shift_backup);
       
            setTimeout(() => {
                 this.table = $("#datatable1").DataTable(
                        {
                            "language": {
                                "emptyTable": "You currently have no direct offers",
                                paginate: {
                                        previous: '&#x2190; Previous',
                                        next: 'Next &#x2192;',
                                    },
                                "pageLength" : 5,
                            },
                             "order": []
                        }
                    );
            }, 100);
                   
        },
        compare( a, b ) {
            if ( a.score > b.score ){
                return -1;
            }
            if ( a.score < b.score ){
                return 1;
            }
            return 0;
        },
        onClickAway() {
            this.filterBox = false;
        },
        onClickAway2() {
            this.open_sortbyFlag = false;
        },
        open_sortbyDropdown(){
            this.open_sortbyFlag = !this.open_sortbyFlag;
        },
        updatePagination() {
            this.page_data=[];
            let a = this.shift_data1.length<this.page*10 ? this.shift_data1.length :this.page*10;
            for(let i=(this.page-1)*10;  i<a; i++){
                this.page_data.push(this.shift_data1[i]);
            }
        },
        set_clear() {
            this.open_suggestList = false;
            this.loader_flag = true;
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
        filter_reliability() {
            this.filterReliability = !this.filterReliability;
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
   setup() {
        const map = ref(null);
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
                center: { lat: 38.0, lng: -77.01 }
            });
        };
        const click_marker = (marker) => {
            var infowindow = new window.google.maps.InfoWindow();
            var content = `
                <div class="flex">
                    <img src="`+marker.data.photo+`" style="width:80px;  border-radius:50%">
                    <div class=" ml-2 mt-1">
                        <div class="text-base font-semibold text_username">
                            `+marker.data.username+`
                        </div>
                        <span class="font-semibold text-gray-900 flex items-center mt-1">
                            <span class="self-center">`+ marker.data.reliability+` %</span>
                        </span>
                        <span class="text-sm  text-main-light flex items-center mt-1 mb-1">
                            <span>`+marker.data.distance+`</span>
                        </span>
                    </div>
                </div>
            `;
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

            for(let i=0; i<shifts.length; i++){
                var location = new window.google.maps.LatLng(parseFloat(shifts[i]['lat']),parseFloat(shifts[i]['lon']));
                var marker = new window.google.maps.Marker({
                    position: location,
                    map: map.value,
                    data:shifts[i],
                    icon: require('../../assets/images/marker.png')
                });
                
                bounds.extend(marker.position);
                window.google.maps.event.addListener(marker, 'click', (function(marker) {
                    return function() {
                        click_marker(marker);
                        marker.setIcon(require('../../assets/images/marker_active.png'));
                    }
                })(marker, i));
            }
            map.value.fitBounds(bounds);
            var listener = window.google.maps.event.addListener(map.value, "idle", function () {
                map.value.setZoom(9);
                window.google.maps.event.removeListener(listener);
            });
        }
        return {
            mapDivRef,
            addMarkers
        };  
    }

}
</script>