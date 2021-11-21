<template>
  <div class="grid lg:grid-cols-5">
    <div class="col-span-2 justify-center min-h-screen flex flex-col justify-start py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-12 w-auto" :src="require('../../assets/logo-pineapple.svg')" alt="Workflow" />
            <h2 class="mt-6 text-center justify-center flex text-3xl font-extrabold Biotif-bold" style="color:#050A4D; font-size:48px">
              <span>Sign in to SHIFT</span> <img class="-mt-2 ml-2 h-10 w-auto" :src="require('../../assets/sp-logo1.png')" alt="Workflow" />
            </h2>
        </div>
        
  
      <div class="mt-8 px-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div v-if="getLoginFailure.value" class=" bg-red-400 text-white p-4 mb-8">
              {{ getLoginFailure.message }}
          </div>
          <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
            <div>
              <label for="username" class="block text-sm text-main font-bold">
                Username
              </label>
              <div class="mt-1">
                <!-- <input v-model="username" id="username" placeholder="Username..." name="username" type="text" autocomplete="username" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
                <Field  v-model="username" name="username" type="text" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.username }" />
                <div class="invalid-feedback">{{errors.username}}</div>
              </div>
              
            </div>

            <div class="mt-6">
              <label for="password" class="block text-sm text-main font-bold">
                Password
              </label>
              <div class="mt-1">
                <!-- <input v-model="password" id="password" placeholder="Password..." name="password" type="password" autocomplete="current-password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
                <Field v-model="password" name="password" type="password" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between mt-4">
              <div class="flex items-center ">
                <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-secondary focus:ring-emerald border-gray-300 rounded" />
                <label for="remember_me" class="ml-2 block text-sm text-custom-grey">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-emerald">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div class="flex justify-center">
              <button type="submit" class="btn btn-full bg-secondary hover:bg-secondary-light mt-4">
                Sign in
              </button>
            </div>
                      </Form>


          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  No account? <router-link :to="{name: 'Register'}" class="text-emerald font-bold" href="/"> Register now! </router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-3 login_back_image">
    </div>
  </div>
  
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from 'vuex'
import { ref } from 'vue'
import { computed } from 'vue'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
export default {
  components: {
        Form,
        Field,
    },
  setup() {
    const schema = Yup.object().shape({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .required('Password is required'),
        });

    const store = useStore()
    const username = ref("")
    const password = ref("")
    
    const handleSubmit = () => {
      if (username.value && password.value) {
        store.dispatch('authentication/doLogin', {
              username: username.value, 
              password: password.value,
              action: 'login'
            })
      }
    }
    return {
      schema,
      getLoginFailure: computed(() => store.getters['authentication/getLoginFailure']),
      handleSubmit,
      username,
      password,
    }
  }
}

</script>
