import alphabetSortList from './src/alphabet-sort-list.vue'

alphabetSortList.install = function (Vue) {
    Vue.component(alphabetSortList.name, alphabetSortList)
}

//导出
export default alphabetSortList