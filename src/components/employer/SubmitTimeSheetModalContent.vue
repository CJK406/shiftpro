<template>
 <Loader :loader_flag="loader_flag" />
  <div class="py-4 px-4">
      <!-- <div class="mb-8 pb-6 border-b border-solid border-gray-200">
          <ProfileStats :stats="userReliability"/>
      </div> -->
      <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold">{{getModalData.type==="complete"?'View the timesheet' : 'Confirm the timesheet'}}</p>
      <p v-if="getModalData.type!=='complete'" class="text-center pl-8 pr-8 p-4">Check and confirm timesheet submitted by the candidate who worked this shift.</p>
      <div class="grid lg:grid-cols-2 gap-8 mt-8">
        <div>
            <p class="mb-4 text-sm">SHIFT</p>
            <p class="font-bold text-gray-900">{{getModalData.timesheet.role}} </p>
            <p class="text-desc text-sm">{{getModalData.timesheet.shift_time_formatted}}</p>
        </div>
        <div>
            <p class="mb-4 text-sm">{{getModalData.user_type==="candidate" ? "EMPLOYER":"CANDIDATE"}}</p>
            <div class="flex">
                <img class="w-10 self-center mr-2 rounded" :src="getModalData.timesheet.photo" />
                <p class="font-bold text-gray-900 self-center">{{getModalData.timesheet.username}}</p>
            </div>
        </div>
        <div>
        </div>
      </div>
      <div >
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Shift start time:</label>
            <div class="lg:col-span-1">
               <p class="font-semibold text-gray-500 text-sm">{{start_time}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Shift end time:</label>
            <div class="lg:col-span-1">
               <p class="font-semibold text-gray-500 text-sm">{{end_time}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Unpaid break start time:</label>
            <div class="lg:col-span-1">
               <p class="font-semibold text-gray-500 text-sm">{{break_start_time!=='' ? break_start_time : 'N/A'}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-6">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Unpaid break end time:</label>
            <div class="lg:col-span-1">
               <p class="font-semibold text-gray-500 text-sm">{{break_end_time!=='' ? break_end_time : 'N/A'}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Total payable hours:</label>
            <p class="text-gray-500 text-sm">{{total_hour}} hours <span v-if="total_min!==0"> {{total_min}} mins </span></p>
          </div>
        </div>

        
      <div v-if="getModalData.type!=='complete'" class="justify-center flex">
        <button type="button" 
            class="mt-4 mr-3 flex btn secondary_button ml-2" @click="unconfirm"><PencilAltIcon  class="w-5 mr-1 self-center" /> <span class="self-center">Send a correction</span></button>
        <button @click="handleSubmit" type="submit" class="btn mt-4 primary_button">Confirm</button>
      </div>
      <div v-if="getModalData.type==='complete'" class="justify-center flex">
        <button type="button" style="color:#374151; border:1px solid #D7DADF; background-color:transparent" 
            class="mt-4 mr-3 flex btn primary_button ml-2" v-on:click="closeModal()"><XIcon class="w-5 mr-1 self-center" /> <span class="self-center">Close this window</span></button>
      </div>
    </div>
      <!-- </form> -->
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import Loader from '@common/Loader.vue'
import { PencilAltIcon,XIcon  } from '@heroicons/vue/solid'
import {
  APIdoSubmitTimesheet
} from '@/api/employer/api'
export default {
  components: {
    // Calendar,
    Loader,
    XIcon,
    PencilAltIcon 
  },
  data: () => ({
      start_time:"10:30",
      end_time:"10:30",
      break_start_time:"10:30",
      break_end_time:"10:30",
      total_hour:'',
      total_min:'',
      loader_flag:false,
      shift_date:''
  }),
  
  computed: {
    ...mapGetters({
      getModalData: 'candidate/getModalData',
    }),
  },
  mounted() {
      let history_lastelement = this.getModalData.timesheet.history[0]
      this.start_time = history_lastelement.work_start;
      this.end_time = history_lastelement.work_end;
      this.break_start_time = history_lastelement.break_start;
      this.break_end_time = history_lastelement.break_end;
      this.shift_date = history_lastelement.shift_date;
      this.total_hour = history_lastelement.work_hours;
      this.total_min = history_lastelement.work_minutes;
	},
  methods: {
    ...mapActions({
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      FetchgetTimeSheet: "employer/FetchgetTimeSheet",
    }),
   unconfirm(){
      const data = {
              isOpen: true,
              iconName: 'ClipboardCheckIcon',
              componentName: 'SubmitIncorrectTimeSheetModalContent',
              title: '',
              data:{modal_type:"small",timesheet:this.getModalData.timesheet}
          };
    this.fetchtSetModalConfigs(data);
   },
  closeModal(){
       const data = {
          isOpen: false,
          iconName: '',
          componentName: '',
          title: '',
          data:{modal_type:'base'}
        };
        this.fetchtSetModalConfigs(data);
   },
   handleSubmit(){
     this.loader_flag = true;
        let post_data = {
          status:"confirmed"
        }
        APIdoSubmitTimesheet(post_data,this.getModalData.timesheet.id)
        .then(response => {
           this.loader_flag = false;
            if(response.data.success){
              this.$swal(
                          {
                            title:'Successfully Submitted',
                            icon: 'success',
                            confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                            customClass: {
                              confirmButton: 'SuccessClosebutton'
                            }
                          }
              );
              this.FetchgetTimeSheet();
            }
            else{
              this.$swal({title:"Oops!",
                        icon: 'error',
                        text:response.data.message,
                        confirmButtonText: 'Try again',
                            customClass: {
                              confirmButton: 'ErrorClosebutton'
                            }
                        }
                    );
            }
        });
   }
  }
 
}
</script>