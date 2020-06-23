<template>
	<view class="cont">
		<template v-if="communityId != ''">
			<view class="u-f u-column record-item" v-for="(item, index) in reportList" :key="index" v-if="reportList.length > 0" @click="clickReport(index,'')"  @touchstart='touchstart' @touchend='touchend' @longtap="longtapServer(item,index)">
				<!-- <view class="u-f-jsb doctor">
					<text>{{item.communityName}}</text>
					<text v-if="item.type == 'advisory_report'">驻站医生：{{item.expertName}}</text>
				</view> -->
				<view class="u-f-ac time" style="margin-top: 0upx;">
					<image src="/static/image/icon_dd_sj@2x.png" mode="aspectFit"></image>
					<text style="margin-left: 10upx;">{{ item.createTime }}</text>
				</view>
				<view class="name">
					{{ item.type == 'face_check' ? '皮肤检测报告' : item.type == 'TONGUE' ? '体质辩识报告' : item.type == 'TONGUE_QUES' ? '体质和脏腑报告' : item.type == 'QUES' ? '脏腑辨证报告' : item.type == 'znwz' ? '智能问诊报告' : '健康调理报告'}}
				</view>
				<view class="u-f-jsb status color_gray">
					<view :class="{'color_g' : !item.orderId}"> {{ item.orderId ? '方案已实施' : '方案未实施'}} </view>
					<view v-if="!item.orderId" class="u-f-ac" @click.stop="clickReport(index,'&action=1')"> 立即实施 </view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="items" v-for="(item, index) in reportList" :key="index" v-if="reportList.length > 0" @click="clickReport(index,'&action=1')"   @touchstart='touchstart' @touchend='touchend' @longtap="longtapServer(item,index)">
				<view class="liner">
					<view class="disinline">
						{{ item.communityName }}
					</view>
					<view class="disinline fr" v-if="type == 'advisory_report'">
						驻站医生：{{ item.expertName }}
                        
                        
					</view>
				</view>
				
				<view class="liner">
					<view class="disinline color_gray">
						<image src="../../static/image/icon_dd_sj@2x.png" class="disinline" style="width:36rpx; height:36rpx; vertical-align: middle; margin:0rpx 20rpx 8rpx 0" mode=""></image>
						{{ item.createTime }}
					</view>
					<view class="disinline fr color_gray" :class="{'color_g' : !item.orderId}">
						{{ item.orderId ? '方案已实施' : '未实施'}}
					</view>
				</view>
				<!-- 'TONGUE_QUES,QUES,TONGUE,face_check -->
				<view class="titles">
					{{ item.type == 'face_check' ? '皮肤检测报告' : item.type == 'TONGUE' ? '体质辩识报告' : item.type == 'TONGUE_QUES' ? '体质和脏腑报告' : item.type == 'QUES' ? '脏腑辨证报告' : item.type == 'znwz' ? '智能问诊报告' : '健康调理报告'}}
				</view>
			</view>


		</template>

		<view style="text-align: center;" v-if="reportList.length == 0">
			<view style="margin:100rpx 0 40rpx 0;">
				<image src="../../static/image/img_zwbzjl@2x.png" class="disinline" style="width:232rpx; height:232rpx;"></image>
			</view>
			<view v-if="title == '驻站医生报告'" style="font-size:32rpx; line-height:48rpx; ">
				您的健康档案还没有入库的驻站医生报告
			</view>
            <view v-if="title == '智能医生报告'" style="font-size:32rpx; line-height:48rpx; ">
            	您的健康档案还没有入库的智能医生报告
            </view>
            <view v-if="title != '驻站医生报告' && title != '智能医生报告'" style="font-size:32rpx; line-height:48rpx; ">
            	您在该服务站还没有{{type == 'QUES' ? '脏腑辨证报告' : type == 'TONGUE' ? '体质辩识报告' : type == 'TONGUE_QUES' ? '体质和脏腑报告' : type == 'face_check' ? '皮肤检测报告' : type == 'znwz' ? '智能问诊报告' : '健康调理报告'}}
            </view>
			<view v-if="title == '驻站医生报告' || title == '智能医生报告'"  class="color_gray" style="font-size:28rpx; line-height:40rpx;">
				问诊且实施的报告将入库该档案
			</view>
            <view v-else class="color_gray" style="font-size:28rpx; line-height:40rpx;">
                请返回服务站问诊
            </view>
			<view class="">
				<button v-if="title == '驻站医生报告' || title == '智能医生报告'"  class="btn" @tap="goserverStation()">前往服务站问诊</button>
                <button v-else class="btn" @tap="goserverStation()">返回服务站</button>
			</view>
		</view>
        <view v-if="ismore">
        	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
        </view>
        <view v-if="mask" @click="clickMask" class="cpt-mask"></view>
        <view v-if="mask" class="calendarBox">
            <view  style="color: #6D7480;font-size:30upx; text-align: center;margin-top: 80upx;">
                确定是否删除报告？
            </view>
            <view class="btnBox">
                <view class="gkfxbtn" style="margin-right: 46upx" @click="clickMask">否</view>
                <view class="gkfxbtn" @click="clickDelete" >是</view>
            </view>
        </view>
	</view>
