<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <TransitionRoot  :show="sidebarOpen">
      <Dialog as="div" static class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false" :open="sidebarOpen">
        <TransitionChild as="template" enter="transform transition ease-in-out duration-300 sm:duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity  duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild as="template"  enter="transform transition ease-in-out duration-300 sm:duration-300" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
          <div class="relative flex-1 flex ml-auto flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4">
              <img class="h-8 w-auto" :src="require('@/assets/sp-logo-w.png')" alt="ShiftPro Logo" />
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <NavigationList  @sidebarClose="sidebarOpen = false" :navigation="navigation"/>

            </div>
          </div>
        </TransitionChild>
        <!-- <div class="flex-shrink-0 w-14" aria-hidden="true">
        </div> -->
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <!-- <SidebarDesktop :navigation="navigation"/> -->
    <!-- End Static sidebar for desktop -->

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow" style="z-index:9999999">
        <!-- <SidebarDesktop :navigation="navigation"/> -->
        <!-- Start UtilityBar -->
          <a href="#/employer/dashboard"><img class="h-8 lg:ml-8 ml-4 w-auto mt-4" :src="require('@/assets/sp-logo.png')" alt="ShiftPro Logo" /></a>

        <UtilityBar :navigation="navigation" />
        <!-- End UtilityBar -->
         <button type="button" class="lg:px-4 pr-4 border-r border-gray-200 text-gray-500  md:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <MenuAlt2Icon class="h-6 w-6 text-secondary" aria-hidden="true" />
        </button>
      </div>

      <main class="flex-1 relative overflow-y-auto overflow-x-hidden focus:outline-none">
        <div class="py-6">
          <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
              <router-view> </router-view>
            <!-- /End replace -->

            <!-- Modal component -->
              <ModalBase />
              
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'

import {
  MenuAlt2Icon,
  LogoutIcon,
  XIcon,
UsersIcon,
  HomeIcon,
  CashIcon,
  CalendarIcon,
  ClipboardCheckIcon
} from '@heroicons/vue/outline'



import { useStore } from 'vuex'
// import SidebarDesktop from './static/SidebarDesktop'
import NavigationList from './static/NavigationList.vue'
import UtilityBar from './static/UtilityBar'
import ModalBase from '@common/ModalBase'


const navigation = [
  { name: 'Dashboard',  routeAlias: 'EmployerDashboard', icon: HomeIcon, current: true},
  { name: 'Shifts', routeAlias: 'EmployerShifts', icon: CalendarIcon , current: true},
  { name: 'Timesheets', routeAlias: 'EmployerTimesheet', icon: ClipboardCheckIcon },
  { name: 'Wages', routeAlias: 'EmployerFinance', icon: CashIcon  },
  { name: 'Messages',  routeAlias: 'EmployerNetwork', icon: UsersIcon, current: false},
  // { name: 'Profile', routeAlias: 'EmployerProfile', icon: UserIcon  }

]

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    MenuAlt2Icon,
    XIcon,
    // SidebarDesktop,
    UtilityBar,
    NavigationList,
    ModalBase,
  },
  setup() {
    const store = useStore()
    const sidebarOpen = ref(false)

    return {
      store,
      sidebarOpen,
      LogoutIcon,
      navigation
    }
  }
}
</script>