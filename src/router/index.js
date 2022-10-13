import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store/index'

const routes = [
	{
		path: '/',
		redirect: '/dashboard',
		meta: { title: '第一个展示的页面' }
	},
	{
		path: '/dashboard',
		component: () => import('../view/layout/index.vue'),
		meta: { title: '侧边栏仪表板' },
		children: [
			{
				path: '/dashboard',
				component: () => import('../view/dashboard/index.vue'),
				meta: { title: '监测总览' }
			},
			{
				path: '/authority',
				component: () => import('../view/superAdmin/authority/authority.vue'),
				meta: { title: '角色管理' }
			},
			{
				path: '/menu',
				component: () => import('../view/superAdmin/menu/menu.vue'),
				meta: { title: '菜单管理' }
			},
			{	
				path: '/api',
				component: () => import('../view/superAdmin/api/api.vue'),
				meta: { title: 'api管理' }
			},
			{	
				path: '/user',
				component: () => import('../view/superAdmin/user/user.vue'),
				meta: { title: '用户管理' }
			}
		]
	},
	{
		path: '/login',
		component: () => import('../view/login/index.vue'),
		meta: { title: '登录页' }
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	const token = store.state.user.token
	if (to.path !== '/login') {
		if (token) {
			next()
		} else {
			next('/login')
		}
	} else{
		next()
	}
})

export default router