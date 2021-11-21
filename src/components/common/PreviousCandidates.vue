<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <ul v-if="shift_data.length>0" class="divide-y divide-gray-100">
    <li  @click="viewProfile(person.user_id)" v-for="person in shift_data" :key="person.company" class="p-4 flex">
      <img class="h-10 w-10 rounded-full" :src="person.photo" alt="" />
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">{{ person.fullname }}</p>
        <p class="text-sm text-main-light">{{ person.company }}</p>
      </div>
    </li>
  </ul>
  <div class="text-center">
    <span v-if="shift_data.length===0" class="text-center text-sm" style="color: #727497 !important;">You have not employed anyone yet</span>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import {
  APIgetPreviousEmployed,
} from '@/api/employer/api'
export default {
   data() {
        return {
          shift_data:[],
        }
  },
  computed: {
      ...mapGetters({
        getUserDetails: 'authentication/getUserDetails'
      }),
    },
    methods: {
      ...mapActions({
        fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
        fetchSetEmployerModalConfigs: 'candidate/fetchSetEmployerModalConfigs'
      }),
      viewProfile(userid){
        this.fetchSetEmployerModalConfigs({user_id:userid})
        const data = {
                  isOpen: true,
                  iconName: 'UserIcon',
                  componentName: this.getUserDetails.user_type === 3 ? 'CandidateProfile' : 'EmployerProfile',
                  title: '',
                  data:{modal_type:'big'},
                };
        this.fetchtSetModalConfigs(data);
      },
    },
   mounted() {
        APIgetPreviousEmployed().then((res) => {
           this.shift_data = res.data.results;
        });
    },

}
</script>