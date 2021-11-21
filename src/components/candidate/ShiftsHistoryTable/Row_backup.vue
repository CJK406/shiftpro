<template>
  <tr class="grid relative lg:grid-cols-4 items-center shadow-md py-6 lg:py-2  bg-white   border-b border-solid border-gray-200">
   

     <td class="pl-12  px-2 lg:px-6 py-2 lg:py-4 whitespace-nowrap ">
      <div class="flex items-center">
        <div class="flex items-center top-1/2 left-2 transform -translate-y-1/2 lg:transform-none lg:static flex-shrink-0 h-10 w-10">
          <img class="h-8 w-8 rounded-full mr-2 shift_table_image1" :src="shift.photo" :alt="shift.photo" />
        </div>
        <div class="lg:ml-4">
          <div class="text-lg font-semibold text-gray-900">
            {{ shift.fullname }}
          </div>
          <div class="text-sm text-main-light">
            {{ shift.company }}
          </div>
        </div>
      </div>
    </td>
    <td class="grid grid-cols-2 px-4 lg:py-4 whitespace-nowrap text-sm text-gray-500 shifttable_second_td">
        <div class="flex flex-col">
         <h3 class="text-base font-bold pr-2">{{ shift.role }}  </h3> 
         <p class=" text-main-light font-thin"> {{ shift.start_time_formatted }}</p>
      </div>

    </td>
    <td class="grid lg:grid-cols-2 px-4 lg:py-4 leading-8 whitespace-nowrap text-sm text-gray-500 shifttable_second_td">
      <div class="flex self-center">
        <StarIcon class="w-6 h-6 pr-1 fill-current text-yellow-400" v-for="index in 5" :key="index" />
        <StarIcon class="w-6 h-6 pr-1 text-gray-200 fill-current" v-for="index in 0" :key="index" />
      </div>
      <div class="">
        <!-- <button  :class="shift.isActive ? 'font-bold text-emerald' : 'hidden' " type="button">Review</button>
        <p :class="!shift.isActive ? 'block' : 'hidden'"> {{shift.rate.text}}</p> -->
        <!-- <button  class="font-bold text-emerald" type="button">Review</button> -->
        <p class="block"> Very Good!!</p>
      </div>
    </td>
    <td class="absolute right-4 top-1/2 transform active:none -translate-y-1/2 px-2 sm:px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button  class="font-bold text-emerald" type="button">Submit</button>
    </td>
  </tr>
</template>

<script>
import { StarIcon } from '@heroicons/vue/outline'

export default {
  components: {
    StarIcon
  },
  props: {
    shift: {
      id: Number,
      company: String,
      role: String,
      address1: String,
      address2: String,
      address3: String,
      city: String,
      postcode: String,
      lat: Number,
      lon: Number,
      start_time: String,
      start_time_formatted: String,
      end_time: String,
      rate: Number,
      description: String,
      status: String,
      employer_photo: String,
    },
  },
  setup() {
    
  },
}
</script>