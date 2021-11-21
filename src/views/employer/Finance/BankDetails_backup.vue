<template>
  <div class="grid xl:grid-cols-2 gap-10">
    <CardWithIcon iconPosition="left" iconName="OfficeBuildingIcon">
        <h3 class="text-2xl mb-6 sm:mb-10 pt-4 biotif">Business address</h3>
          <!-- Element -->
          <div class="mb-4">
            <div class="grid lg:grid-cols-1 lg:w-full gap-4 lg:pr-8 mb-8">
                    <InputField v-for="field in inputFields1" :key="field.id" :attributes="field" />
            </div>
            <div class="grid lg:grid-cols-2 lg:w-full gap-4 lg:pr-8 mb-8">
                <InputField v-for="field in inputFields2" :key="field.id" :attributes="field" />
            </div>
          </div>
          <div class="text-right">
            <button type="submit" class="btn primary_button">Save company address</button>
          </div>
    </CardWithIcon>
    <CardWithIcon iconPosition="left" iconName="PencilAltIcon">
      <h3 class="text-2xl mb-6 sm:mb-10  pt-4 biotif">Company details</h3>
      <form @submit.prevent="saveCardDetails">
        <!-- Element -->
        <div class="mb-4">
          <label for="fullname" class="block text-md font-bold text-gray-900">Company registration number</label>
          <div class="mt-1">
            <input  id="fullname"
                    name="fullname" 
                    v-model="cardFormFields.fullname"
                    class="shadow-sm focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="123456" 
                    type="text" />
          </div>
        </div>
        <div class="mb-4">
          <label for="fullname" class="block text-md font-bold text-gray-900">Contact</label>
          <div class="mt-1">
            <input  id="fullname"
                    name="fullname" 
                    v-model="cardFormFields.fullname"
                    class="shadow-sm focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Hannha Brown" 
                    type="text" />
            <p style="color:#727497" class="mt-1">A person who we can contact with regards to wages and other details</p>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 lg:w-full gap-4 lg:pr-8 mb-8">
            <div class="mb-4">
              <label for="fullname" class="block text-md font-bold text-gray-900">E-mail address</label>
              <div class="mt-1">
                <input  id="fullname"
                        name="fullname" 
                        v-model="cardFormFields.fullname"
                        class="shadow-sm focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="hannahbrown@nandos.co.uk" 
                        type="text" />
              </div>
            </div>
            <div class="mb-4">
              <label for="fullname" class="block text-md font-bold text-gray-900">Phone number</label>
              <div class="mt-1">
                <input  id="fullname"
                        name="fullname" 
                        v-model="cardFormFields.fullname"
                        class="shadow-sm focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="1234456775677" 
                        type="text" />
              </div>
            </div>
        </div>
        
      
        <div class="text-right">
          <button type="submit" class="btn primary_button">Save company details</button>
        </div>
      </form>
    </CardWithIcon>
  </div>
</template>

<script>
import CardWithIcon from '@common/CardWithIcon'
import { reactive } from 'vue'
import InputField from '@common/form-elements/InputField'

export default {
  components: {
    CardWithIcon,
    InputField
  },
   data: () => ({
    inputFields1 : [
        {
            id: 1, 
            htmlLabel:"Company name",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
    ],
    inputFields2 : [
        {
            id: 1, 
            htmlLabel:"Account number",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Sort code",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Billing address line 1",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Billing address line 2",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Town",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Postcode",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
    ]
  }),
  setup() {
    const billingFormFields = reactive({
      fullname: "",
      address1: "",
      address2: "",
      town:     "",
      postcode: "" 
    })
    const saveBillingForm = (e) => {
      // dispatch an action to save the billing fields
      console.log(e, billingFormFields)
    }

    const cardFormFields = reactive({
      fullname: "",
      sortcode: null,
      accountNumber: null
    })
    const saveCardDetails = (e) => {
      // dispatch an action to save the account details fields
      console.log(e)
    }

    return {
      billingFormFields,
      saveBillingForm,
      cardFormFields,
      saveCardDetails
    }
  }
}
</script>