<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <ul class="divide-y divide-gray-200 bg-white py-2 px-4 rounded-md shadow-lg">
      <Element v-for="message in message_data" 
               :key="message.id"
               :messageInfo="message" 
               messageType = "Sent"
               />
    </ul>
    <div class="pagination_div">
      <v-pagination
          v-model="page"
          :pages="Math.ceil(this.getNetworkSentMessages.length/10)"
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
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  components: {
    Element,
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
      getNetworkSentMessages: 'candidate/getNetworkSentMessages',
    }),
  },
   methods: {
    ...mapActions({
      fetchNetworkSentMessages: 'candidate/fetchNetworkSentMessages',
    }),
    updateHandler() {
        this.message_data=[];
        let a = this.getNetworkSentMessages.length<this.page*10 ? this.getNetworkSentMessages.length :this.page*10;
        for(let i=(this.page-1)*10;  i<a; i++){
          this.message_data.push(this.getNetworkSentMessages[i]);
        }
    }
   },
   watch: {
      getNetworkSentMessages : function(){
        this.updateHandler();
      }
    },
  mounted() {
		this.fetchNetworkSentMessages("");
    let a = this.getNetworkSentMessages.length<this.page*10 ? this.getNetworkSentMessages.length :this.page*10;
      for(let i=(this.page-1)*10;  i<a; i++){
        this.message_data.push(this.getNetworkSentMessages[i]);
      }
		}
}
</script>