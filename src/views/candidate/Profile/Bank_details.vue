<template>
      <div class="grid lg:grid-cols-4 gap-8">  
          <div class="grid lg:col-span-3">
            <div class="relative mt-2  px-6 xl:px-10 py-4 xl:py-4 bg-white shadow-lg rounded-3xl ">
                <div>
                    <div class="grid lg:grid-cols-1 gap-8">
                        <div class="grid lg:grid-col-1">
                        <div class="grid lg:grid-cols-1 lg:w-full gap-4 lg:pr-8 mb-8">
                                <InputField v-for="field in inputFields1" :key="field.id" :attributes="field" />
                            </div>
                            <div class="grid lg:grid-cols-2 lg:w-full gap-4 lg:pr-8 mb-8">
                                <InputField v-for="field in inputFields2" :key="field.id" :attributes="field" />
                            </div>
                        </div>
                        
                    </div>
                </div> 
                <button class="btn lg:ml-auto m-auto btn-full bg-secondary hover:bg-secondary-light h-10 pb-2 w-40 ml-auto mb-4 biotif-regular">
              Save changes
        </button>
            </div>
          </div>
          <div class="grid lg:grid-span-1">
            <div class="relative mt-2  px-2 py-4 xl:py-4 bg-white shadow-lg rounded-3xl ">
                 <CardWithIcon iconName="LightBulbIcon" iconPosition="center">
                    <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Top tips</h2>
                    <div>
                        <h3 class="font-bold mb-2" style="color: #111827">Bank details</h3>
                        <p class="text-gray-500 mb-5 text-sm">We will use these details to pay your wages weekly.</p>
                        <p class="text-gray-500 text-sm">Do not worry - we will not share this information with anyone.</p>
                    </div>
                </CardWithIcon>
            </div>
          </div>
      </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import InputField from '@common/form-elements/InputField'
import CardWithIcon from '@common/CardWithIcon'

export default {
  components: {
      InputField,
      CardWithIcon
  },
  data: () => ({
    inputFields1 : [
        {
            id: 1, 
            htmlLabel:"Name on card ",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
    ],
    inputFields2 : [
        {
            id: 1, 
            htmlLabel:"Account number",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Sort code",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Billing address line 1",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Billing address line 2",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Town",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
        {
            id: 1, 
            htmlLabel:"Postcode",
            htmlFor:"jobtitle" ,
            htmlId:"jobtitle" ,
            htmlName:"jobtitle",
            inputPlaceholder:""
        },
    ]
  }),
   computed: {
      ...mapGetters({
        user_detail:'authentication/getUserDetails',
      }),
     
    },
    mounted () {
     
    },
     watch: {
    },
    methods: {
      ...mapActions({
        // getShifts: 'candidate/getShifts',
        storeShiftKey :'candidate/storeShiftKey'
       }),
    }
 
}
</script>