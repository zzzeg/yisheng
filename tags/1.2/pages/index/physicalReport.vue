<template>
    <view class="content">
		<template v-if="!isLowVersion">
			<view class="plan-box">
				<!-- v-for="(record, index) in instanceData" :key="index"  -->
				<view class="plan-box-title">
					<image src="../../static/image/img_tx_hyy@2x.png" mode=""></image>
					<view class="plan-box-name" :class="[reportType == 1 ? 'type0' : 'type1']">
						<view class="moneyBox" style="margin-top: -10upx;" >
							<view style="font-size: 34upx;">
								{{report.name}}
							</view>
							<image v-if="report.gender == 'MAN'" src="../../static/image/icon_nan.png" mode=""></image>
							<image v-else src="../../static/image/icon_nv@2x.png" mode=""></image>
						</view>
						<view class="remarksBox">
							{{report.age}}岁 | {{report.height}}cm | {{report.weight}}kg
						</view>
						<view v-if="reportType == 1" class="moneyBox">
							<image src="../../static/image/icon_bgsj@2x.png" mode=""></image>
							<view class="countBox">
								{{report.createTime}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="itemBox">
				<view class="item " @click="clckItem(0)">
					<view style="height: 61upx;width: 173upx;" :class="{'activatext':selectItme==0}">
						辨识结果
					</view> 
					<view class="nonono " :class="{'activation':selectItme==0}"></view>
				</view>
				<view class="item" @click="clckItem(1)">
					<view style="height: 61upx;width: 173upx;" :class="{'activatext':selectItme==1}">
						调理方案
					</view> 
					<view class="nonono " :class="{'activation':selectItme==1}"></view>
				</view>
				<view v-if="reportType == 1" class="item" @click="clckItem(2)">
					<view style="height: 61upx;width: 173upx;" :class="{'activatext':selectItme==3}">
						舌象详解
					</view> 
					<view class="nonono " :class="{'activation':selectItme==2}"></view>
				</view>
			</view>
			<view v-if="reportType == 0" style="background: #FFFFFF;padding-bottom: 72upx;">
            <view v-if="selectItme == 0" style="text-align: center;color: #434E5E;">
                <view class="hintBox">
                    <view class="hintTop">
                        ————— <text style="margin: 0upx 40upx;">由以下机构提供技术与理论支持</text> —————
                    </view>
                    <view  style="margin-top: 8upx;">
                        世界中联药膳食疗研究专业委员会
                    </view>
                    <view style="margin-top: 8upx;">
                        国家中医药管理局重点研究室（舌诊原理与应用）
                    </view>
                    <view style="margin-top: 8upx;">
                        百诺精准健康研究院
                    </view>
                </view>
                <view class="titleBox" style="margin: 50upx 33upx 0upx 33upx; ">
                    <view class="titleCircle"></view>
                    <view style="margin-left: 20upx; color: #16202E;">
                        辨证结果
                    </view>
                </view>
                
                <view v-for="(item, index) in symptomList" :key="index" style="margin: 20upx 33upx 0upx 33upx; font-size:26upx;" v-if="report.consResult && report.consResult.length>0 && report.consResult[0].planStatus &&  report.consResult[0].plan&&  report.consResult[0].plan.length>0">
                    <view  style="font-size:34upx;color: #179F7D;text-align: center;">
                        “{{item.title}}”
                    </view>
                    <view class="">
                        <view style="padding: 50upx 33upx 0upx; text-align: left; ">
                            <text>【常见表现】</text>
                        </view>
                        <view style="padding: 16upx 33upx; text-align: left; ">
                            {{item.mains.join() || item.subs.join()}}
                        </view>
                        <view style="padding: 50upx 33upx 0upx; text-align: left; ">
                            <text>【总体特征】</text>
                        </view>
                        <view style="padding: 16upx 33upx; text-align: left; ">
                            {{item.symptom.zttz}}
                        </view>
                        <view style="padding: 50upx 33upx 0upx; text-align: left; ">
                            <text>【临床表现】</text>
                        </view>
                        <view style="padding: 16upx 33upx; text-align: left; ">
                            {{item.symptom.lcbx}}
                        </view>
                    </view>
                    <view style="height: 2upx; border-bottom: 2upx #868E9D dotted;margin: 56upx 33upx;"></view>
                </view>
                
                <view class="titleBox" style="margin: 50upx 33upx 0upx 33upx; " v-if="report.consResult && report.consResult.length>0 && report.consResult[0].planStatus &&  report.consResult[0].plan&&  report.consResult[0].plan.length>0">
                    <view class="titleCircle"></view>
                    <view style="margin-left: 20upx; color: #16202E;">
                        特别提醒
                    </view>
                </view>
                <view style="padding: 16upx 66upx; text-align: left; font-size:26upx;" v-if="report.consResult && report.consResult.length>0 && report.consResult[0].planStatus &&  report.consResult[0].plan&&  report.consResult[0].plan.length>0">
                    平时多注意{{report.kind}}检查及保养。
                </view>
				<view v-else class="">
				    <view style="padding: 16upx 66upx; font-size: 26upx;">
				        综合分析您近两周的身体数据，您的健康状况良好，请继续保持~
				    </view>
				</view>
            </view>
			
            <view v-if="selectItme == 1" style="text-align: center;color: #434E5E;;">
               
                <view v-if="report.consResult && report.consResult.length>0 && report.consResult[0].planStatus " class="">
                    <view v-if="report.consResult[0].plan&&report.consResult[0].plan.length>0" class="">
                        <view style="padding: 20upx 33upx 0upx 33upx; ">
                            <view  style="font-size:34upx;color: #179F7D;text-align: center;">
                                “{{symptomList[0] && symptomList[0].title}}”
                            </view>
                            <view class="">
                                <view style="padding: 50upx 33upx 0upx; text-align: left; ">
                                    <text>【症状解读】</text>
                                </view>
                                <view style="padding: 16upx 33upx; text-align: left; ">
                                    {{symptomList[0] && symptomList[0].zf && symptomList[0].zf.intro_zz}}
                                </view>
                            </view>
                        </view>
                        <view style="height: 2upx; border-bottom: 2upx #868E9D dotted;margin: 56upx 66upx;"></view>
                        <view class="">
                            <view style="padding: 50upx 33upx 0upx; text-align: left; ">
                                <text>【调理原则】</text>
                            </view>
                        </view>
                        <view v-if="report.consResult[0].plan" class="plan-box" v-for="(item,index) in report.consResult[0].plan" :key="item.id">
                            <view class="plan-box-title" @click="clickProductDetail(item)">
                                <image :src="item.pic" mode=""></image>
                                <view class="plan-box-name">
                                    <view class="moneyBox" style="margin-top: -10upx;" >
                                        <view style="font-size: 26upx;">
                                            {{item.productType === 'SHIFANG' ? (item.cfName?item.cfName:item.name) : item.name}}
                                        </view>
                                    </view>
                                    <view class="remarksBox" style="color: #A2A9BA;">
                                        {{item.efficacy ? item.efficacy : ''}}
                                    </view>
                                    <view class="moneyBox" style="justify-content: space-between;">
                                        <view class="countBox">
                                            ￥{{item.price/100}}
                                        </view>
                                        <view class="">
                                            X {{item.num}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <button v-if="report.consResult[0].plan" @click="clickBuy" :class="{'disabledBtn': report.orderId }" style="margin-left: 244upx;margin-right: 244upx;" class="login-btn" >{{report.orderId ? '已购买' : '点击购买'}}</button>
                    </view>
                    <view v-else class="">
                        <view style="padding: 16upx 66upx; font-size: 26upx;">
                            综合分析您近两周的身体数据，您的健康状况良好，请继续保持~
                        </view>
                    </view>
                </view>
                <view v-else class="">
                    <view style="padding: 16upx 33upx; font-size: 26upx;">
                        由于您存在以下情况：血尿，年龄不在调理范围12-70岁，麦麸过敏，不予调理!
                    </view>
                    <view style="margin-top: 40upx; color: #179F7D;font-size: 26upx;">
                        不给予调理食方，请在饮食，运动方面多注意!
                    </view>
                </view>
                
            </view>    
        </view>
        </template>
		<view v-else style="padding: 80rpx 100rpx; text-align: center;">
			目前不支持旧版本报告，请前往服务站进行智能辨证
		</view>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    import markAbnormal from '../../common/querMark.js'
    
    export default {
    	data() {
    		return {
                selectItme:0,
                reportType:99,       //0脏腑报告     1、体质报告
                reportId:null,
                report:null,
                symptomList:null,
				communityId:'',
                resultMap: {
                  '湿热': '../../static/image/img_srtz.png',
                  '平和': '../../static/image/img_phtz.png',
                  '气虚': '../../static/image/img_qxtz.png',
                  '阴虚': '../../static/image/img_yxtz.png',
                  '气郁': '../../static/image/img_qytz.png',
                  '痰湿': '../../static/image/img_tstz.png',
                  '血瘀': '../../static/image/img_xytz.png',
                  '阳虚': '../../static/image/img_yxtz(1).png',
                  '特稟': '../../static/image/img_tltz.png'
                },
				isLowVersion: false
            }
        },
        onShow() {
            this.getData()
        },
        onLoad(options) {
            this.reportType = options.reportType
            this.reportId = options.reportId
            this.communityId =  options.communityId
            if(options.action == 1){
                this.selectItme = 1
            }
        },
        methods:{
            clickProductDetail:function(item){
                if(item.productType == 'SHIFANG'){
                    uni.navigateTo({
                        url:'mwwebview?type=1&recordid='+item.code 
                    })
                }else{
                    uni.navigateTo({
                        url:"../health-product-detail/health-product-detail?id="+item.productId+'&showNav=false&productType='+item.productType+'&communityId='+this.communityId
                    })
                }
            },
            clickBuy:function(){
                if(this.report.orderId){
                    return
                }
                uni.removeStorageSync('community_cartList');
                
                var cartList = []
                this.report.consResult[0].plan.forEach(item => {
                    var name = item.productType === 'SHIFANG' ? item.cfName : item.name
					console.log(item.productType);
					var obj = {
                        id:item.productId,
                        image:item.pic,
                        attr_val:item.efficacy,
                        title:name,
                        price:item.price/100,
                        number:item.num,
						productType: item.productType=== 'SHIFANG'?'DIET_PLAN':'COMMUNITY_PRODUCT'
                    }
                    
                    cartList.push(obj)
                })
                uni.setStorage({
                    key: 'buylist',
                    data: cartList,
                    success: () => {
                        
                        uni.navigateTo({
                            url: '../pay/confirm/confirm?type=community&instanceId=' + this.reportId
                        })
                    }
                })
                // uni.setStorageSync('community_cartList',cartList)
                // uni.navigateTo({
                // 	url:'../cart/cart?type=community&instanceId=' + this.reportId
                // })
            },
            getDescribe (key, name) {
              let ret = markAbnormal.find(item => item.key === key).tongue.find(item => item.name === name)
              if (ret) {
                return ret.describe
              }
            },
            parseStr (str, delStr) {
              let arr = JSON.parse(str)
              if (!arr) return '有'
              if (arr.length === 0) {
                return '有'
              } else {
                if (delStr) {
                  let reg = new RegExp(`${delStr}$`)
                  arr = arr.map(item => {
                    return item.replace(reg, '')
                  })
                }
                return arr.join()
              }
            },
            
            getData:function(){
                api.constitutionRecordInstanceFindById({
                    data:{
                        'id':this.reportId,
                        // 'id':'446941302549631907'
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status == "OK"){
                        this.report = res.data
						if(this.report.consResult && this.report.consResult.length > 0) {
							this.isLowVersion = this.report.consResult[0].version < 10
							if(this.isLowVersion){
								return
							}
						}
                        if(res.data.constitutionType == "QUES" ){
                            uni.setNavigationBarTitle({
                                title: '脏腑辨证报告'
                            });
                        }else if(res.data.constitutionType == "TONGUE"){
                            uni.setNavigationBarTitle({
                                title: '体质辨识报告'
                            });
                        }else if(res.data.constitutionType == "TONGUE_QUES"){
                            uni.setNavigationBarTitle({
                                title: '体质和脏腑报告'
                            });
                        }
                        this.report.createTime = util.formatTimestamp(this.report.createTime, 'yyyy-MM-dd hh:mm')
                        if(this.report.consResult && this.report.consResult.length > 0 && this.report.consResult[0].plan){
                            this.report.consResult[0].plan.forEach(item => {
                                if(item.picUrl && JSON.parse(item.picUrl).length > 0){
                                    item.pic = JSON.parse(item.picUrl)[0].url
                                    console.log(item.pic)
                                }
                            })
                        }
                        
                        if(this.reportType == 0){
                            
                            this.symptomList = this.report.consResult[0].questionResult
                            
                            let ret = []
                            let temp = {}
                            this.symptomList.forEach(item => {
                              if (!temp[item.kind]) {
                                ret.push(item)
                                temp[item.kind] = true
                              }
                            })
                            this.symptomList = ret
                            
                            if(this.report.consResult && this.report.consResult.length>0 && this.report.consResult[0].questionResult){
                                let set = new Set()
                                this.report.consResult[0].questionResult.forEach(item => {
                                  if (item.kind === '心系' || item.kind === '肝胆系' || item.kind === '脾胃系' || item.kind === '肾系' || item.kind === '肺系' || item.kind === '脏腑兼病') {
                                    set.add(item.kind.replace('系', ''))
                                  }
                                })
                                var kkk = ''
                                set.forEach(function(item, index) {
                                    if(kkk == ''){
                                        kkk = item
                                    }else if(item!='脏腑兼病'){
                                        kkk = kkk +","+ item
                                    }
                                    
                                })
                                console.log(set)
                                this.report.kind = kkk
                            }
                            
                            
                        }else{
                            this.report.tzpgjgpic = this.resultMap[this.report.consResult[0].tongue.tzpgjg]
                       
                            this.report.consResult[0].tongue.constitution.symptom = this.report.consResult[0].tongue.constitution.symptom.replace('。', '').split('，')
                            
                            // if(this.report.tongueMark && this.report.tongueMark.mossName){
                            //     this.report.tongueMark.mossName = JSON.parse(this.report.tongueMark.mossName) 
                            // }
                            
                        }
                        
                    }
               
                    
                })
            },
            clckItem:function(tag){
                this.selectItme = tag
            }
        }
    }        
</script>

<style>
    page{
        background: #F6F7FA;
    }
    .hintBox{
        width:750upx;
        height:206upx;
        background:rgba(246,250,249,1);
        text-align: center;
        font-size:26upx;
        color: #434E5E;
    }
    .hintTop{
        font-size:23upx;
        color: #179F7D;
        padding: 20upx 0upx 10upx;
    }
    .resultBox{
        margin:29upx 33upx 0upx;
        width:619upx;
        border:2upx solid rgba(221,221,221,1);
    }
    .resultItem{
        width:619upx;
        height:56upx;
        line-height: 56upx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #16202E;
        font-size:26upx;
    }
    .line{
        height: 66upx;
        width: 2upx;
        background: rgba(221,221,221,1);
    }
    .resultItem .it{
        flex: 1;
    }
    .resultTop{
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        color: #FFFFFF;
        height:66upx;
        line-height: 66upx;
        font-size:28upx;
    }
    .shetou{
        margin: 23upx 0upx 56upx 0upx;
        width: 496upx;
        height: 496upx;
    }
    .login-btn {
        margin-left: 178upx;
        margin-right: 178upx;
        margin-top: 50upx;
        height: 74upx;
        line-height: 74upx;
        border-radius: 37upx;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
    .symptomBox{
        padding: 30upx 0upx 0upx 0upx;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 33upx;
    }
    .symptom{
        padding: 4upx 18upx;
        height:51upx;
        background:rgba(242,251,249,1);
        border-radius:27upx;
        color: #179F7D;
        margin-right: 22upx;
        margin-bottom: 25upx;
        font-size:26upx;
    }
    .physicalImg{
        width: 244upx;
        height: 244upx;
    }
    .titleBox{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size:38upx;
    }
    .titleCircle{
        width:11upx;
        height:11upx;
        opacity:0.6;
        border:6upx solid rgba(23,159,125,1);
        border-radius: 50%;
    }
    .plan-box{
        display: flex;
        flex-direction: row;
        
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        flex-wrap: wrap;
        
    }
    .itemBox{
        height: 180upx;
        box-shadow:0px -14upx 14upx 0px rgba(0,49,27,0.02);
        border-radius:47upx 47upx 0px 0px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: #FFFFFF;
    }
    .item{
        flex: 1;
        font-size: 42upx;
        font-weight:500;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .nonono{
        width: 173upx;
        height: 8upx;
        border-radius: 4upx;
        background: #FFFFFF;
    }
    .activation{
        
        background: #179F7D;
    }
    .activatext{
        color:  #179F7D;
    }
    .plan-box-title{
        display: flex;
        flex-direction: row;
        margin: 30upx 50upx;
        width: calc(100% - 66upx);
    }
    .plan-box-title image{
        width: 118upx;
        height: 118upx;
        border-radius:10upx;
    
    }
    .plan-box-name{
        margin-left: 38upx;
        display: flex;
        flex-direction: column;
        flex: 1;
        
        justify-content: space-between;
    }
    .remarksBox{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size:24upx;
        font-weight:400;
        color:#16202E;
        line-height:34upx;
        /* width: 100%; */
    }
    .remarksText{
        height:32upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        border-radius:32upx;
        font-size:20upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:28upx;
        padding: 10upx;
        margin-right: 10upx;
    }
    .moneyBox{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .moneyBox image{
        width: 24upx;
        height: 24upx;
        margin: 0 10upx;
    }
    .type0{
        height: 160upx;
    }
    .type1{
        height: 86upx;
        margin-top: 18upx;
    }
    .active{
      color: #03BE90;
    }
    .tongue-abnormal-item{
        padding: 50upx 33upx 0upx; 
        text-align: left; 
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
    .disabledBtn{
        box-shadow:0px 0upx 0upx 0px rgba(3,190,144,0.3);
        background: #E4E7F2;
    }
</style>
