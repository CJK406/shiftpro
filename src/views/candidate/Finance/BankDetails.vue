<template>
  <div class="grid xl:grid-cols-2 gap-10">
    <CardWithIcon iconPosition="left" iconName="IdentificationIcon">
        <h3 class="text-2xl mb-6 sm:mb-10 pt-4 biotif">Identify</h3>
        <form @submit.prevent="saveBillingForm">
          <!-- Element -->
          <div class="mb-4">
            <label for="fullname_card" class="block font-bold text-gray-900">Your driver license or passport number</label>
            <div class="mt-1">
              <input  id="fullname_card"
                      name="fullname_card"
                      v-model="billingFormFields.fullname"
                      class="shadow-sm focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="123456"
                      type="text" />
            </div>
          </div>
      
          <div class="text-right">
            <button type="submit" class="btn primary_button">Save proof of identity</button>
          </div>
        </form>
    </CardWithIcon>
    <CardWithIcon iconPosition="left" iconName="FolderOpenIcon">
      <h3 class="text-2xl mb-6 sm:mb-10  pt-4 biotif">National Insurance</h3>
      <form @submit.prevent="saveCardDetails">
        <!-- Element -->
        <div class="mb-4">
          <label for="fullname" class="block text-sm font-bold text-gray-900">NI number</label>
          <div class="mt-1">
            <input  id="fullname"
                    name="fullname" 
                    v-model="cardFormFields.fullname"
                    class="shadow-sm focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="AB-12-34C" 
                    type="text" />
          </div>
        </div>
      
        <div class="text-right">
          <button type="submit" class="btn primary_button">Save NI number</button>
        </div>
      </form>
    </CardWithIcon>
  </div>
</template>

<script>
import CardWithIcon from '@common/CardWithIcon'
import { reactive } from 'vue'

export default {
  components: {
    CardWithIcon
  },
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