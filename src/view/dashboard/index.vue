<template>
	<div>
    <el-container>
      <el-header style="background: #f1f1f1;line-height: 60px;">网络拓扑编辑图</el-header>
      <el-container>
        <el-aside width="200px" style="border-right: 1px solid #ccc;">
          <ul id="menu">
            <li class="topo_drag_item" v-for="item in dataList" :key="item">
                <img class="nodeStyle" :src="item.imgUrl" />
                <br />
                <span style="user-select: none;">{{ item.desc }}</span>
            </li>
          </ul>
        </el-aside>
        <el-main>
          <div class="topo_content" id="content">
            <LineMenu></LineMenu>
            <NodeMenu></NodeMenu>
            <canvas id="canvas"></canvas>
          </div>
        </el-main>
      </el-container>
    </el-container>
	</div>
</template>

<script setup>
  import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
  import '../../../public/js/jtopo-0.4.8-dev.js'
  import { topologyEditor } from "../../../public/js/editor";
  import topoData from "../../utils/topoData.json"
  import LineMenu from "../../components/topoMenu/lineMenu.vue"
  import NodeMenu from "../../components/topoMenu/nodeMenu.vue"
  import $ from 'jquery'

  const {proxy} = getCurrentInstance();
  const dataList = ref([])
  dataList.value = [
    {
      imgUrl: getImgUrl('dcs.png'),
      desc: 'dcs'
    },
    {
      imgUrl: getImgUrl('erp.png'),
      desc: 'erp'
    },
    {
      imgUrl: getImgUrl('gateway.png'),
      desc: 'gateway'
    },
    {
      imgUrl: getImgUrl('gychanger.png'),
      desc: 'gychanger'
    },
    {
      imgUrl: getImgUrl('gynetwork.png'),
      desc: 'gynetwork'
    },
    {
      imgUrl: getImgUrl('other.png'),
      desc: 'other'
    }
  ]

  onMounted(() => {
    window.editor = new topologyEditor();
    proxy.$nextTick(() => {
      initCanvas();
      findTopoData();
      initMenus();
    });
  }) 

  function initCanvas() {
    let canvas = document.getElementById("canvas");
    canvas.height = $(".content").height();
    canvas.width = $(".content").width();
    // let initTopologyJson = topoData
    // topologyEditor.prototype.loadTopology('', '', '/logo.png', initTopologyJson);
  }

  function initMenus() {
    editor.initMenus();
  }

  function findTopoData() {
    let initTopologyJson = topoData
    topologyEditor.prototype.loadTopology('', '', '/logo.png', initTopologyJson);
    findLeftList()
  }

  const findLeftList = () => {
    filterLeftData();
  }

  function filterLeftData() {
    var modes = document.getElementsByClassName('topo_drag_item');
    var modeLength = modes.length;
    for (var i = 0; i < modeLength; i++) {
        var text = $(modes[i]).find("span").eq(0).text();
        editor.drag(modes[i],document.getElementById('canvas'),text);
    }
  }

  function getImgUrl(url) {
      let img = require('../../assets/' + url)
      return img
  }
</script>

<style>
  #menu {
    display: inline-block;
  }

  .topo_drag_item {
    list-style-type: none;
    text-align: center;
    padding-bottom: 10px;
  }

  /* .nodeStyle {
    width: 30px;
    height: 30px;
  } */

  .topo_content {
    width: 100%;
    height: 530px;
  }
</style>
