<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script setup>
	
</script>

<style scoped>
	@import './styles/base.scss';

	body {
		margin: 0 auto;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
	}
	.header-cont {
		/* padding: 0 10px; */
		background-color: #fff;
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
	
	/* .right-box {
		padding-top: 24px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	} */

	.el-side .el-menu {
		border-right: none;
	}
</style>
