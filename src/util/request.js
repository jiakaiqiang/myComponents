import axios from 'axios'

let instance = axios.create({
//请求的超时时间
    timeout: 3000,
    baseURL: "",
    headers: {
        'content-Type': 'application/json'
    }
})
///
if (process.env.NODE_ENV == 'porduction') {
    instance.baseURL = '生产环境的地址'
} else {
    instance.baseURL = '开发环境的地址'
}
//请求拦截
instance.interceptors.request.use(config => {
    //进行token的添加  等
    return config

}, error => {
    return Promise.reject(error)
})
//相应拦截
instance.interceptors.response.use(config => {
    //进行数据的响应格式化
    return config

}, error => {
    return Promise.reject(error)
})

//封装get请求(如果这里有请求的加载状态的时候，我们可以在请求中进行配置然后  在请求的拦截中 获取)
function get(api, params) {
    return new Promise((resolve, reject) => {
        instance.get(api, {
            params
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })

}

//封装post请求
function post(api, data) {
     return new Promise((resolve,reject)=>{
         instance.get(api,{
             data
         })
     })

}
export {
    post,get
 }
