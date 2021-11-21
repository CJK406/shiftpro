<template>
   <!-- Profile dropdown -->
  <Menu as="div" class="ml-3 relative self-center mt-2">
    <div>
      <MenuButton  class="max-w-xs relative bg-white flex items-center text-sm rounded-full focus:outline-none ">
        
        <span class="sr-only">Open user menu </span>
        <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none ">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      <span v-if="taskGroup.length>0" class="badge badge-danger badge-pill noti-icon-badge">{{taskGroup.length}}</span>
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="max-h-96 overflow-y-auto origin-top-right absolute lg:right-0 -right-10 mt-2 w-72 sm:w-96 p-4 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div v-for="task in taskGroup" :key="task.id" :task="task" class="flex justify-between  mb-4 py-2 px-2 " style="border-bottom:1px solid rgba(0,0,0,0.1)">
          <p class="text-sm sm:text-sm text-main-light self-center" style="color:#727497">{{task.task}}</p>
          <p class="tracking-wide text-emerald font-bold self-center cursor-pointer" @click="action(task.link, task.task, task.action)">{{task.action}}</p>
        </div>
        <div v-if="taskGroup.length===0" class="text-center text-gray-500 text-base">
           <span class="text-center">You have no new tasks</span>
        </div>
<!--           
        <div v-if="unread_message.length>0" class="text-center pt-1 pb-4 cursor-pointer text-green-500 hover:text-emerald">
            <a :href="user_detail.user_type===2 ? '#/candidate/network/inbox' : '#/employer/network/inbox'" class="font-bold"> View all messages({{unread_message.length}})</a>
        </div> -->
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { 
  Menu,
  MenuButton,
  MenuItems,
} from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/solid'
// import { MailIcon  } from '@heroicons/vue/solid'
import {mapGetters,mapActions} from "vuex";
import {
  APIdoChangeSubscription,APIdoGetSubscriptionActive
} from '@/api/common/api'
export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    BellIcon,
    // MailIcon
  },
   data: () => ({
      message_content:""
  }),
  computed: {
    ...mapGetters({
      user_detail: 'authentication/getUserDetails',
      taskGroup:'candidate/getTaskList'

    }),
  },
  mounted() {
     setInterval(() => {
        this.doGetUnreadMessages();
     }, 30000)
    },
  methods: {
    ...mapActions({
      fetchUserReliability: 'candidate/fetchUserReliability',
      fetchMessageThread: 'candidate/fetchMessageThread',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',
      doGetUnreadMessages: 'authentication/doGetUnreadMessages',
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
  },
}
</script>