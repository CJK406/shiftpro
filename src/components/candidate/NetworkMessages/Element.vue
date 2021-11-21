<template>
  <li @click="openModal" class="cursor-pointer py-4 border-b border-solid border-gray-100">
    <div class="flex space-x-3">
      <img class="h-8 w-8 rounded-full self-center" :src="messageInfo.photo" :alt="messageInfo.name" />
      <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between">
          <div>
            
            <h3 class="text-lg text_username flex" :class="{'font-bold':messageInfo.unread==='1' && !read_message && messageType!=='Sent'}">
              <StarIcon v-if="messageInfo.unread==='1' && !read_message && messageType!=='Sent'" style="color:#F1DF43" class="self-center w-6 h-6 pr-1 text-gray-200 fill-current" /><span>{{ messageInfo.username }}</span></h3>
              <p class="self-center text-sm text-main-light" :class="{'font-semibold':messageInfo.unread==='1' && !read_message && messageType!=='Sent'}">{{messageInfo.subject}}</p>
          </div>
          <div class="relative" style="display:flex">
              <p class="text-sm text-gray-500 mr-3  sm:right-18 lg:w-40 w-10 text-right self-center">{{ messageInfo.ago }}</p>
              <button @click="openModal" type="button" class="text-gray-600 hover:text-emerald self-center">
                <MailIcon class="p-2 rounded-full border border-solid border-gray-300 w-10" > </MailIcon>
              </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { MailIcon  } from '@heroicons/vue/solid'
import { StarIcon } from '@heroicons/vue/outline'

import {mapGetters,mapActions} from "vuex";
export default {
  components: {
    MailIcon ,
    StarIcon
  },
  props: {
    messageInfo: {
      id: Number,
      userId: Number,
      photo: String,
      subject: String,
      message: String,
      timeElapsed: String,
      folder:String,
    },
    messageType:String
  },
   data: () => ({
      message_content:"",
      read_message:false
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      fetchUserReliability: 'candidate/fetchUserReliability',
      fetchMessageThread: 'candidate/fetchMessageThread',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchtSetMessageModalConfigs: 'candidate/fetchtSetMessageModalConfigs',

    }),
    openModal () {
      this.fetchUserReliability({id: 1})
      this.fetchMessageThread(this.messageInfo.id)
      const message_data = {photo:this.messageInfo.photo, reply_id:this.messageInfo.message_id,
                             user_id: this.messageInfo.folder==="sent" ? this.messageInfo.recipient_id : this.messageInfo.user_id,
                             subject:this.messageInfo.subject, user_name:this.messageInfo.username,
                             type:this.messageInfo.folder
                             }
      const data = {
                isOpen: true,
                iconName: 'UserPhoto',
                componentName: 'NetworkModalContent',
                title: '',
                data:{modal_type:'base'}
               };
      this.fetchtSetModalConfigs(data);
      this.fetchtSetMessageModalConfigs(message_data);
      this.read_message=true;

    }
  },
}
</script>
