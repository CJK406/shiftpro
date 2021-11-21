<!-- This example requires Tailwind CSS v2.0+ -->
<template>
<div class="grid lg:grid-cols-5">
  <div class="col-span-2 min-h-screen flex flex-col justify-start py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-12 w-auto" :src="require('../../assets/logo-pineapple.svg')" alt="Workflow" />
            <h2 class="mt-6 text-center justify-center flex text-3xl font-extrabold Biotif-bold" style="color:#050A4D; font-size:48px">
              <span>Join SHIFT</span> <img class="-mt-2 ml-2 h-10 w-auto" :src="require('../../assets/sp-logo1.png')" alt="Workflow" />
            </h2>
      </div>
      <div class="relative pt-8 px-1 sm:mx-auto sm:w-full sm:max-w-md">
          <Register />
      </div>
  </div>
  <div class="col-span-3 login_back_image">
  </div>
</div>
</template>

<script>
import Register from '@/components/public/Register.vue'
export default {
    components: {
        Register,
    },
    setup() {


    return {
    }
  },

  }
</script>
