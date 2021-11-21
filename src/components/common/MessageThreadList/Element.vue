<template>
    <li  class="py-4">
      <div class="flex space-x-3">
        <img class="h-10 w-10 rounded-full" :src="message.photo" alt="image" />
        <div class="flex-1 space-y-1">
          <div class="flex items-center justify-between">
            <h3 class="text-base text_username  font-medium">{{ message.from_username }}</h3>
            <p class="text-right text-sm text-gray-500 mr-4">{{ message.createdon_formatted }}</p>
          </div>
        </div>
      </div>
      <p class="text-sm pt-2 pl-1 text-gray-500">{{message.message}}</p>
    </li>
</template>

<script>
export default {
  props: {
    message: {
      photo: String,
      altImage: String,
      name: String,
      message: String,
      createdon_formatted: String,
      from_username:String,
    }
  }
}
</script>