<template>
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
                
				shareList:[]
			};
		},
		onLoad() {
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
		computed: {
			communityId(){
				return this.$store.getters.communityId
			}
		},
		methods: {
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
