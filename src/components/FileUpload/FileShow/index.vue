<!--
 * @Author: your name
 * @Date: 2021-09-09 18:59:43
 * @LastEditTime: 2021-09-09 19:08:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\components\FileUpload\FileShow\index.vue
-->
<template>
    <span class="icon">
        <!--<i class="iconfile" :class="getSuffix(item.name)"></i>-->
        <img v-if="isPicture(item.name.toLowerCase()) && !noShowSmallPicture" ref="image" :src="getimg(item.url)">
        <svg v-else class="iconSVG" aria-hidden="true">
            <use :xlink:href="getSuffixSVG(item.name)"></use>
        </svg>
    </span>
</template>

<script>
import { getSuffix, isHasSuffix } from '@/libs/utils.js'
export default {
    name: 'FileShow',
    props: {
        item: {
            type: Object,
            default: function () {
                return {}
            }
        },
        noShowSmallPicture: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    mounted() {
    },
    methods: {
        getimg(url, times = 3) {
            return
            let afterUrl = ''
            let reg = new RegExp(/^(HTTP|HTTPS):\/\//i)
            if (!reg.test(url)) {
                afterUrl = this.getGlobalImgSrc(url, '34x34')
            } else if (new RegExp(this.Global.ossFileUrl).test(url)) {
                afterUrl = url + '?x-oss-process=image/resize,m_fixed,h_34,w_34'
            } else {
                afterUrl = url
            }
            times--
            let img = new Image()
            img.src = afterUrl
            img.onload = () => {
                this.$refs.image.src = afterUrl
                img = null
            }
            img.onerror = () => {
                if (times <= 0) { return }
                setTimeout(() => {
                    this.getimg(url, times)
                }, 2 * 1000)
                img = null
            }
        },
        isPicture(name) {
            let picFormat = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
            return picFormat.indexOf(getSuffix(name)) !== -1
        },
        getSuffix(filename) {
            let suffix = getSuffix(filename)
            return 'file-' + isHasSuffix(suffix)
        },
        getSuffixSVG(filename) {
            let suffix = getSuffix(filename)
            return '#file-' + isHasSuffix(suffix)
        }
    }
}
</script>
<style lang="less" scoped>
.icon {
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    position: absolute;
    left: 5px;
    top: 5px;
    .iconfile {
        font-size: 22px;
    }

    .iconSVG {
        width: 100%;
        height: 100%;
    }
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
