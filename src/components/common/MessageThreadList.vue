<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <ul class="divide-y divide-gray-200 max-h-60 ">
        <Element v-for="message in messageThread" :key="message.id" :message="message" />
    </ul>
</template>

<script>
import Element from './MessageThreadList/Element'
export default {
  components: {
    Element
  },
  props: {
    messageThread: Array
  }
}
</script>