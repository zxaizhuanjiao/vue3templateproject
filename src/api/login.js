import service from '../utils/request.js'

export const login = (data) => {
	return service({
		url: '/base/login',
		method: 'post',
		data
	})
}

// 获取验证码
export const captcha = (data) => {
	return service({
		url: '/base/captcha',
	  	method: 'post',
	  	data: data
	})
}