<template>
	<view class="comment" >
		<view class="u-f-ac comment-bottom" :style="{backgroundColor:defaultIconColor.backgroundColor}" v-if="showFlag">
			<view class="u-f-ajc comment-bottom-input" @tap='click' :style="{backgroundColor:defaultInputColor.showBgColor}">
				<uni-icons type="compose" color="#868E9D" size="20"></uni-icons>
				发评论···
			</view>
			<view class="fun">
				<uni-icons 
					:type="info.dingStatus?'hand-thumbsup-filled':'hand-thumbsup'"  
					:color="info.dingStatus?defaultIconColor.selectedColor: defaultIconColor.color" 
					size="20"
					@tap="emitFun('ding')"
					></uni-icons>
				<text class="text">{{info.dingNum}}</text>
				<uni-icons 
					:type="info.collectStatus?'star-filled':'star'" 
					:color="info.collectStatus?defaultIconColor.selectedColor: defaultIconColor.color" 
					size="20"
					@tap="emitFun('collect')"
					></uni-icons>
				<text class="text">{{info.collectNum}}</text>
				<uni-icons type="chat" :color="defaultIconColor.color" size="20"  @tap='click'></uni-icons>
				<text class="text" @tap='click'>{{info.commentNum}}</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	const List = []
	export default {
		props: {
			detail:Object,
			iconColor:{
				type:Object,
				default:()=>{}
			},
			inputColor:{
				type:Object,
				default:()=>{}
			},
			show:{
				type:Boolean,
				default:true
			},
			// commentList:{
			// 	type:Array,
			// 	default:()=>[]
			// },
		},
		data() {
			return {
				inputMsg:'',
				defaultIconColor:{
					color: '#434E5E',
					selectedColor: '#03be90',
					backgroundColor: '#FFFFFF'
				},
				defaultInputColor:{
					showBgColor: '#EFF1F6'
				},
			};
		},
		computed:{
			info(){
				return this.detail
			},
			showFlag(){
				return this.show
			}
		},
		mounted(){
			this.defaultIconColor = Object.assign(this.defaultIconColor,this.iconColor)
			this.defaultInputColor = Object.assign(this.defaultInputColor,this.inputColor)
		},
		methods: {
			// send() {
			// 	if(this.inputMsg=='') return
			// 	this.$emit('send',this.inputMsg)
			// },
			emitFun(type){
				switch (type){
					case 'ding':
						// if(this.info.dingStatus==0){
						// 	this.info.dingStatus=1
						// 	this.info.dingNum++
						// }else{
						// 	this.info.dingStatus=0
						// 	this.info.dingNum--
						// }
						break;
					case 'collect':
						// if(this.info.collectStatus==0){
						// 	this.info.collectStatus=1
						// 	this.info.collectNum++
						// }else{
						// 	this.info.collectStatus=0
						// 	this.info.collectNum--
						// }
						break;
				}
				this.$emit('iconClick',type)
			},
			click(){
				this.$emit('onInputClick')
				// this.$nextTick(() => {
				// 	this.$refs['showpopup'].open()
				// })
			},
			showInput(){
				console.log('showInput');
			}
		},
	}
</script>

<style lang="scss" scoped>
	// .comment{
	// 	background-color: #FFFFFF;
	// }
	.comment-bottom{
		justify-content: space-between;
		padding:15rpx 40rpx;
		.comment-bottom-input{
			height: 60rpx;
			width: 300rpx;
			color: #868E9D;
			border-radius:15px;
			font-size:30rpx;
		}
		.fun{
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 40rpx;
			.text{
				font-size:26rpx ;
				color: #434E5E;
				font-family:PingFang-SC-Bold,PingFang-SC;
				font-weight:bold;
			}
		}
	}
	
	
	
</style>
