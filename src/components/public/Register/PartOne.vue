<template>
      <!-- <div v-if="isDuplicate" class=" bg-red-400 text-white p-4 mb-8">
            Username already exists
      </div> -->
      <Form @submit="handleSubmission" class="space-y-6" :validation-schema="isEmployer? schema: schema1" v-slot="{ errors }">
        <RadioGroup v-model="radioSelect" @click="handleGroupSelect">
          <RadioGroupLabel class="sr-only">
            Privacy radio
          </RadioGroupLabel>
          <div class="bg-white flex rounded-md -space-y-px w-full">
            <RadioGroupOption as="template" v-for="(radio, radioIdx) in radioOpt" :key="radio.name" :value="radio" v-slot="{ checked, active }">
              <div :class="[radioIdx === 0 ? '' : '', radioIdx === radioOpt.length - 1 ? '' : '', checked ? 'bg-gray-100  z-10' : 'border-gray-200', 'relative border lg:p-5 p-3 flex cursor-pointer focus:outline-none']">
                <span :class="[checked ? ' bg-emerald border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-emerald' : '', 'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
                  <span class="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div class="ml-3 flex flex-col">
                  <RadioGroupLabel as="span" :class="[checked ? ' text-emerald' : 'text-gray-900', 'block text-sm font-medium']">
                    {{ radio.name }}
                  </RadioGroupLabel>
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
        <div v-if="isEmployer">
          <label for="company" class="mb-1 block text-sm font-bold text-gray-900">
            Company
          </label>
          <Field  v-model="fields.company" placeholder="Company..." name="company" id="company" type="text" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.username }" />
          <div class="invalid-feedback">{{errors.company}}</div>
          <!-- <input v-model="fields.company" placeholder="Company..." name="company" id="company" type="text"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm"/>  -->
        </div>
        <div>
          <label for="username" class="block text-sm font-bold text-gray-700">
            Username
          </label>
          <div class="mt-1">
            <Field  placeholder="Username..." v-model="fields.username" name="username" id="username" autocomplete="username" type="text" 
            class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" 
            :class="{ 'is-invalid': errors.username,'is-invalid': isDuplicate }" 
            @keyup="isDuplicate=false"
            />
            <div class="invalid-feedback">{{errors.username}}</div>
            <div v-if="isDuplicate" class="invalid-feedback">Username already exists</div>

            <!-- <input placeholder="Username..." v-model="fields.username" id="username" name="username" type="text" autocomplete="username" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-3">
          <div class="col-span-1">
            <label for="forename" class="block text-sm font-bold text-gray-900">
              Forename
            </label>
            <div class="mt-1">
              <Field  placeholder="Forename..." v-model="fields.forename" name="forename" id="forename" autocomplete="forename" type="text" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.forename }" />
              <div class="invalid-feedback">{{errors.forename}}</div>
              <!-- <input placeholder="Forename..." v-model="fields.forename" id="forename" name="forename" type="text" autocomplete="forename" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
            </div>
          </div>

          <div class="col-span-1">
            <label for="surname" class="block text-sm font-bold text-gray-900">
              Surname 
            </label>
            <div class="mt-1">
              <Field  placeholder="Surname..." v-model="fields.surname" name="surname" id="surname" autocomplete="surname" type="text" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.surname }" />
              <div class="invalid-feedback">{{errors.surname}}</div>
              <!-- <input placeholder="Surname..."  v-model="fields.surname" id="surname" name="surname" type="surname" autocomplete="surname" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
            </div>
          </div>
        </div>
        

        <div>
          <label for="email" class="block text-sm font-bold text-gray-700">
            E-mail address
          </label>
          <div class="mt-1">
            <Field  placeholder="Email..." v-model="fields.email" name="email" id="email" autocomplete="email" type="text" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.email }" />
            <div class="invalid-feedback">{{errors.email}}</div>
            <!-- <input placeholder="Email..." v-model="fields.email" id="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
          </div>
        </div>
        

        <div class="grid lg:grid-cols-2 gap-3">
          <div class="col-span-1">
            <label for="forename" class="block text-sm font-bold text-gray-900">
              Password
            </label>
            <div class="mt-1">
              <Field  placeholder="Password..." v-model="fields.password" name="password" id="password" type="password" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.password }" />
              <password-meter :password="fields.password" />
              <div class="invalid-feedback">{{errors.password}}</div>
              <!-- <input placeholder="Forename..."  type="password" v-model="fields.password" id="forename" name="forename"  autocomplete="password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
            </div>
          </div>

          <div class="col-span-1">
            <label for="surname" class="block text-sm font-bold text-gray-900">
              Confirm password 
            </label>
            <div class="mt-1">
              <Field  placeholder="Confirm Password..." v-model="fields.confirm_password" name="confirm_password" id="confirm_password" type="password" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.confirm_password }" />
              <div class="invalid-feedback">{{errors.confirm_password}}</div>
              <!-- <input placeholder="Surname..." type="password"  v-model="fields.confirm_password" id="surname" name="surname" autocomplete="confirm_password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
            </div>
          </div>
        </div>
        <div v-if="!isEmployer">
          <label for="post_code" class="block text-sm font-bold text-gray-700">
           Postcode
          </label>
          <div class="mt-1">
            <Field  placeholder="Postcode..." v-model="fields.post_code" name="post_code" id="post_code" type="text" class="form-control appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" :class="{ 'is-invalid': errors.post_code }" />
            <div class="invalid-feedback">{{errors.post_code}}</div>
            <!-- <input placeholder="Email..." v-model="fields.email" id="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald focus:border-emerald sm:text-sm" /> -->
          </div>
        </div>
        
        <div class="flex justify-center">
          <button  type="submit" class="btn w-full primary_button">
            Register
          </button>
        </div>
      </form>
