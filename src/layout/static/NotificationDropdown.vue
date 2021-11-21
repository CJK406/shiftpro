<template>
   <!-- Profile dropdown -->
  <Menu as="div" class="ml-3 relative self-center mt-2">
    <div>
      <MenuButton  class="max-w-xs relative bg-white flex items-center text-sm rounded-full focus:outline-none ">
        
        <span class="sr-only">Open user menu </span>
        <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none ">
            <span class="sr-only">View notifications</span>
            <MailIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      <span v-if="unread_message.length>0" class="badge badge-danger badge-pill noti-icon-badge">{{unread_message.length}}</span>
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="max-h-96 overflow-y-auto origin-top-right absolute lg:right-0 -right-10 mt-2 w-72 sm:w-96 p-4 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="mb-6 mt-2 border-b-2 border-fuchsia-600 pb-4" v-for="item in unread_message" :key="item.name">
            <div class="">
                <div class="grid grid-cols-3 gap-1">
                  <div class="col-span-2 flex">
                    <img :src="item.photo" class="w-8 h-8 rounded-2xl mr-2 self-center" >
                    <div class="ml-3">
                      <p class="font-bold text_username">{{ item.username }}</p>
                      <p class="text-sm text-main-light">{{ item.subject }}</p>
                    </div>
                  </div>
                  <div class="col-span-1">
                      <div class="ml-auto">
                          <div class="float-right flex">
                              <p class="text-sm mr-2 self-senter mt-1">{{item.ago}} ago</p>
                              <button @click="openModal(item.message_id, item.subject, item.user_id, item.photo, item.username)" type="button" class="text-gray-600 hover:text-emerald">
                               <MailIcon class="p-1 rounded-full border cursor-pointer border-solid border-gray-300 shadow-around-sm w-8 " > </MailIcon>
                              </button>
                          </div>
                      </div>
                  </div>
                </div>
                
                
            </div>
            <!-- <div class="pt-4 pl-4">
                <span class="text-lg font-medium text-gray-600 ">{{item.subject}}</span>
            </div> -->
        </div>
        <div v-if="unread_message.length===0" class="text-center text-gray-500 text-base">
            <span>There is no new messages</span>
        </div>
          
        <div v-if="unread_message.length>0" class="text-center pt-1 pb-4 cursor-pointer text-green-500 hover:text-emerald">
            <a :href="user_detail.user_type===2 ? '#/candidate/network/inbox' : '#/employer/network/inbox'" class="font-bold"> View all messages({{unread_message.length}})</a>
        </div>
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
// import { BellIcon } from '@heroicons/vue/solid'
import { MailIcon  } from '@heroicons/vue/solid'
import {mapGetters,mapActions} from "vuex";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    // BellIcon,
    MailIcon
  },
   data: () => ({
      message_content:""
  }),
  computed: {
    ...mapGetters({
      user_detail: 'authentication/getUserDetails',
      unread_message: 'authentication/getUnreadMessage',
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
    openModal (message_id, subject, user_id,photo, username) {
      this.fetchUserReliability({id: 1})
      this.fetchMessageThread(message_id)
      const message_data = {photo:photo, reply_id:message_id, user_id: user_id, subject:subject, user_name:username}
      const data = {
        isOpen: true,
        iconName: 'UserPhoto',
        componentName: 'NetworkModalContent',
        title: '',
        data:{modal_type:'base'}
      };
      this.fetchtSetModalConfigs(data);
      this.fetchtSetMessageModalConfigs(message_data)
    }
  },
}
</script>