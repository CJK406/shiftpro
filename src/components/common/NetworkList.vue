<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <ul class="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 shadow-md ">
    <Card  v-for="network in networkList" :network="network" :isRounded="isRounded" :key="network.id"/>
  </ul>
</template>

<script>
import Card from './NetworkList/Card'

export default {
  components: {
    Card
  },
  props: {
    networkList: Array,
    isRounded: Boolean
  }
}
</script>