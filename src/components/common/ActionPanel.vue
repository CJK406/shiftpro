<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-5">
      <div class="flex items-center justify-between">
          <p class=" text-gray-900 text-xl sm:text-2xl font-bold">
            {{text}}
          </p>
          <button type="button" class="inline-flex items-center p-2 border border-transparent shadow-sm font-medium rounded-full text-white bg-secondary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
            <IconGenerator class="w-6 h-6 sm:h-8 sm:w-8"  :iconName="iconName"/>
          </button>
      </div>
    </div> 
  </div>
</template>

<script>
import IconGenerator from '@common/IconGenerator.vue'

export default {
  components: {
    IconGenerator
  },
  props: {
    text: String,
    iconName: String
  }

}

</script>


