<template>
  <div>
    <h3 class="font-bold text-lg lg:mt-0 mt-4 sm:mb-2 text-gray-900 text-left">Your reliability ({{percentage}}%)</h3>
    <div class="block relative min-w-full h-4">
      <div class=" h-4 w-full mt-4 rounded-full bg-gray-300"> </div>
      <div  :style="{width: percentage + '%'}" 
            class="absolute z-3 inset-0 bg-main-lighter h-4 w-6 rounded-full">
      </div>    
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    percentage: Number
  }
}
</script>