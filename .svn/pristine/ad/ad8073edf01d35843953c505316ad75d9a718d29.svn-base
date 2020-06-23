<template>
    <view class="content">
        <image class="logo" src="https://coffer.bainuo.cn/mdt-pub/img_gjzy_bg.png"></image>
        <view class="login-box">
            <view class="boxxxx"></view>
            <view class="headerBox">
                <image :src="doctor.pic" mode=""></image>
            </view>
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
      
        </view> 
        <view class="menuBox">
            <view style="display: flex;flex-direction: row;">
                <view @click='clickMenu(0)' class="menuText" >官家分享</view>
                <view @click='clickMenu(1)' style="text-align: center;" class="menuText" >健康职业证</view>
                <view @click='clickMenu(2)' style=" text-align: right; padding-right: 10rpx;" class="menuText" >官家推荐</view>
            </view>
            <view style="background: #E2E6EF; width: 100%; height: 6upx;border-radius: 3upx;">
                <view v-if="current == 0" class="menuLine"></view>
                <view v-if="current == 1" class="menuLine" style="margin-left: 264upx;"></view>
                <view v-if="current == 2" class="menuLine" style="margin-left: 528upx; padding-right: 10rpx;"></view>
            </view>
        </view>
        <view v-if="currentMenu == 0" class="">
            <view class="product">
            	<view v-if="shareList.length > 0" class="u-f h-wrap">
            		<block v-for="(item,index) in shareList" :key="index">
            			<h-share-list :item="item" @click="goDetail"></h-share-list>
            		</block>
            	</view>
                <view class="empty"  v-else>
                    <image class="empty-img" src="../../static/image/img_zwnr@3x.png"></image>
                    <view class="empty-tips">暂无分享内容~</view>
                </view>
                <view v-if="ismore">
                	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
                </view>
            </view>
        </view>
        <view v-if="currentMenu == 1" class="">
            <view class="cont">
            	<view v-if="load" class="model" v-for="(xx,xi) in info.pics" :key="xi">
            		<uni-swiper-dot :info="xx.pics" class="swip" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
            			<swiper class="swiper-box" @change="change">
            				<swiper-item v-for="(item, index) in xx.pics" :key="index">
            					<view class="swiper-item">
            						<image class="image" :src="xx.pics.url" mode="aspectFill" />
            					</view>
            				</swiper-item>
            			</swiper>
            		</uni-swiper-dot>
            			
            		<view class="name" style="text-align: center;">
            			{{ xx.name }}
            		</view>
            	</view>
            </view>
        </view>
    </view> 
</template>

<script>
    export default {
    	data() {
    		return {
                current: 0,
                communityId:'',
                page:1,
                size:10,
                ismore:false,
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多',
                },
                shareList:[]
            }
        },
        onLoad(options) {
            this.communityId = this.$store.getters.communityId
            this.getData()
        },
        onPullDownRefresh() {
            this.page = 1
            this.getData()
        },
        onReachBottom() {
            
            this.status = 'loading'
            uni.showNavigationBarLoading()
            
            this.page++
            this.getData()
        },
        methods: {
            clickMenu:function(tag){
                this.current = tag
            },
        	getData() {
        		this.$api.marketMaterialPage({
        			page:this.page,
        			size:this.size,
        			communityId:this.communityId,
        			type:'COMMUNITY',//MATERIAL PRODUCT COMMUNITY
        			keywords:'',
        			classifyId:''
        		}).then(res=>{
        			console.log(res);
        			if(res.status=="OK"){
                        if(this.page == 1){
                            this.shareList = []
                            if(res.list.length>=this.size){
                                this.ismore = true
                            }
                        }
                        res.list.map(item=>{
                            this.shareList.push(item)
                        })
                        console.log(this.shareList)
        			}
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
        		}).catch(err=>{
        			console.log(err);
        		})
        	},
        	goDetail({id,type}){
        		if(type=='VIDEO'){
        			uni.navigateTo({
        				url: `/pages/housekeeper-sharing-video/housekeeper-sharing-video?id=${id}`,
        			});
        		}else{
        			uni.navigateTo({
        				url: `/pages/housekeeper-sharing-img/housekeeper-sharing-img?id=${id}`,
        			});
        		}
        	}
        }
    }
</script>

<style lang="scss" scope>
    page{
        background: #EFF1F6;
    }
    .content{
        text-align: center;
        font-size:29upx;
        color: #434E5E;
    }
    .logo {
    	height: 264upx;
    	width: 100%;
        position: absolute;
        left: 0upx;
        top: 0upx;
        z-index: -99;
    }
    .login-box{
        width: 683upx;
        height: 224upx;
        /* margin-top: -310upx; */
        position: relative;
        margin-top: 125upx;
        margin-left: 33upx;
    }
    .boxxxx{
        position: absolute;
        z-index: -97;
        width: 100%;
        background:#FFFFFF;
        box-shadow:0upx 42upx 208upx 0upx rgba(22,32,46,0.15);
        border-radius:31upx;
        height: 220upx;
        top: 84upx;
    }
    .headerBox{
        width: 168upx;
        height: 168upx;
        margin-top: -84upx;
        background: #FFFFFF;
        border-radius: 50%;
        margin-left: calc(50% - 84upx);
        
    }
    .headerBox image{
        margin: 8upx;
        width: 152upx;
        height: 152upx;
        border-radius: 50%;
        background: #F8F8F8;
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
    .product {
    	padding: 30rpx 36rpx;
    	.h-wrap {
    		display: flex;
    		flex-direction: row;
    		flex-wrap: wrap;
    		justify-content: space-between;
    	}
    }
    .empty{
    	text-align: center;
    	.empty-img{
    		margin-top: 52rpx;
    		width: 360rpx;
    		height: 320rpx;
    	}
    	.empty-tips{
    		color: #A2A9BA;
    		font-size: 32rpx;
    		line-height: 48rpx;
    	}
    }
</style>
