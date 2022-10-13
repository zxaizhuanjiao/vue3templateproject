<template>
	<div>
		<div class="FIREWORK-table-box">
			<div class="FIREWORK-btn-list">
				<el-button size="default" type="primary" icon="plus" @click="addMenu('0')">新增根菜单</el-button>
			</div>
			<el-table :data="tableData" row-key="ID" v-loading="tableLoading" empty-text="暂无数据">
				<el-table-column align="left" label="ID" min-width="100" prop="ID" />
				<el-table-column align="left" label="展示名称" min-width="120" prop="authorityName">
				<template #default="scope">
					<span>{{ scope.row.meta.title }}</span>
				</template>
				</el-table-column>
				<el-table-column align="left" label="路由Name" show-overflow-tooltip min-width="160" prop="name" />
				<el-table-column align="left" label="路由Path" show-overflow-tooltip min-width="160" prop="path" />
				<el-table-column align="left" label="是否隐藏" min-width="100" prop="hidden">
				<template #default="scope">
					<span>{{ scope.row.hidden?"隐藏":"显示" }}</span>
				</template>
				</el-table-column>
				<el-table-column align="left" label="父节点" min-width="90" prop="parentId" />
				<el-table-column align="left" label="排序" min-width="70" prop="sort" />
				<el-table-column align="left" label="文件路径" min-width="360" prop="component" />
				<el-table-column align="left" fixed="right" label="操作" width="300">
					<template #default="scope">
						<el-button
							size="small"
							type="primary"
							link
							@click="addMenu(scope.row.ID)"
						>
							添加子菜单
						</el-button>
						<el-button
							size="small"
							type="primary"
							link
							@click="editMenu(scope.row.ID)"
						>
							编辑
						</el-button>
						<el-button
							size="small"
							type="primary"
							link
							@click="deleteMenu(scope.row.ID)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog v-model="dialogFormVisible" :before-close="handleClose" :title="dialogTitle">
			<div>
				<el-form
					v-if="dialogFormVisible"
					ref="menuForm"
					:inline="true"
					:model="form"
					:rules="rules"
					label-position="top"
					label-width="85px"
				>
					<el-form-item label="路由Name" prop="path" style="width:30%">
						<el-input
							v-model="form.name"
							autocomplete="off"
							placeholder="唯一英文字符串"
							@change="changeName"
						/>
					</el-form-item>
					<el-form-item prop="path" style="width:30%">
						<template #label>
							<div style="display:inline-flex">
								路由Path
								<!-- <el-checkbox v-model="checkFlag" style="float:right;margin-left:20px;">添加参数</el-checkbox> -->
							</div>
						</template>
						<el-input
							v-model="form.path"
							:disabled="!checkFlag"
							autocomplete="off"
							placeholder="路由path"
						/>
					</el-form-item>
					<el-form-item label="是否隐藏" style="width:30%">
						<el-select v-model="form.hidden" placeholder="是否在列表隐藏">
							<el-option :value="false" label="否" />
							<el-option :value="true" label="是" />
						</el-select>
					</el-form-item>
					<el-form-item label="父节点ID" style="width:30%">
						<el-cascader
							v-model="form.parentId"
							style="width:100%"
							:disabled="!isEdit"
							:options="menuOption"
							:props="{ checkStrictly: true,label:'title',value:'ID',disabled:'disabled',emitPath:false}"
							:show-all-levels="false"
							filterable
						/>
					</el-form-item>
					<el-form-item label="文件路径" prop="component" style="width:60%">
						<el-input v-model="form.component" autocomplete="off" placeholder="页面:view/xxx/xx.vue 插件:plugin/xx/xx.vue" @blur="fmtComponent" />
						<!-- <span style="font-size:12px;margin-right:12px;">如果菜单包含子菜单，请创建router-view二级路由页面或者</span><el-button style="margin-top:4px" size="small" @click="form.component = 'view/routerHolder.vue'">点我设置</el-button> -->
					</el-form-item>
					<el-form-item label="展示名称" prop="meta.title" style="width:30%">
						<el-input v-model="form.meta.title" autocomplete="off" />
					</el-form-item>
					<el-form-item label="排序标记" prop="sort" style="width:30%">
						<el-input v-model.number="form.sort" autocomplete="off" />
					</el-form-item>
				</el-form>
				<div>
					<el-button
						style="margin-top:12px"
						size="small"
						type="primary"
						icon="edit"
						@click="addBtn(form)"
					>新增可控按钮</el-button>
					<el-table :data="form.menuBtn" empty-text="暂无数据" style="width: 100%">
						<el-table-column align="left" prop="name" label="按钮名称" width="180">
							<template #default="scope">
								<div>
									<el-input v-model="scope.row.name" />
								</div>
							</template>
						</el-table-column>
						<el-table-column align="left" prop="name" label="备注" width="180">
							<template #default="scope">
								<div>
									<el-input v-model="scope.row.desc" />
								</div>
							</template>
						</el-table-column>
						<el-table-column align="left">
							<template #default="scope">
							<div>
								<el-button
									type="danger"
									size="small"
									icon="delete"
									@click="deleteBtn(form.menuBtn,scope.$index)"
								>删除</el-button>
							</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<template #footer>
				<div class="dialog-footer">
				<el-button size="small" @click="closeDialog">取 消</el-button>
				<el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import {
		updateBaseMenu,
		getMenuList,
		addBaseMenu,
		deleteBaseMenu,
		getBaseMenuById
	} from '@/api/menu'
	import { canRemoveAuthorityBtnApi } from '@/api/authorityBtn'
	import { reactive, ref } from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'

	const rules = reactive({
		path: [{ required: true, message: '请输入菜单name', trigger: 'blur' }],
		component: [
			{ required: true, message: '请输入文件路径', trigger: 'blur' }
		],
		'meta.title': [
			{ required: true, message: '请输入菜单展示名称', trigger: 'blur' }
		]
	})

	const tableLoading = ref(true)
	const page = ref(1)
	const total = ref(0)
	const pageSize = ref(999)
	const tableData = ref([])
	const searchInfo = ref({})
	// 列表查询
	const getTableData = async() => {
		const table = await getMenuList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
		if (table.code === 0) {
			tableData.value = table.data.list
			total.value = table.data.total
			page.value = table.data.page
			pageSize.value = table.data.pageSize
		}
		tableLoading.value = false
	}
	getTableData()

	const menuOption = ref([
		{
			ID: '0',
			title: '根菜单'
		}
	])
	const setOptions = () => {
		menuOption.value = [
			{
				ID: '0',
				title: '根目录'
			}
		]
		setMenuOptions(tableData.value, menuOption.value, false)
	}
	const setMenuOptions = (menuData, optionsData, disabled) => {
		menuData && menuData.forEach(item => {
			if (item.children && item.children.length) {
				const option = {
					title: item.meta.title,
					ID: String(item.ID),
					disabled: disabled || item.ID === form.value.ID,
					children: []
				}
				setMenuOptions(
					item.children,
					option.children,
					disabled || item.ID === form.value.ID
				)
				optionsData.push(option)
			} else {
				const option = {
					title: item.meta.title,
					ID: String(item.ID),
					disabled: disabled || item.ID === form.value.ID
				}
				optionsData.push(option)
			}
		})
	}

	// 新增可控按钮
	const addBtn = (form) => {
		if (!form.menuBtn) {
			form.menuBtn = []
		}
		form.menuBtn.push({
			name: '',
			desc: '',
		})
	}
	// 删除可控按钮
	const deleteBtn = async(btns, index) => {
		const btn = btns[index]
		if (btn.ID === 0) {
			btns.splice(index, 1)
			return
		}
		const res = await canRemoveAuthorityBtnApi({ id: btn.ID })
		if (res.code === 0) {
			btns.splice(index, 1)
			return
		}
	}

	// 弹窗
	const dialogFormVisible = ref(false)
	const dialogTitle = ref('新增菜单')
	const isEdit = ref(false)
	const form = ref({
		ID: 0,
		path: '',
		name: '',
		hidden: '',
		parentId: '',
		component: '',
		meta: {
			title: '',
			icon: '',
			defaultMenu: false,
			closeTab: false,
			keepAlive: false
		},
		parameters: [],
		menuBtn: []
	})

	const changeName = () => {
		form.value.path = form.value.name
	}

	const addMenu = (id) => {
		dialogTitle.value = '新增菜单'
		form.value.parentId = String(id)
		isEdit.value = false
		setOptions()
  		dialogFormVisible.value = true
	}

	const closeDialog = () => {
		initForm()
  		dialogFormVisible.value = false
	}

	const handleClose = (done) => {
		initForm()
  		done()
	}

	const enterDialog = async(valid) => {
		if (valid) {
			let res
			if (isEdit.value) {
				res = await updateBaseMenu(form.value)
			} else {
				res = await addBaseMenu(form.value)
			}
			if (res.code === 0) {
				ElMessage({
					type: 'success',
					message: isEdit.value ? '编辑成功' : '添加成功!'
				})
				getTableData()
				initForm()
				dialogFormVisible.value = false
			}
		}
	}

	const editMenu = async(id) => {
		dialogTitle.value = '编辑菜单'
		const res = await getBaseMenuById({ id })
		form.value = res.data.menu
		isEdit.value = true
		setOptions()
		dialogFormVisible.value = true
	}

	const deleteMenu = (ID) => {
		ElMessageBox.confirm('此操作将永久删除所有角色下该菜单, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(async() => {
			const res = await deleteBaseMenu({ ID })
			if (res.code === 0) {
				ElMessage({
					type: 'success',
					message: '删除成功!'
				})
				if (tableData.value.length === 1 && page.value > 1) {
					page.value--
				}
				getTableData()
			}
		}).catch(() => {})
	}

	// 初始化弹窗内表格方法
	const menuForm = ref(null)
	const checkFlag = ref(false)
	const initForm = () => {
		checkFlag.value = false
		menuForm.value.resetFields()
		form.value = {
			ID: 0,
			path: '',
			name: '',
			hidden: '',
			parentId: '',
			component: '',
			meta: {
			title: '',
			icon: '',
			defaultMenu: false,
			keepAlive: ''
			}
		}
	}
</script>

<style>
</style>
