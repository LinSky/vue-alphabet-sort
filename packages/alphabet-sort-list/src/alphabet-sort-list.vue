<template lang="html">
    <div class="list-content">
        <div class="none-tip" v-if="isEmpty">{{noneTip}}</div>
        <div class="scroll-wrapper" ref="wrapper" v-if="!isEmpty">
            <ul class="content">
                <li v-for="(item, index) in options">
                    <div class="key" v-if="item.showKey">{{item.key}}</div>
                    <div class="label">{{item.label}}</div>
                </li>
            </ul>
        </div>
        <div class="alphabets">
            <div class="item" v-for="(item, index) in alphabets">{{item}}</div>
        </div>
    </div>
</template>

<script>
import pinyin from 'pinyin'
import BScroll from 'better-scroll'
function compareBykey (key) {
    return function (a, b) {
        const aVal = a[key]
        const bVal = b[key]
        if (aVal > bVal) {
            return 1
        } else if (aVal < bVal) {
            return -1
        } else {
            return 0
        }
    }
}
export default {
    name: 'alphabetSortList',
    props: {
        noneTip: {
            type: String,
            default: '-- 列表为空 --'
        },
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        labelKey: {
            type: String,
            default: 'label'
        },
        valueKey: {
            type: String,
            default: 'value'
        }
    },
    data () {
        return {
            scroll: null
        }
    },
    computed: {
        //列表是否空
        isEmpty: function () {
            return !this.list.length
        },

        //拼音首字母
        alphabets: function () {
            let vm = this,
                alphabets = []

            vm.list.forEach(item => {
                alphabets.push(pinyin(item[vm.labelKey], {heteronym: true, style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toUpperCase())
            })   

            return [...new Set(alphabets)].sort()
        },

        //
        options: function () {
            let vm = this,
                options = [],
                prevKey = ''

            vm.list.forEach(item => {
                let key = pinyin(item[vm.labelKey], {heteronym: true, style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toUpperCase()

                options.push({
                    key: key,
                    value: item[vm.valueKey],
                    label: item[vm.labelKey]
                })
            })

            options.sort(compareBykey('key'))

            for (let i = options.length - 1; i >= 1; i--) {
                if (options[i].key === options[i - 1].key) {
                    options[i].showKey = false
                } else {
                    options[i].showKey = true
                }
            }

            return options
        }

    },
    methods: {},
    mounted () {
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {click: true})
        })
    }
}
</script>

<style lang="less" scoped>
.none-tip{
    font-size: 28px;
    text-align: center;
    line-height: 96px;
    color: #CCC;
}
.list-content{
    height: 100%;
    position: relative;
    .scroll-wrapper{
        height: 100%;
        overflow: hidden;
    }
    ul{
        li{
            border-bottom:#DFDFDF solid 1px;
            .key{
                background-color: #EEE;
                line-height: 48px;
                padding: 0 20px;
                font-size: 26px;
            }
            .label{
                padding: 0 20px;
                line-height: 96px;
                font-size: 30px;
            }
        }
    }
    .alphabets{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        padding: 20px 0;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, .6);
        .item{
            color: #FFF;
            text-align: center;
            font-size: 26px;
        }
    }
}
</style>
  
