<template>
  <li  class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div class="flex-1 flex flex-col py-8 px-4">
        <img :class="{ 'rounded-full': isRounded}"  class=" h-20 w-auto mb-6 flex-shrink-0 mx-auto " :src="network.imageUrl" :alt="network.name" />
        <h3 class=" text-gray-900 text-base sm:text-lg font-bold">{{ network.name }}</h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Subsidiary</dt>
          <dd class="mb-2 mt-3"> <span class="text-main-light text-sm sm:text-base">{{ network.subsidiary }}</span> </dd>
          <dt class="sr-only">Distance</dt>
          <dd class="mt-1">
            <span class="px-4 py-2 text-sm  bg-violet text-main font-bold rounded-full">{{ network.distance }}</span>
          </dd>
        </dl>
      </div>
    </li>
</template>

<script>
export default {
  props: {
    network: {
      parent: String,
      subsidiary: String,
      name: String,
      imageUrl: String,
    },
    isRounded: Boolean
  }
}
</script>
