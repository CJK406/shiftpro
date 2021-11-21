<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <footer class="py-8 bg-dark-main text-white">
    <div class="container mx-auto text-footer-text">
      <img class="h-8 mx-auto" :src="require('@/assets/sp-logo-w.png')" alt="Shift Pro Logo">
      <div class="lg:grid lg:grid-cols-3 pt-8">
        <div class="text-center mb-4 lg:mb-0 lg:text-left">
          <a href="https://facebook.com">
            <svg class="w-5 h-5 inline-block hover:text-emerald" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
            </svg>
          </a>
          <a class="px-4" href="/">
              <svg class="w-5 h-5 inline-block hover:text-emerald" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
          </a>
          <a class="pr-4 hover:text-emerald" href="/">Privacy Policy</a>
          <a class="pr-4 hover:text-emerald" href="/">FAQs</a>
          <a class="pr-4 hover:text-emerald" href="/">Contact</a>
        </div>
        <div class="text-center mb-4 lg:mb-0">
           2021 JAMM Recruitment
        </div>
        <div class="text-center lg:text-right">
          Designed and developed by&nbsp;<a class="text-emerald" href="https://www.netrixinternet.co.uk/">Netrix Ltd</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>