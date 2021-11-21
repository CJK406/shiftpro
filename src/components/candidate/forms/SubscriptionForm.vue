<template>
  <div>
    <div class="grid grid-cols-4 gap-10 items-center mb-10">
      <div class="col-span-3 sm:col-span-3">
        <h2 class="text-xl sm:text-3xl font-bold text-gray-900 mb-1">Active</h2>
        <p class=" sm:text-base">Valid until 21/03/222</p>
      </div>
      <IconGenerator iconName="CheckIcon" class="col-span-1 sm:col-span-1 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-2 bg-emerald text-white"/>
    </div>
    <form @submit.prevent>
      <!-- Group -->
      <div class="grid sm:grid-cols-3 justify-center  text-center sm:justify-start sm:text-left mb-6">
        <div class="sm:col-span-2 self-center">
          <h3 class="text-sm sm:text-base text-gray-800 font-bold"> Subscription renews on 22/03/2022 </h3>
        </div>
        <div class="sm:col-span-1">
          <SimpleSelect :hasRoundedIcon="true"/>
        </div>
      </div>
      <!-- Group -->
      <div class="grid sm:grid-cols-3 justify-center  text-center sm:justify-start sm:text-left">
        <div class="sm:col-span-2">
           <h3 class="text-sm sm:text-base text-gray-800 font-bold "> Paid monthly £2.00 a month </h3>
           <p class="text-sm sm:text-base">Annual subscription is £70.00 per year</p>
        </div>
        <div class="sm:col-span-1">
          <SimpleSelect :hasRoundedIcon="true" />
        </div>
      </div>
      <button   type="submit" 
                class="btn primary_button mt-10">
        Save changes
      </button>
    </form>
  </div>
</template>

<script>
import SimpleSelect from '@common/form-elements/SimpleSelect'
import IconGenerator from '@common/IconGenerator'

export default {
  components: {
    IconGenerator,
    SimpleSelect
  }
}
</script>