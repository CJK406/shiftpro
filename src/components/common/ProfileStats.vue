<template>
  <div class="desk_view relative grid  sm:grid-cols-8 items-center max-w-3xl  mx-auto">
    <Avatar  class="col-span-1 mx-auto" :htmlAlt="stats.photo" :imgURL="stats.photo" />
    <div class="col-span-2 mt-6 mb-3 sm:mt-0 sm:mb-0 text-center sm:text-left"> 
      <h3 class="Biotif-bold text-black text-3xl">
       {{stats.username}}
      </h3>
      <Stars :count="stats.rating/20"/>
    </div>
    <div class="col-span-3">
       <ProgressBar :title="stats.username" :percentage="stats.reliability"/>
    </div>
    <div class="col-span-2">
      <Numeric title="Successful shifts" :number="stats.completed" />
    </div>
  </div>
  <div class="mobile_view relative text-center items-center max-w-3xl  mx-auto">
      <h3 class="Biotif-bold text-black text-3xl mb-3">
       {{stats.username}}
      </h3>
      <Avatar  class="col-span-1 mx-auto mb-3" :htmlAlt="stats.photo" :imgURL="stats.photo" />
      <div class="mb-3">
        <Stars :count="stats.rating/20"/>
      </div>
      <p><span class="font-bold text-base text-gray-900">John’s reliability: </span> <span>{{stats.reliability}} %</span></p>
      <p><span class="font-bold text-gray-900">Successful shifts:  </span> <span>{{stats.completed}} %</span></p>
      <button @click="openModal( stats.user_id, stats.photo, stats.username)" type="button" class="m-auto mt-3 main_button">
          <MailIcon class=" w-6 self-center" > </MailIcon>
          <span class="mt-1 ml-1 self-center">Message</span>
      </button>
  </div>
</template>

<script>
import Avatar from '@common/Avatar'
import ProgressBar from './ProfileStats/ProgressBar'
import Numeric from './ProfileStats/Numeric'
import Stars from './ProfileStats/Stars'
import { MailIcon  } from '@heroicons/vue/solid'
import {mapGetters,mapActions} from "vuex";

export default {
  components: {
    Avatar,
    ProgressBar,
    Numeric,
    Stars,
    MailIcon
  },
  props: {
    stats: {
      photo: String,
      username: String,
      rating: Number,
      reliability: Number,
      completed:Number,
    }
  },
  computed: {
    ...mapGetters({
      getEmployerModalProperty:'candidate/getEmployerModalProperty',
      userReliability: 'candidate/getUserReliability',
      getModalData: 'candidate/getModalData',

    }),
  },
  methods: {
    ...mapActions({
      fetchUserReliability: 'candidate/fetchUserReliability',
      fetchMessageThread: 'candidate/fetchMessageThread',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',
    }),
    openModal (user_id, photo, username) {
      this.fetchUserReliability({id: 1})
      const message_data = {photo:photo,
                            reply_id:'', user_id: user_id, subject:'', user_name:username}
      const data = {
                isOpen: true,
                iconName: 'UserPhoto',
                componentName: 'NetworkModalContent',
                title: '',
                data:{modal_type:'base'}
                };
      this.fetchtSetModalConfigs(data);
      this.fetchtSetMessageModalConfigs(message_data);
    }
  }
}
</script>