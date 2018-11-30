<template lang="html">
    <div class="list-content">
        <!-- <div class="none-tip" v-if="isEmpty">{{noneTip}}</div> -->
        <div class="scroll-wrapper" ref="wrapper" v-if="!isEmpty">
            <ul class="content">
                <li v-for="(item, index) in options">
                    <div class="key" v-if="item.showKey">{{item.key}}</div>
                    <div class="label">{{item.label}}</div>
                </li>
            </ul>
        </div>
        <div class="alphabets" 
            ref="alphabets"
            @click.stop="clicKeykHandle"
            @touchstart.stop="touchstartHandle"
            @touchmove.stop="touchmoveHandle"
            @touchend.stop="touchendHandle">
            <div class="item" v-for="(item, index) in alphabets">{{item}}</div>
        </div>
        <div class="active-key" v-if="showActiveKey">{{activeKey}}</div>
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
            scroll: null,
            moveY: 0,
            activeKey: '',
            showActiveKey: false,
            activeKeyIndex: 0,
        }
    },
    watch: {
        activeKeyIndex : {
            handler (newVal) {
                this.activeKey = this.alphabets[newVal]
                this.scroll.scrollToElement(this.$refs.wrapper.getElementsByClassName('key')[newVal])
            },
            deep: true
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

        //列表数据
        options: function () {
            let vm = this,
                options = [],
                prevKey = ''

            vm.list.forEach(item => {
                let key = pinyin(item[vm.labelKey], {heteronym: true, style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toUpperCase()

                options.push({
                    key: key,
                    value: item[vm.valueKey],
                    label: item[vm.labelKey],
                })
            })

            options.sort(compareBykey('key'))

            for (let i = options.length - 1; i >= 1; i--) {
                if (options[i].key === options[i - 1].key) {
                    options[i].showKey = false
                } else {
                    options[i].showKey = true
                }

                if (i == 1) {
                    options[i - 1].showKey = true
                }    
            }

            return options
        }

    },
    methods: {
        /**
         * alphabets click事件处理函数
         */
        clicKeykHandle (e) {
            let vm = this
            let alphabetsDom = vm.$refs.alphabets
            vm.moveY = e.clientY - (alphabetsDom.offsetTop - alphabetsDom.clientHeight/2)
            vm.activeKeyIndex = vm.getActiveAlphabetIndex(vm.moveY)
        },

        /**
         * alphabets touchstart事件处理函数
         */
        touchstartHandle () {
            this.showActiveKey = true
        },

        /**
         * alphabets touchmove事件处理函数
         */
        touchmoveHandle (e) {
            let  vm = this
            let alphabetsDom = vm.$refs.alphabets
            
            vm.moveY = e.touches[0].clientY - (alphabetsDom.offsetTop - alphabetsDom.clientHeight/2)
            
            vm.activeKeyIndex = vm.getActiveAlphabetIndex(vm.moveY)
            
        },

        /**
         * alphabets touchend事件处理函数
         */
        touchendHandle (e) {
            let vm = this
            vm.showActiveKey = false
            vm.activeKeyIndex = vm.getActiveAlphabetIndex(vm.moveY)
            vm.moveY = 0
        },

        /**
         * 根据Y轴滑动的位置求出索引
         */
        getActiveAlphabetIndex (y) {
            
            let vm = this,
                keyItemHeight = parseFloat(vm.$refs.alphabets.getElementsByClassName('item')[0].clientHeight),
                index = 0
            for (let i = 0; i < vm.alphabets.length; i++) {
                let h1 = i * keyItemHeight
                let h2 = (i + 1) * keyItemHeight
                if (i === vm.alphabets.length - 1 || (y >= h1 && y <= h2)) {
                    index = i
                    break
                }
            }    
            return index
        }


    },
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
    //position: relative;
    overflow: hidden;
    .scroll-wrapper{
        height: 100%;
        overflow: hidden;
    }
    ul{
        li{
            border-bottom:#EEE solid 1px;
            &:last-child{
                border-bottom: none;
            }
            .key{
                background-color: #F8F8F8;
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
            line-height: 42px;
        }
    }
    .active-key{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 96px;
        box-shadow: 0 0 15px rgba(10, 224, 207, 0.8);
        border-radius: 50%;
        line-height: 96px;
        text-align: center;
        background-color: rgb(31, 172, 165);
        font-size: 36px;
        color: #FFF;
    }
}
</style>
  
