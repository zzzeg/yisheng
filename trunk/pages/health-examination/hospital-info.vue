<template>
	<view class="cont">
		<scroll-view scroll-y="true" style="height: 100vh;"
					 :scroll-into-view="scrollToIdis"
					 scroll-with-animation
					 @scroll="scrolls"
					 >
					 
		<view class="blocks">
			<view class="block_swiper">
				<uni-swiper-dot :info="bannerList" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item, index) in bannerList" :key="index">
							<view :class="index" class="swiper-item">
								<image class="image" :src="item" mode="widthFix" />
							</view>
						</swiper-item>
					</swiper>
					<view class="nums">{{ (current + 1) + '/' + bannerList.length }}</view>
				</uni-swiper-dot>
			</view>
			
			<view class="title">{{ formData.hospName }}</view>
			<view class="tips">
				<view class="tip">{{ formData.hospRank }}</view>
			</view>
			
			<view class="flex text">
				<view>
					<!--图标-->
					<image class="disinline" style="width:28rpx; height:34rpx; margin-right:10rpx; vertical-align: text-bottom" src="../../static/image/location@2x.png"></image>
				</view>
				<view>
					{{ formData.snapshot.hospAddress }}
				</view>
			</view>
			<view class="flex text canyuyue">
				<view class="flex">
					<view>
						<image class="disinline" style="width:28rpx; height:28rpx; margin-right:10rpx; vertical-align:middle; margin-top:-6rpx;" src="../../static/image/shijian1@2x.png"></image>
					</view>
					<view>最近可约：<text class="tiem" v-if="keyueDate.length>0 " v-for="(item, index) in keyueDate" :key="index"> {{keyueDate[index].month + '月' + keyueDate[index].day + '日'}}</text></view>
				</view>
				<view @tap="showallDate = !showallDate">
					<image class="disinline" style="width:28rpx; height:28rpx; vertical-align:middle; margin-top:-6rpx;" :src="showallDate ? '../../static/image/icon_xxzk@2x.png' : '../../static/image/icon_xyjt@2x.png'"></image>
				</view>
			</view>
			
			<scroll-view scroll-x="true" class="scroll" @scroll="inscorll" v-if="showallDate">
				<view v-for="(item, index) in allDate" :key="index" class="disinline box">
					<view>{{ item.month + '.' + item.day }}</view>
					<view :class="{'color_green': item.canyue, 'color_gray': item}">{{ item.canyue ? '可约' : '不可约' }}</view>
					<view class="weekDay">{{ item.week }}</view>
				</view>
			</scroll-view>
			<view class="loadingsteps" v-if="showallDate">
				<view class="line" :style="'width:'+ loadingWidth +'%'"></view>
			</view>
			
		</view>
		
		
		
		<!--tab选项卡-->
		<view :class="{'tab': !showTabBar, 'tab tabfixed': showTabBar}">
			<view :class="{'tabitem active': tactive == item, 'tabitem': item}" v-for="(item, ind) in tabs" :key="ind" @tap="tabChange(item)">{{ item }}</view>
		</view>
		
		
		<!--套餐-->
		<view class="blocks" id="taocan">
			<view class="f16 fw titles">
				<b>体检套餐</b>
			</view>
			
			<view class="typeList flex">
				<view v-for="(item, index) in tijianList" :key="index" :class="{'titem active': item == activeItem, 'titem': item}" @tap="setItem(item)">{{ item }}</view>
			</view>
			
			<view class="taocanList" v-for="(item, index) in taocanList" :key="index">
				<view class="title fw">{{ item.packageName }}</view>
				<view class="desc">{{ item.packageType }}</view>
				<view class="intro flex">
					<view class="price">
						￥ <text>{{ item.snapshot.sealPrice }}</text>
					</view>
					<view>
						<button class="gobuyBtn" @tap="gobuy(item)">去购买</button>
					</view>
				</view>
			</view>
		</view>
		
		
		<!--tab切换-->
		<view class="blocks tabcontent" id="jieshao">
			<view class="content">
				<view class="f16 fw titles">
					<b>机构介绍</b>
				</view>
				<view :class="{'artical-content':!isHide, 'artical-content artical-content-hide': isHide}">
					【医院简介】<br/> 

					<u-parse v-if="formData.snapshot.hospDescription" :content="formData.snapshot.hospDescription" @preview="preview" @navigate="navigate" ></u-parse>
                    <!-- {{ formData.snapshot.hospDescription }} -->

					<br/>【就医环境】 <br/>
					医院开设53个临床医技科室，其中1个国家级合作重点学科、8个省级临床重点医学专科、8个市级临床重点医学专科、7个省市级重点实验室、2个市级平台和1个国家药物临床试验机构。医院开展的一大批医学高新技术和特色服务项目，吸引了深圳、香港、澳门以及周边地区的大批患者，还有来自全球36个国家和地区的外宾前来就诊。2015年门急诊总量约296万人次，出院病人5.38万人次，手术量3.47万台次。
				</view>
				<view class="hide-artical-box" v-if="formData.snapshot.hospDescription.length > 300 && isHide" @tap="isHide = !isHide">
					<text>查看更多</text>
					<image src="../../static/image/icon_xxzk@2x.png" class="disinline openico"></image>
				</view>
				<view class="artical-box" v-else-if="formData.snapshot.hospDescription.length > 300 && !isHide" @tap="isHide = !isHide">
					<text>收起全文</text><image src="../../static/image/icon_xxzk@2x.png" class="disinline openico closeico"></image>
				</view>
			</view>
		</view>
		
		<view class="blocks tabcontent">
			<view class="content">
				<view class="f16 fw titles">
					<b>预约提示</b>
				</view>
				<view class="artical-content">
					医院地址：{{formData.snapshot.hospAddress}}
					<br/> 营业时间：{{ formData.snapshot.hospWorkTime }}
					<br/> 预约提示：{{ formData.snapshot.hospNotice }}
				</view>
			</view>
		</view>
		
		<view class="blocks tabcontent">
			<view class="content">
				<view class="f16 fw titles">
					<b>机构服务</b>
				</view>
				<view class="artical-content flex">
					<view v-for="(value, key, index) in formData.snapshot.hospService" :key="index">
						<image v-if="value == '早餐'" class="disinline" :src="serverImg[1]"></image> 
                        <image v-if="value == '停车位'" class="disinline" :src="serverImg[0]"></image>
                        <image v-if="value == 'WIFI'" class="disinline" :src="serverImg[2]"></image>
                        {{ value }}
						<!-- {{ value }} {{ index }} {{serverImg[index]}} {{ formData.snapshot.hospService }} -->
					</view>
				</view>
			</view>
		</view>
		
		<view class="blocks tabcontent" id="xuzhi">
			<view class="content">
				<view class="f16 fw titles">
					<b>体检须知</b>
				</view>
				<view class="artical-content">
					1、提前预约:为了能成功提交订单，请尽早预订。 
					<br/> 2、体检凭证：体检当天凭借预约成功短信，现场出示身份证即可体检，无需缴纳其他费用（现场加项或快递报告除外）。 
					<br/> 3、注意事项：当您预约套餐时，即表示接受检测的所有项目。如因自身原因放弃体检套餐中的检查项目，网站将不予退款处理。
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
    import uParse from '@/components/u-parse/u-parse.vue'
	const { windowHeight, windowWidth } = uni.getSystemInfoSync();
	export default {
        components: {
            uParse
        },
		onLoad(option) {
			this.option = option
			// 获取医院详情
			this.getHospitalInfo(option.id)
			// 获取可预约时间
			this.gethealthKKhospitalyuyueDate(option.hospId)
			// 获取体检套餐
			this.gettijiantaocan()
		},
		data() {
			return {
				scrollToIdis: '',
				bannerList: [],
				current: 0,
				mode: 'dot',
				dotsStyles: {
					backgroundColor: 'rgba(249, 249, 251, 1)',
					border: 'none',
					color: '#fff',
					selectedBackgroundColor: 'rgba(3, 190, 144, 1)',
					selectedBorder: 'none'
				},
				option:{
					id: '',
					hospId: ''
				},
				formData: {
					name: '',
					tips: [],
					atten: '',
					address: ''
				},
				tijianList: [],
				activeItem: '全部',
				taocanList: [{
					title: '',
					desc: '',
					price: '3298',
				}],
				tabs: ['体检套餐', '医院简介', '体检须知'],
                tabsY: [0, 0, 0],
				tactive: '体检套餐',
				isHide: true,
				keyueDate: '',
                allDate: '',
				showTabBar: false,
				loadingWidth: 10,
				showallDate: false,
				serverImg: ['../../static/image/cw@2x.png','../../static/image/zc@2x.png','../../static/image/WIFI@2x.png']
			}
		},
		methods: {
			getHospitalInfo(id) {
				this.$api.healthKKhospitalDetial({
					id: id
				}).then(res=>{
					this.formData = res.data
					this.formData.snapshot = JSON.parse(res.data.snapshot)
					this.bannerList.push(this.formData.snapshot.hospImage)
				})
			},
			change(e) {
				this.current = e.detail.current
			},
			setItem(item) {
				this.activeItem = item
				this.gettaocanList()
			},
			tabChange(item) {
				this.tactive = item
				switch(item) {
					case '体检套餐':
					this.scrollToIdis = 'taocan'
					break
					case '医院简介':
					this.scrollToIdis = 'jieshao'
					break
					case '体检须知':
					this.scrollToIdis = 'xuzhi'
					break
				}
			},
			gethealthKKhospitalyuyueDate(id) {
				this.$api.healthKKhospitalyuyueDate({
					hospId: id,
					packageCode: ''
				}).then(res=>{
					this.keyueDate = []
                    this.allDate = []
					res.data.map(item=>{
                        if(Number(item.maxNum) - Number(item.usedNum)>0){
                            if(this.keyueDate.length<3){
                                this.keyueDate.push({
                                	month: item.date.split('-')[1],
                                	day: item.date.split('-')[2],
                                	canyue: item.maxNum - item.usedNum > 0,
                                	week: item.week
                                })
                            }
                        }
						this.allDate.push({
                           month: item.date.split('-')[1],
                           	day: item.date.split('-')[2],
                           	canyue: item.maxNum - item.usedNum > 0,
                           	week: item.week
                        })
					})
				})
			},
			scrolls(e) {
				// 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
                
                if(e.detail.scrollTop>this.tabsY[2]){
                    this.tactive = '体检须知'
                }else if(e.detail.scrollTop>this.tabsY[1]){
                    this.tactive = '医院简介'
                }else{
                    this.tactive = '体检套餐'
                }
				this.showTabBar = e.detail.scrollTop > windowHeight
			},
			gobuy(item) {
				// item.packageCode  item.id 都可以
				uni.navigateTo({
					url: `/pages/health-examination/product-info?code=${item.packageCode}&hospId=${this.option.hospId}`,
				});
			},
			gettijiantaocan() {
				// 获取套餐类别
				this.$api.healthKKpackageTypes({
					hospId:this.option.hospId
				}).then(res=>{
					var type = res.data['套餐类别'];
					if(type){
						type = "全部,"+ type;
					}else{
						type = "全部";
					}
					this.tijianList = type.split(',');
					this.activeItem = this.tijianList[0]
					this.gettaocanList()
				})
			},
			gettaocanList() {
				// 获取套餐列表
				this.$api.healthKKpackageTypesToList({
					size: 9999,
					page: 1,
					hospId: this.option.hospId,
					packageCat: '',
					packageType: this.activeItem==='全部'?'':this.activeItem,
					keywords: ''
				}).then(res=>{
					this.taocanList = res.list
					this.taocanList.forEach(it=>{
						it.snapshot = JSON.parse(it.snapshot)
					});
                    var _self = this
					this.$nextTick(function(){
					    uni.createSelectorQuery().select('#taocan').fields({
					        rect: true,
					        size: true,
					        scrollOffset: true
					    }, (data) => {
					        console.log(data)
					        _self.tabsY[0]=data.top
					    }).exec();
                        uni.createSelectorQuery().select('#jieshao').fields({
                            rect: true,
                            size: true,
                            scrollOffset: true
                        }, (data) => {
                            console.log(data)
                            _self.tabsY[1]=data.top
                        }).exec();
                        uni.createSelectorQuery().select('#xuzhi').fields({
                            rect: true,
                            size: true,
                            scrollOffset: true
                        }, (data) => {
                            console.log(data)
                            _self.tabsY[2]=data.top
                        }).exec();
					})
				})
			},
			inscorll(e) {
				// 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
				// console.log(e.detail)
				let length = this.allDate.length
				this.loadingWidth = (e.detail.scrollLeft + windowWidth - 32) / (56 * length) * 100
			},
		}
	}
