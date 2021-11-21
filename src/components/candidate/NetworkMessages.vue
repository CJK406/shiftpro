<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <ul class="divide-y divide-gray-200 bg-white py-2 px-4 rounded-md shadow-lg">
      <Element v-for="message in message_data" 
               :key="message.id"
               :messageInfo="message" 
               messageType = "Inbox"
               />
    <p v-if="message_data.length===0" class="text-center text-sm" style="color:#727497">You currently have no messages</p>
              
    </ul>
    <div class="pagination_div">
      <!-- <pagination v-model="page" :records="1000" :per-page="10" @paginate="myCallback"/> -->
      <v-pagination
        v-model="page"
        :pages="Math.ceil(this.getNetworkMessages.length/10)"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
      />
    </div>
   </div>
</template>

<script>
import Element from './NetworkMessages/Element'
import {mapGetters,mapActions} from "vuex";
// import Pagination from 'v-pagination-3';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  components: {
    Element,
    // Pagination 
    VPagination
  },
   data() {
        return {
          page: 1,
          message_data:[]
        };
    },
     computed: {
      ...mapGetters({
        getNetworkMessages:'candidate/getNetworkMessages',
      }),
    },
    methods: {
      ...mapActions({
          fetchNetworkMessages: 'candidate/fetchNetworkMessages',
        }),
        updateHandler() {
           this.message_data=[];
           let a = this.getNetworkMessages.length<this.page*10 ? this.getNetworkMessages.length :this.page*10;
           for(let i=(this.page-1)*10;  i<a; i++){
             this.message_data.push(this.getNetworkMessages[i]);
           }
        }
    },
    watch: {
      getNetworkMessages : function(){
        this.updateHandler();
      }
    },

    mounted() {
     this.fetchNetworkMessages("");
      let a = this.getNetworkMessages.length<this.page*10 ? this.getNetworkMessages.length :this.page*10;
      for(let i=(this.page-1)*10;  i<a; i++){
        this.message_data.push(this.getNetworkMessages[i]);
      }
    }
  }
</script>