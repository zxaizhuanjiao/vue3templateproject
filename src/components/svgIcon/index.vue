<template>
	<div>
		<svg :class="svgClass" aria-hidden="true">
		    <use :xlink:href="iconName" />
		</svg>
	</div>
</template>

<script>
	import { nextTick, ref } from 'vue'
	
	// const props = defineProps({
	// 	iconClass: {
	// 		type: String,
	// 		required: true,
	// 		default: () => []
	// 	},
	// 	className: {
	// 		type: String,
	// 		defaulet: ''
	// 	}
	// })
	
	// const iconName = () => {
	// 	console.log(this.iconClass)
	// 	return `#icon-${this.iconClass}`
	// }
	
	// const svgClass = () => {
	// 	if (this.className) {
	// 		return 'svg-icon ' + this.className
	// 	} else {
	// 		return 'svg-icon'
	// 	}
	// }
	export default {
		name: "svgIcon",
		props: {
			iconClass: {
				type: String,
				required: true,
			},
			className: {
				type: String,
				default: '',
			},
		},
		computed: {
			iconName() {
				return `#icon-${this.iconClass}`
			},
			svgClass() {
				if (this.className) {
					return 'svg-icon ' + this.className
				} else {
					return 'svg-icon'
				}
			},
		},
	}
</script>

<style>
	.svg-icon {
		width: 1em;
		height: 1em;
		fill: currentColor;
		overflow: hidden;
	}
</style>
