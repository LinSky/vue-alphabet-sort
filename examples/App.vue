<template>
    <div class="demo">
        <alphabet-sort-list
            :list="data"
            @itemClick="itemClickHandle">
        </alphabet-sort-list>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data:[
                {
                    name: 'B',
                    list: [
                        {
                            label: '北京',
                            value: 10000
                        },
                        {
                            label: '北海',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'C',
                    list: [
                        {
                            label: '成都',
                            value: 10000
                        },
                        {
                            label: '重庆',
                            value: 10000
                        },
                        {
                            label: '长春',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'F',
                    list: [
                        {
                            label: '福州',
                            value: 10000
                        },
                        {
                            label: '佛山',
                            value: 10000
                        },
                        {
                            label: '防城港',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'G',
                    list: [
                        {
                            label: '广州',
                            value: 10000
                        },
                        {
                            label: '广安',
                            value: 10000
                        },
                        {
                            label: '贵阳',
                            value: 10000
                        },
                        {
                            label: '桂林',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'H',
                    list: [
                        {
                            label: '杭州',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'K',
                    list: [
                        {
                            label: '昆明',
                            value: 10000
                        },
                        {
                            label: '开封',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'M',
                    list: [
                        {
                            label: '绵阳',
                            value: 10000
                        },
                        {
                            label: '开封',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'N',
                    list: [
                        {
                            label: '南京',
                            value: 10000
                        },
                        {
                            label: '南充',
                            value: 10000
                        },
                        {
                            label: '南平',
                            value: 10000
                        },
                        {
                            label: '南宁',
                            value: 10000
                        }
                    ]
                },
                {
                    name: 'Z',
                    list: [
                        {
                            label: '郑州',
                            value: 10000
                        },
                        {
                            label: '漳州',
                            value: 10000
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        itemClickHandle (obj) {
            console.log(obj);
        }
    }
}
</script>

<style lang="less">
html, body{
    height: 100%;
}
.demo{
    height: 100%;
}
</style>
