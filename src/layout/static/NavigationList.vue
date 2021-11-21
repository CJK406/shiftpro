<template>
  <nav class="flex-1 px-2 space-y-1">
    <router-link v-for="item in navigation" 
                :key="item.name" 
                :to="{name: item.routeAlias}"
                @click="sidebarClose"
                active-class="router-link-nav-link"
                style="color:#6B7280"
                class="hover:bg-gray-200 group flex items-center px-2 py-2 text-sm font-bold rounded-md">

      <component :is="item.icon" class="mr-3 h-6 w-6 " style="color:#A3A6CC" aria-hidden="true" />
      {{ item.name }}
    </router-link>
    <button @click="logout"
            class="w-full text-indigo-100 hover:bg-gray-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
        
       <LogoutIcon  style="color:#A3A6CC" class="mr-3 h-6 w-6 text-main" /><span class="font-bold"  style="color:#6B7280"> Log out</span>
    </button>
  </nav>
</template>

<script>
import {
  
  LogoutIcon
} from '@heroicons/vue/outline'

import { useStore } from 'vuex'
import {mapActions} from "vuex";

export default {
  components: {
    LogoutIcon,
  },
   methods: {
     ...mapActions({
      FetchClearState: 'candidate/FetchClearState',
      FetchEmployerClearState: 'employer/FetchClearState',
      doLogout: 'authentication/doLogout',

        }),
      logout(){
        this.doLogout();
        this.FetchClearState();
        this.FetchEmployerClearState();
      },
      sidebarClose(){
        this.$emit("sidebarClose");
      }
   },
  props: {
    navigation: Array
  },
  setup() {
    const store = useStore()
    
    return {
      store
    }
  }
}
</script>