<template>
  <div class="right-click-menu" id="nodeMainMenu">
    <div class="menu-item el-icon-zoom-in">
      <div>删除节点</div>
    </div>
    <div class="menu-item el-icon-zoom-in">
      <div>查看详情</div>
    </div>
  </div>
</template>
<style>
  .right-click-menu {
    position: absolute;
    width: 130px;
    display: none;
    background-color: #ffffff;
    border: 1px solid #b7c8f6;
    border-radius: 0.4rem;
    padding: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .menu-item {
    cursor: pointer;
    border-radius: 0.4rem;
  }

  .menu-item div {
    padding: 0.5rem 0 0.5rem 0.5rem;
    border-radius: 0.4rem;
  }
  
  .menu-item:hover {
    background-color: rgb(245,247,250);
  }
</style>