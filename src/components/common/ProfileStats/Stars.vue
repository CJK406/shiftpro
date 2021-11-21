<template>
  <div class=" inline-flex items-center  bg-main-lighter rounded-full px-4 pt-1 pb-1 mb-2">
    <IconGenerator   v-for="index in maxStars" 
                     :key="index" 
                     iconName="StarIcon"
                     class="w-5 h-5 pr-1  fill-current"
                     :class="addHighlightClass(index)" />
    <p class="text-main font-bold ml-2">{{count}}</p>
  </div>
</template>

<script>
import IconGenerator from '@common/IconGenerator'

export default {
  components: {
    IconGenerator
  },
  data() {
    return {
      maxStars: 5
    }
  },
  methods: {
    addHighlightClass(index) {
        const isHighlight = (index <= this.count) ? true : false  
        return {
          'text-yellow-300': isHighlight,
          'text-gray-200': !isHighlight
        }
    }
  },
  props: {
    count: Number
  }
}
</script>