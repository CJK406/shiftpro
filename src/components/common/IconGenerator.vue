<script>
import { h } from 'vue'
import { 
  CameraIcon, 
  CreditCardIcon, 
  CheckIcon , 
  ExclamationCircleIcon, 
  CogIcon, 
  IdentificationIcon,
  ClipboardCheckIcon,
  AnnotationIcon, 
  ArrowDownIcon, 
  NewspaperIcon,
  HomeIcon ,
  StarIcon,
  PlusIcon,
  SearchIcon,
  ChatAlt2Icon ,
  UserGroupIcon,
FolderOpenIcon ,
OfficeBuildingIcon,
PencilAltIcon,
UserIcon,
TicketIcon,
InformationCircleIcon,
EmojiSadIcon,
ChartBarIcon,
ShieldCheckIcon
} from '@heroicons/vue/outline'

import { 
XIcon,
  LightBulbIcon,
} from '@heroicons/vue/solid'

const ICON_MAP = {
  CameraIcon,
  CreditCardIcon,
  ExclamationCircleIcon,
  CogIcon,
  CheckIcon,
  IdentificationIcon,
  ClipboardCheckIcon,
  AnnotationIcon, 
  FolderOpenIcon,
  ArrowDownIcon, 
  NewspaperIcon,
  ChartBarIcon,
  HomeIcon,
  StarIcon,
  PlusIcon,
  SearchIcon,
  ChatAlt2Icon,
  UserGroupIcon,
  LightBulbIcon,
  OfficeBuildingIcon,
  PencilAltIcon,
  UserIcon ,
  TicketIcon,
  InformationCircleIcon,
  EmojiSadIcon,
  XIcon,
  ShieldCheckIcon
} 

export default {
  props: {
    iconName: String,
    iconClasses: String
  },
  setup(props) {
    return () => props.iconName ? h(ICON_MAP[props.iconName] , {class: props.iconClasses}) : h(CameraIcon)
  }
}
</script>