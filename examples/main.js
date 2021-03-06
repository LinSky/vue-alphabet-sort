import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import './assets/less/base.less'
import alphabetSortList from './../lib/alphabet-sort-list.umd.js'
//import alphabetSortList from './../packages'
Vue.use(alphabetSortList)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
