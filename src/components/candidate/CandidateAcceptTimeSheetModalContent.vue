<template>
 <Loader :loader_flag="loader_flag" />
  <div class="py-4 px-4">
     <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold">Incorrect timesheet</p>
      <p class="text-center pl-8 pr-8 p-4">The employer has raised that the timesheet you have sent is incorrect. Please see proposed timesheet below:</p>
      <div class="grid lg:grid-cols-2 gap-8 mt-8">
        <div>
            <p class="mb-4 text-sm">SHIFT</p>
            <p class="font-bold text-gray-900">{{getModalData.timesheet.role}} </p>
            <p class="text-desc text-sm">{{getModalData.timesheet.shift_time_formatted}}</p>
        </div>
        <div>
            <p class="mb-4 text-sm">EMPLOYER</p>
            <div class="flex">
                <img class="w-10 self-center mr-2 rounded" :src="getModalData.timesheet.photo" />
                <p class="font-bold text-gray-900 self-center">{{getModalData.timesheet.company}}</p>
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
               <p class="font-semibold text-gray-500 text-sm">{{break_start_time}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-6">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Unpaid break end time:</label>
            <div class="lg:col-span-1">
               <p class="font-semibold text-gray-500 text-sm">{{break_end_time}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-2 mb-6">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Total payable hours:</label>
            <p class="text-gray-500 text-sm">{{total_hour}} hours <span v-if="total_min!==0"> {{total_min}} mins </span></p>
          </div>
        </div>

        <div>
          <div class="mb-4">
            <label class="lg:col-span-1 block font-extrabold self-center mr-3 text-main" >Message from employer:</label>
            <p class="mt-2">{{getModalData.timesheet.e_message}}</p>
          </div>
        </div>
      <div class="justify-center flex">
        <button type="button" style="border:1px solid #D7DADF; background-color:transparent" 
            class="mt-4 mr-3 flex btn secondary_button ml-2" @click="openModal"><MailIcon  class="w-5 mr-1 self-center" /> <span class="self-center">Message back</span></button>
        
        <button type="button" style="color:#374151; border:1px solid #D7DADF; background-color:transparent" 
            class="mt-4 mr-3 flex btn primary_button ml-2 text-gray-700" @click="reject"><ExclamationCircleIcon  class="w-5 mr-1 self-center" /> <span class="self-center">Dispute</span></button>
        <button @click="handleSubmit" type="submit" class="btn mt-4 primary_button">Accept</button>
      </div>
    </div>
      <!-- </form> -->
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import Loader from '@common/Loader.vue'
import { ExclamationCircleIcon,MailIcon  } from '@heroicons/vue/solid'
import {
  APIdoSubmitTimesheet
} from '@/api/candidate/api'
export default {
  components: {
    // Calendar,
    Loader,
    MailIcon,
    ExclamationCircleIcon 
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
      FetchgetTimeSheet: "candidate/FetchgetTimeSheet",
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',
    }),
   reject(){
     this.$swal({
            title: 'Dispute this timesheet',
            text: "Are you sure you want to dispute this timesheet?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#049A59',
            cancelButtonColor: 'rgba(255,0,0,0.7)',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',

            }).then((result) => {
                if (result.isConfirmed) {
                    let post_data = {
                    work_start:this.start_time,
                    work_end:this.end_time,
                    break_start:this.break_start_time,
                    break_end:this.break_end_time,
                    shift_date:this.shift_date,
                    status:"disputed"
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
            })
   },

   handleSubmit(){
     this.loader_flag = true;
        let post_data = {
             work_start:this.start_time,
          work_end:this.end_time,
          break_start:this.break_start_time,
          break_end:this.break_end_time,
          shift_date:this.shift_date,
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
   },
   openModal () {
      const message_data = {photo:this.getModalData.timesheet.photo,
                            reply_id:'', user_id: this.getModalData.timesheet.employer_id, subject:'', 
                            user_name:this.getModalData.timesheet.company}
      const data = {
                isOpen: true,
                iconName: 'UserPhoto',
                componentName: 'NetworkModalContent',
                title: '',
                data:{modal_type:'base'}
                };
      this.fetchtSetModalConfigs(data);
      this.fetchtSetMessageModalConfigs(message_data);
    },
  }
 
}
</script>