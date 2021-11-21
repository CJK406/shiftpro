<template>
  
  <div  class="w-full">
    <form @submit.prevent="closeModal">
        <div class="mb-8">
          <InputField  :attributes="{ 
              htmlLabel: 'Phone number', 
              htmlFor: 'phonenumber', 
              htmlId: 'phonenumber', 
              htmlName: 'phonenumber', 
              inputPlaceholder: '0000000000'}" />
        </div>
        <div class=" grid lg:grid-cols-2  gap-4 mb-8">
          <InputField v-for="field in inputFields" :key="field.id" :attributes="field" />
        </div>
        <button   type="submit" 
                  class="primary_button">
                Save changes
        </button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import InputField from '@common/form-elements/InputField'


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
export default {
  components: {
    InputField
  },
  setup() {

    const store = useStore()
    const closeModal = () => {
      store.commit('candidate/SET_MODAL_PROPS', {
          isOpen: false,
      })
    }

    return {
      inputFields,
      closeModal
    }
  }
}
</script>