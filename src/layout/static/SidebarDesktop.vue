<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex pt-2  overflow-y-auto w-full">
          <div class="flex ml-auto">
            <router-link v-for="item in navigation" 
                :key="item.name" 
                :to="{name: item.routeAlias}"
                active-class="router-link-nav-link-dashboard"
                class="hover:text-gray-900 text-gray-500 group flex items-center px-3 py-2 text-sm">
          {{ item.name }}
        </router-link>
        </div>
          
      </div>
    </div>
  </div>
</template>

<script>


import {
  LogoutIcon
} from '@heroicons/vue/outline'


export default {
	components: {
  },
  props: {
    navigation: Array
  },
  setup() {
    return {
      LogoutIcon
    }
  }
}
</script>