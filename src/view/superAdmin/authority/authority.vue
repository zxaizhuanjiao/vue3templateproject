<template>
	<div>
		<div style="padding-bottom: 10px;">
			<el-button type="primary" icon="plus" @click="addFunc('0')">
				新增角色
			</el-button>
		</div>
		<div>
			<el-table :data="tableData" v-loading="tableLoading" empty-text="暂无数据" style="width: 100%">
    			<el-table-column prop="authorityId" label="角色ID" min-widthwidth="180" />
    			<el-table-column prop="authorityName" label="角色名称" min-width="180" />
				<el-table-column label="操作" width="460">
					<template #default="scope">
						<el-button type="text" size="small" @click="openDrawer(scope.row)" style="padding-left: 0;">
							设置权限
						</el-button>
						<el-button type="text" size="small" @click="editFunc(scope.row)">
							编辑
						</el-button>
						<el-button type="text" size="small" @click="deleteFunc(scope.row)">
							删除
						</el-button>
					</template>
				</el-table-column>
  			</el-table>
		</div>
		<!-- 新增角色弹框 -->
		<el-dialog v-model="dialogFormVisible" :title="dialogFormTitle" :before-close="closeDialog">
			<div>
				<el-form ref="authorityForm" :model="form" :rules="rules" label-width="80px">
					<el-form-item label="角色ID" prop="authorityId">
						<el-input v-model="form.authorityId" :disabled="dialogType=='edit'" autocomplete="off" />
					</el-form-item>
					<el-form-item label="角色姓名" prop="authorityName">
						<el-input v-model="form.authorityName" autocomplete="off" />
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog">
						取 消
					</el-button>
					<el-button type="primary" :loading="dialogLoading" @click="enterDialog">
						确 定
					</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 设置权限 -->
		<el-drawer v-if="drawer" v-model="drawer" custom-class="auth-drawer" :with-header="false" size="40%" title="角色配置">
			<el-tabs :before-leave="autoEnter" type="border-card">
				<el-tab-pane label="角色菜单">
					<Menus ref="menus" :row="activeRow" @changeRow="changeRow" />
				</el-tab-pane>
				<el-tab-pane label="角色api">
					<Apis ref="apis" :row="activeRow" @changeRow="changeRow" />
				</el-tab-pane>
			</el-tabs>
		</el-drawer>
	</div>
</template>

<script setup>
    import {
		getAuthorityList,
		createAuthority,
		updateAuthority,
		deleteAuthority
	} from '../../../api/superAdmin'
	import { ref } from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'
	import Menus from '@/view/superAdmin/authority/components/menus.vue'
	import Apis from '@/view/superAdmin/authority/components/apis.vue'

	const mustUint = (rule, value, callback) => {
		if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
			return callback(new Error('请输入正整数'))
		}
		return callback()
	}

	const tableLoading = ref(true)
	const tableData = ref([])
	const page = ref(1)
	const pageSize = ref(999)
	const total = ref(0)
	const dialogFormVisible = ref(false)
	const dialogFormTitle = ref('')
	const dialogType = ref('add')
	const dialogLoading = ref(false)
	const drawer = ref(false)
	const activeRow = ref({})

	const form = ref({
		authorityId: 0,
		authorityName: '',
		parentId: 0
	})

	const rules = ref({
		authorityId: [
			{ required: true, message: '请输入角色ID', trigger: 'blur' },
			{ validator: mustUint, trigger: 'blur', message: '必须为正整数' }
		],
		authorityName: [
			{ required: true, message: '请输入角色名', trigger: 'blur' }
		],
		parentId: [
			{ required: true, message: '请选择父角色', trigger: 'blur' },
		]
	})

	// 初始化表单
	const authorityForm = ref(null)
	const initForm = () => {
		if (authorityForm.value) {
			authorityForm.value.resetFields()
		}
		form.value = {
			authorityId: 0,
			authorityName: '',
			parentId: 0
		}
	}

	const getTableList = async() => {
		let tmpdata = {
			page: page.value,
			pageSize: pageSize.value
		}
		let res = await getAuthorityList(tmpdata)
		if (res.code === 0) {
			tableData.value = res.data.list
			total.value = res.data.total
		}
		tableLoading.value = false
	}
	getTableList()

	// 新增
	const addFunc = (parentId) => {
		dialogFormVisible.value = true
		dialogFormTitle.value = '新增角色'
	}

	const enterDialog = () => {
		authorityForm.value.validate(async valid => {
			if (valid) {
				dialogLoading.value = true
				switch (dialogType.value) {
					case 'add': 
						{
							form.value.authorityId = parseInt(form.value.authorityId)
							let res = await createAuthority(form.value)
							if (res.code === 0) {
								ElMessage({
									type: 'success',
									message: '添加成功！'
								})
								getTableList()
								closeDialog()
							}
						}
						break
					case 'edit': {
						form.value.authorityId = parseInt(form.value.authorityId)
						let res = await updateAuthority(form.value)
						if (res.code === 0) {
							ElMessage({
								type: 'success',
								message: '编辑成功！'
							})
							getTableList()
							closeDialog()
						}
					}
					dialogLoading.value = false
				}
			} else {
				dialogLoading.value = false
			}
		})
	}

	// 编辑
	const editFunc = (row) => {
		dialogType.value = 'edit'
		dialogFormTitle.value = '编辑角色'
		// for (const key in form.value) {
		// 	form.value[key] = row[key]
		// }
		let copy = Object.assign({}, row)
		form.value = copy
		dialogFormVisible.value = true
	}

	const deleteFunc = (row) => {
		ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(async() => {
			let res = await deleteAuthority({ authorityId: row.authorityId })
			if (res.code === 0) {
				ElMessage({
					type: 'success',
					message: '删除成功！'
				})
				getTableList()
			}
		}).catch(() => {})
	}

	const closeDialog = () => {
		initForm()
		dialogFormVisible.value = false
		dialogType.value = 'add'
	}

	const openDrawer = (row) => {
		drawer.value = true
		activeRow.value = row
	}

	// 角色设置
	const changeRow = (key, value) => {
		console.log(value)
		activeRow.value[key] = value
	}
	const menus = ref(null)
	const apis = ref(null)
	const autoEnter = (activeName, oldActiveName) => {
		const paneArr = [menus, apis]
		if (oldActiveName) {
			if (paneArr[oldActiveName].value.needConfirm) {
				paneArr[oldActiveName].value.enterAndNext()
				paneArr[oldActiveName].value.needConfirm = false
			}
		}
	}
</script>

<style>
	.auth-drawer .el-drawer__body{
		overflow: hidden;
	}
</style>
