<!--
 * @Author: your name
 * @Date: 2021-09-01 18:16:47
 * @LastEditTime: 2021-09-01 18:47:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\tools\html2pdf\index.vue
-->
<template>
    <div>
        <div class="html-pdf" ref="ware">
            <img class="img" :src="img01" alt="img">
        </div>
        <button @click="toPdf">生成pdf</button>
    </div>
</template>

<script>
import { htmlToPdfSave } from '@/libs/html2Pdf.js'
const moment = require('moment')
const img01 = require('./imgs/01.jpg')
export default {
    name: 'html-pdf',
    props: {},
    components: {},
    data() {
        return {
            img01: img01
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        toPdf() {
            htmlToPdfSave(this.$refs.ware, moment(new Date()).format('yyyyMMDDHHmmss'))
        }
    },
    updated() { },
    beforeDestroy() { },
    beforeRouteLeave(to, from, next) {
        next()
    }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
