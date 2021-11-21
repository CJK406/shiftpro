<template>
  <div>
    <label :for="htmlFor" class="inline-block mb-1 font-bold text-black">{{labelText}}</label>
    <textarea :name="htmlName" 
              :id="htmlFor" 
              :value="value"
              class="w-full rounded-2xl text-gray-500 border border-solid border-gray-300  hover:shadow-lg focus:ring-emerald focus:border-transparent" 
              rows="4">
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    htmlFor: String,
    htmlName: String,
    labelText: String,
    value: String
  }
}
</script>