<template lang="html">
    <div class="list-content">
        <div class="scroll-wrapper" ref="wrapper" v-if="!isEmpty">
            <div class="content">
                <ul class="groups" ref="groups">
                    <li v-for="(group, index) in list" ref="listGroup">
                        <h2>{{group.name}}</h2>
                        <ul class="list">
                            <li class="list-item" v-for="(item, idx) in group.list" @click="clicItemkHandle(item)">{{item[labelKey]}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="alphabets" 
            ref="alphabets"
            @click.stop="clicKeykHandle"
            @touchstart.stop="touchstartHandle"
            @touchmove.stop="touchmoveHandle"
            @touchend.stop="touchendHandle">
            <div class="item" v-for="(item, index) in alphabets" :style="index === activeKeyIndex && keyTextColor">{{item}}</div>
        </div>
        <div class="active-key" v-if="showActiveKey" :style="keyBgColorStyle">{{activeKey}}</div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'alphabetSortList',
    props: {
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
        },
        activeColor: {
            type: String,
            default: '#DD3629'
        }
    },
    data () {
        return {
            scroll: null,
            moveY: 0,
            showActiveKey: false,
            activeKeyIndex: 0,
            itemH: 0,
            alphabetH: 0,
            groupHeights: []
        }
    },
    watch: {

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

            return vm.list.map((item) => {
                return item.name.substr(0, 1)
            })
        },
        //当前字母
        activeKey: function () {
            return this.alphabets[this.activeKeyIndex]
        },
        //提示字母背景颜色
        keyBgColorStyle: function () {
            return {
                'background-color': this.activeColor
            }
        },
        keyTextColor: function () {
            return {
                'color': this.activeColor
            }
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
             vm.scroll.scrollToElement(vm.$refs.groups.getElementsByTagName('h2')[vm.activeKeyIndex])
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
            vm.scroll.scrollToElement(vm.$refs.groups.getElementsByTagName('h2')[vm.activeKeyIndex])
            
        },

        /**
         * alphabets touchend事件处理函数
         */
        touchendHandle (e) {
            let vm = this
            vm.showActiveKey = false
            vm.activeKeyIndex = vm.getActiveAlphabetIndex(vm.moveY)
            vm.scroll.scrollToElement(vm.$refs.groups.getElementsByTagName('h2')[vm.activeKeyIndex])
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
        },

        /**
         * 点击列表时间处理函数
         */
        clicItemkHandle (itemObj) {
            let obj = Object.assign({}, itemObj)
            this.$emit('itemClick', obj)
        }

    },
    mounted () {
        this.$nextTick(() => {
            let vm = this
            vm.scroll = new BScroll(
                this.$refs.wrapper,
                {
                    click: true,
                    probeType: 3
                }
            )

            /**
             * 
             */
            const list = vm.$refs.listGroup
            if (!list) return
            let h = 0
            for (let i = 0; i < list.length; i++) {
                h += list[i].clientHeight
                vm.groupHeights.push(h)
            }

            vm.scroll.on('scroll', (pos) => {
                const y = pos.y
                
                //y大于0
                if (y > 0) {
                    vm.activeKeyIndex = 0
                    return
                }
                
                for (let i = 0; i < vm.groupHeights.length; i++) {
                    let h1 = vm.groupHeights[i]
                    let h2 = vm.groupHeights[i + 1]

                    if (-y >= h1 && -y < h2) {                        
                        vm.activeKeyIndex = i+1
                        return
                    }
                }

            })
            
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
    overflow: hidden;
    .scroll-wrapper{
        height: 100%;
        overflow: hidden;
    }
    ul.groups{
        h2{
            padding: 0 20px;
            line-height: 48px;
            background-color: #EEE;
        }
    }
    ul.list{
        li.list-item{
            padding: 0 20px;
            border-bottom:#EEE solid 1px;
            line-height: 96px;
            font-size: 30px;
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
            &.active{
                color: rgba(10, 224, 207, 1);
            }
        }
    }
    .active-key{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 96px;
        border-radius: 50%;
        line-height: 96px;
        text-align: center;
        font-size: 36px;
        color: #FFF;
    }
}
</style>
  
