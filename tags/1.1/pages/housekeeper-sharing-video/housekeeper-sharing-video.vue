<template>
	<view class="page" :class="isShare ? 'share-page' : ''">
		 <video class="video" id="myVideo" 
		 :controls="false"
		 :autoplay="true"
		 :show-fullscreen-btn="false"
		 :enable-play-gesture="true"
		 :show-center-play-btn="true"
		 play-btn-position="center"
		 :src="info.src" 
		 @error="videoErrorCallback" 
		 :loop="true"
		 ></video>
		 <template v-if="isShare && communityId">
			 <view class="content-desc">
				{{info.content}}
			 </view>
			<h-community-share :info="communityInfo">
			</h-community-share>
		</template>
		<template v-else>
			<view class="video-center" :class="{'videoShow':contentFlag}">
				<view class="u-f-ac avatar"  :class="{'dddShow':contentFlag}">
					<image class="image" :src="info.avatar" mode="scaleToFill"></image>
					<view>{{info.name}}</view>
				</view>
				<view class="video-content" >
					<text class="video-content-text" :class="{'contentShow':contentFlag}">{{info.content}}</text>
					<text class="video-content-status" @tap="contentFlag=!contentFlag">{{contentFlag?'收起':'展开'}}</text>
				</view>
				<view class="u-f-ac location">
					<image  class="image" :src="info.serviceIcon" mode="scaleToFill"></image>
					<view>{{info.servicename}}</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="video-bottom">
				<uni-popup ref="showpopup" type="bottom" @change="change">
					<view class="content" style="background-color: #FFFFFF;">
						<view class="u-f-ajc comment-allnum">
							共{{articleDetail.commentNum}}条评论
						</view>
						<scroll-view scroll-y="true" class="srcoll-view" @scrolltolower="getMore()">
							<block v-for="(item,index) in commentList" :key="index">
								<h-comment-list :item="item" :index="index" @ding="commentPraise"></h-comment-list>
							</block>
							<uni-load-more v-if="showMore" :status="status"  :icon-size="16" :content-text="contentText" />
						</scroll-view>
						<view class="u-f-ajc comment-input">
							<view class="comment-input-box">
								<input 
								type="text" 
								v-model.trim="inputMsg" 
								placeholder-style="color:#868E9D" 
								placeholder="喜欢TA的分享就评论支持下吧！"
								/>
							</view>
							<view class="comment-input-send" @tap="send">发送</view>
						</view>
					</view>
				</uni-popup>
				<h-comment-bottom :detail="articleDetail" :show="showFlag" @onInputClick="inputClick" @icon-click="iconClick" :iconColor="iconColor" :inputColor="inputColor"></h-comment-bottom>
			</view>
		</template>
	</view>
