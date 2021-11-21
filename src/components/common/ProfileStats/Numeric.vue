<template>
  <div class="items-center lg:mt-0 mt-4 lg:block text-left lg:ml-10">
    <h3 class="font-bold  text-lg text-gray-900">{{ title }}</h3>
    <p class="font-extrabold text-main-lighter text-5xl">{{number}}</p>
  </div>
</template>

<script>
export default {
  props: {
    number: String || Number,
    title: String
  }
}
</script>