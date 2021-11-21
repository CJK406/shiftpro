<template>
 <Loader :loader_flag="loader_flag" />
    <!-- <div class="map" ref="mapDivRef"></div> -->
    <!-- <div class="map" ref="mapDivRef"></div> -->

  <div class="py-4 px-4">
      <!-- <div class="mb-8 pb-6 border-b border-solid border-gray-200">
          <ProfileStats :stats="userReliability"/>
      </div> -->
      <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold">Applicants</p>
      <p class="text-sm text-center mt-3 mb-4">Here are candidates who applied for <span class="font-extrabold text-black">
        {{role}} at {{location}}</span> on {{startDate}} - {{endDate}}.</p>
      <select style="position:absolute; bottom:9999999px">
        <option>asef</option>
      </select>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="map_list_view_buttons flex mobile_view_flex">
                    <button @click="map_view=false" class="biotif-regular flex" ><MenuIcon class="w-5 mr-2"></MenuIcon>List View</button>
                    <button @click="map_view=true" class="biotif flex"><ChevronDownIcon class="w-5 mr-2"></ChevronDownIcon>Map View</button>
                </div>
                <div class="grid lg:grid-cols-2 gap-4 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <!-- <div class="map mobile_view" ref="mapDivRef"></div> -->
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
                                :pages="Math.ceil(this.shift_data.length/10)"
                                :range-size="1"
                                active-color="#DCEDFF"
                                @update:modelValue="updatePagination"
                                />
                            </div>
                    </div>
                    <table class="table_view lg:col-span-1 min-w-full divide-y divide-gray-200 datatable1">
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
                                v-for="shift in shift_data"
                                :key="shift.id"
                                :shift="shift"
                                actionType="complete"
                                rowtype="Applicants"
                            ></Row>
                        </tbody>
                    </table>
                    <div class="map modal_map" :class="{ 'map_view': map_view }" ref="mapDivRef"></div>
                </div>
            </div>
        </div>
    </div>
      <!-- </form> -->
  </div>
</template>

<script>
// import { computed } from 'vue'
import {mapGetters,mapActions} from "vuex";
import Row from "./ShiftApplicant/Row";
import RowMobile from "./ShiftApplicant/Row_mobile";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Loader from '@common/Loader.vue'
import { ChevronDownIcon ,MenuIcon} from "@heroicons/vue/outline";

import {
  APIgetShiftCandidates,APIgetShiftid
} from '@/api/employer/api'
import { mixin as VueClickAway } from "vue3-click-away";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { ref, onMounted } from "vue";

export default {
  components: {
    // Calendar,
    Row,
    Loader,
    ChevronDownIcon,
    MenuIcon,
    VPagination,
    RowMobile
  },
  data: () => ({
    shift_data: [],
    loader_flag:false,
    table:"",
    role:'',
    location:'',
    startDate:'',
    endDate:'',
    markers: [],
    zoom:14,
    map_view:true,
    center: '',
    page: 1,
    page_data:[],
    open_sortbyFlag:false,
   
  }),
    mixins: [VueClickAway],
  
  computed: {
    ...mapGetters({
      getEditshiftModal_id: 'candidate/getEditshiftModal_id',
    }),
  },
  mounted() {

    APIgetShiftid(this.getEditshiftModal_id).then((res1) => {
      this.role=res1.data.object.role;
      this.location=res1.data.object.address1;
      this.startDate=res1.data.object.start_time_formatted;
      this.endDate=res1.data.object.start_time_formatted;
    });
		APIgetShiftCandidates(this.getEditshiftModal_id).then((res) => {
        this.shift_data = res.data.results;
        this.addMarkers(this.shift_data);
        this.loader_flag=false;
       
        this.updatePagination();
        setTimeout(() => {
            this.table = $(".datatable1").DataTable(
            {
                language: {
                    paginate: {
                    previous: '&#x2039',
                    next: '&#x203A;'
                    }
                }
            }
        );
        }, 10);
    });
 
	},
  methods: {
    ...mapActions({
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
    onClickAway2() {
        this.open_sortbyFlag = false;
    },
    open_sortbyDropdown(){
        console.log("seefesfsefsefsef");
        this.open_sortbyFlag = !this.open_sortbyFlag;
    },
    updatePagination() {
        this.page_data=[];
        let a = this.shift_data.length<this.page*10 ? this.shift_data.length :this.page*10;
        for(let i=(this.page-1)*10;  i<a; i++){
            this.page_data.push(this.shift_data[i]);
        }
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
                disableDefaultUI:  true,
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