</template>

<script>
	import api from '../../common/api.js';
    import util from '../../common/util.js'
    import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	export default{
        components: {uniLoadMore},
		data() {
			return {
				type: '',  // zhuzhan驻站医生，zhineng 智能医生
				reportList: [],
				page: 1,
				size: 10,
               
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多',
                },
                bought:'',
                communityId:'',
                ismore:false,
                title:'',
                
                touchT:null,
                touchE:null,
                mask:false,
                selectItem:null,
                selectIndex:null
			}
		},
		onLoad(option) {
            this.title = option.title
            uni.setNavigationBarTitle({
                title:this.title
            })
            
            if(option.type){
                this.type = option.type
            }
            if(option.communityId){
                this.communityId = option.communityId
            }
            
            if(option.bought){
                this.bought = option.bought
            }
            
			this.getReportList()
		},
        onPullDownRefresh() {
            this.page = 1
            this.getReportList()
        },

        onReachBottom() {
            console.log('onReachBottom')
            this.status = 'loading'
            uni.showNavigationBarLoading()
            this.page++
            this.getReportList()
        },
		methods: {
            clickDelete:function(){
                
                api.deleteReportById({
                    data:{
                        id:this.selectItem.id
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status=="OK"){
                        this.reportList.splice(this.selectIndex,1)
                        this.selectIndex = null
                        this.selectItem = null
                        this.mask = false
                    }
                    
                })
            },
            clickMask:function(){
                this.mask = !this.mask
            },
            longtapServer:function(item,index){
                this.mask = true
                this.selectItem = item
                this.selectIndex = index
            },
			touchend:function(){
			    this.touchE = new Date().getTime();
			},
			touchstart:function(){
			    this.touchT = new Date().getTime();
			},
            clickReport:function(index,action){
                if(this.touchE-this.touchT>=350){
                    return
                }
                var type = this.reportList[index].type
				this.$store.state.communityId = this.reportList[index].communityId;
                if(type == 'QUES' ){
                    uni.navigateTo({
                        url:"../index/physicalReport?reportId="+this.reportList[index].id +"&reportType=0&communityId="+this.reportList[index].communityId + action
                    })
                }
                if(type == 'TONGUE' || type == 'TONGUE_QUES'){
                    uni.navigateTo({
                        url:"../index/physicalReport2?reportId="+this.reportList[index].id +"&reportType=1&communityId="+this.reportList[index].communityId + action
                    })
                }
                if(type == 'face_check'){
                    uni.navigateTo({
                        url:'../index/skinPos?sid='+this.reportList[index].id+"&communityId="+this.reportList[index].communityId + action
                    })
                }
                if(type == 'advisory_report'){
                    uni.navigateTo({
                        url:'../index/doctorReport?rid='+this.reportList[index].id+"&communityId="+this.reportList[index].communityId
                    })
                }
				if(type == 'znwz'){
				    uni.navigateTo({
				        url:'/pages/consultation-report/consultation-report?rid='+this.reportList[index].id+"&communityId="+this.reportList[index].communityId
				    })
				}

            },
			goserverStation() {
				uni.navigateBack({
				    delta:1
				})
			},
			getReportList() {
                // == 'zhuzhan' ? 'advisory_report' : this.type == 'zhineng' ? 'TONGUE_QUES,QUES,TONGUE,face_check' : ''
				api.getReportView({
					size: this.size,
					page: this.page,
					communityId: this.communityId,
					bought: this.bought,
					type: this.type,
				}).then(res=>{
                    if(res.status == 'OK'){
                        if(this.page == 1){
                            this.reportList = []
                            if(res.list.length>=this.size){
                                console.log('ismoreismoreismore')
                                this.ismore = true
                            }
                        }
                        res.list.forEach(item => {
                            item.createTime = util.formatTimestamp(item.createTime, 'yyyy-MM-dd hh:mm')
                            
                            this.reportList.push(item);
                        })        
                        // this.reportList = res.list
                    }
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
				})
			},
		}
	}
