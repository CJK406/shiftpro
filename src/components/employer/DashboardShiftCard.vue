<template>
  <div class=" w-full mr-4 ml-4 text-center bg-white shadow-sm rounded-lg">
      <div class="pb-4">
        <h3 class="mb-2 text-lg text-gray-900 pt-6  sm:px-6  font-bold ">
          {{shift.role}} at <span class="text-base">{{shift.company}}</span>
        </h3>
        <p class="text-main-light text-sm">{{shift.date}}</p>
        <p class="text-main-light text-sm">{{shift.hour}}</p>
      </div>
      <div class="grid grid-cols-2   border-t border-gray-200 ">
          <button class="py-4 font-bold text-main border-r border-gray-200" type="button">Edit</button>
          <button class="py-4 font-bold text-main" type="button">Staff</button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    shift: {
      role: String,
      company: String,
      date: String,
      hour: String
    }
  }
}
</script>