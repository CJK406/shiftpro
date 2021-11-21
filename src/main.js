
import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import './index.css'
import './assets/css/main.scss'

import router from './router/index'
import store from './store/index'
import VueSweetalert2 from 'vue-sweetalert2';
import loader from "vue-ui-preloader";
import '@stripe/stripe-js'
import "datatables.net-dt/css/jquery.dataTables.min.css";
import VueGoogleMaps from '@fawmi/vue-google-maps'

// import Vue from 'vue'
// App.component('jw-pagination', JwPagination);
createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .use(loader)
  .use(VueGoogleMaps, {
      load: {
          key: 'AIzaSyCigXLM6UHvJwKztbWOOgm8--cLbHPw0qY',
      },
  })
  .mount('#app')

