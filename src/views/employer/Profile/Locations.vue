<template>
   <div class="grid lg:grid-cols-4 gap-8">  
        <div class="grid lg:col-span-3">
            <ProfileLocationTable />
        </div>
        <div class="grid lg:grid-span-1">
            <div class="relative mt-2  px-1 py-4 xl:py-4 bg-white shadow-lg rounded-3xl ">
                 <CardWithIcon iconName="LightBulbIcon" iconPosition="center">
                    <h2 class="text-center text-gray-900 text-3xl mb-6 Biotif-bold">Top tips</h2>
                    <div>
                        <h3 class="font-bold mb-2" style="color: #111827">Security</h3>
                        <p class="text-gray-500 mb-5 text-sm">This is some text about changing New e-mail address? Need a new password? No worries. Simply fill out the fields you’d like to change and press save changes.</p>
                        <p class="text-gray-500 text-sm">Note: you will need to provide existing password to save these changes.</p>
                    </div>
                </CardWithIcon>
            </div>
        </div>
   </div>
</template>

<script>
import ProfileLocationTable from '@employer/Profile/LocationTable.vue'
import CardWithIcon from '@common/CardWithIcon'

export default {
  components: {
      ProfileLocationTable,
      CardWithIcon
  },
  data: () => ({

  }),
}
</script>