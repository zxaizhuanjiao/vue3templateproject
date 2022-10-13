import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '../store/index'
 
const service = axios.create({
    baseURL: process.env.VUE_APP_API, 
    timeout: 99999 // request timeout
})

let messageInstance = null;
 
const resetMessage = (options)=>{
//关闭上一个弹窗，继续下一个弹窗
  if(messageInstance){
    messageInstance.close()
  }
  messageInstance = ElMessage(options)
}

/*
 *请求前拦截
 *用于处理需要请求前的操作
 */
 service.interceptors.request.use(config => {
    // const store = useStore()
    // console.log(store.state.user.token)
	const token = store.state.user.token
	const user = store.state.user.userInfo

	config.headers['x-token'] = token
	config.headers['x-user-id'] = user.ID
	
	config.headers = {
	    'Content-Type': 'multipart/form-data',
	    'x-token': token,
	    'x-user-id': user.ID
	}
	
    return config
}, error => {
    // Do something with request error
    // console.log(error) // for debug
    // return Promise.reject(error)
	ElMessage.error(error)
	return error
})

/*
 *请求响应拦截
 *用于处理数据返回后的操作
 */
 service.interceptors.response.use(
    response => {
		if (response.headers['new-token']) {
            store.commit('user/setToken', response.headers['new-token'])
			localStorage.setItem('token', response.headers['new-token']);
        }

		if (response.data.code === 0 || response.headers.success === 'true') {
			if (response.headers.msg) {
				response.data.msg = decodeURI(response.headers.msg)
			}
			return response.data
		} else {
			resetMessage({
				showClose: true,
				message: response.data.msg,
				type: 'error'
			})
			if (response.data.data && response.data.data.reload) {
				if (localStorage.getItem('token')) {
					store.commit('user/userToIndex');
					if (response.data.data.reload) {
						store.commit('user/userLogout', '');
					}
				} else {
					store.commit('user/userLogout', '');
				}
			}
			return response.data.msg ? response.data : response
		}

        // const res = response.data;
		// console.log(res)
        // return res;
		// const res = response.data;
		// if (res.errCode === 0) {
		// 	resolve(res);
		// } else {
		// 	reject(res);
		// }
    },
    error => {
		//断网处理或者请求超时
		if (!error.response) {
		    //请求超时
		    if (error.message.includes("timeout")) {
				console.log("超时了");
		        ElMessage.error("请求超时，请检查互联网连接");
		    } else {
		        //断网，可以展示断网组件
		        console.log("断网了");
		        ElMessage.error("请检查网络是否已连接");
		    }
		    return;
		}
		const status = error.response.status
		switch (status) {
		    case 500:
		        ElMessage.error("服务器内部错误");
		        break;
		    case 404:
		        ElMessage.error("未找到远程服务器");
		        break;
		    case 401:
		        ElMessage.warn("用户登陆过期，请重新登陆");
		        localStorage.removeItem("token");
				localStorage.removeItem('userInfo');
				store.state.user.token = ''
				store.state.user.userInfo = {}
		        setTimeout(() => {
					router.replace({
						path: "/login",
						query: {
							redirect: router.currentRoute.fullPath,
						},
					});
		        }, 1000);
		        break;
		    case 400:
		        ElMessage.error("数据异常");
		        break;
		    default:
		        ElMessage.error(error.response.data.message);
		}
        // return Promise.reject(error)
		return error
    })

export default service
 
 