</script>

<style scoped lang="scss">
    .calendarBox{
        background: #FFFFFF;
        opacity: 1;
        position:fixed;
        top: 25%;
        left: 94upx;
        height: 313upx;
        width: calc(100% - 188upx);
        z-index: 100;  
        border-radius: 30upx;
        color: #6D7480;
        font-size: 30upx;
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
    .btnBox{
        display: flex;
        align-items: flex-start;
        margin: 23upx 33upx;
        width: calc(100% - 66upx);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 66rpx;
    }
    // .gkfxbtn{
    //     width:142upx;
    //     height:50upx;
    //     background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
    //     box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    //     border-radius:25upx;
    //     line-height: 50upx;
    //     text-align: center;
    //     color: #FFFFFF;
    // }
	.cont{ background:#EFF1F6;  overflow:auto; box-sizing:border-box; 
		.items{
			padding:30rpx 30rpx 30rpx 30rpx;
			margin:30rpx 32rpx 0 32rpx;
			background:#fff;
			box-shadow:0px 4rpx 20rpx 0px rgba(85,112,105,0.1);
			border-radius:10px;
			font-size:28rpx; line-height:40rpx;
			.liner{ overflow:hidden; margin:0rpx 0 16rpx 0; }
			.titles{ font-size:32rpx; line-height:40rpx; color:#16202E; }
		}
	}
	.record-item {
		font-size: 28rpx;
		margin: 30rpx;
		padding: 30rpx;
		border-radius: 10px;
		background-color: #FFFFFF;
	
		.name {
			color: #16202E;
			font-size: 32rpx;
		}
	
		.doctor {
			color: #434E5E;
	
		}
	
		.time {
			color: #A2A9BA;
			margin-top: 20rpx;
			margin-bottom: 12rpx;
	
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
	
		.status {
			margin-top: 20rpx;
			// color: #03BE90;
	
			view:nth-child(2) {
				font-size: 24rpx;
				color: #FFFFFF;
				padding: 0 20rpx;
				background: linear-gradient(315deg, rgba(136, 226, 150, 1) 0%, rgba(3, 190, 144, 1) 100%);
				border-radius: 14px;
			}
	
		}
	}
	.fr{ float: right; }
	.disinline{ display:inline-block; vertical-align: top; }
	.color_gray{ color:#A2A9BA; }
	.btn{ color:#fff; font-size:30rpx; line-height:44rpx; padding: 20rpx 0; background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);box-shadow:0px 6rpx 30rpx 0px rgba(3,190,144,0.3);
border-radius:86rpx; margin: 40rpx 120rpx; }
    .color_g{
        color: #03BE90;
    }
</style>
