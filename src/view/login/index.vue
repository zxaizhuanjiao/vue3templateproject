<template>
	<div style="padding-top: 130px;">
		<el-form 
			ref="loginForm" 
			:model="loginFormData"
			:rules="rules"
			label-width="100px" 
			@keyup.enter="submitForm"
			style="width: 400px;margin: 0 auto;"
		>
		    <el-form-item label="用户名" prop="username">
				<el-input v-model="loginFormData.username" autocomplete="off" />
		    </el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model.number="loginFormData.password" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="验证码" prop="captcha" :rules="[
        		{ required: true, message: '请填写验证码' }]"
			>
				<el-input v-model.number="loginFormData.captcha" type="text" autocomplete="off" />
				<div class="vPic">
					<img v-if="picPath" :src="picPath" alt="请输入验证码" @click="loginVerify()" />
				</div>
			</el-form-item>
		    <el-form-item>
				<el-button type="primary" size="large" @click="submitForm()" style="width: 100%;">
					登录
				</el-button>
		    </el-form-item>
		  </el-form>
	</div>
</template>

<script setup>
	import { reactive, ref } from 'vue'
	// import { ElMessage } from 'element-plus'
	import { useStore } from "vuex";
	import { useRouter } from 'vue-router'
	import { login, captcha } from '../../api/login.js'
	import { getMenuList } from '../../api/menu'
	
	const router = useRouter()
	const store = useStore()

	// 验证函数
	const checkUsername = (rule, value, callback) => {
		if (value.length < 3) {
			return callback(new Error('请输入正确的用户名'))
		} else {
			callback()
		}
	}
	const checkPassword = (rule, value, callback) => {
		if (value.length < 6) {
			return callback(new Error('请输入正确的密码'))
		} else {
			callback()
		}
	}

	const loginVerify = () => {
		captcha({}).then(async(ele) => {
			// rules.captcha.push({
			// 	max: ele.data.captchaLength,
			// 	min: ele.data.captchaLength,
			// 	message: `请输入${ele.data.captchaLength}位验证码`,
			// 	trigger: 'blur',
			// })
			picPath.value = ele.data.picPath
			loginFormData.captchaId = ele.data.captchaId
		})
	}
	loginVerify()

	const loginForm = ref(null)
	const loginFormData = reactive({
		username: '',
		password: '',
		captcha: '',
		captchaId: '',
	})
	const picPath = ref('')

	const rules = reactive({
		username: [{ validator: checkUsername,  trigger: 'blur' }],
		password: [{ validator: checkPassword,  trigger: 'blur' }],
		// captcha: [
		// 	{ 
		// 		required: true,
		// 		message: '验证码格式不正确',  
		// 		trigger: 'blur' 
		// 	}
		// ],
	})
	
	const submitForm = () => {
		loginForm.value.validate((v) => {
			if (v) {
				loginFormData.password = loginFormData.password + ''
				loginFormData.captcha = loginFormData.captcha + ''
				login(loginFormData).then(res => {
					if (res.code === 0) {
						store.commit('user/setToken', res.data.token)
						store.commit('user/setUserInfo', JSON.stringify(res.data.user))
						localStorage.setItem("userInfo", JSON.stringify(res.data.user))
						localStorage.setItem("token", res.data.token)
						router.push('/dashboard')
					} else {
						loginVerify()
					}
				})
			}
		})
	}
</script>

<style>
</style>