</template>

<script>
import {  RadioGroup,  RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'
// import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import PasswordMeter from 'vue-simple-password-meter';
import {
  APIdoCheckUserName
} from '@/api/authentication/api'

const radioOpt = [
  { code: 2, name: 'I am a candidate' },
  { code: 3, name: 'I am an employer' },
]

export default {
  components: {
    RadioGroup,
    RadioGroupLabel, 
    RadioGroupOption,
    Form,
    Field,
    PasswordMeter
  },
  setup(props, context) { 
    
    const schema = Yup.object().shape({
      username: Yup.string()
            .required('Username is required')
            .min(8),
        forename: Yup.string()
            .required('Forename is required'),
        surname: Yup.string()
            .required('Surname is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        
        company: Yup.string()
            .required('Company is required'),
        
    });
    const schema1 = Yup.object().shape({
        forename: Yup.string()
            .required('Forename is required'),
        surname: Yup.string()
            .required('Surname is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        username: Yup.string()
            .required('Username is required')
            .min(8),
        post_code: Yup.string()
            .required('Post code is required'),
        
    });
    // const store = useStore()
    const isEmployer = ref(false)
    const isDuplicate = ref(false)
    const radioSelect = ref(radioOpt[0])
    const fields = reactive({
        forename: '',
        surname: '',
        company: '',
        email: '',
        password:'',
        confirm_password:'',
        username:'',
        post_code:''
    })

    const handleGroupSelect = () => {
      if(radioSelect.value.code === 3) isEmployer.value = true
      else isEmployer.value = false
    }

    const handleSubmission = () => {
      APIdoCheckUserName({action:'check',username:fields.username}).then((res) => {
            if(res.data.success){
                context.emit('collectFields', {
                  ...fields, 
                  usergroup: radioSelect.value.code
                }) 
            }
            else{
              isDuplicate.value=true;
            }
            
        });
    }
  
    return {
      schema,
      schema1,
      radioOpt,
      radioSelect,
      fields,
      isEmployer,
      isDuplicate,
      handleSubmission,
      handleGroupSelect,
    }
  }
}
</script>
