<template>
  <div>
    <h3 class="text-main text-xl mb-4 text-center Biotif-bold">To do: </h3>
    <div v-for="task in taskGroup" :key="task.id" :task="task" class="flex justify-between  mb-4 py-2 px-2 rounded-md shadow-around-sm">
      <p class="text-sm sm:text-sm text-main-light self-center" style="color:#727497">{{task.task}}</p>
      <p class="tracking-wide text-emerald font-bold self-center cursor-pointer" @click="action(task.link, task.task, task.action)">{{task.action}}</p>
    </div>
    <div class="text-center">
      <span v-if="taskGroup.length===0" class="text-center">You have no new tasks</span>
    </div>
  </div>
</template>

<script>
import {  mapActions } from "vuex";
import {
  APIdoChangeSubscription,APIdoGetSubscriptionActive
} from '@/api/common/api'
export default {
  props: {
    taskGroup: Array
  },
   methods: {
     ...mapActions({
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',

        }),
      action(link,task,action) {
        if(task==="Set up a subscription"){
          const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'SubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small",closeFlag:true}
                    };
            this.fetchtSetModalConfigs(data);
        }
        else if(task==="Set up direct debit")
        {
          this.loader_flag = true;
          let post_data = {
            action:'session',
          }
          APIdoChangeSubscription(post_data).then((res) => {
              this.loader_flag = false;
              if(res.data.success){
                window.location.href = res.data.object.url;
              }
          })
        }
        else if(task==="Update your subscription"){
           const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'SubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small",action_type:'change',closeFlag:true}
                    };
            this.fetchtSetModalConfigs(data);
        }
        else if(task === "Create a shift"){
          APIdoGetSubscriptionActive().then((res) => {
            if(res.data.results[0].compliance_complete===0){
              const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'InactiveComplianceModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
              this.fetchtSetModalConfigs(data);
            }
            else if(res.data.results[0].sub_status===0){
              const data = {
                        isOpen: true,
                        iconName: 'TicketIcon',
                        componentName: 'InactiveSubscriptionModalContent',
                        title: '',
                        data:{modal_type:"small"}
                    };
              this.fetchtSetModalConfigs(data);

            }
            else{
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'AddShiftModalContent',
                        title: '',
                        data:{modal_type:'base'}
                    };
            this.fetchtSetModalConfigs(data);
            }
            })
        }
        else{
          if(action==='review'){
            const data = {
                        isOpen: true,
                        iconName: 'ClipboardCheckIcon',
                        componentName: 'ReviewModal',
                        title: '',
                        data:{modal_type:"small", user_id:link}
                    };
            this.fetchtSetModalConfigs(data);
          }
          else{
            window.location.href = "#"+link;
          }
        }
      }
   }
}
</script>
