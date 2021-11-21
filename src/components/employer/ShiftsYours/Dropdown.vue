<template >
    <div v-click-away="onClickAway">
    <button
        class="flex secondary_button ml-8"
        v-on:click="drop_open"
        style="z-index:11"
    >
        <ChevronDownIcon class="w-4 h-4 mr-2" />
        Manage shift
    </button>
    <div class="drop-list" v-show="dropBox" style="z-index:10">
        <div class="apply pb-2.5 pt-2.5 pb-2.5 border-b border-gray-300">
            <button @click="openEditShiftModal" class="pl-2 flex " ><PencilAltIcon class="w-6 text-gray-500 mr-1" /><span class="self-center">Edit</span></button>
        </div>
        <div class="apply pb-2.5 pt-2.5 pb-2.5 border-b border-gray-300">
            <button @click="openDuplicateShiftModal" class="pl-2 flex" ><DuplicateIcon  class="w-6 text-gray-500 mr-1" /><span class="self-center">Duplicate</span></button>
        </div>
        <div class="apply pb-2.5 pt-2.5 pb-2.5 border-b border-gray-300">
            <button  @click="openApplicantsModal"  class="pl-2 flex" ><UsersIcon class="w-6 text-gray-500 mr-1" /><span class="self-center">Applicants</span></button>
        </div>
        <div class="apply pb-2.5 pt-2.5 pb-2.5 border-b border-gray-300">
            <button  @click="openStaffSearchModal" class="pl-2 flex" ><SearchIcon  class="w-6 text-gray-500 mr-1" /><span class="self-center">Search for staff</span></button>
        </div>
        <div class="apply pb-2.5 pt-2.5 pb-2.5 ">
            <button class="pl-2 flex" ><TrashIcon class="w-6 text-gray-500 mr-1" style="color:#FFD1D1" /><span class="self-center">Remove</span></button>
        </div>
    </div>
    </div>
</template>

<script>
import { ChevronDownIcon,PencilAltIcon,SearchIcon,TrashIcon  } from "@heroicons/vue/outline";
import {UsersIcon , DuplicateIcon} from "@heroicons/vue/solid";

// import { StarIcon} from "@heroicons/vue/outline"
import {mapGetters,mapActions} from "vuex";
import { mixin as VueClickAway } from "vue3-click-away";

export default {
  components: {
      ChevronDownIcon,
      PencilAltIcon,
      UsersIcon,
      SearchIcon,
      TrashIcon ,
      DuplicateIcon 
  },
   data: () => ({
            dropBox: false,

  }),
  props: {
    shift_id: String
  },
  mixins: [VueClickAway],
  computed: {
    ...mapGetters({
    
    }),
  },
  mounted() {
	},
  methods: {
    ...mapActions({
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
            fetchtSetEditShiftModalConfigs: 'candidate/fetchtSetEditShiftModalConfigs',

    
    }),
    openEditShiftModal(){
        const data = {
                    isOpen: true,
                    iconName: 'ClipboardCheckIcon',
                    componentName: 'EditShiftModalContent',
                    title: '',
                    data:{type:'edit',modal_type:'base'}

                };
        this.fetchtSetModalConfigs(data);
            this.fetchtSetEditShiftModalConfigs({id:this.shift_id});

    },
    openDuplicateShiftModal(){
        const data = {
                    isOpen: true,
                    iconName: 'ClipboardCheckIcon',
                    componentName: 'EditShiftModalContent',
                    title: '',
                    data:{type:'duplicate',modal_type:'base'}

                };
        this.fetchtSetModalConfigs(data);
        this.fetchtSetEditShiftModalConfigs({id:this.shift_id});

    },
    openApplicantsModal(){
        const data = {
                    isOpen: true,
                    iconName: 'ClipboardCheckIcon',
                    componentName: 'ApplicantsModalContent',
                    title: '',
                    data:{modal_type:'base'}
                };
        this.fetchtSetModalConfigs(data);
        this.fetchtSetEditShiftModalConfigs({id:this.shift_id});

    },
    openStaffSearchModal(){
            const data = {
                        isOpen: true,
                        iconName: 'SearchIcon',
                        componentName: 'StaffSearchModalContent',
                        title: '',
                        data:{shift_id:this.shift_id,modal_type:'base'}
                    };
            this.fetchtSetModalConfigs(data);
            this.fetchtSetEditShiftModalConfigs({id:this.shift_id});
        },
    drop_open() {
        this.dropBox = !this.dropBox;
    },
  onClickAway() {
            this.dropBox = false;
        },
  },
  
}
</script>
