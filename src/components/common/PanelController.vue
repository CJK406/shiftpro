<template>
    <Loader :loader_flag="loader_flag" />
    <div class="lg:flex mt-2 pb-6">
        <div class="self-center">
            <nav class="-mb-px overflow-x-auto lg:h-8 h-10 " aria-label="ShiftsTabs">
                <router-link
                    replace
                    exact-active-class="router-link-exact-panel-controller-tab"
                    :key="to.name"
                    v-for="to in navigationList"
                    :to="{ name: to.routeAlias }"
                    class="mr-4 sm:mr-10 border-transparent text-gray-500 hover:text-black  whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                    {{ to.name }}
                </router-link>
            </nav>
        </div>
        
        <div class="relative self-center ml-auto" v-if="key1 == `message`">
          <input v-model="message_filter" placeholder="Search..." 
          class="wage_search_field message_search_field w-full h-10 rounded-full p-2  focus:border-gray-400" />
            <button
                @click="set_filter"
                class="p-2 pt-3 ml-2 w-9 rounded-2xl text-center btn-cancel absolute right-1"
            >
                <SearchIcon style="color:#049A59" class="text-white w-5 m-auto" />
            </button>
            <!-- <button  @click="set_clear" class=" p-2 ml-2 w-9 rounded-2xl text-center"><img class="w-8" :src="require('../../assets/images/clear.png')" /></button> -->
            <!-- <button  @click="set_filter" class="p-2  rounded-2xl w-9 text-center"><img class="w-8" :src="require('../../assets/images/search.png')" /></button> -->
        </div>

        <div class="flex self-center lg:ml-20 lg:mt-0 mt-2" v-if="key1 === `shift` && getUserDetails.user_type !== 2">
            <button @click="openAddShiftModal" class="btn primary_button h-10 pb-2 ">
              Add a shift
            </button>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loader from '@common/Loader.vue'
import { SearchIcon } from '@heroicons/vue/solid'
import {
  APIdoGetSubscriptionActive
} from '@/api/common/api'
export default {
    components: {
        Loader,
        SearchIcon
    },
    props: {
        navigationList: Array,
        key1: String,
    },
    data: () => ({
        loader_flag: false,
        
        message_filter: "",
    }),
    computed: {
        ...mapGetters({
            get_message_filter: "candidate/getMessageFilter",
            getUserDetails: 'authentication/getUserDetails'

        }),
    },
    mounted() {
        this.message_filter = this.get_message_filter;
    },
    methods: {
        ...mapActions({
            fetchSetMessageFilter: "candidate/fetchSetMessageFilter",
            fetchNetworkMessages: "candidate/fetchNetworkMessages",
            fetchNetworkSentMessages: "candidate/fetchNetworkSentMessages",
            fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
            fetchtSetEditShiftModalConfigs:'candidate/fetchtSetEditShiftModalConfigs',
        }),
        set_filter() {
            if (this.key1 === "message") {
                if (
                    this.message_filter.length > 3 ||
                    this.message_filter.length === 0
                ) {
                    this.fetchSetMessageFilter(this.message_filter);
                    this.fetchNetworkMessages(this.message_filter);
                    this.fetchNetworkSentMessages(this.message_filter);
                    this.loader_flag = true;
                    setTimeout(() => {
                        this.loader_flag = false;
                    }, 500);
                } else {
                    this.$swal({title:"Oops!",
                        icon: 'error',
                        text:"The length of the filter string must be at least four.",
                        confirmButtonText: 'Try again',
                            customClass: {
                              confirmButton: 'ErrorClosebutton'
                            }
                        }
                    );
                }
            } 
        },
        set_clear(){
            this.message_filter = "";
            this.fetchSetMessageFilter(this.message_filter);
            this.fetchNetworkMessages(this.message_filter);
            this.fetchNetworkSentMessages(this.message_filter);
            this.loader_flag = true;
            setTimeout(() => {
                this.loader_flag = false;
            }, 500);
        },
        openAddShiftModal(){
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
        

        
    },
};
</script>
