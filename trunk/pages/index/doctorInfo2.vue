<template>
    <view class="content">
        <view class="login-box" style="display: flex;">
            <view class="headerBox">
                <image :src="doctor.pic" mode=""></image>
            </view>
			<view>
				<view style="color: #2A3441;font-size: 38upx;">
				    {{doctor.name?doctor.name:''}} 
				</view>
				<view class="headerText">
				    <text style="color: #2A3441;">学科：</text> {{doctor.rank?doctor.rank:''}}
				</view>
				<view class="headerText">
				    <text style="color: #2A3441;">职称：</text> {{doctor.title?doctor.title:''}} 
				    <!-- |  {{doctor.rank?doctor.rank:''}} -->
				</view>
				<!-- <view class="btnBox">
				    <view class="gkfxbtn" @click="imageInterrogation">图文问诊</view>
				    <view class="gkfxbtn" @click="videoInterrogation">视频问诊</view>
				</view> -->
			</view>
            
        </view>    
        <view class="boxTop" >
            <view class="titleBox">
                擅长
            </view>
            <view style="margin: 44upx 32upx 6upx 32upx;">
                {{doctor.speciality?doctor.speciality:''}} 
            </view>
            <view style="height: 50upx;width: 100%;"></view>
        <!-- </view>
        <view class="boxTop" > -->
            <view class="titleBox">
                简介
            </view>
            <view style="margin: 44upx 32upx 6upx 32upx;">
                {{doctor.remark?doctor.remark:''}} 
            </view>
            <view style="height: 50upx;width: 100%;"></view>
        <!-- </view>
        <view class="boxTop" > -->
            <view class="titleBox">
                资质
            </view>
            <view style="margin: 44upx 32upx 6upx 32upx;">
                <uni-swiper-dot :info="doctor.credentials" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
                	<swiper class="swiper-box" @change="change">
                		<swiper-item v-for="(item, index) in doctor.credentials" :key="index">
                			<view  class="swiper-item">
                				<image class="image" :src="item.url" mode="aspectFill" />
                			</view>
                		</swiper-item>
                	</swiper>
                </uni-swiper-dot>
            </view>
            <view style="height: 50upx;width: 100%;"></view>
        </view>
    </view>
    
</template>

<script>
    import api from '../../common/api.js';
    
    export default {
    	data() {
    		return {
                current: 0,
                currentMenu: 0,
                mode: 'dot',
                dotsStyles: {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    selectedBackgroundColor: '#03BE90',
                    border: '1px rgba(83, 200, 249,0.0) solid',
                    selectedBorder: '1px rgba(83, 200, 249,0.0) solid'
                },
                doctor:{
					credentials:[]
				},
				communityId:'',
				doctorid:'',
				doctorTeamList: [],
				total: 1,
				page: 1,
				size: 10,
            }
        },
        onLoad(options) {
            this.communityId = this.$store.getters.communityId
			this.doctorid = options.doctorid;
            api.findExpertById({
                data:{
                    id:this.doctorid
                }
            }).then(res=>{
               console.log(res) 
               if(res.status=='OK'){
                   this.doctor = res.data
                   if(this.doctor.pics && JSON.parse(this.doctor.pics).length>0){
                       this.doctor.pic = JSON.parse(this.doctor.pics)[0].url
                   }
                   if(this.doctor.credentials && JSON.parse(this.doctor.credentials).length>0){
                       this.doctor.credentials = JSON.parse(this.doctor.credentials)
                   }
                   
               }
            })
        },
        methods:{
            clickMenu:function(tag){
                this.currentMenu = tag
            },
			
            change(e) {
            	this.current = e.detail.current
            },
        }
    }
</script>

<style>
    page{
        background: #EFF1F6;
    }
    .content{
        text-align: center;
        font-size:29upx;
        color: #434E5E;
		margin:32rpx;
		padding:32rpx;
		background:#fff;
		box-shadow: 0px 4rpx 21rpx 0px rgba(85,112,105,0.1);
		border-radius: 21rpx;
    }
    .logo {
    	height: 488upx;
    	width: 100%;
        position: absolute;
        left: 0upx;
        top: -110upx;
        z-index: -99;
    }
    .menuBox{
        margin: 150upx 40upx 0upx 50upx;
        
    }
    .menuText{
        width: 250upx;
        text-align: left;
        height: 60rpx;
        padding-left: 10rpx;
    }
    .menuLine{
         width: 128upx;height: 100%;border-radius: 3upx;background: #03BE90;
    }
    .boxTop{
        font-size: 30upx;
        color: #868E9D;
        text-align: left;
    }
    .titleBox{
        padding-top: 32upx ;
        margin: 0upx 32upx;
        height: 78upx;
        border-bottom: 2upx dashed #C6CAD4;
        color: #16202E;
        font-size: 38upx;
    }
    .btnBox{
        display: flex;
        flex-direction: row;
        margin: 40upx 123upx 90upx 123upx;
        justify-content: space-between;
        
    }
    .headerText{
        color: #A2A9BA;
        line-height:1.5;
    }
    .gkfxbtn{
        width:197upx;
        height:67upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
        border-radius:33upx;
        line-height: 67upx;
        text-align: center;
        color: #FFFFFF;
    }
    .login-box{
        /* margin-top: -310upx; */
        position: relative;
    }
    .headerBox{
        width: 168upx;
        height: 168upx;
        background: #FFFFFF;
        border-radius: 50%;
        
    }
    .headerBox image{
        margin: 8upx;
        width: 152upx;
        height: 152upx;
        border-radius: 50%;
        background: #F8F8F8;
    }
    .doctorBox{
        padding-top: 40upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin:0upx 30upx;
        font-size:23upx;
        font-weight:400;
        color: #868E9D;
    }
    .doctorBox image{
        width: 133upx;
        height: 133upx;
        background: #F8F8F8;
        border-radius: 50%;
        margin-right: 20upx;
    }
</style>
