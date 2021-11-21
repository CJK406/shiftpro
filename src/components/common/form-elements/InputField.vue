<template>
  <div>
    <label :for="attributes.htmlFor" class="block font-extrabold" style="color:#111827">{{attributes.htmlLabel}}</label>
    <div class="mt-1">
      <input  :id="attributes.htmlId"
              :name="attributes.htmlFor"   
              :placeholder="attributes.inputPlaceholder"
              type="text"
              class="text-gray-500 shadow-sm hover:shadow-md focus:ring-emerald focus:border-emerald block w-full sm:text-sm border-gray-300 rounded-md"  />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attributes: {
      htmlLabel: String,
      htmlFor: String,
      htmlId: String,
      htmlName: String,
      inputPlaceholder: String
    }
  }
}
</script>