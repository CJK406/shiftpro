<template>
 <Loader :loader_flag="loader_flag" />
  <div class="py-4 px-4">
      <!-- <div class="mb-8 pb-6 border-b border-solid border-gray-200">
          <ProfileStats :stats="userReliability"/>
      </div> -->
      <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold">Incorrect hours worked</p>
      <p class="text-center pl-8 pr-8 p-4">Send an amendment request to the candidate or message them if you think there is a misunderstanding.</p>
      <div class="grid lg:grid-cols-2 gap-8 mt-8">
        <div>
            <p class="mb-4 text-sm">SHIFT</p>
            <p class="font-bold text-gray-900">{{getModalData.timesheet.role}} </p>
            <p class="text-desc text-sm">{{getModalData.timesheet.shift_time_formatted}}</p>
        </div>
        <div>
            <p class="mb-4 text-sm">CANDIDATE</p>
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
            <div class="lg:col-span-1 flex">
               <select v-model="start_time_hour" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="hours in hour_array" :key="hours" :value="hours" >{{hours}}</option>
               </select>
               <label class="self-center ml-1 mr-1">Hour</label>
               <select v-model="start_time_min" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="mins in min_array" :key="mins" :value="mins" >{{mins}}</option>

               </select>
               <label class="self-center ml-1">Min</label>
               <!-- <input @change="calculate_duraction" v-model="start_time" class="font-semibold form-control w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md" type="time" /> -->
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Shift end time:</label>
            <div class="lg:col-span-1 flex">
              <select v-model="end_time_hour" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="hours in hour_array" :key="hours" :value="hours" >{{hours}}</option>

               </select>
               <label class="self-center ml-1 mr-1">Hour</label>
               <select v-model="end_time_min" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="mins in min_array" :key="mins" :value="mins" >{{mins}}</option>
                
               </select>
               <label class="self-center ml-1">Min</label>
               <!-- <input @change="calculate_duraction" v-model="end_time" class="font-semibold form-control w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md" type="time" /> -->
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Break start time:</label>
            <div class="lg:col-span-1 flex">
              <select v-model="break_start_hour" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="hours in hour_array" :key="hours" :value="hours" >{{hours}}</option>

               </select>
               <label class="self-center ml-1 mr-1">Hour</label>
               <select v-model="break_start_min" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="mins in min_array" :key="mins" :value="mins" >{{mins}}</option>

               </select>
               <label class="self-center ml-1">Min</label>
               <!-- <input @change="calculate_duraction" v-model="break_start_time" class="font-semibold form-control w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md" type="time" /> -->
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-6">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Break end time:</label>
            <div class="lg:col-span-1 flex">
              <select v-model="break_end_hour" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="hours in hour_array" :key="hours" :value="hours" >{{hours}}</option>

               </select>
               <label class="self-center ml-1 mr-1">Hour</label>
               <select v-model="break_end_min" @change="calculate_duraction"
                      class="font-semibold form-control w-20 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md"
                >
                <option v-for="mins in min_array" :key="mins" :value="mins" >{{mins}}</option>

               </select>
               <label class="self-center ml-1">Min</label>
               <!-- <input @change="calculate_duraction" v-model="break_end_time" class="font-semibold form-control w-56 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block text-sm text-sm border-gray-300 rounded-md" type="time" /> -->
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-6">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Total payable hours:</label>
            <!-- <p class="text-gray-500 text-sm">{{total_hour}} hours <span v-if="total_min!==0"> {{total_min}} mins </span></p> -->
            <p class="text-gray-500 text-sm">{{total_hour}} hours</p>
          </div>
        </div>
        <div>
          <div class="mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Add a message:</label>
            <textarea v-model="message_content" class="text-gray-500 text-sm w-full shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald rounded mt-1" style="border:1px solid #D1D5DB"></textarea>
          </div>
        </div>

        
      <div class="justify-center flex">
        <button type="button" style="color:#374151; border:1px solid #D7DADF; background-color:transparent" 
            class="mt-4 mr-3 flex btn primary_button ml-2" v-on:click="closeModal()"><XIcon class="w-5 mr-1 self-center" /> <span class="self-center">Close</span></button>
        <button @click="handleSubmit" type="submit" class="btn mt-4 primary_button">Send the amendment</button>
      </div>
    </div>
      <!-- </form> -->
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import Loader from '@common/Loader.vue'
import { XIcon  } from '@heroicons/vue/solid'
import {
  APIfetchDuration
} from '@/api/candidate/api'
import {
  APIdoSubmitTimesheet
} from '@/api/employer/api'
export default {
  components: {
    // Calendar,
    Loader,
    XIcon
  },
  data: () => ({
      start_time_hour:"10",
      start_time_min:"30",
      end_time_hour:"10",
      end_time_min:"30",
      break_start_hour:"10",
      break_start_min:"30",
      break_end_hour:"10",
      break_end_min:"30",
      total_hour:'',
      total_min:'',
      loader_flag:false,
      shift_date:'',
      message_content:'',
       hour_array:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
      min_array:['00','15','30','45']
  }),
  
  computed: {
    ...mapGetters({
      getModalData: 'candidate/getModalData',
    }),
  },
  mounted() {
      let history_lastelement = this.getModalData.timesheet.history[0];
      this.start_time_hour = history_lastelement.work_start.split(':')[0];
      this.start_time_min = history_lastelement.work_start.split(':')[1];
      this.end_time_hour = history_lastelement.work_end.split(':')[0];
      this.end_time_min = history_lastelement.work_end.split(':')[1];
      if(history_lastelement.break_start!==""){
        this.break_start_hour = history_lastelement.break_start.split(':')[0];
        this.break_start_min = history_lastelement.break_start.split(':')[1];
      }
      else{
        this.break_start_hour ='';
        this.break_start_min = '';
      }
      if(history_lastelement.break_start!==""){
        this.break_end_hour = history_lastelement.break_end.split(':')[0];
        this.break_end_min = history_lastelement.break_end.split(':')[1];
      }
      else{
        this.break_end_hour ='';
        this.break_end_min = '';
      }
      this.shift_date = history_lastelement.shift_date;
      this.total_hour = history_lastelement.work_hours;
      this.total_min = history_lastelement.work_minutes;


      this.calculate_duraction();
	},
  methods: {
    ...mapActions({
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchUserReliability: 'candidate/fetchUserReliability',
      FetchgetTimeSheet: "employer/FetchgetTimeSheet",

    }),
    calculate_duraction(){
        let post_data = {
           work_start:this.start_time_hour+":"+this.start_time_min,
            work_end:this.end_time_hour+":"+this.end_time_min,
            break_start:this.break_start_hour==="" ? '' : this.break_start_hour+':'+this.break_start_min,
            break_end:this.break_end_hour==="" ? '' : this.break_end_hour+':'+this.break_end_min,
            shift_date:this.shift_date
        }
        APIfetchDuration(post_data)
        .then(response => {
            if(response.data.success){
                this.total_hour = response.data.object.work_decimal;
                this.total_min = response.data.object.work_minutes;
            }
        });
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
          work_start:this.start_time_hour+":"+this.start_time_min,
            work_end:this.end_time_hour+":"+this.end_time_min,
            break_start:this.break_start_hour==="" ? '' : this.break_start_hour+':'+this.break_start_min,
            break_end:this.break_end_hour==="" ? '' : this.break_end_hour+':'+this.break_end_min,
          shift_date:this.shift_date,
          status:"c_approve",
          e_message:this.message_content
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