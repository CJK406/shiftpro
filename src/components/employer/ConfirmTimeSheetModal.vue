<template>
 <Loader :loader_flag="loader_flag" />
  <div class="py-4 px-4">
      <!-- <div class="mb-8 pb-6 border-b border-solid border-gray-200">
          <ProfileStats :stats="userReliability"/>
      </div> -->
      <p class="text-center text-gray-800 text-2xl mt-4 Biotif-bold">Confirm a timesheet</p>
      <p class="text-sm text-center mt-3 mb-4">Please confirm following details regarding this shift:</p>
      
      <div class="grid lg:grid-cols-1 gap-8">
        <div>
          <div class="flex mb-2">
              <label class="w-8/12 block font-extrabold self-center mr-3" style="color:#111827">Did the candidate show up?</label>
                <select v-model="show_up" 
                        class="  text-gray-700 lg:mt-0 mt-2 flex text-md border rounded p-2 w-4/12" style="border-color:#D1D5DB">
                      <option value="1">Yes</option>
                      <option value="0">No</option>

                  </select>         
          </div>
          <div v-if="show_up==='1'" class="flex mt-2">
              <label class="w-32 block font-extrabold self-center mr-3" style="color:#111827">Shift started:</label>
              <label>{{this.start}}</label>

          </div>
          <div v-if="show_up==='1'" class="flex mt-2">
              <label class=" w-32 block font-extrabold self-center mr-3" style="color:#111827">Shift ended:</label>
              <label>{{this.end}}</label>
          </div>
        </div>
   
      </div>
    
      <div class="mt-2 flex">
          <label class="self-center w-60 block font-extrabold self-center mr-3" style="color:#111827">Rate and review this person:</label>
          
          <star-rating v-model:rating="starRatingValue" class="self-center" active-color="#F1DF43" inactive-color="#D9DAE4" :increment="0.5" :show-rating="false" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :read-only="false" :star-size="30" :rating="rate"></star-rating>
        </div>
      <div class="mt-2">
          <textarea type="text" v-model="note" class="h-32 text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
          
           </div>
      <div class="text-center">
        <button @click="confirm" class="primary_button mt-4" type="button">Confirm</button>
      </div>
      <!-- </form> -->
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import {mapGetters,mapActions} from "vuex";
// import {  DatePicker } from 'v-calendar';
import {
  APIgetShiftid,APIconfirmShift
} from '@/api/employer/api'
import Loader from '@common/Loader.vue'

export default {
  components: {
    // Calendar,
    StarRating,
    Loader
  },
  data: () => ({
    message_content:"",
    message_subject:"",
    start:new Date(),
    end:new Date(),
    show_up:"1",
    loader_flag:false,
    note:'',
    shift:{},
    starRatingValue:0
  }),
  
  computed: {
    ...mapGetters({
      getModalData: 'candidate/getModalData',
    }),
  },
  mounted() {
      this.get_shift();
	},
  methods: {
    ...mapActions({
    }),
   
    get_shift(){
       APIgetShiftid(this.getModalData.shift_id).then((res) => {
            this.shift = res.data.object;
            this.start = this.shift.start_time_formatted;
            this.end = this.shift.end_time_formatted;
        });
    },
    confirm(){
        let data = {
            status: 'completed',
            shift_id:this.getModalData.shift_id,
            rating:this.starRatingValue*20,
            review:this.note
        }
        this.loader_flag=true;
        APIconfirmShift(data)
            .then(response => {
                this.loader_flag=false;
                if(response.data.success)
                  {this.$swal(
                          {
                              title:'Successfully confirmed',
                              icon: 'success',
                              confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                              customClass: {
                                confirmButton: 'SuccessClosebutton'
                              }
                            }
                          );}
                else
                  {this.$swal({title:"Oops!",
                        icon: 'error',
                        text:response.data.message,
                        confirmButtonText: 'Try again',
                            customClass: {
                              confirmButton: 'ErrorClosebutton'
                            }
                        }
                    );}
            });
    }
   
    },
 }
</script>