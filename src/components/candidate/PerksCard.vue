<template>
  <div class="bg-white px-6 py-4 shadow-around-sm ">
      <img class="mx-auto mb-6 h-16 sm:h-20" :src="info.imgURL" :alt="info.companyName">
      <h3 class="text-lg sm:text-2xl text-gray-900 font-bold">{{ info.discount }}</h3>
      <p>{{ info.additionalInfo }}</p>
  </div>

</template>
<script>
export default {
 
  props: {
    info: {
      imgURL: URL,
      companyName: String,
      discount: String,
      additionalInfo: String
    }
  }
}
</script>