const host = 'http://192.168.13.54:8081'
// const reporthost = 'https://test2-weixin.bainuo.cn/'

// const hostttt = 'http://192.168.33.185:8081'
const reportqkyshost = 'https://mwsf.bainuojk.com/static/znwz.html'
// 

// const host = 'https://api.bainuojk.com'
const reporthost = 'https://retailer.bainuojk.com/'

const downloadhost = "https://coffer.bainuo.cn/doctorqualification-pub/"

function request(url, method, data, header,showHud) {
    
    if(showHud){
        uni.showLoading({
            title: '加载中' // 数据请求前loading
        })
    }
    return new Promise((resolve, reject) => {
        if (header == undefined) {
            header = {
                // 'content-type': 'application/json' // 默认值
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
        console.log("requestUrl:",host + url)
        console.log("data:",data)
        uni.request({
            url: host + url, 
            method: method,
            data: data,
            header: header,
            success: function(res) {
                if (res.data.status != '666' && res.data.status != '777') {
                    resolve(res.data)
                }
            },
            fail: function(res) {
                console.log(res)
                
                // reject(false)
            },
            complete: function(res) {
                if(showHud){
                    uni.hideLoading()
                }
                if (res.statusCode !== 200) {
                    if(showHud){
                        uni.showToast({
                            title: res.errMsg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }

                if (res.data.status == '666' || res.data.status == '777') {
                    try {
                        uni.clearStorageSync()
                        uni.reLaunch({
                            url: "/pages/index/auth"
                        })
                    } catch (e) {
                        if(showHud){
                            uni.showToast({
                                title: e,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        
                    }
                    return
                }

                if (res.data && res.data.status !== 'OK') {
                    
                    if(res.data.message){
                      
                        if(showHud){
                            uni.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        
                    }
                    
                }
            }
        })
    })
}

function get(obj,showHud) {
    return request(obj.url, 'GET', obj.data, obj.header,obj.showHud)
}

function post(obj,showHud) {
    return request(obj.url, 'POST', obj.data, obj.header,obj.showHud)
}


export default {
    request,
    get,
    post,
    host,
    reporthost,
    reportqkyshost
}
