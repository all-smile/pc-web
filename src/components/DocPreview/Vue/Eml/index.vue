<template>
    <div v-if="data" class="mailDetail MXscroll" ref="mailDetail">

        <div class="title">
            <span style=" color: #FFBF00;">
                <i v-if="data.stickyFlag!=0" class="iconfont  icon-star"></i>
            </span>
            <span class="text"> {{data.subject}}</span>

            <el-tag class="tag" v-for="(item3,index3) in data.tagObjects" :key="index3" :style="setBgColor(item3.commentFlag)">{{item3.labelName}}</el-tag>
        </div>
        <div class="itemTitle">
            <div class="btnMore text-hover" @click="showDetailItem">{{isMailHead==true?$t('mxpcweb.mail.1528710212147'):$t('mxpcweb.mail.1528710223317')}} </div>
            <div class="timeMore">{{converDate(data.longSentDate)}}</div>
            <div class="name">{{$t('mxpcweb.mail.1528701889317')}}</div>
            <ul class="mailAddress">
                <!-- :class="item2.custName==undefined?'name strange':'name customer'"  -->
                <li class="liclass" v-for="(item2,index2) in data.recipients" :key="index2+'recipients'">
                    <span>{{item2.personal==undefined?substringName(item2.address):item2.personal}},</span>
                </li>
                <li class="liclass" v-for="(item22,index22) in data.cc" :key="index22+'cc'">
                    <span>{{item22.personal==undefined?substringName(item22.address):item22.personal}},</span>
                </li>
            </ul>
        </div>
        <div class="divInfo" v-if="isMailHead">
            <div class="item">

                <!-- 发件人： -->
                <div class="name">{{$t('mxpcweb.mail.1528702110362')}}：</div>
                <ul class="mailAddress">
                    <li :class="items.custId==undefined?'name strange':'name customer'" v-for="(items,index) in data.fromEx" :key="index">
                        <span>{{items.personal==undefined?substringName(items.address):items.personal}} </span>
                        <font>&lt;{{items.address}}&gt;</font>
                        <em>{{items.custId==undefined?'陌':'客'}}</em>
                    </li>
                </ul>
            </div>
            <div class="item">
                <!-- 收件人： -->
                <div class="name">{{$t('mxpcweb.mail.1528702113259')}}：</div>
                <ul class="mailAddress">
                    <li :class="item2.custId==undefined?'name strange':'name customer'" v-for="(item2,index2) in data.recipients" :key="index2">
                        <span>{{item2.personal==undefined?substringName(item2.address):item2.personal}}</span>
                        <font>&lt;{{item2.address}}&gt;</font>
                        <em>{{item2.custId==undefined?'陌':'客'}}</em>
                    </li>

                </ul>
            </div>
            <div class="item" v-if=" data.cc!=undefined&& data.cc.length>0">
                <!-- 抄送： -->
                <div class="name">{{$t('mxpcweb.mail.1528702123800')}}：</div>
                <ul class="mailAddress">
                    <li :class="item22.custId==undefined?'name strange':'name customer'" v-for="(item22,index22) in data.cc" :key="index22">
                        <span>{{item22.personal==undefined?substringName(item22.address):item22.personal}}</span>
                        <font>&lt;{{item22.address}} &gt;</font>
                        <em>{{item22.custId==undefined?'陌':'客'}}</em>
                    </li>
                </ul>
            </div>
            <div class="item" v-if="data.source=='FMD'&&data.type==1">
                <!-- 一对一发送状态： -->
                <div class="name">{{$t('mxpcweb.mail.1528709370013')}}：</div>
                <div class="stateName" :class="data.deliveryStatus!=1?'text-red':''">{{getStatus(data.deliveryStatus)}}
                    <span v-if="!data.realTime&&data.deliveryStatus==-1">&nbsp; &nbsp; &nbsp; {{$t('mxpcweb.mail.1528719497515',{a:data.deliveryTime})}}
                    </span>
                    <span v-if="data.deliveryStatus==-2&&data.singleMailDeliveryStatuses&&data.singleMailDeliveryStatuses.length>0">&nbsp; &nbsp; &nbsp;{{$t('mxpcweb.mail.1528709375920')}}:{{data.singleMailDeliveryStatuses[0].state}}</span>
                    <span class="text-blue text-hover" v-if="data.deliveryStatus !=-2">&nbsp; &nbsp; &nbsp;{{$t('mxpcweb.mail.1528709376530')}}</span>
                    <span class="text-blue text-hover" v-if="data.deliveryStatus !=-2">&nbsp; &nbsp; &nbsp;{{$t('mxpcweb.mail.1528709376782')}}</span>
                    <span class="text-blue text-hover" v-if="data.deliveryStatus !=-2&& data.deliveryStatus!=-3&& data.deliveryStatus!=1
                     ">&nbsp;&nbsp;&nbsp;{{$t('mxpcweb.mail.1528709377044')}}</span>
                    <span class="text-blue text-hover" v-if="!data.realTime&&data.deliveryStatus==-1">
                        &nbsp;&nbsp;&nbsp; {{$t('mxpcweb.mail.1528709377426')}}
                    </span>
                </div>
            </div>
            <div class="item " v-if="data.source=='FMD' &&data.type==0 ">
                <div class="name ">{{$t('mxpcweb.mail.1528709377866')}}：</div>
                <div class="stateName" :class="data.deliveryStatus!=1? 'text-red': '' ">
                    {{getStatus(data.deliveryStatus)}}
                    <span v-if="data.deliveryStatus==-2&&data.singleMailDeliveryStatuses &&data.singleMailDeliveryStatuses.length>0">&nbsp; &nbsp; &nbsp; {{$t('mxpcweb.mail.1528709375920')}}:{{data.singleMailDeliveryStatuses[0].state}}</span>
                    <span v-if="!data.realTime&&data.deliveryStatus==-1 ">&nbsp; &nbsp; &nbsp; {{ $t('mxpcweb.mail.1528719497515',{a:data.deliveryTime}) }}</span>
                    <span class="text-blue text-hover " v-if="data.deliveryStatus !=-2&&data.deliveryStatus!=1&& data.deliveryStatus!=-3 ">&nbsp;&nbsp;&nbsp;{{$t('mxpcweb.mail.1528709377044')}}</span>
                    <span class="text-blue text-hover " v-if="!data.realTime&&data.deliveryStatus==-1">
                        &nbsp;&nbsp;&nbsp;{{$t('mxpcweb.mail.1528709377426')}}
                    </span>
                </div>
            </div>
            <div class="item">
                <div class="name">{{$t('mxpcweb.mail.1528702124306')}}：</div>
                <span v-if="data.sentDate!=undefined&&data.sentDate!='' ">{{data.sentDate.split(' ')[0].toString()}} {{data.sentDate.split(' ')[2].toString()}}</span>
            </div>

        </div>
        <el-table :data="data.singleMailDeliveryStatuses" stripe style="width: 100%; margin-top: 20px;" v-if="data.deliveryStatus !=-2&&data.type==1&&data.singleMailDeliveryStatuses">
            <el-table-column prop="mailAccount" :label="$t('mail.1528702113259')" width="180">
            </el-table-column>
            <el-table-column prop="state" :label="$t('mail.1528709377866')">
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('mail.1528702124306')" width="180 ">
            </el-table-column>
        </el-table>

        <div v-if="data.containAttachment&&data.attachmentList&&data.attachmentList.length>0" class="divAttch">
            <div class="item ">
                <div class="btnMore text-hover" @click="isMailFile = !isMailFile">
                    {{isMailFile==true?$t('mxpcweb.mail.1528710225537'):$t('mxpcweb.mail.1528715979174')}}
                    <!--  <i :class="[isMailFile ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i> -->
                </div>
                <div v-if="data.containAttachment" class="name">
                    <i class="iconfont icon-attachment "></i> {{$t('mxpcweb.mail.1528709296344')}}：
                </div>
                <span v-if="data.containAttachment">{{data.attachmentList.length}} 个</span>&nbsp;
                <span v-if="false&&data.attachmentList.length>0" class="text-blue text-hover" @click="getDownload(data.mId,'all',0)">{{$t('mxpcweb.mail.1528701859716')}}</span>
                <template v-if="isMailFile">
                    <ul class="file">
                        <li v-for="(item10,index10) in data.attachmentList" :key="index10">
                            <div class="ico">
                                <a v-if="isImage(substringSuffix(item10.name))"> <img :src="item10.url"></a>
                                <svg v-else class="iconSVG" aria-hidden="true">
                                    <use :xlink:href="'#file-'+converSuffix(item10.name)"></use>
                                </svg>
                            </div>
                            <div class="title" :title="item10.name">
                                <div>{{item10.name}}</div>
                                <span>{{item10.size}} KB</span>
                            </div>
                            <!-- <div class="view">
                                <span @click.stop="$refs.filePreview.show(data.attachments,index10)">
                                    <i class="iconfont icon-eye"></i>
                                </span>
                                <span @click="LocalDownload(item10.url)">
                                    <i class="iconfont icon-download"></i>
                                </span>
                            </div> -->
                        </li>
                    </ul>
                </template>
            </div>

        </div>

        <template v-for="(item0,index0) in data.timingTaskList">
            <div class="msg" :key="index0" v-if="item0.msgSubType!=3">

                <div class="pull-right">
                    {{messgStatus(item0.status)}}
                </div>
                <i class="iconfont  icon-notice-solid" style="color:#FFB64C"></i>
                <span v-if="item0.msgSubType==1">{{item0.deliveryTime}} 【{{personalInfo.realName}}】 {{item0.body.msgBody}} </span>
                <span v-if="item0.msgSubType==6">{{item0.deliveryTime}} {{$t('mxpcweb.mail.1530102145871',{a:personalInfo.realName,b:item0.deliveryTime,c:item0.body.msgBody})}} </span>
                <span v-if="item0.msgSubType==7">{{item0.deliveryTime}} {{$t('mxpcweb.mail.1530101737559',{a:personalInfo.realName,b:item0.deliveryTime,c:item0.body.msgBody})}} </span>

            </div>
        </template>

        <iframe ref="iframe" :src="`${Global.iframePublicPath}static/mail/content.html`" @load="loadedContent" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="100%"></iframe>

    </div>
