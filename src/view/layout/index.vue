<template>
    <div>
        <el-container>
			<el-aside :width="isCollapse ? '64px' : '200px'" v-if="token">
				<div style="display: flex;align-items: center;justify-content: center;height: 60px;background-color: #2f3447;color: #ffffff;">
					<h3>
						<svg-icon icon-class="user"></svg-icon>
					</h3>
					<h3 v-if="!isCollapse" style="margin-top: 14px">&ensp;后台管理</h3>
				</div>
				<el-menu class="el-menu-vertical-demo"
						 :collapse="isCollapse"
						 :collapse-transition="false"
						 :unique-opened="true"
						 :default-active="route.path"
						 :style="{ height: (screenHeight-60) + 'px' }"
						 @select="selectMenuItem">
					<!-- 一级菜单 -->
					<template v-for="item in menuList">
						<el-sub-menu :index="'/' + item.path" v-if="item.children && item.children.length > 0" :key="item.ID">
							<!-- 一级菜单模板区域 -->
							<template #title>
								<el-icon><location /></el-icon>
								<span>{{ item.meta.title }}</span>
							</template>
							<!-- 二级菜单 -->
							<el-menu-item v-for="subItem in item.children" :index="'/' + subItem.path" :key="subItem.ID">
								<template #title>
									<el-icon><location /></el-icon>
									<span>{{ subItem.meta.title }}</span>
								</template>
							</el-menu-item>
						</el-sub-menu>
						<template v-else>
							<!-- 一级菜单模板区域 -->
							<el-menu-item :key="item.ID" :index="'/' + item.path">
								<template #title>
									<el-icon><location /></el-icon>
									<span>{{ item.meta.title }}</span>
								</template>
                            </el-menu-item>
						</template>		
					</template>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header v-if="token">
					<el-row>
						<el-col>
							<el-header class="header-cont">
								<el-row class="pd-0">
									<el-col :xs="2" :lg="1" :md="1" :sm="1" :xl="1" style="z-index:100">
										<div class="menu-total" @click="toggleCollapse">
											<el-icon v-if="isCollapse" size="24">
												<expand />
											</el-icon>
											<el-icon v-else size="24">
												<fold />
											</el-icon>
										</div>
									</el-col>
									<el-col :xs="22" :lg="23" :md="23" :sm="23" :xl="23">
										<div class="right-box">
											<div class="fix-color-pick">
												<el-space>
													<el-button size="mini" type="primary" @click="resetTheme">重置</el-button>
													<el-color-picker v-model="color" @change="changeTheme"></el-color-picker>
												</el-space>
											</div>
											<el-dropdown>
												<div>
													<span style="cursor: pointer;">
														<span style="margin-left: 5px">
															用户名
														</span>
														<el-icon>
															<arrow-down />
														</el-icon>
													</span>
												</div>
												<template #dropdown>
													<el-dropdown-menu>
														<el-dropdown-item @click="logout">
															退出登录
														</el-dropdown-item>
													</el-dropdown-menu>
												</template>
											</el-dropdown>
										</div>
									</el-col>
								</el-row>
							</el-header>
						</el-col>
					</el-row>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
    </div>
</template>

<script setup>
    import { reactive, computed, ref, watch, nextTick, onMounted } from 'vue'
	import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
	import { useStore } from 'vuex'
    import { asyncMenu } from '../../api/menu'
	import { mix } from "@/utils";
	// import action from './action'
	
	const router = useRouter()
	const route = useRoute()
	const store = useStore()

	const screenHeight = ref('')
	screenHeight.value = document.documentElement.clientHeight

	const active = ref('')

	const token = computed(() => {
		return store.state.user.token;
	})

	const isCollapse = ref(false)

	const toggleCollapse = () => {
		isCollapse.value = !isCollapse.value;
	}
	
	const selectMenuItem = (index) => {
		router.push(index)
	}
	
	const menuList = ref([])
	const getMenuListFunc = async() => {
        let res = await asyncMenu()
        menuList.value = res.data.menus
		localStorage.setItem("menuList", JSON.stringify(res.data.menus))
	}
	getMenuListFunc()
	
	const logout = () => {
		store.commit("user/userLogout")
		router.push('/login')
	}

	// 变量前缀
    const pre = "--el-color-primary";
    // 白色混合色
    const mixWhite = "#ffffff";
    // 黑色混合色
    const mixBlack = "#000000";
    // 默认主题
    const defaultTheme = "#F26521";

    const node = document.documentElement;

	const state = reactive({
    	color: localStorage.getItem("primaryColor") || defaultTheme,
	})

	function changeTheme(color = state.color) {
		node.style.setProperty(pre, color);
        localStorage.setItem("primaryColor", color);
        // 这里是覆盖原有颜色的核心代码
        for (let i = 1; i < 10; i += 1) {
          node.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1));
        }
        node.style.setProperty("--el-color-primary-dark", mix(color, mixBlack, 0.1));
        // 本地缓存style，样式持久化，你也可以存在后端
        localStorage.setItem("style", node.style.cssText);
	}

	function resetTheme() {
		localStorage.removeItem("style");
        localStorage.removeItem("primaryColor");
        node.style.cssText = "";
        state.color = defaultTheme;
	}
</script>
<style>
	.header-cont {
		/* background-color: #fff; */
		padding: 0 !important;
	}
	
	.main-content {
		overflow: visible;
		position: relative;
	}
	
	.menu-total {
		cursor: pointer;
		font-size: 24px;
		color: #000000;
		margin-top: 16px;
	}
	
	.breadcrumb {
		height: 60px;
		line-height: 60px;
		display: inline-block;
		padding: 0;
		margin-left: 50px;
		font-size: 16px;
	}

	.breadcrumb a:nth-child(1) {
		padding-right: 20px;
	}
	
	.right-box {
		padding-top: 14px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.el-side .el-menu {
		border-right: none;
	}

	.el-menu-vertical-demo {
		background: rgb(47, 52, 71);
	}
</style>