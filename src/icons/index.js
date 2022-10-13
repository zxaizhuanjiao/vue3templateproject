// import { createApp } from 'vue'
// import SvgIcon from '@/components/svgIcon' 

// createApp().component('svg-icon', SvgIcon)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)	