<template>
  <div class="flex-1 px-4 flex justify-between">
    <div class="flex-1 flex">
      <form class="w-full flex md:ml-0" action="#" method="GET">
      </form>
    </div>
    <div class="ml-4 flex md:ml-6">
      <!-- <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="sr-only">View notifications</span>
        <BellIcon class="h-6 w-6" aria-hidden="true" />
      </button> -->
      <SidebarDesktop :navigation="navigation"/>
        <TaskDropdown />

        <NotificationDropdown />
      <!-- Start Profile Dropdown  -->
        <ProfileDropdown />
      <!-- End Profile Dropdown  -->
    </div>
  </div>
</template>

<script>
import ProfileDropdown from './ProfileDropdown'
import NotificationDropdown from './NotificationDropdown'
import TaskDropdown from './TaskDropdown'

import SidebarDesktop from './SidebarDesktop'
// import { SearchIcon } from '@heroicons/vue/solid'

export default {
  components: {
    ProfileDropdown,
    NotificationDropdown,
    SidebarDesktop,
    TaskDropdown
  },
  props: {
    navigation: Array
  },
}
</script>