<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <loader
        v-if="loader_flag"
        object="#049A59" color1="#ffffff" color2="#049A59" size="3" speed="2" bg="#ffffff" objectbg="#eeeeee" opacity="80" disableScrolling="false" name="spinning"
    ></loader>
</template>

<script>
import { boolean } from 'yup/lib/locale'


export default {
  components: {
   
  },
  props: {
    loader_flag:boolean
  }
  
}
</script>