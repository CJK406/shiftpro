<template>
  <img class="inline-block h-16 w-16 rounded-full" :src="imgURL" :alt="htmlAlt" />
</template>

<script>
export default {
  props: {
    imgURL: String,
    htmlAlt: String
  }
}
</script>