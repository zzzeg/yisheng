<template>
	<view>
		<view class="health-top-content">
			<uni-search-bar radius="100" cancelButton="none" placeholder="输入商品名称或关键字" @confirm="search" />
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			    <view v-for="(tab,index) in tabBars" :key="index" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="ontabtap">   
			        <text class="uni-tab-item-title" :class="current==index ? 'uni-tab-item-title-active' : ''">{{tab.label}}</text>
			    </view>
			</scroll-view>
		</view>
		<view class="health-middle-content">
			<view class="sort-box">
				<view v-for="(tab,index) in sortArr" :key="index" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="sort">
				    <text class="uni-tab-item-title" :class="sortcurrent==index ? 'uni-tab-item-title-active' : ''">{{tab.label}}</text>
					<uni-icons v-if="tab.icon" :type="tab.icon" :color="sortcurrent==index ?'#03BE90':'#434E5E'"></uni-icons>
				</view>
			</view>
			<view class="u-f h-wrap">
				<block v-for="(item,index) in productList" :key="item.id">
					<h-product-list :item='item' @click="goDetail($event,'community')"></h-product-list>
				</block>
			</view>
		</view>
        <view v-if="ismore">
        	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
        </view>
	</view>
</template>

<script>
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	export default{
	    components: {uniLoadMore},
		data() {
			return {
	            ismore:false,
	            contentText: {
	                contentdown: '查看更多',
	                contentrefresh: '加载中',
	                contentnomore: '没有更多',
	            },
	            page:1,
	            size:10,
				current:0,
				sortcurrent:0,
				sortStatus:'DESC',//价钱的升降序
				classifyId:'',//一级分类
				classify:'',//二级分类
				key:'ALL',//
				tabBars:[],
				sortArr:[
					{label:'综合',id:'ALL'},
					{label:'销量',id:'BOUGHT'},
					{label:'收藏',id:'MARK'},
					{label:'价格',id:'PRICE',},
					{label:'新品',id:'NEW'}
				],
				title:'',
				productList:[],
			};
		},
		computed: {
			communityId(){
				return this.$store.getters.communityId
			}
		},
		onLoad({title,classifyId}) {
			this.classifyId = classifyId
			this.title = title
			this.setTitle(title) //设置当前页面navibartitle
			this.requestClassifyData(classifyId);
		},
        onPullDownRefresh() {
            console.log('onPullDownRefresh')
            this.page = 1
            this.getProduct()
        },
        onReachBottom() {
            console.log('onReachBottom')
            this.status = 'loading'
            uni.showNavigationBarLoading()
            
            this.page++
            this.getProduct()
        },
		methods: {
			search(res) {
				uni.navigateTo({
					url: `/pages/health-search-page/health-search-page?value=${res.value}&classifyName=${this.title}&classifyId=${this.classifyId}&type=community`,
				});
			},
			ontabtap(e) {
			    let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current = index
				this.classify = this.tabBars[index].id
				this.page = 1;
				this.getProduct();
			},
			goDetail(id,type){
				uni.navigateTo({
					url: `/pages/health-product-detail/health-product-detail?id=${id}&type=${type}`,
				});
			},
			sort(e){
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				if(index==3){
					if(this.sortArr[index].icon=='arrowthindown'){
						this.sortArr[index].icon = 'arrowthinup',
						this.sortStatus = 'ASC'
					}else{
						this.sortArr[index].icon = 'arrowthindown'
						this.sortStatus = 'DESC'
					}
				}
				this.sortcurrent = index
				this.key = this.sortArr[index].id
				this.page = 1;
				this.getProduct();
			},
			requestClassifyData(id){
				this.$api.productClassifyList({
					pid:id
				}).then(res=>{
					if(res.status=="OK"){
						let arr = res.data
						this.tabBars.push({id:id,label:'全部',value:''});
						arr.map(item=>{
							this.tabBars.push({
								id:item.id,
								label:item.name,
								value:''
							})
						})
						this.page = 1;
						this.classify = this.tabBars[0].id
						this.getProduct();
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			getProduct(){
                console.log(this.page)
                
				this.$api.communityProductList({
					size:this.size,
					page:this.page,
					classifyId:this.classify?this.classify:'',
					keywords:'',
					key:this.key?this.key:'',//综合 销售多少排序
					sort:this.sortStatus,//ASC升序  DESC降序  价格升降排序 key=price时有效
				}).then(res=>{
					console.log(res);
                    if(this.page == 1){
                        this.productList = []
                        if(res.list.length>=this.size){
                            this.ismore = true
                        }
                    }
					if(res.status=="OK"){
						res.list.map(item=>{
                            console.log(item.name,item.price)
							this.productList.push({
								price:item.price/100,
								originalPrice:item.originalPrice/100,
								name:item.name,
								pic:JSON.parse(item.icon)&&JSON.parse(item.icon)[0]&&JSON.parse(item.icon)[0].url,
								id:item.id
							})
						})
					}
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
				}).catch(err=>{
					console.log(err);
				})
			},
			setTitle(title){
				uni.setNavigationBarTitle({
				    title: title
				});
			}
			
		},
		
	}
</script>

<style lang="scss" scoped>
	.health-top-content{
		background-color: #FFFFFF;
	}
	.health-middle-content{
		.h-title{
			color: #16202E;
			font-size: 38rpx;
			font-weight:500;
			margin: 20rpx 0;
			text-align: center;
			// width:22px;
			// height:10px;
			// background:linear-gradient(90deg,rgba(3,190,144,0) 0%,rgba(3,190,144,1) 100%);
		}
		
	}
	.h-wrap{
		padding: 10rpx 32rpx;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.swiper-box {
	    flex: 1;
		padding: 0 16rpx;
	}
	.swiper-item {
	    display: flex;
	    flex-direction: row;
		height: 100%;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.image {
		width: 750rpx;
	}
	.scroll-h {
	    display: flex;
	    width: 100%;
	    height: 80rpx;
	    flex-direction: row;
	    background-color: transparent;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
	}
	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		display: inline-block;
	    flex-wrap: nowrap;
	    padding-left: 34rpx;
	    padding-right: 34rpx;
	}
	.uni-tab-item-title {
	    color: #434E5E;
	    font-size: 30rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	    flex-wrap: nowrap;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
	}
	.uni-tab-item-title-active {
		color: #03BE90;
	}
</style>
