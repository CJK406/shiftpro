<template>
  <div>
    <!-- <label for="location" class="block text-sm font-medium text-gray-700">Location</label> -->
    <select   id="location"
              name="location" 
              class="mt-1 font-bold text-gray-700 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm rounded-md"
              :class="{'rounded-full': hasRoundedIcon}">
      <option>USA</option>
      <option selected="">Cancel Subscription</option>
      <option>EU</option>
      <option>EU</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    hasRoundedIcon: Boolean
  }
}
</script>