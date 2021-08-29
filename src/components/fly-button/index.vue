<template>
    <div class="fly-button" ref="FlyButton">
        <div v-if="mainObj.delState == 1 || mainObj.seasFlag == 1"></div>
        <div class="switch" :class="isOpen ? 'transition_all':''" v-else @click="plusClick()" :title="title">
            <IconColor iconName="baseball"></IconColor>
        </div>
        <div class="Open" :class="isOpen ? 'action':''">
            <div class="list comment" @click="plusClick(moduleCode,'otComment')">
                <span class="iconBox transition_all">
                    <IconColor iconName="hamburger"></IconColor>
                </span>
                <span class="text">汉堡</span>
            </div>
            <div class="list remind" @click="plusClick(moduleCode,'otReminder')">
                <span class="iconBox transition_all">
                    <IconColor iconName="sausage"></IconColor>
                </span>
                <span class="text">香肠</span>
            </div>
            <div class="list contacts" @click="plusClick('BF003','otNew')">
                <span class="iconBox transition_all">
                    <IconColor iconName="doughnut"></IconColor>
                </span>
                <span class="text">甜甜圈</span>
            </div>
            <div class="list receiver" @click="plusClick()">
                <span class="iconBox transition_all">
                    <IconColor iconName="bread"></IconColor>
                </span>
                <span class="text">牛角面包</span>
            </div>
            <div class="list attachment" @click="plusClick()">
                <span class="iconBox transition_all">
                    <IconColor iconName="cookies"></IconColor>
                </span>
                <span class="text">曲奇饼</span>
            </div>
            <div class="list follow-up" @click="plusClick('BF004','otNew')">
                <span class="iconBox transition_all">
                    <IconColor iconName="popsicle"></IconColor>
                </span>
                <span class="text">冰棍</span>
            </div>
        </div>

    </div>
</template>

<script>
/**
 * 漂浮展示按钮
*/
export default {
    name: 'fly-button',
    props: {
        fly: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        moduleCode: {
            type: String,
            default: ''
        },
        pageId: {
            type: String,
            default: ''
        },
        mainObj: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    mounted() {
        // 点击其他隐藏
        document.addEventListener('click', this.handdleClick)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handdleClick)
    },
    methods: {
        handdleClick(e) {
            try {
                if (!this.$refs['FlyButton'].contains(e.target)) {
                    this.isOpen = false
                }
            } catch (e) {
                // console.log("FlyButton" + e)
            }
        },
        plusClick(moduleNum, ot) {
            if (this.fly) {
                this.isOpen = !this.isOpen
            }
            // this.$emit('flyBtnClick', moduleNum, ot)
        },
    }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "./index.less";
</style>
