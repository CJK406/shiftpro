<template>
   <!-- Profile dropdown -->
  <Menu as="div" class="ml-3 relative self-center">
    <div class="flex">
      <!-- <div class="mr-4 self-center biotif font-bold" style="color:#111827">
        {{user_detail.fullname}}
      </div> -->
      <MenuButton  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        
        <span class="sr-only">Open user menu </span>
        <img class="h-8 w-8 rounded-full" :src="user_detail.photo" alt="" />
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="origin-top-right absolute right-0 mt-2 w-68 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <!-- <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
          <a :href="item.href" :class="[active ? '' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
        </MenuItem> -->
          <div class="p-3">
            <p class=" text-base block pt-2 text-gray-500">Signed in as</p>
            <p class="font-bold text-base text-black border-b-2 border-gray-100 pb-3">{{user_detail.email}}</p>
            <a :href="user_detail.user_type===2 ? '#/candidate/profile' : '#/employer/profile'" class="mt-4  text-base block py-2 text-gray-500">My Profile</a>  
            <!-- <a :href="user_detail.user_type===2 ? '#/candidate/profile/subscription' : '#/employer/profile/subscription'" class=" text-base block py-2 text-gray-500  pb-3">Manage subscription</a>   -->
            <p @click="manage_subscription" class="cursor-pointer text-base block py-2 text-gray-500  pb-3">Manage subscription</p>  

            <a href="" class=" text-base block py-2 text-gray-500 border-b-2 border-gray-100 pb-4">Contact us</a>  
            <button @click="logout"
              class=" text-base block py-2 text-gray-500">
             Sign out
          </button>
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
  // MenuItem
} from '@headlessui/vue'

import { useStore } from 'vuex'
import { computed } from 'vue'

const userNavigation = [
  { name: 'Your Profile', href: '#' }
]
import {mapActions} from "vuex";
 import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'
export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    // MenuItem
  },
  methods: {
    ...mapActions({
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      FetchClearState: 'candidate/FetchClearState',
      FetchEmployerClearState: 'employer/FetchClearState',
      doLogout: 'authentication/doLogout',

        }),
      logout(){
        this.doLogout();
        this.FetchClearState();
        this.FetchEmployerClearState();
      },
    manage_subscription(){
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
                  iconName: 'TicketIcon',
                  componentName: 'ManageSubscriptionModalContent',
                  title: '',
                  data:{modal_type:"small"}
              };
             this.fetchtSetModalConfigs(data);
            }
      })
    }
  },
  setup() {
    const store = useStore()

    return {
      user_detail: computed(() => store.getters['authentication/getUserDetails']),
      userNavigation,
      store
    }
  }
}
</script>