<template>
  <form @submit.prevent>
      <div class="relative mt-20  px-6 xl:px-10 py-8 xl:py-16 bg-white shadow-lg rounded-3xl">
        <div class="flex items-center  mb-10 xl:absolute top-0  transform xl:-translate-y-1/2">
          <Avatar class="mr-4" :imgURL="user_detail.user_photo" :htmlAlt="avatar.htmlAlt"/>
          <ButtonWithIcon 
            usergroup = '2'
            :iconAttrs="{
              iconName: 'CameraIcon',
              iconClasses: 'inline-block mr-2 w-8 text-gray-600'
            }"
            type_button="Edit image" />
        </div>
        <div>
          <div class="grid lg:grid-cols-2 lg:w-1/2 gap-4 lg:pr-8 mb-8">
            <InputField v-for="field in inputFields" :key="field.id" :attributes="field" />
          </div>
          <div class="grid lg:grid-cols-2 gap-8">
            <TextArea v-for="textArea in textAreaFieds"
              :key="textArea.id"
              :htmlFor="textArea.htmlFor"
              :htmlName="textArea.htmlName"
              :labelText="textArea.labelText"
              :value="textArea.value" />  
          </div>
      
        </div> 
      </div>
    </form>
</template>

<script>
import TextArea from '@common/form-elements/TextArea'
import InputField from '@common/form-elements/InputField'
import ButtonWithIcon from '@common/ButtonWithIcon'
import Avatar from '@common/Avatar'
import { useStore } from 'vuex'
import { computed } from 'vue'
const value = "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century "
const textAreaFieds = [
  {id: 1, htmlFor: "biography", htmlName: "biography", labelText: "Bio: ", value:value },
  {id: 2, htmlFor: "keyskills", htmlName: "skills", labelText: "Key skills: ", value: value},
  {id: 3, htmlFor: "qualifications", htmlName: "qualifications", labelText: "Qualifications: ", value: value},
  {id: 4, htmlFor: "hobbies", htmlName: "hobbies", labelText: "Hobbies: ", value: value},
]

const inputFields = [
  {
    id: 1, 
    htmlLabel:"Your job title(s)",
    htmlFor:"jobtitle" ,
    htmlId:"jobtitle" ,
    htmlName:"jobtitle",
    inputPlaceholder:"Grill Chef"
  },
  {
    id: 2, 
    htmlLabel:"Your location",
    htmlFor:"location" ,
    htmlId:"location" ,
    htmlName:"location",
    inputPlaceholder:"HA1 2BC"
  }
]

const avatar = {
  imgURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  htmlAlt: 'Image '
}

export default {
  components: {
    TextArea,
    ButtonWithIcon,
    Avatar,
    InputField,
  },
  setup() {
    const store = useStore()
    
    return {
      user_detail: computed(() => store.getters['authentication/getUserDetails']),
      inputFields,
      textAreaFieds,
      avatar
    }
  }
}
</script>