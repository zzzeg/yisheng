<template>
    <view class="content">
        <view class="topBox">
            <image :src="kkPackage.icon" mode="aspectFill"></image>
            <view style="flex: 1; margin-right: 30upx;">
                <view class="title">{{kkPackage.packageName ? kkPackage.packageName : ''}}</view>
                <view class="desc">{{kkPackage.packageType ? kkPackage.packageType : ''}}</view>
                <view class="price">￥{{kkPackage.sealPrice ? kkPackage.sealPrice : ''}}</view>
            </view>
        </view>
        <view class="infoBox">
            <view v-if="reserveStatus == 'DOING' || reserveStatus == 'FAIL' || isUpdate" style="height: 82upx;line-height: 82upx;padding-left: 32upx; color: #D0021B; font-size: 25upx;background: #F9FAFB;">
                {{reserveStatus == 'FAIL' ? '由于您提交的预约时间名额已满，需另选合适的体检时间' : reserveStatus == 'DOING' ? '预约结果会以短信发送到您的手机或在明我公众号消息中查看。' : '已预约成功，如需修改预约时间，请至少提前两天修改。'}}
            </view>
            <view class="item">
                <view class="infoTitle" >体检医院</view>
                <view class="activate" :class="{greyColor:reserveStatus != 'null'}" >{{kkHospName}}</view>
            </view>
            <view class="line"></view>
            <view class="item" @click="clickTime">
                <view class="infoTitle">体检时间</view>
                <view class="activate" :class="{greyColor:((reserveStatus == 'SUCCESS' && !isUpdate) || (reserveStatus == 'DOING' ))}" style="flex: 1;">{{makeTime}}</view>
                <image v-if="isUpdate || reserveStatus == 'FAIL' || reserveStatus == 'null'" style="width: 46upx; height: 42upx; margin:0 32upx;" src="../../static/image/riliriqi@2x.png" mode=""></image>
            </view>
            <view class="line"></view>
            <view class="item">
                <view class="infoTitle">体检人</view>
                <input type="text" v-model="name" class="activate" :disabled="reserveStatus != 'null'" :class="{greyColor:reserveStatus != 'null'}" placeholder-class="greyColor" placeholder="请输入体检人姓名" />
            </view>
            <view class="line"></view>
            <view v-if="showSex" class="item">
                <view class="infoTitle">性别</view>
                <image @click="clickSex(1)" :class="{greyImage:reserveStatus != 'null'}" style="width: 40upx; height: 40upx;" :src="[sex==1 ? '../../static/image/icon_select.png' : '../../static/image/icon_noselect.png']" mode=""></image>
                <view @click="clickSex(1)" :class="{greyColor:reserveStatus != 'null'}" class="activate" style="width: 120upx;text-align: center;">男</view>
                <image @click="clickSex(2)" :class="{greyImage:reserveStatus != 'null'}" style="width: 40upx; height: 40upx;" :src="[sex==2 ? '../../static/image/icon_select.png' : '../../static/image/icon_noselect.png']" mode=""></image>
                <view @click="clickSex(2)" class="activate" :class="{greyColor:reserveStatus != 'null'}" style="width: 120upx;text-align: center;">女</view>
            </view>
            <view v-if="showSex" class="line"></view>
            <view class="item">
                <view class="infoTitle">婚姻状态</view>
                <image @click="clickMarried(1)" :class="{greyImage:reserveStatus != 'null'}" style="width: 40upx; height: 40upx;" :src="[married==1 ? '../../static/image/icon_select.png' : '../../static/image/icon_noselect.png']" mode=""></image>
                <view @click="clickMarried(1)" :class="{greyColor:reserveStatus != 'null'}" class="activate" style="width: 120upx;text-align: center;">未婚</view>
                <image @click="clickMarried(0)" :class="{greyImage:reserveStatus != 'null'}" style="width: 40upx; height: 40upx;" :src="[married==0 ? '../../static/image/icon_select.png' : '../../static/image/icon_noselect.png']" mode=""></image>
                <view @click="clickMarried(0)" class="activate" :class="{greyColor:reserveStatus != 'null'}" style="width: 120upx;text-align: center;">已婚</view>
            </view>
            <view class="line"></view>
            <view class="item" @click="clickType">
                <view class="infoTitle">证件类型</view>
                <view :class="{greyColor:reserveStatus != 'null'}" class="activate" style="flex: 1;">{{certificateTypes[cardType]}}</view>
                <image v-if="reserveStatus == 'null'" style="width: 26upx; height: 22upx; margin:0 50upx;" src="../../static/image/icon_xxzk@2x.png" mode=""></image>
            </view>
            <view class="line"></view>
            <view class="item">
                <view class="infoTitle">证件号码</view>
                <input v-model="cardNumber" type="text" value="" :disabled="reserveStatus != 'null'" :class="{greyColor:reserveStatus != 'null'}" class="activate" placeholder-class="greyColor" placeholder="请输入您的证件号码" />
            </view>
            <view class="line"></view>
            <view class="item">
                <view class="infoTitle">手机号码</view>
                <input v-model="contactTel" type="text" value="" :disabled="reserveStatus != 'null'" :class="{greyColor:reserveStatus != 'null'}" class="activate" placeholder-class="greyColor" placeholder="请输入手机号码" />
            </view>
        </view>

        <button v-if="isUpdate || reserveStatus == 'FAIL' || reserveStatus == 'null'" @click="clickSubmit" class="login-btn" >提交</button>
        
        <view v-if="mask!=0" class="cpt-mask"></view>
        <view v-if="mask!=0" class="calendarBox" :style="{height: boxHeight,top:topHeight}">
            <template v-if="mask==1">
                <view style="margin: 35upx 0upx; display: flex;flex-direction: row;flex: 1; align-items: center;justify-content: center;padding-left: 100upx; font-size:35upx;" >
                    <view style="flex: 1;text-align: center;">查看体检日期</view>
                    <image @click="clickClose" style="opacity: 0.4;width: 33upx; height: 33upx;margin-right: 33upx;" src="../../static/image/icon_md_gb@2x.png" mode=""></image>
                </view>
                <view class="line"></view>
                <v-calendar name="calendar" :showText="showText" :defaultTime="time" :extraData="extraData"  @calendarTap="calendarTap" />
                                
            </template>
            <template v-if="mask==2">
                <view style="font-size:35upx;color: #2A3441; display: flex;flex-direction: row;justify-content: space-between; height: 96upx;">
                    <view @click="clickClose" style="width: 120upx;line-height: 96upx;text-align: center;">取消</view>
                    <view @click="clickSelectType" style="width: 120upx;color: #03BE90;line-height: 96upx;text-align: center;">确认</view>
                </view>
                <view class="line"></view>
                <picker-view :indicator-style="indicatorStyle" :value="certificateTypes[cardType]" @change="bindChange">
                    <picker-view-column>
                        <view style="color: #4A4A4A;line-height: 100rpx;text-align: center;" v-for="(item,index) in certificateTypes" :key="index">{{item}}</view>
                    </picker-view-column>
                </picker-view>
            </template>
        </view>
    </view>
