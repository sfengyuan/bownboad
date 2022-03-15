
import Vue from 'vue'
// import router from './routes.js'
import App from './App.vue'
// import got from 'got'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/Button'
import InputText from 'primevue/InputText'
import InlineMessage from 'primevue/inlinemessage'
import ProgressSpinner from 'primevue/progressspinner'
import BlockUI from 'primevue/blockui'
import Panel from 'primevue/panel'
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import Divider from 'primevue/divider'
// import DataView from 'primevue/dataview'
Vue.config.productionTip = false
Vue.use(PrimeVue, { ripple: true })
Vue.component('Divider', Divider)
Vue.component('InputSwitch', InputSwitch)
Vue.component('Dropdown', Dropdown)
Vue.component('Panel', Panel)
Vue.component('BlockUI', BlockUI)
Vue.component('ProgressSpinner', ProgressSpinner)
Vue.component('TabView', TabView)
Vue.component('TabPanel', TabPanel)
Vue.component('Button', Button)
Vue.component('InputText', InputText)
Vue.component('InlineMessage', InlineMessage)
// Vue.component('DataView', DataView)
// Vue.component('OverlayPanel', OverlayPanel)
// Vue.component('Menubar', Menubar)
// Vue.component('Dialog', Dialog)
// Vue.component('Card', Card)
// Vue.use({
//   install (Vue, options) {
//     Vue.prototype.$ipc = ipcRenderer
//   }
// })

new Vue({
  render: h => h(App)
}).$mount('#app')
