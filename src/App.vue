<template>
  <div>
    <router-view />
    <Notification  />
  
  </div>
</template>
<style type="text/css">
@import "common.css";
</style>
<script>
import Notification from '@/components/common/Notification'

export default {
  name: 'App',
  components: {
    Notification
  }
}
</script>