<!-- This example requires Tailwind CSS v2.0+ -->
<template>
<Loader :loader_flag="loader_flag" />
  <div class="xl:flex mb-4">
    <div class="relative lg:w-1/2 lg:mb-0 mb-4 wage_wrapper-select2" style="border-radius:100px; position:relative">
            <input v-model="filter_name" placeholder="Search for names..." class="wage_search_field w-full h-10 rounded-full p-2  focus:border-gray-400" />
            <button
                @click="set_clear"
                class="p-2 pt-2 ml-2 w-9 rounded-2xl text-center btn-cancel"
            >
                 <img v-if="filter_name!==''"
                    class="w-4"
                    :src="require('../../assets/images/clear.png')"
                />
                <img v-if="filter_name===''"
                    class="w-4"
                    :src="require('../../assets/images/search.png')"
                />
            </button>
            <!-- <button  @click="set_filter" class="p-2  rounded-2xl w-9 text-center btn-search"><img class="w-8" :src="require('../../assets/images/search.png')" /></button> -->
    </div>
    <div class="md:col-span-2 lg:pl-3 pl-0 paymentTable_filter_section lg:flex">
      <span class="lg:self-center mr-4 font-bold">Filter by date:</span>
      <div class="flex lg:mt-0 mt-4">
        <!-- <input type="date" v-model="start_date" class="border border-gray-400 rounded p-2 w-44 mr-2" placeholder="From" /> -->
        <div class="h-10">
          <date-picker class="w-20 mr-2" placeholder="From" @change="end_error=false"  
          display-format="DD/MM/YYYY"
          format="YYYY-MM-DD" locale="en,fa" v-model="start_date"></date-picker>
        </div>
        <div class="ml-2">
          <date-picker style="width:100px" @change="end_error=false"  
          display-format="DD/MM/YYYY"
          format="YYYY-MM-DD" locale="en,fa" v-model="end_date" placeholder="To"></date-picker>
        </div>
        </div>
        <button @click="filter" class="self-center mt-4 lg:mt-0 lg:ml-4 m-auto btn btn-full w-20 bg-secondary hover:bg-secondary-light h-10 pb-2 biotif-regular">
            Filter
        </button>
      </div>
  </div>
  <div>

    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class=" overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div class="mobile_view large_content_shadow min-w-full divide-y divide-gray-200 bg-white" style="border:1px solid #E5E7EB">
              <div class="relative" v-click-away="onClickAway2">
                  <div class="flex items-center p-2 pl-4 mobile_td cursor-pointer" @click="open_sortbyDropdown">
                      <img 
                              class="w-3"
                              :src="require('../../assets/images/sort.svg')"
                          />
                      <span class="self-center ml-2 text-sm font-bold" style="color:rgb(116,117,118) ">SORT BY</span>
                  </div>
                  <div v-if="open_sortbyFlag" class="open_sortby_list">
                      <div class="flex mb-3 cursor-pointer">
                          <img 
                              class="w-3"
                              :src="require('../../assets/images/sort.svg')"
                          />
                          <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">SHIFT</span>
                      </div>
                      <div class="flex mb-3 cursor-pointer">
                          <img 
                              class="w-3"
                              :src="require('../../assets/images/sort.svg')"
                          />
                          <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold"> EMPLOYER</span>
                      </div>
                      <div class="flex mb-3 cursor-pointer">
                          <img 
                              class="w-3"
                              :src="require('../../assets/images/sort.svg')"
                          />
                          <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">STATUS</span>
                      </div>
                      
                      <div class="flex cursor-pointer">
                          <img 
                              class="w-3"
                              :src="require('../../assets/images/sort.svg')"
                          />
                          <span style="color:rgb(116,117,118)" class="ml-2 text-sm font-bold">HOURS</span>
                      </div>
                  </div>
              </div>
              
              <div v-if="page_data.length===0" class="text-center pt-3">
                  <span class="text-sm text-center" style="color:#727497">No shifts matching your criteria</span>
              </div>
              <RowMobile 
                  v-for="shift in history_data"
                  :key="shift.id"
                  :shift="shift"
                  :actionType="actionType"
              ></RowMobile>
              <div class="pagination_div pb-10 pt-4">
                  <v-pagination
                      v-model="page"
                      :pages="Math.ceil(this.history_data.length/5)"
                      :range-size="1"
                      active-color="#DCEDFF"
                      @update:modelValue="updatePagination"
                      />
                  </div>
          </div>
          <table
            class="large_content_shadow min-w-full divide-y divide-gray-200"
            id="datatable"
          >
            <thead class="bg-gray-50">
              <tr class="hidden lg:grid lg:grid-cols-timesheet-complete">      
                <th scope="col"  class="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  SHIFT
                </th>
                <th scope="col"  class="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  EMPLOYER
                </th>
               <th scope="col"   class=" py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  SHIFT times
                </th>
                <th scope="col"   class=" py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  HOURS
                </th>
                <th scope="col"  class="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                 <th scope="col" id="back_none"  class="py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <Row v-for="payment in history_data" :key="payment.id" :payment="payment"/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>
import Row from './Timesheet/PendingRow.vue'
import Loader from '@common/Loader.vue'
import RowMobile from "./Timesheet/Row_mobile_Pending";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { mapGetters, mapActions } from "vuex";
import DatePicker from 'vue3-persian-datetime-picker'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { mixin as VueClickAway } from "vue3-click-away";

export default {
  components: {
    Row,
    DatePicker,
    Loader,
    RowMobile,
    VPagination

  }, 
  data() {
    return{
      table: "",
      history_data:[],
      loader_flag:false,
      start_date:'',
      end_date:'',
      filter_name:'',
      page: 1,
      page_data:[],
      open_sortbyFlag:false
    }
  },
  computed: {
      ...mapGetters({
        getTimeSheet: "candidate/getTimeSheet",

      }),
  },
  watch: {
    getTimeSheet: function () {
        this.updateHandler();
        this.updatePagination();
    },
  },
  mixins: [VueClickAway],

   methods: {
        ...mapActions({
            FetchgetTimeSheet: "candidate/FetchgetTimeSheet",
        }),
        updatePagination() {
            this.page_data=[];
            let a = this.history_data.length<this.page*5 ? this.history_data.length :this.page*5;
            for(let i=(this.page-1)*5;  i<a; i++){
                this.page_data.push(this.history_data[i]);
            }
        },
        onClickAway2() {
            this.open_sortbyFlag = false;
        },
        open_sortbyDropdown(){
            this.open_sortbyFlag = !this.open_sortbyFlag;
        },
        updateHandler() {
          this.history_data = [];
            if (this.table != "") {
                $("#datatable").DataTable().destroy();
            }
            for(let i=0; i<this.getTimeSheet.length; i++){
              if(this.getTimeSheet[i]['status']!=="confirmed"){
                this.history_data.push(this.getTimeSheet[i]);
              }
            }
            setTimeout(() => {
                this.table = $("#datatable").DataTable({
                   "language": {
                      "emptyTable": "You have no pending timesheets",
                      paginate: {
                                previous: '&#x2190; Previous',
                                next: 'Next &#x2192;',
                            },
                    }
                });
            }, 1000);
        },
        get_paymentHistory(){
          this.loader_flag = true;
          
        },
        set_clear(){
          this.filter_name="";
        },
        filter(){
        }

   },
   mounted() {
     this.loader_flag = true;
    this.FetchgetTimeSheet();
    setTimeout(() => {
      this.loader_flag = false;
    }, 2000);
   },
}
</script>