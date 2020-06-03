//验证手机号码
function verifyMobile (mobile) {
    if(mobile.substr(0, 3) == "852"){
        return true;
    }
    if( mobile.substr(0, 3) == "853" ){
        return true;
    }
    if(mobile.substr(0, 3) == "886"){
        return true;
    }
    let myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    return myreg.test(mobile);
}
function round (num) {
      return Math.round(num)
}
function checkEmail(email){
　　var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
// 　　var obj = document.getElementById("mazey"); //要验证的对象
　　if(email === ""){ //输入不能为空
　　　
　　　　return false;
　　}else if(!reg.test(email)){ //正则验证不通过，格式不对
　　　　
　　　　return false;
　　}else{
　　　　return true;
　　}
}

function removeValByIndex(arr, index) {
  arr.splice(index, 1);
    return arr;
}

const formatTimestamp = function (timestamp, format) {
    if (!timestamp) return;
    return formatDate(new Date(timestamp), format);
};

const formatDate = function (date, format) {
	if (!date || !(date instanceof Date)) {
		return date;
	}
	let formatted = format || 'yyyy-MM-dd hh:mm:ss';

	var map = {
		"M+": date.getMonth() + 1, //月份 
		"d+": date.getDate(), //日 
		"h+": date.getHours(), //小时 
		"m+": date.getMinutes(), //分 
		"s+": date.getSeconds(), //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(formatted)) {
		let value = date.getFullYear().toString().substr(4 - RegExp.$1.length);
		formatted = formatted.replace(RegExp.$1, value);
	}
	for (var key in map) {
		if (new RegExp("(" + key + ")").test(formatted)) {
			let value = map[key].toString();
			if (RegExp.$1.length != 1) {
				value = ("00" + value).substr(value.length);
			}
			formatted = formatted.replace(RegExp.$1, value);
		}
	}
	return formatted;
}

const colors = ['#F0883E','#F7C747','#EE6D99','#B275D4','#5B6399','#45B4DF','#595FF3','#8E5DF9','#419AF7','#79CA6E']

// 生成随机颜色
const getChoiceColor = function(){    
    
    var index = Math.floor(Math.random()*10);//生成0-9的随机数
    return colors[index]
}

// 生成随机颜色
const getRandomColor = function(){    
    return '#'+Math.random().toString(16).slice(2,8)
}

const contains = function(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] == obj) {  
            return true;  
        }  
    }  
    return false;  
}  

const colorRgba = function(sHex, alpha = 1){
    // 十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    /* 16进制颜色转为RGB格式 */
    let sColor = sHex.toLowerCase()
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      //  处理六位的颜色值
      var sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      // return sColorChange.join(',')
      // 或
      return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
    } else {
      return sColor
    }
  }

const callService = function () {
    uni.makePhoneCall({
        phoneNumber: '4000556003' 
    });
}

const trim = function(s){
// const function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
    verifyMobile,
    formatTimestamp,
    formatDate,
    callService,
    checkEmail,
    removeValByIndex,
    colorRgba,
    contains,
    trim,
	round
}