</template>

<script>
    import calendar from '../../components/tale-calendar/tale-calendar.vue';
    import util from '../../common/util.js'
    export default {
        components: {
            'v-calendar': calendar
        },
    	data() {
    		return {
                boxHeight:0,
                topHeight:0,
                mask:0,
                
                visible: true,
                indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
                certificateTypes:['身份证','港澳通行证/护照'],
                showText:'#2A3441',
                time: {year: 2020, month: 5},
                extraData: [
                    
                ],
                hospId:null,
                reserveStatus:null,
                procudtId:null,
                orderId:null,
                kkPackage:'',
                kkHospName:'',
                
                makeTime:'请选择体检时间',
                name:null,
                cardNumber:null,
                cardType:0,
                contactTel:null,
                married:1,
                sex:null,
                tempType:0,
                reserveFormId:null,
                kkReserveId:null,
                
                isUpdate:false,
                showSex:false,
                
                backType:0
            }
        },
        onLoad(options) {
            this.hospId = options.hospId
            this.reserveStatus = options.reserveStatus
            
            this.orderId = options.orderId
            this.procudtId = options.procudtId
            this.reserveFormId = options.reserveFormId
            
            if(options.backType == 1){
                this.backType = 1
            }
            if(options.reserveFormId && options.reserveFormId != 'null'){
                this.getKKReserve()
            }else{
                this.getKKHosp()
                this.getKKPackage()
                this.getHospitalDateService()
            }
        },
        methods:{
            clickSex:function(tag){
                this.sex = tag
            },
            clickSubmit:function(){
                if(this.makeTime == '请选择体检时间'){
                    uni.showToast({
                        title: '请选择体检时间',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }
                if(this.reserveStatus == 'FAIL' || this.isUpdate){
                    if(this.kkReserveId==null){
                        return
                    }
                    
                    this.$api.updateKKReserve({
                        data:{
                            id:this.kkReserveId,
                            checkupTime:this.makeTime
                        },
                        showHud:true
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            this.getKKReserve()
                        }
                    })
                }else{
                    if(this.name == null){
                        uni.showToast({
                            title: '请输入体检人姓名',
                            icon: 'none',
                            duration: 2000
                        })
                        return
                    }
                    if(this.cardNumber == null){
                        uni.showToast({
                            title: '请输入证件号码',
                            icon: 'none',
                            duration: 2000
                        })
                        return
                    }
                    if(this.sex == null){
                        uni.showToast({
                            title: '请输入性别',
                            icon: 'none',
                            duration: 2000
                        })
                        return
                    }
                    if(!util.checkIDCard(this.cardNumber) && this.cardType == 0){
                        uni.showToast({
                            title: '请输入正确的证件号码',
                            icon: 'none',
                            duration: 2000
                        })
                        return
                    }
                    if(this.contactTel == null){
                        uni.showToast({
                            title: '请输入手机号码',
                            icon: 'none',
                            duration: 2000
                        })
                        return
                    }
                    if(!util.verifyMobile(this.contactTel)){
                        uni.showToast({
                            title: '请输入正确的手机号码',
                            icon: 'none',
                            duration: 2000
                        })
                        return
                    }
                    this.$api.addKKReserve({
                        data:{
                            cardNumber:this.cardNumber,
                            cardType:this.cardType+1,
                            checkupTime:this.makeTime,
                            contactTel:this.contactTel,
                            hospId:this.hospId,
                            married:this.married,
                            name:this.name,
                            orderId:this.orderId,
                            packageCode:this.procudtId,
                            sex:this.sex
                        }
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            this.reserveFormId = res.data.id
                            this.getKKReserve()
                            // this.disposeKKReserveData(res.data)
                        }
                    })
                }
            },
            disposeKKReserveData:function(data){
                this.name = data.name
                this.sex = data.sex
                this.married = Number(data.married) 
                this.contactTel = data.contactTel
                this.cardNumber = data.cardNumber
                this.cardType = data.cardType
                this.kkReserveId = data.id
                this.reserveStatus = data.status
                if(data.status == 'WAIT'){
                    this.reserveStatus = 'null'
                }
                // this.reserveStatus = 'null'
                var time = util.formatTimestamp(data.checkupTime, 'yyyy-MM-dd')
       
                time = time.replace(/-/g,"")
                var date=new Date;
                var y = date.getFullYear()
                var m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                var d = date.getDate()
                d = d < 10 ? ('0' + d) : d
                var dayNum = Number(y+m+d)
                
                if(this.reserveStatus == 'SUCCESS' || this.reserveStatus == "DOING"){
                    this.makeTime = time
                    console.log(Number(time) - Number(dayNum))
                    if(Number(time) - dayNum > 2 && this.reserveStatus == 'SUCCESS'){
                        this.isUpdate = true
                    }
                }
                
            },
            getKKReserve:function(){
                this.$api.findByIdkkReserve({
                    data:{
                        id:this.reserveFormId
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status == 'OK'){
                        this.getKKHosp()
                        this.getKKPackage()
                        this.getHospitalDateService()
                        this.disposeKKReserveData(res.data)
                    }
                })
            },
            getKKHosp:function(){
                this.$api.findByIdKKHospital({
                    data:{
                        hospId:this.hospId
                    }
                }).then(res=>{
                    
                    if(res.status == 'OK'){
                        this.kkHospName = res.data.hospName
                    }
                })
            },
            getHospitalDateService:function(){
                this.$api.getHospitalDateService({
                    data:{
                        hospId:this.hospId,
                        packageCode:this.procudtId
                    }
                }).then(res=>{
               
                    if(res.status == 'OK'){
                        res.data.forEach(item => {
                            console.log(Number(item.maxNum) - Number(item.usedNum))
                            if(Number(item.maxNum) - Number(item.usedNum)>0){
                                var value = {date: item.date, value: '可约', dot: true, active: true,textColor:'#03BE90'}
                                this.extraData.push(value)
                            }
                        })
                        
                    }
                })
            },
            getKKPackage:function(){
                this.$api.findByKKPackage({
                    data:{
                        code:this.procudtId
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status == 'OK'){
                        this.kkPackage = res.data
                        if(res.data.snapshot && JSON.parse(res.data.snapshot)){
                            this.kkPackage.icon = JSON.parse(res.data.snapshot).packageImage_0_thumb
                            this.kkPackage.sealPrice = JSON.parse(res.data.snapshot).sealPrice
                            this.kkPackage.packageSex = JSON.parse(res.data.snapshot).packageSex
                            if(this.kkPackage.packageSex!=0){
                                this.sex = this.kkPackage.packageSex
                            }else{
                                this.showSex = true
                            }
                        }
                    }
                })
            },
            bindChange:function (e) {
                const val = e.detail.value
                this.tempType = val[0]
                console.log(this.tempType)
            },
            clickSelectType:function(){
                this.cardType = this.tempType
                this.mask = 0
                console.log(this.cardType)
            },
            calendarTap:function(e){
                console.log(e)
                this.makeTime = e.year + '-' + ( Number(e.month)  + 1) + '-' + e.day 
                this.mask = 0
            },
            clickMarried:function(tag){
                if(this.reserveStatus == 'null') {
                    this.married = tag
                }
            },
            clickType:function(){
                if(this.reserveStatus == 'SUCCESS' || this.reserveStatus == 'DOING'){
                    return
                }
                this.boxHeight = '30%'
                this.topHeight = '70%'
                this.mask = 2
            },
            clickTime:function(){
                if(this.isUpdate || this.reserveStatus == 'FAIL' || this.reserveStatus == 'null'){
                    this.boxHeight = '75%'
                    this.topHeight = '25%'
                    this.mask = 1
                }
            },
            clickClose:function(){
                this.mask = 0
            }
        }
    }
