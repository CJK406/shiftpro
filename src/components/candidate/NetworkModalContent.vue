<template>
  <div class="py-4 px-4">
    <Form @submit.prevent :validation-schema="schema" v-slot="{ errors }">
     
      <p class="text-center text-gray-800 text-2xl mt-3 Biotif-bold">{{messageData.user_name}}</p>
      <p v-if="messageData.reply_id!==''" class="text-center text-gray-900 font-semibold text-base mt-1">{{message_subject}}</p>
      
      
         <div class="text-center mb-4 mt-2 text-center">
             <button @click="viewProfile(messageData.user_id)" type="button"
                class="flex hover:text-emerald secondary_button m-auto "
                >
              
                  <UserIcon class=" w-5 self-center" > </UserIcon>
                  <span class="self-center ml-2 hover:text-emerald">View profile</span>
                </button>
         </div>
      <MessagesThreadList  v-if="messageData.reply_id!==''" :messageThread="messageThread"/>
         <div v-if="messageData.reply_id===''">
            <!-- <label class="font-bold ">Subject: </label> -->
            <Field v-model="message_subject" placeholder="Subject" name="message_subject" class="form-control w-full rounded-2xl p-2 mb-2 mt-1 text-gray-500 border border-solid border-gray-300  hover:shadow-lg focus:ring-emerald focus:border-transparent" 
            :class="{ 'is-invalid': errors.message_subject }" />
                        <div class="invalid-feedback">{{errors.message_subject}}</div>
         </div>
        <div v-if="messageData.type!=='sent'">
            <Field v-model="message_content" :placeholder="messageData.reply_id!=='' ?  'Reply to this message' : 'Your Message'" name="message_content" as="textarea" class="form-control w-full rounded-2xl text-gray-500 border border-solid border-gray-300  hover:shadow-lg focus:ring-emerald focus:border-transparent" 
            :class="{ 'is-invalid': errors.message_content }" />
                        <div class="invalid-feedback">{{errors.message_content}}</div>
        
          <div class="text-right">
            <button @click="sendMessage" class="primary_button" type="submit">Send message</button>
          </div>
        </div>
        <div v-if="messageData.type==='sent'">
          <div class="text-right">
            <button type="button" style="color:#374151; border:1px solid #D7DADF; background-color:transparent" 
            class="mt-4 ml-auto flex btn primary_button ml-2" v-on:click="closeModal()"><XIcon class="w-5 mr-1 self-center" /> <span class="self-center">Close this window</span></button>
          </div>
        </div>
      <!-- </form> -->
    </Form>
  </div>
</template>

<script>
// import { computed } from 'vue'
import {mapGetters,mapActions} from "vuex";
import { UserIcon,XIcon } from '@heroicons/vue/solid'
import { useStore } from 'vuex'

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import MessagesThreadList from '@common/MessageThreadList'
// import TextArea from '@common/form-elements/TextArea'
export default {
  components: {
    MessagesThreadList,
    UserIcon,
    XIcon,
    // TextArea
    Form,
    Field,
  },
  data: () => ({
      message_content:"",
      message_subject:""
  }),
  
  computed: {
    ...mapGetters({
      messageThread: 'candidate/getMessageThread',
      messageData: 'candidate/getMessageModalData',
      getUserDetails: 'authentication/getUserDetails'
    }),
  },
  mounted() {
		this.message_subject = this.messageData.subject 
	},
  methods: {
    ...mapActions({
      fetchSendMessage: 'candidate/fetchSendMessage',
      fetchtSetModalConfigs: 'candidate/fetchtSetModalConfigs',
      fetchSetEmployerModalConfigs: 'candidate/fetchSetEmployerModalConfigs'

    }),
  
    sendMessage() {
      if(this.message_content!=="" && this.message_subject!==""){
        const post_data = {recipient_id: this.messageData.user_id, subject:this.message_subject,message: this.message_content,reply_id:this.messageData.reply_id};
        this.fetchSendMessage(post_data);
        this.$swal(
                          {
                            title:'Successfully Sent',
                            icon: 'success',
                            confirmButtonText: '<i class="fa fa-close"></i> Close this window!',
                            customClass: {
                              confirmButton: 'SuccessClosebutton'
                            }
                          }
              );
      }
    },
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
  setup() {
    const store = useStore()  

        const schema = Yup.object().shape({
                message_content: Yup.string()
                    .required('Message content is required'),
                message_subject: Yup.string()
                    .required('Subject is required'),
               });
        const closeModal = () => {
          store.commit('candidate/SET_MODAL_PROPS', {
            isOpen: false,
            iconName: '',
            componentName: '',
            title: ''
          })
        }
      return {
        schema,
        closeModal
      }
    }
}
</script>