</template>
<script>
import { tagsBgColor, getSuffix, isHasSuffix, commentsColor } from '@/libs/utils.js'
export default {
    name: 'Eml',
    props: ['data'],
    data() {
        return {
            isMailHead: false, // 邮件头item是否展开
            isMailFile: false
        }
    },
    methods: {

        converDate(times) {
            if (!times) {
                return ''
            }
            return this.$moment(new Date(parseInt(times))).format('YYYY/MM/DD HH:mm')
        },

        // 点击展开邮件头信息
        showDetailItem() {
            this.isMailHead = !this.isMailHead
            let obj = this.$el.querySelectorAll('.item ul.mailAddress')
            obj.forEach(el => {
                el.style.height = this.isMailHead ? 'auto' : '22px'
            })
        },
        // 背景色
        setBgColor(id) {
            return tagsBgColor(id)
        },
        // 批注色彩
        setCommentsColor(flag) {
            return commentsColor(flag)
        },
        // 名称截取
        substringName(adderss) {
            if (adderss) {
                let str = adderss.split('@')
                return str[0]
            }
        },
        substringSuffix(name = '') {
            let str = name.substr(name.lastIndexOf('.') + 1)
            return str
        },
        isImage(exe) {
            const imgArr = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
            if (exe) {
                return imgArr.includes(exe.toLowerCase())
            }
        },
        getStatus(deliveryStatus) {
            let sata = ''
            if (deliveryStatus == 1) {
                sata = this.$t('mxpcweb.mail.1528782772184')// 发送成功
            } else if (deliveryStatus == 2) {
                sata = this.$t('mxpcweb.mail.1528782788052')// '发送中';
            } else if (deliveryStatus == -2) {
                sata = this.$t('mxpcweb.mail.1528782788353')// '发送失败';
            } else if (deliveryStatus == -1) {
                sata = this.$t('mxpcweb.mail.1528782788708')// '等待发送中';
            } else if (deliveryStatus == 0) {
                sata = this.$t('mxpcweb.mail.1528782789206')// '部分成功';
            } else if (deliveryStatus == -3) {
                sata = this.$t('mxpcweb.mail.1528782808086')// '已撤销发送';
            } else if (deliveryStatus == -4) {
                sata = this.$t('mxpcweb.mail.1528782808822')// '发送超时';
            }
            return sata
        },
        // 文件后缀识别
        converSuffix(name = '') {
            let suffix = getSuffix(name)
            return isHasSuffix(suffix)
        },
        // 文件下载
        getDownload(mId, type, index) {
            let data = {}
            if (type == 'all' || type == 'eml') {
                data = {
                    mId: mId,
                    type: type
                }
            } else {
                data = {
                    mId: mId,
                    type: type,
                    index: index
                }
            }
            this.$http.get(this.Global.baseURL + this.Global.api.Mail.getDownload, { params: data })
                .then(res => {
                    if (res.body.code.toString() == this.Global.RES_OK) {
                        var elemIF = document.createElement('iframe')
                        elemIF.src = res.body.data.downloadUrl
                        elemIF.style.display = 'none'
                        document.body.appendChild(elemIF)
                    } else {
                        this.$message.error(this.msg(res.body))
                    }
                }).catch(res => {
                    this.$message.error(this.Global.errorTitle)
                })
        },
        LocalDownload(rawData) {
            var elemIF = document.createElement('iframe')
            elemIF.src = rawData
            elemIF.style.display = 'none'
            document.body.appendChild(elemIF)
        },
        loadedContent() {
            if (this.data.htmlContent == '' || this.data.htmlContent == undefined) {
                return
            }
            try {
                const vm = this.$refs.iframe.contentWindow.vm
                vm.showContent(this.data.htmlContent, (h) => {
                    this.$refs.iframe.style.height = h + 'px' // 文档高设置到 iframe
                })
            } catch (err) {
                console.log(' vm.showContent(this.content) ')
            }
        }
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "./zh-cn.less";
@import "./en.less";
</style>