</script>

<style>
    page{
        background: #EFF1F6;
    }
    picker-view {
        width: 100%;
        height: calc(100% - 120upx);
        margin-top:20rpx;
    }
    .topBox{
        margin: 30upx 0upx 20upx 0upx;
        height: 244upx;
        width: 100%;
        display: flex;
        flex-direction: row;
        background: #FFFFFF;
        align-items: center;
    }
    .topBox image{
        width: 142upx;
        height: 142upx;
        margin: 50upx 20upx 50upx 30upx;
        background: #C0C0C0;
        border-radius: 15upx;
    }
    .topBox .title{
        color: #434E5E;
        font-size:29upx;
    }
    .topBox .desc{
        color: #A2A9BA;
        font-size:25upx;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    .topBox .price{
        color: #16202E;
        font-size:29upx;
    }
    .infoBox{
        font-size:31upx;
        background: #FFFFFF;
    }
    .infoBox .item{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 108upx;
    }
    .activate{
        color: #16202E;
    }
    .line{
        background: #EAEDF4;
        height: 2upx;
        width: 100%;
    }
    .greyColor{
        color: #C6CAD4;
    }
    .greyImage{
        opacity: 0.4;
    }
    .infoTitle{
        width: 160upx;
        text-align: left;
        padding-left: 32upx;
    }
    .login-btn {
        margin: 146upx 125upx 100upx 125upx;
        height: 88upx;
        line-height: 88upx;
        border-radius: 44upx;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
    .calendarBox{
        background: #FFFFFF;
        opacity: 1;
        position:fixed;
        top: 25%;
        width: 100%;
        z-index: 100;  
        border-radius: 30upx 30upx 0upx 0upx;
        color: #6D7480;
        font-size: 30upx;
    }
</style>
