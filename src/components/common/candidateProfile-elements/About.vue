<template>
  <div>
    <div class="grid lg:grid-cols-3 gap-2"> 
      <div>
        <p class="text-black biotif text-lg font-semibold self-center mb-3">Key information </p>
        <p><span class="text-main">Minimum salary: </span> <span>£{{employer_data.min_wage}} per hour</span></p>
        <p><span class="text-main">DBS check: </span> <span>{{employer_data.dbs_check===0 ? 'No':'Yes'}}</span></p>
        <p><span class="text-main">Distance: </span> <span>{{employer_data.max_distance}} miles away</span></p>
        <p><span class="text-main">Distance willing to travel:  </span> <span>{{employer_data.max_distance}} miles</span></p>
        <p><span class="text-main">Closest train station: </span> <span>{{employer_data.closest_station}}</span></p>
        <p><span class="text-main">Driving licence: </span> <span>{{employer_data.driver_license===0 ? 'No':'Yes'}}</span></p>
        <p><span class="text-main">Access to a car: </span> <span>{{employer_data.access_car===0 ? 'No':'Yes'}}</span></p>

      </div>
      <div class="lg:col-span-1">
        <p class="text-black text-lg biotif font-semibold self-center mb-3">Job title(s) </p>
        <div class=""> 
          <!-- <p  class="ml-4 text-black  self-center">{{employer_data.roles}}</p> -->
          <p v-for="role in employer_data.roles" :key="role" class="ml-4 text-black  self-center">{{role}}</p>
        </div>
      </div>
      <div class="lg:col-span-1">
        <p class="text-black text-lg font-semibold biotif self-center mb-3">Language(s) </p>
        <p v-for="lan in employer_data.languages" :key="lan" class="ml-4 text-black  self-center">{{lan}}</p>
      </div>
    </div>
    
    <p class="mobile_view text-black biotif text-lg font-semibold self-center mb-3 mt-3">Gallery</p>
    <div class="flex mt-4">
          <div v-if="employer_data.gallery.length>0" class="w-16 h-12 rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="employer_data.gallery[0].image" />
          </div>
          <div v-if="employer_data.gallery.length>1" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="employer_data.gallery[1].image" />
          </div>
          <div v-if="employer_data.gallery.length>2" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="employer_data.gallery[2].image" />
          </div>
          <div v-if="employer_data.gallery.length>3" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="employer_data.gallery[3].image" />
          </div>
          <div v-if="employer_data.gallery.length>4" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="employer_data.gallery[4].image" />
          </div>
          <div v-if="employer_data.gallery.length>5" style="margin-left:-14px" class="flex text-center w-12 h-12 bg-gray-600 rounded-full border-2 border-white">
            <span class="self-center m-auto text-white text-lg font-bold">5+</span>
          </div>
          
          <!-- <div v-if="gallery.length>0" class="w-16 h-12  rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="gallery[0].image" />
          </div>
          <div v-if="gallery.length>1" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img  class="rounded-full w-full" :src="gallery[1].image" />
          </div>
          <div v-if="gallery.length>2" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="gallery[2].image" />
          </div>
          <div v-if="gallery.length>3" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img  class="rounded-full w-full" :src="gallery[3].image" />
          </div>
            <div v-if="gallery.length>4" style="margin-left:-14px" class="w-16 h-12  rounded-full border-2 border-white">
            <img class="rounded-full w-full" :src="gallery[4].image" />
          </div>
          <div v-if="gallery.length>5" style="margin-left:-14px" class="flex text-center w-12 h-12 bg-gray-600 rounded-full border-2 border-white">
            <span class="self-center m-auto text-white text-lg font-bold">5+</span>
          </div> -->
        </div>
    
            <ShiftsTable actionType="dashboard" />

  </div>
</template>

<script>

import {mapGetters,mapActions} from "vuex";
import {
  APIgetGallery
} from '@/api/candidate/api'
export default {
  components: {
  },
  props: {
    employer_data: {
      address: String,
      city: String,
      postcode: String,
      bio:String
    },
  },
   data: () => ({
     gallery:[]
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
     get_gallery(){
        APIgetGallery().then((res) => {
            this.gallery = res.data.results;
        });
      },
  },
  mounted() {
    this.get_gallery();
  }
  
}
</script>