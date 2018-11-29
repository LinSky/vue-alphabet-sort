<template>
    <div class="demo">
        <alphabet-sort-list
            :list="dataList">
        </alphabet-sort-list>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dataList: [
                {
                    value: 10001,
                    label: '成都'
                },
                {
                    value: 10002,
                    label: '北京'
                },
                {
                    value: 10003,
                    label: '上海'
                },
                {
                    value: 10003,
                    label: '广州'
                },
                {
                    value: 10003,
                    label: '杭州'
                },
                {
                    value: 10003,
                    label: '南京'
                },
                {
                    value: 10003,
                    label: '福州'
                },
                {
                    value: 10003,
                    label: '天津'
                },
                {
                    value: 10003,
                    label: '郑州'
                },
                {
                    value: 10003,
                    label: '苏州'
                },
                {
                    value: 10003,
                    label: '无锡'
                },
                {
                    value: 10003,
                    label: '深圳'
                }

            ]
        }
    }
}
</script>

<style lang="less" scoped>
.demo{
    height: 800px;
}
</style>
