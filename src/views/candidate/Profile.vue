<template>
  <div>
    <h1 class="page-title Biotif-bold">Your Profile</h1>
   <PanelController :navigationList="navigationList" key1='profile'/>
   <router-view> </router-view>
<!--     
    <div class="grid xl:grid-cols-3  gap-6">
      <ProfileActionCard v-for="actionCard in actionCardList" 
                        :key="actionCard.id" 
                        :iconAttrs="actionCard.iconAttrs" 
                        :mainText="actionCard.mainText" 
                        :helperText="actionCard.helperText"
                        :modal="actionCard.modal" />
    </div>
    <ProfileForm /> -->
  </div>

</template>

<script>
// import ProfileForm from '@candidate/forms/ProfileForm'
// import ProfileActionCard from '@candidate/ProfileActionCard'
import PanelController from '@common/PanelController'
const navigationList = [
  { name: 'Your details', routeAlias: 'CandidateProfileAppearence'},
  // { name: 'Your availability', routeAlias: 'CandidateYourAvailabilty' },
  { name: 'Subscription', routeAlias: 'CandidateProfileSubscription' },
  { name: 'Security', routeAlias: 'CandidateProfileSecurity' },
  // { name: 'Bank details', routeAlias: 'CandidateProfileBankDetails' },

]

const iconClassList = 'w-12 sm:w-14 p-3 sm:p-4 text-xl rounded-full bg-emerald text-white'
const actionCardList = [
        {
          id: 1,
          iconAttrs: { 
            iconName: 'CameraIcon', 
            iconClasses:  iconClassList 
          },
          mainText: "Active",
          helperText: "Your subscription",
          modal: {
            title: 'Soem title',
            modalBody: 'SubscriptionForm',
            iconName: 'IdentificationIcon'
          }
        },
        {
          id: 2,
          iconAttrs: { iconName: 'CreditCardIcon',  iconClasses:  iconClassList },
          mainText: "Employment details",
          helperText: "Change your account details",
           modal: {
             title: 'Soem title',
            modalBody: 'EmploymentDetailsForm',
            iconName: 'CogIcon'
          }
        },
        {
          id: 3,
          iconAttrs: {  iconName: 'ExclamationCircleIcon', iconClasses:  iconClassList  },
          mainText: "Settings",
          helperText: "Your Employement details",
          modal: {
            title: 'Soem title',
            modalBody: 'SettingsForm',
            iconName: 'CogIcon'
          }
        }
]

export default {
  components: {
    // ProfileForm,
    // ProfileActionCard,
    PanelController
  }, 
  setup() {


    return {
      actionCardList,
      navigationList
    }
  }
}
</script>