</script>

<style scoped lang="scss">
	.disinline{ display:inline-block; }
	swiper{
	    height:400upx;
	}
	.swiper-box {
	}
	.swiper-item {
	    display: flex;
	    flex-direction: row;
		height: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		.image {
			width: 100%;
		    height: 100%!important;
		    border-radius:31upx;
		}
	}
	.blocks{ 
		background: #fff;
		padding:40rpx 32rpx 40rpx 32rpx;margin-bottom:26rpx;
		&:first-child{ padding-top:0; }
		.block_swiper{position: relative; }
	}
	.nums{ position: absolute; bottom:20rpx; right:50rpx; color:#fff;  font-size:24rpx; background: rgba(0,0,0,1); opacity:.5; padding:8rpx 24rpx; border-radius:24rpx; }
	.title{ font-size:32rpx; line-height:44rpx; font-weight: bold; margin:16rpx 0;}
	.tips{ display:flex; justify-content: flex-start; margin:24rpx 0 32rpx 0;
		.tip{ margin:0 20rpx 0 0; font-size:20rpx; color:#03BE90; background: #EFF1F6; border-radius:6rpx; line-height:32rpx; padding:0 8rpx; }
	 }
	 .price{ color:#03BE90; font-size:24rpx;
		text{ font-size:32rpx; }
	  }
	.desc{ font-size:24rpx; font-weight: 500; line-height:34rpx; margin:30rpx 0; }
	.intro{ justify-content: space-between; }
	 .flex{ display: flex;}
	 .text{  font-size:24rpx; line-height:34rpx;  }
	 .f16{ font-size:32rpx; }
	 .fw{ font-weight: bold; }
	 .f400{ font-weight: 400; }
	 
	 .typeList{ 
		 display: flex;
		 flex-wrap: wrap;
		 padding:20rpx 0;
		 border-bottom:solid 1px #EFF1F6;
		 .titem{ font-size:26rpx; color:#16202E; line-height: 36rpx; padding:14rpx 22rpx; border:solid 1px #E0E2E6; border-radius:32rpx; margin:14rpx 14rpx 14rpx 0;
			&.active{ border-color:#03BE90; background:#EEFEF6; color:#03BE90; }
		 }
	 }
	 .taocanList{ margin: 0 32rpx; border-bottom:solid 1px #EFF1F6;  padding:32rpx 0;}
	.gobuyBtn{ background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);box-shadow:0px 3px 15px 0px rgba(3,190,144,0.3);
border-radius:18px; font-size:30rpx; color:#fff; line-height:40rpx; padding:10rpx 40rpx; }
	.tabcontent{
		.artical-content{ margin-top:20rpx; }
		
	}
	.artical-content{ position: relative; z-index:22; height:auto; font-size:24rpx; line-height:40rpx;
		&.flex{ justify-content: center;
		 view{ margin:0 30rpx; }
			.disinline{ vertical-align: middle;width:40rpx; height:32rpx; margin:0 20rpx 0 0;
			}
		}
	}
	.artical-content-hide{ max-height:714rpx; overflow: hidden; }
	.hide-artical-box{ padding:140rpx 0 20rpx 0; margin-top:-140rpx; text-align: center; position:relative; z-index:999; width: 100%;
		    background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); color:#A2A9BA; font-size:28rpx;
	 }
	.artical-box{ text-align:center; color:#A2A9BA; font-size:28rpx; padding:0 0 20rpx 0; }
	 .openico{ width:40rpx; height:30rpx; margin:0 58rpx 0 22rpx;  vertical-align: middle;
		&.closeico{ transform: rotate(180deg); }
	  }
	.tab{display: flex; justify-content: space-between; border-bottom:solid 1px #E2E6EF; background: #fff; padding: 0 32rpx;
		&.tabfixed{ position: fixed; top:0; left:0; width:100%; z-index:99999; box-sizing:border-box; }
		.tabitem{
			color:#16202E; font-size:32rpx; line-height:3;
			&.active{ color:#03BE90; border-bottom:solid 2px #03BE90; }
		}
	}
	.color_gray{ color:#A2A9BA }
    .color_green{ color:#03BE90; }
	.canyuyue{ padding:20rpx 0; margin:40rpx 0 0rpx 0; border-top:solid 1px #eee; font-size:28rpx; justify-content: space-between;
		.tiem+.tiem::before{content:'、';}
	 }
	 .scroll{ width: 100%;        overflow: hidden;        white-space: nowrap; 
		.box{ margin:0 20rpx; font-size:24rpx; line-height:40rpx; text-align:center;
			.weekDay{ color:#9b9b9b; }
		}
	 }
	 .loadingsteps{ width:100rpx; border-radius:2rpx; background:#E2E6EF; overflow:hidden; position:relative; margin:20rpx auto 0 auto; z-index:1; height:6rpx;
		.line{ position:absolute; height:100%; background:#03BE90; border-radius:2rpx; }
	  }
</style>
<style lang="scss">
	.block_swiper{
		.uni-swiper__dots-box{ display: none!important; }
	}
</style>
