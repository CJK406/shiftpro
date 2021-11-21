<template>
  <div>
    <div class="grid lg:grid-cols-3 gap-6"> 
      <div>
        <p class="text-black text-lg font-semibold self-center mb-3">Work experience: </p>
        <p class="mt-4">{{employer_data.keyinfo}}</p>
      </div>
      
      <div class="lg:col-span-1">
        <p class="text-black text-lg font-semibold self-center mb-3">Relevant qualifications: </p>
        <p class="mt-4">{{employer_data.certifications}}</p>
      </div>
      <div class="lg:col-span-1">
        <p class="text-black text-lg font-semibold self-center mb-3">Other achievements/skills: </p>
        <p class="mt-4">{{employer_data.statement}}</p>
      </div>
    </div>
    
    <!-- <div class="grid lg:grid-cols-2 gap-12">
        <div class="lg:col-span-1">
           <p class="text-black text-lg font-semibold">Bio:  </p>
           <p class="mt-4">{{employer_data.bio}}</p>
        </div>
        <div class="lg:col-span-1">
           <p class="text-black text-lg font-semibold">Key skills:</p>
          <p class="mt-4">{{employer_data.skills}}</p>

        </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-12 mt-6">
        <div class="lg:col-span-1">
           <p class="text-black text-lg font-semibold">Qualifications:  </p>
           <p class="mt-4">{{employer_data.qualifications}}</p>
        </div>
        <div class="lg:col-span-1">
           <p class="text-black text-lg font-semibold">Hobbies:</p>
          <p class="mt-4">{{employer_data.bio}}</p>

        </div>
    </div> -->
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