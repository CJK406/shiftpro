<template>
  <div>
    <div class="grid lg:grid-cols-4 gap-12">
        <div class="lg:col-span-2">
           <p class="text-black text-lg ">Who we are</p>
           <p class="mt-4">{{employer_data.bio}}</p>
        </div>
        <div class="lg:col-span-1">
           <p class="text-black text-lg ">Address</p>
           <p class="mt-4">{{employer_data.address}}</p>
           <p >{{employer_data.city}}</p>
           <p >{{employer_data.postcode}}</p>
        </div>
        <div class="lg:col-span-1">
           <p class="text-black text-lg ">Website</p>
           <p >{{employer_data.website}}</p>
        </div>
    </div>
            <ShiftsTable actionType="dashboard" />

  </div>
</template>

<script>

import {mapGetters,mapActions} from "vuex";

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
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  mounted() {
  }
  
}
</script>