</template>
<script>
	// const videoData = {
	// 		src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4',
	// 		avatar:'/static/healthy-mall/123.jpg',
	// 		name:'蓝色精灵',
	// 		content:'喝它，肌肤就像剥了壳的荔枝，光滑白皙水嫩好皮肤是要投资的，这款汤羹投入的叫这款汤羹时间喝它，肌肤就像剥了壳的荔枝，光滑白皙水嫩好皮肤是要投资的，这款汤羹投入的叫这款汤羹时间',
	// 		serviceIcon:'/static/healthy-mall/icon_jksc_ddshdz.png',
	// 		servicename:'深圳美益天美容健康服务站'
	// 	}
	

	export default {
		data() {
			return {
				materialId: '',
				communityId:'',
				info:{},
				showFlag:true,
				contentFlag:false,//内容展开与否
				pageNum:1,
				totalPages:0,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '－THE END －'
				},
				articleDetail: {
					dingNum: 0,
					dingStatus: false,
					collectNum: 0,
					collectStatus: false,
					commentNum: 0
				},
				iconColor:{
					color: '#FFFFFF',
					selectedColor: '#03be90',
					backgroundColor: 'transparent'
				},
				inputColor:{
					showBgColor:'transparent'
				},
				commentList:[],
				inputMsg:'',
				isShare: false,
				communityInfo: {},
                
                showMore:false
			}
		},
		onLoad(e) {
			this.materialId = e.id || e.scene
			let pages = getCurrentPages()
			this.isShare = pages.length === 1
			this.getData(this.materialId)
			if (!this.isShare) {
				this.getcommentList(this.pageNum)
			}
		},
		methods: {
			iconClick(type) {
				console.log(type);
				switch (type) {
					case 'ding':
						if(this.articleDetail.dingStatus){
							this.praiseCancel()
							this.articleDetail.dingStatus = false
							this.articleDetail.dingNum -= 1
						}else{
							this.praiseAdd()
							this.articleDetail.dingStatus = true
							this.articleDetail.dingNum += 1
						}
						break;
					case 'collect':
						if(this.articleDetail.collectStatus){
							this.cancelMark()
							this.articleDetail.collectStatus = false
							this.articleDetail.collectNum -= 1
						}else{
							this.mark()
							this.articleDetail.collectStatus = true
							this.articleDetail.collectNum += 1
						}
						break;
					case 'comment':
						
						break;
				}
			},
			// 文章详情
			getData(id) {
				this.$api.marketMaterialDetail({
					id:id
				}).then(res=>{
					console.log(res);
					if(res.status=="OK"){
						let data = res.data
						this.communityId = data.communityId
						if (this.isShare&&this.communityId) this.getCommunityByIdOmit(this.communityId)
						this.info = {
							src: JSON.parse(data.bannerPic)[0].url,
							avatar:JSON.parse(data.publishAvatar)[0].url,
							name:data.publishName,
							content:data.content,
							serviceIcon:'/static/healthy-mall/icon_jksc_ddshdz.png',
							servicename:data.communityName?data.communityName:'',
							pics: data.pics,
							title: data.title
						}
						this.articleDetail={
							dingNum: data.praiseCount,
							dingStatus: data.praiseStatus,
							collectNum: data.markCount,
							collectStatus: data.mark,
							commentNum: data.commentCount
						}
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			getCommunityByIdOmit (id) {
				this.$api.getCommunityByIdOmit({
					id: id
				}).then(res => {
					if(res.status=="OK"){
						this.communityInfo = res.data
					}
				})
			},
			// 文章点赞
			praiseAdd(){
				this.$api.materialPraiseAdd({
					communityId:this.communityId,
					materialId:this.materialId
				}).then(res=>{
					console.log(res);
					if(res.status=="OK"){
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			praiseCancel(){
				this.$api.materialPraiseCancel({
					materialId:this.materialId
				}).then(res=>{
					if(res.status=="OK"){
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			// 文章收藏
			mark(commentId,index){
				this.$api.marketMaterialMark({
					id:this.materialId
				}).then(res=>{
					if(res.status=="OK"){
						console.log(res);
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			cancelMark(commentId,index){
				this.$api.marketMaterialCancelMark({
					id:this.materialId
				}).then(res=>{
					if(res.status=="OK"){
						console.log(res);
						// this.commentList[index].praiseCount+=1
						// this.commentList[index].praiseStatus=true
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			commentPraise({item,index}){
				console.log('commentPraise');
				if(item.praiseStatus){
					this.commentPraiseCancel(item.id,index)
				}else{
					this.commentPraiseAdd(item.id,index)
				}
			},
			// 评论点赞
			commentPraiseAdd(commentId,index){
				this.$api.materialCommentPraiseAdd({
					commentId:commentId
				}).then(res=>{
					if(res.status=="OK"){
						console.log(this.commentList[index])
						this.commentList[index].praiseCount+=1
						this.commentList[index].praiseStatus=true
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			// 评论点赞取消
			commentPraiseCancel(commentId,index){
				this.$api.materialCommentPraiseCancel({
					commentId:commentId
				}).then(res=>{
					if(res.status=="OK"){
						console.log(this.commentList[index])
						this.commentList[index].praiseCount-=1
						this.commentList[index].praiseStatus=false
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			// 获取评论列表
			getcommentList(num){
				this.$api.materialCommentPage({
					size:10,
					page:num,
					materialId:this.materialId
				}).then(res=>{
					console.log(res);
					if(res.status=="OK"){
						if(num == 1){
							this.commentList = res.list;
							this.pageNum = res.page
							this.totalPages = res.totalPages
							this.status = 'more'
                            if(res.list.length==10){
                                this.showMore = true
                            }
						}else{
							this.commentList = Array.prototype.concat.call(this.commentList,res.list)
							this.pageNum = res.page
							this.totalPages = res.totalPages
							this.status = 'more'
						}
						this.articleDetail.commentNum = res.totalElements
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			// 评论
			send(){
				let content = this.inputMsg
				console.log(content);
				if(content=='') return;
				this.$api.materialCommentAdd({
					communityId:this.communityId,
					materialId:this.materialId,
					content:content
				}).then(res=>{
					if(res.status=="OK"){
						this.inputMsg = ''
						// 可优化不调接口直接插入数据  this.commentList.unshift（）  返回数据待完善
						this.pageNum = 1;
						this.getcommentList(this.pageNum);
						//this.commentList.unshift(res.data)
					}
					console.log(res);
				}).catch(err=>{
					console.log(err);
				})
			},
			change(e) {
				console.log('是否打开:' + e.show)
					this.showFlag = !e.show
			},
			getMore(){
				this.pageNum+=1
				if(this.pageNum>this.totalPages){
					this.status="noMore"
					return
				}
				this.getcommentList(this.pageNum)
			},
			inputClick(){
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
				})
			},
			onShareAppMessage () {
				let pages = getCurrentPages()
				let curPage = pages[pages.length - 1]
				return {
					title: this.info.title,
					path: curPage.route + '?id=' + this.materialId,
					imageUrl: this.parse(this.info.pics, [{}])[0].url
				}
			},
			parse (str, initValue) {
			    let ret = initValue
			    try {
					ret = JSON.parse(str)
			    } catch (e) {}
			    return ret || initValue
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		width: 750rpx;
		display: flex;
	}
	.share-page{
		height: auto;
		display: block;
		.video{
			height: 1336rpx;
		}
		.content-desc{
			padding: 48rpx 36rpx;
			font-size: 28rpx;
			line-height: 48rpx;
			color: #434E5E;
		}
	}
	.video,
		{
		height: auto;
		display: flex;
		flex: 1;
		/* #ifndef APP-PLUS */
		width: 100%;
		/* #endif */
	}

	.video-center {
		color: #FFFFFF;
		position: absolute;
		width: 690rpx;
		bottom: 110rpx;
		padding:0 30rpx;
		font-size: 28rpx;
		overflow:hidden;
		.video-content{
			margin: 28rpx 0 16rpx 0;
			display: flex;
			flex-direction: column;
			.video-content-text{
				word-break: break-all;
				line-height: 1.5;
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
				&.contentShow{
					-webkit-line-clamp:99;
                    overflow:auto;
                    height: 450upx;
				}
			}
			.video-content-status{
				align-self: flex-end;
			}
			
			
		}
		.avatar {
			font-size: 32rpx;
			justify-content: flex-start;
			.image {
				width: 75rpx;
				height: 75rpx;
				border-radius: 75rpx;
				margin-right: 20rpx;
			}
		}

		.location {
			justify-content: flex-start;
			font-size: 22rpx;
			.image {
				width: 40rpx;
				height: 40rpx;
				border-radius: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
	.video-bottom {
		position: absolute;
		width: 750rpx;
		bottom: 0rpx;
		z-index: 9999;
	}
	.content{
		// position: absolute;
		background-color: #fff;
		width: 750rpx;
		// bottom: 0;
		height: 1000rpx;
		display: flex;
		flex-direction: column;
		border-top-left-radius:15px ;
		border-top-right-radius:15px ;
		.comment-allnum{
			font-size:30rpx;
			font-weight:500;
			color: #16202E;
			height: 90rpx;
			border-bottom: 1px solid #F6F6F6;
		}
		.srcoll-view{
			height: 770rpx;
		}
		.comment-input{
			display: flex;
			background-color: #FFFFFF;
			padding: 30rpx 17rpx;
			box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
			.comment-input-box{
				border-radius:15px;
				border:1px solid rgba(156,156,156,1);
				padding: 16rpx;
				flex: 1;
				font-size: 26rpx;
				line-height: 30rpx;
			}
			.comment-input-send{
				color: #03BE90;
				font-size: 30rpx;
				width: 80rpx;
				text-align: center;
			}
		}
	}
    .videoShow{
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .dddShow{
        margin-top: 75%;
    }
</style>
