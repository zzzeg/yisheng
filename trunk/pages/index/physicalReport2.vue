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
                        {{report.age?report.age:''}}岁 | {{report.height?report.height:''}}cm | {{report.weight?report.weight:''}}kg
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
        <view v-if="reportType==1" style="background: #FFFFFF; padding-bottom: 72upx;">
            <view v-if="selectItme == 0" style="margin: 0upx 33upx 0upx 33upx; text-align: center;color: #434E5E;">
                <view class="hintBox" style="margin-left: -33upx;margin-bottom: 50upx;">
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
                <view class="titleBox">
                    <view class="titleCircle"></view>
                    <view style="margin-left: 20upx; color: #16202E;">
                        体质评估结果
                    </view>
                </view>
                <image class="physicalImg" :src="report.tzpgjgpic" mode=""></image>
                <view style="margin: 10upx 0upx 48upx 0upx;">
                    【{{report.consResult[0].name || (report.consResult[0].tongue && report.consResult[0].tongue.tzpgjg)}}体质】
                </view>
                <view style="height: 2upx; border-bottom: 2upx #868E9D dotted;margin-bottom: 48upx;"></view>
                <view class="titleBox">
                    <view class="titleCircle"></view>
                    <view style="margin-left: 20upx; color: #16202E;">
                        体质分析
                    </view>
                </view>
                <view style="text-align: left;margin-left: 33upx;font-size:28upx;margin-top: 12upx;">
                    {{report.consResult[0].name || (report.consResult[0].tongue && report.consResult[0].tongue.tzpgjg)}}体质常见表现：
                </view>
                <view class="symptomBox">
                    <view class="symptom"  v-for="(item, index) in report.consResult[0].tongue.constitution.symptom" :key="index">{{item}}</view>
                    
                </view>
                <view style="text-align: left;margin-left: 33upx; font-size:26upx;line-height: 36upx;">
                    <view style="margin-top: 10upx;">{{report.consResult[0].tongue.constitution.ygjb}}</view> 
                    <view style="margin-top: 10upx;">{{report.consResult[0].tongue.constitution.ysyj}}</view> 
                    <view style="margin-top: 10upx;">{{report.consResult[0].tongue.constitution.ydfm}}</view>
                </view>
            </view>
            <view v-if="selectItme == 1" style="margin: 0upx 33upx 0upx 33upx; text-align: center;color: #434E5E;">
                <view v-if="report.consResult[0].planStatus && report.consResult[0].plan && report.consResult[0].plan.length > 0">
                    <view class="titleBox">
                        <view class="titleCircle"></view>
                        <view style="margin-left: 20upx; color: #16202E;">
                            体质成因
                        </view>
                    </view>
                    <view style="text-align: left;margin-left: 33upx;margin-top: 12upx;">
                        <text style="color: #179F7D;">{{report.consResult[0].name || (report.consResult[0].tongue && report.consResult[0].tongue.tzpgjg)}}体质</text>{{report.consResult[0].tongue.constitution.cjbx}}
                    </view>
                    <view style="height: 2upx; border-bottom: 2upx #868E9D dotted;margin: 48upx 0upx;"></view>
                    <view class="titleBox">
                        <view class="titleCircle"></view>
                        <view style="margin-left: 20upx; color: #16202E;">
                            调养原则
                        </view>
                    </view>
                    <view class="plan-box" v-for="(item,index) in report.consResult[0].plan" :key="item.id">
                        <view class="plan-box-title" @click="clickProductDetail(item)">
                            <image :src="item.pic" mode=""></image>
                            <view class="plan-box-name">
                                <view class="moneyBox" style="margin-top: -10upx;" >
                                    <view style="font-size: 26upx;">
                                        {{item.productType === 'SHIFANG' ? (item.cfName?item.cfName:item.name) : item.name}}
                                    </view>
                                </view>
                                <view class="remarksBox" style="color: #A2A9BA;">
                                    {{item.efficacy?item.efficacy:''}}
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
                    <button @click="clickBuy" :class="{'disabledBtn': report.orderId }" class="login-btn" >{{report.orderId ? '已购买' : '点击购买'}}</button>
                </view>
                <view v-else-if="report.consResult[0].planStatus">
                    <view style="padding: 16upx 66upx; font-size: 26upx;">
                        综合分析您近两周的身体数据，您的健康状况良好，请继续保持~
                    </view>
                </view>
                <view v-else>
                    <view style="padding: 16upx 33upx; font-size: 26upx; text-align: left;">
                        由于您存在以下情况：血尿，年龄不在调理范围12-70岁，麦麸过敏，不予调理!
                    </view>
                    <view style="margin-top: 40upx; color: #179F7D;font-size: 26upx;">
                        不给予调理食方，请在饮食，运动方面多注意!
                    </view>
                </view>
                
            </view>
            <view v-if="selectItme == 2" style="margin: 0upx 33upx 72upx 33upx; text-align: center;color: #434E5E;">
                <view class="titleBox">
                    <view class="titleCircle"></view>
                    <view style="margin-left: 20upx; color: #16202E;">
                        中医舌象辨识维度
                    </view>
                </view>
                <view style="text-align: left;margin-left: 33upx;margin-top: 12upx;">
                    中医通过舌形，舌色，苔质，苔色，裂纹，齿痕，津液，点刺以判断体质性质，气血盛衰及脏腑虚实
                </view>
                <image class="shetou" src="https://coffer.bainuo.cn/mdt-pub/img_bswdsyt.png" mode=""></image>
                <view style="height: 2upx; border-bottom: 2upx #868E9D dotted;margin-bottom: 48upx"></view>
                <view class="titleBox">
                    <view class="titleCircle"></view>
                    <view style="margin-left: 20upx; color: #16202E;">
                        舌象结果
                    </view>
                </view>
                <view v-if="report && report.tongueMark" class="resultBox">
                    <view class="resultTop resultItem">
                        <view class="it">辨识维度</view>
                        <view class="line"></view>
                        <view class="it">检测结果</view>
                        <view class="line"></view>
                        <view class="it">正常值</view>
                    </view>
                    <view class="resultItem" style="background:#FFFFFF">
                        <view class="it">舌形</view>
                        <view class="line"></view>
                        <view class="it" :class="(report.tongueMark && report.tongueMark.ligulate && report.tongueMark.ligulate.indexOf('正常') < 0) ? 'active' : ''" >{{report.tongueMark.ligulate}}</view>
                        <view class="line"></view>
                        <view class="it">舌形正常</view>
                    </view>
                    <view class="resultItem" style="background:linear-gradient(233deg,rgba(136,226,150,0.1) 0%,rgba(3,190,144,0.1) 100%);">
                        <view class="it">舌色</view>
                        <view class="line"></view>
                        <view class="it" :class="report.tongueMark && report.tongueMark.tongueColor ? 'active' : ''">{{report.tongueMark.tongueColor}}</view>
                        <view class="line"></view>
                        <view class="it">淡白色</view>
                    </view>
                    <view class="resultItem" style="background:#FFFFFF">
                        <view class="it">苔质</view>
                        <view class="line"></view>
                        <view class="it" :class="report.tongueMark && report.tongueMark.mossName !== '[]' ? 'active' : ''">{{parseStr(report.tongueMark.mossName, '苔') === '有' ? '' : parseStr(report.tongueMark.mossName, '苔')}}</view>
                        <view class="line"></view>
                        <view class="it">薄苔</view>
                    </view>
                    <view class="resultItem" style="background:linear-gradient(233deg,rgba(136,226,150,0.1) 0%,rgba(3,190,144,0.1) 100%);">
                        <view class="it">苔色</view>
                        <view class="line"></view>
                        <view class="it" :class="report.tongueMark && report.tongueMark.mossColor ? 'active' : ''">{{report.tongueMark.mossColor}}</view>
                        <view class="line"></view>
                        <view class="it">白苔</view>
                    </view>
                    <view class="resultItem" style="background:#FFFFFF">
                        <view class="it">裂纹</view>
                        <view class="line"></view>
                        <view class="it" :class="report.tongueMark && report.tongueMark.fissureStatus ? 'active' : ''">{{report.tongueMark.fissureStatus === undefined ? '' : (report.tongueMark.fissureStatus ? parseStr(report.tongueMark.fissure) : '无')}}</view>
                        <view class="line"></view>
                        <view class="it">无</view>
                    </view>
                    <view class="resultItem" style="background:linear-gradient(233deg,rgba(136,226,150,0.1) 0%,rgba(3,190,144,0.1) 100%);">
                        <view class="it">齿痕</view>
                        <view class="line"></view>
                        <view class="it" :class="report.tongueMark && report.tongueMark.indentationStatus ? 'active' : ''">{{report.tongueMark.indentationStatus === undefined ? '' : (report.tongueMark.indentationStatus ? '有' : '无')}}</view>
                        <view class="line"></view>
                        <view class="it">无</view>
                    </view>
                    <view class="resultItem" style="background:#FFFFFF">
                        <view class="it">津液</view>
                        <view class="line"></view>
                        <view class="it" :class="report.tongueMark && report.tongueMark.bodyfluidName ? 'active' : ''">{{report.tongueMark.bodyfluidName}}</view>
                        <view class="line"></view>
                        <view class="it">润苔</view>
                    </view>
                    <view class="resultItem" style="background:linear-gradient(233deg,rgba(136,226,150,0.1) 0%,rgba(3,190,144,0.1) 100%);">
                        <view class="it">点刺</view>
                        <view class="line"></view>
                        <view class="it" :class="report.tongueMark && report.tongueMark.prickStatus ? 'active' : ''">{{report.tongueMark.prickStatus === undefined ? '' : (report.tongueMark.prickStatus ? parseStr(report.tongueMark.prick) : '无')}}</view>
                        <view class="line"></view>
                        <view class="it">无</view>
                    </view>
                </view>
                
                <view v-if="report.tongueMark" class="">
                    <view v-if="report.tongueMark && report.tongueMark.ligulate && report.tongueMark.ligulate.indexOf('正常') < 0 && getDescribe('ligulate', report.tongueMark.ligulate)" >
                        <view class="tongue-abnormal-item">
                            <text>舌形</text><text style="color: #03be90;">{{report.tongueMark.ligulate}}</text>
                        </view>
                        <view style="padding: 16upx 33upx; text-align: left; ">
                            【特征】：{{getDescribe('ligulate', report.tongueMark.ligulate)}}
                        </view>
                    </view>
                    <template v-if="report.tongueMark && report.tongueMark.tongueColor && getDescribe('tongueColor', report.tongueMark.tongueColor)">
                      <div class="tongue-abnormal-item">
                          <text>舌色</text><text style="color: #03be90;">{{report.tongueMark.tongueColor}}</text>
                      </div>
                      <div  style="padding: 16upx 33upx; text-align: left; ">【特征】：{{getDescribe('tongueColor', report.tongueMark.tongueColor)}}</div>
                    </template>
                    <template v-if="report.tongueMark && report.tongueMark.mossName !== '[]' && parseStr(report.tongueMark.mossName, [])">
                      <div class="tongue-abnormal-item">
                          <text>苔质</text><text style="color: #03be90;">{{parseStr(report.tongueMark.mossName, [])}}</text>
                      </div>
                      <div  style="padding: 16upx 33upx; text-align: left; ">【特征】：<template v-for="item in parse(report.tongueMark.mossName, [])">{{getDescribe('mossName', item)}}</template></div>
                    </template>
                    <template  v-if="report.tongueMark && report.tongueMark.indentationStatus && getDescribe('indentationStatus', '齿痕')">
                      <div class="tongue-abnormal-item">
                          <text>齿痕</text><text style="color: #03be90;">有</text>
                      </div>
                      <div  style="padding: 16upx 33upx; text-align: left; ">【特征】：{{getDescribe('indentationStatus', '齿痕')}}</div>
                    </template>
                    <template  v-if="report.tongueMark && report.tongueMark.mossColor && getDescribe('mossColor', report.tongueMark.mossColor)">
                      <div class="tongue-abnormal-item">
                          <text>苔色</text><text style="color: #03be90;">{{report.tongueMark.mossColor}}</text>
                      </div>
                      <div  style="padding: 16upx 33upx; text-align: left; ">【特征】：{{getDescribe('mossColor', report.tongueMark.mossColor)}}</div>
                    </template>
                    <template v-if="report.tongueMark && report.tongueMark.fissureStatus && getDescribe('fissureStatus', '裂纹')">
                      <div class="tongue-abnormal-item">
                         <text>裂纹</text><text style="color: #03be90;">{{parseStr(report.tongueMark.fissure)}}</text>
						 </div>
						<div  style="padding: 16upx 33upx; text-align: left; ">【特征】：{{getDescribe('fissureStatus', '裂纹')}}</div>
                    </template>
                    <template   v-if="report.tongueMark && report.tongueMark.bodyfluidName && getDescribe('bodyfluidName', report.tongueMark.bodyfluidName)">
                      <div class="tongue-abnormal-item">
                          <text>津液</text><text style="color: #03be90;">{{report.tongueMark.bodyfluidName}}</text>
                      </div>
                      <div  style="padding: 16upx 33upx; text-align: left; ">【特征】：{{getDescribe('bodyfluidName', report.tongueMark.bodyfluidName)}}</div>
                    </template>
                    <template v-if="report.tongueMark && report.tongueMark.prickStatus && getDescribe('prickStatus', '点刺')">
                      <div class="tongue-abnormal-item">
                       <text>点刺</text><text style="color: #03be90;">{{parseStr(report.tongueMark.prick)}}</text>
					   </div>
                        <div style="padding: 16upx 33upx; text-align: left; ">【特征】：{{getDescribe('prickStatus', '点刺')}}</div>
                    </template>
                </view>
                
                <view style="height: 2upx; border-bottom: 2upx #868E9D dotted;margin: 48upx 0upx"></view>
                <view class="titleBox">
                    <view class="titleCircle"></view>
                    <view style="margin-left: 20upx; color: #16202E;">
                        参考文献
                    </view>
                </view>
                <view class="">
                    <view style="text-align: left;margin: 20upx 33upx 0upx ;">
                        《舌苔原理及其计量诊断综合系列研究》                                                      
                    </view>
                    <view style="text-align: right;font-size:21upx;margin: 10upx 33upx;">
                        ——广东省科学技术进步二等奖                                                  
                    </view>
                </view>
                <view class="">
                    <view style="text-align: left;margin: 20upx 33upx 0upx ;">
                        《常见舌苔细胞化学变化规律的定性定量研究》                                                      
                    </view>
                    <view style="text-align: right;font-size:21upx;margin: 10upx 33upx;">
                        ——国家中医药科技进步三等奖（证书号95-国-中医药-3-25)                                                
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
                report:{
                    tongueMark:{
                        ligulate:''
                    }
                },
                symptomList:null,
				communityId:'',
                resultMap: {
                  '湿热': '../../static/image/img_srtz.png',
                  '平和': '../../static/image/img_phtz.png',
                  '气虚': '../../static/image/img_qxtz.png',
                  '阴虚': '../../static/image/img_yxtz.png',
                  '气郁': '../../static/image/img_qytz.png',
                  '痰湿': 'https://coffer.bainuo.cn/mdt-pub/01/01246daa8ed1d17e0c21f7f43754c60f.png',
                  '血瘀': '../../static/image/img_xytz.png',
                  '阳虚': '../../static/image/img_yxtz(1).png',
                  '特稟': '../../static/image/img_tltz.png'
                },
				isLowVersion: true
            }
        },
        onLoad(options) {
            this.reportType = options.reportType
            this.reportId = options.reportId
            this.communityId =  options.communityId;
            if(options.action == 1){
                this.selectItme = 1
            }
            this.getData()
        },
        onShow() {
            this.getData()
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
              }else{
				  return '';
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
            parse (str, init) {
              let ret = init
              try {
                ret = JSON.parse(str)
              } catch (e) {}
              if (Object.prototype.toString.call(ret) === '[object Array]') {
                let set = new Set(ret)
                set.delete('苔不腻腐')
                set.delete('无腻腐苔')
                set.delete('舌苔不剥')
                ret = [...set]
              }
              return ret
            },
            getData:function(){
                api.constitutionRecordInstanceFindById({
                    data:{
                        'id':this.reportId,
                        // 'id':'446941302549631907'
                    }
                }).then(res=>{
                    
                    if(res.status == "OK"){
						
                        //'TONGUE', 'QUES', 'TONGUE_QUES']stringEnum:"TONGUE", "QUES", "TONGUE_QUES"
						if(res.data.consResult && res.data.consResult.length > 0 && res.data.consResult[0].version) {
							this.isLowVersion = res.data.consResult[0].version < 10
							if(this.isLowVersion){
								return
							}
						}
						console.log(res.data.consResult && res.data.consResult.length > 0)
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
                        this.report = res.data
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
        margin-left: 33upx;
        margin-right: 33upx;
        margin-top: 30upx;
        margin-bottom: 30upx;
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
