import $ from 'jquery'
/**
 * 提供属性面板相关操作的函数集，编辑器继承其全部功能
 */
function propertyPanel() {}

/**
 * 删除指定数据类型设备的属性面板
 * @param b 设备图形的dataType属性
 */
propertyPanel.prototype.clearOldPanels = function (b) {
    console.log(b)
}

 /**
 * 创建属性面板
 * 1.普通设备的创建
 * 2.创建自定义路由的时候,需要动态的创建其连接的路由器信息
 * @param b 设备图形的dataType属性
 * @param templateid 节点的模板ID
 * @param moduleId 创建的节点ID
 * @param 自定义路由器的节点实例
 */
propertyPanel.prototype.createNewPanels = function (b, templateid, moduleId,node) {}

/**
 * 刷新指定数据类型设备图形对应属性面板的页面
 * 不会重新创建面板
 * @param templateid 节点的模板ID
 * @param moduleId
 * @param dataType
 */
propertyPanel.prototype.refreshPanel = function (templateid, moduleId,dataType) {}

/**
 * 属性面板被选择事件
 * @param b
 * @param templateid
 * @param moduleId
 */
propertyPanel.prototype.selectPanel = function (b, templateid, moduleId,dataType) {}

/**
 * 创建制定的属性面板
 *
 * 双击虚拟路由器进入面板isShow为true,连线的时候只是把虚拟路由器连接的交换机信息添加到全局属性变量(isShow为false)
 * @param editor
 * @param vmvrId 自定义路由器的模板ID
 * @param name 面板名字
 * @param selected 是否选中
 * @param targetDeviceId 指向的
 * @param templateId 虚拟路由器指向的设备ID
 * @param moduleId deviceId
 * @param uri 页面地址
 * @param isShow 是否立即显示新增的面板
 */
propertyPanel.prototype.createPanel = function(editor,vmvrId,name,selected,targetDeviceId,templateId,moduleId,uri,isShow) {}

/**
 * 保存序列化的JSON数据到服务器,为减少请求参数长度,进行了字符串的替换
 */
propertyPanel.prototype.saveToplogy = function (showAlert) {}

/**
 * 加载环境模板ID对应的拓扑图JSON数据结构
 * @param backImg 拓扑图的背景图片
 * @param templateId 环境模板ID
 * @param topologyId 拓扑 表记录ID
 */
propertyPanel.prototype.loadTopology = function (url, topologyGuid, backImg, initTopologyJson) {
    editor.init(topologyGuid, backImg, initTopologyJson, '')
}

propertyPanel.prototype.deleteNodeById = function(id,type,dataType){
    if (!id) {
        return;
    }
    var self = this;
    // $.ajax({
    //     url: context + "topologyManage/deleteNodeById",
    //     async: false,
    //     type: "POST",
    //     dataType: "json",
    //     data: {
    //         "id": id,
    //         "type": type,
    //         "dataType" : dataType
    //     },
    //     error: function () {
    //         self.closeLoadingWindow();
    //         jAlert("服务器异常，请稍后重试..");
    //     },
    //     success: function (response) {
    //         var err = response.errorInfo;
    //         // 错误处理
    //         if (err && err != "ok") {
    //             if (err == "logout") {
    //                 handleSessionTimeOut();
    //                 return;
    //             } else {
    //                 self.closeLoadingWindow();
    //                 jAlert(err);
    //             }
    //         }
    //     }
    // });
}

export function topologyEditor() {
    //绘图参数
    this.config = {
        stageFrames : 500,
        //新建节点默认尺寸
        defaultWidth : 32,
        defaultHeight : 28,
        //滚轮缩放比例
        defaultScal : 0.95,
        ////是否显示鹰眼对象
        eagleEyeVsibleDefault : false,
        //连线颜色
        strokeColor : "black",
        //连线宽度
        lineWidth : 1,
        //二次折线尾端长度
        offsetGap : 40,
        //线条箭头半径
        arrowsRadius : 5,
        //折线的方向
        direction : "horizontal",
        //节点文字颜色
        nodeFontColor : "black",
        //连线文字颜色
        lineFontColor : "black",
        //是否显示连线阴影
        showLineShadow : false,
        //节点旋转幅度
        rotateValue : 0.5,
        //节点缩放幅度
        nodeScale : 0.2,
        alpha : 1,
        containerAlpha : 0.5,
        nodeStrokeColor : "22,124,255",
        lineStrokeColor : "black",
        fillColor :"22,124,255",
        containerFillColor : "10,100,80",
        shadow : false,
        shadowColor : "rgba(0,0,0,0.5)",
        font : "12px Consolas",
        fontColor:"black",
        lineJoin : "lineJoin",
        borderColor:"10,10,100",
        borderRadius : 30,
        shadowOffsetX : 3,
        shadowOffsetY : 6
    };
    //布局参数
    this.layout = {};
    //纪录节点最后一次移动的幅度
    // this.lastMovedX = 0;
    // this.lastMovedY = 0;
    //绘图区属性
    this.stage = null;
    this.scene = null;
    this.stageMode = 'normal';
    //连线类型
    this.lineType = "line";
    this.connectionType = 'single';
    //当前选择的节点对象
    this.currentNode = null;
    this.dragNodeData = null;
    this.currentLink = null;
    //节点邮件菜单DOM对象
    this.nodeMainMenu = $("#nodeMainMenu");
    //连线邮件菜单DOM
    this.lineMenu = $("#lineMenu");
    //全局菜单
    this.mainMenu = $("#mainMenu");
    //节点文字修改菜单
    this.nodeTextMenu = $("#nodeTextMenu");
    //布局管理菜单
    this.layoutMenu = $("#layoutMenu");
    //节点文字方向
    this.nodeTextPosMenu = $("#nodeTextPosMenu");
    // 设备节点文字编辑框
    this.deviceEditText = $("#deviceText");
    //节点分组菜单
    this.groupMangeMenu = $("#groupMangeMenu");
    //节点对齐菜单
    this.groupAlignMenu = $("#groupAlignMenu");
    this.alignGroup = $("#alignGroup");
    //容器管理菜单
    this.containerMangeMenu = $("#containerMangeMenu");
    //拓扑层次导航
    this.selectLevel;
    //是否显示参考线
    this.showRuleLine = true;
    //标尺线数组
    this.ruleLines = [];
    //调用构造函数
    propertyPanel.call(this);
}

//原型继承
topologyEditor.prototype = new propertyPanel();

/**
 * 菜单初始化
 */
 topologyEditor.prototype.initMenus = function () {
    var self = this;
    //右键菜单事件处理
    self.nodeMainMenu.on("click",function(e){
        // console.log(e)
        //菜单文字
        var text = $.trim($(e.target).text());
        if(text == "删除节点"){
            editor.utils.deleteSelectedNodes();
        } else if(text == "复制节点(Shift+C)"){
            self.utils.cloneSelectedNodes();
        } else if(text == "撤销(Shift+Z)"){
            self.utils.cancleNodeAction();
        } else if(text == "重做(Shift+R)"){
            self.utils.reMakeNodeAction();
        } else{
            editor.utils.saveNodeInitState();
        }

        switch (text){
            case "放大(Shift+)":
                self.utils.scalingBig();
                self.utils.saveNodeNewState();
                break;
            case "缩小(Shift-)":
                self.utils.scalingSmall();
                self.utils.saveNodeNewState();
                break;
            case "顺时针旋转(Shift+U)":
                self.utils.rotateAdd();
                self.utils.saveNodeNewState();
                break;
            case "逆时针旋转(Shift+I)":
                self.utils.rotateSub();
                self.utils.saveNodeNewState();
                break;
            case "节点文字":
                return;
            default :
        }
        //关闭菜单
        $(this).hide();
    })

    self.nodeMainMenu.on("mouseover",function(e){
        //菜单文字
        var text = $.trim($(e.target).text());
        var menuX =  parseInt(this.style.left) + $(document.getElementById('changeNodeText')).width();
        //边界判断
        if(menuX + self.nodeTextMenu.width() * 2 >= self.stage.width){
            menuX -= (self.nodeTextMenu.width() + self.nodeMainMenu.width());
        }
        if("节点文字" == text){
            self.layoutMenu.hide();
            self.nodeTextMenu.css({
                top: parseInt(this.style.top)+ $(document.getElementById('changeNodeText')).height(),
                left: menuX
            }).show();
        }else if("应用布局" == text){
            self.nodeTextMenu.hide();
            self.layoutMenu.css({
                top: parseInt(this.style.top),
                left: menuX
            }).show();
        } else{
            self.nodeTextMenu.hide();
        }
    })

    //连线菜单
    self.lineMenu.on("click",function(e){
        //关闭菜单
        $(this).hide();
        var text = $.trim($(e.target).text());
        switch (text){
            case "连线设置":
                // editor.utils.addNodeText(this.style.left,this.style.top);
                break;
            case "删除连线":
                editor.utils.deleteLine()
                break;
            default :
        }
    });

    // self.mainMenu.on('click', function (event) {
    //     $(this).hide()
    //   })
}

topologyEditor.prototype.init = function (topologyId, backImg, topologyJson) {
    if (!topologyJson) {
        return
    }
    //创建JTOP舞台屏幕对象
    this.topologyId = topologyId
    let canvas = document.getElementById('canvas')
    canvas.width = $('#content').width()
    canvas.height = $('#content').height()
    //加载空白的编辑器
    if (topologyJson == "-1") {
        this.stage = new JTopo.Stage(canvas);
        // this.stage.topoLevel = 1;
        // this.stage.parentLevel = 0;
        // this.modeIdIndex = 1;
        this.scene=  new JTopo.Scene(this.stage);
        // this.scene.totalLevel = 1;
    } else {
        this.stage = JTopo.createStageFromJson(topologyJson, canvas);
        this.scene = this.stage.childs[0];
    }
    if (topologyJson.childs[0].childs.length > 0) {
        this.stage.centerAndZoom()
    }
    //滚轮缩放
    this.stage.frames = this.config.stageFrames;
    this.stage.wheelZoom = this.config.defaultScal;
    this.stage.eagleEye.visible = this.config.eagleEyeVsibleDefault;
    this.scene.mode = this.stageMode;
    //用来连线的两个节点
    this.tempNodeA = new JTopo.Node('tempA');
    this.tempNodeA.setSize(1, 1);
    this.tempNodeZ = new JTopo.Node('tempZ');
    this.tempNodeZ.setSize(1, 1);
    this.beginNode = null;
    this.link = null;
    let self = this;
    this.scene.mouseover(function(e){
        // let mousePos = {
        //     x: e.x,
        //     y: e.y
        // }
        // this.scene.removeEventListener("mousemove"); // 解绑事件
        // var tmpnode = {
        //     name: child.title,
        //     //todo 将left和top的坐标修改成鼠标在场景中的位置
        //     left: mousePos.x,
        //     top: mousePos.y,
        //     // left: parseInt($temp.css('left')) - tar_pos.left,
        //     // top: parseInt($temp.css("top")) - tar_pos.top,
        //     type: child.title + '_icon.png'
        // };
        // addNode(tmpnode);
    })

    this.scene.mouseout(function(event) {
        // console.log('mouseout')
    })

    this.scene.click(function (event) {

    })

    this.scene.dbclick(function (event) {

    })

    this.scene.mousedown(function (e) {
        console.log('scene.mousedown')
        // if (self.link && !self.isSelectedMode  && (e.target == null || e.target === self.beginNode || e.target === self.link)) {
        //     this.remove(self.link);
        // }
    })

    this.scene.mouseup(function (e) {
        console.log('scene.mouseup')
        if(e.target && e.target.type == 'tag')
            return false;
        if(e.target )
            self.currentNode = e.target;
        if(e.target && e.target instanceof  JTopo.Node && e.target.layout && e.target.layout.on && e.target.layout.type && e.target.layout.type !="auto")
            JTopo.layout.layoutNode(this, e.target,true,e);
        if (e.button == 2 ) {//右键菜单
            $("div[id$='Menu']").hide();
            var menuY =  e.layerY ? e.layerY : e.offsetY;
            var menuX =  e.layerX ? e.layerX : e.offsetX;
            //记录鼠标触发位置在canvas中的相对位置
            self.xInCanvas = menuX;
            self.yInCanvas = menuY;
            if(e.target){
                //处理节点右键菜单事件
                if(e.target instanceof JTopo.Node){
                    var selectedNodes = self.utils.getSelectedNodes();
                    //如果是节点多选状态弹出分组菜单
                    if(selectedNodes && selectedNodes.length > 1){
                        //判断边界出是否能完整显示弹出菜单
                        if(menuX + self.groupMangeMenu.width() >= self.stage.width){
                            menuX -= self.groupMangeMenu.width();
                        }
                        if(menuY + self.groupMangeMenu.height() >= self.stage.height){
                            menuY -= self.groupMangeMenu.height();
                        }
                        self.groupMangeMenu.css({
                            top: menuY,
                            left: menuX
                        }).show();
                    }else{
                        //判断边界出是否能完整显示弹出菜单
                        if(menuX + self.nodeMainMenu.width() >= self.stage.width){
                            menuX -= self.nodeMainMenu.width();
                        }
                        if(menuY + self.nodeMainMenu.height() >= self.stage.height){
                            menuY -= self.nodeMainMenu.height();
                        }
                        self.nodeMainMenu.css({
                            top: menuY,
                            left: menuX
                        }).show();
                    }
                }else if(e.target instanceof JTopo.Link){//连线右键菜单
                    if(e.target.lineType == "rule"){
                        editor.utils.hideRuleLines();//删除标尺线
                    }else{
                        self.lineMenu.css({
                            top: e.layerY ? e.layerY : e.offsetY,
                            left: e.layerX ? e.layerX : e.offsetX
                        }).show();
                    }
                }else if(e.target instanceof JTopo.Container){//容器右键菜单
                    self.containerMangeMenu.css({
                        top: e.layerY ? e.layerY : e.offsetY,
                        left: e.layerX ? e.layerX : e.offsetX
                    }).show();
                }
            }else{
                //判断边界出是否能完整显示弹出菜单
                if(menuX + self.mainMenu.width() >= self.stage.width){
                    menuX -= self.mainMenu.width();
                }
                if(menuY + self.mainMenu.height() >= self.stage.height){
                    menuY -= self.mainMenu.height();
                }
                self.mainMenu.css({
                    top: menuY,
                    left: menuX
                }).show();
            }

        } else if (e.button == 1) {//中键

        } else if (e.button == 0) {//左键
            if(e.target != null && e.target instanceof JTopo.Node && !self.isSelectedMode){
                if(self.beginNode == null){
                    self.beginNode = e.target;
                    if(self.lineType == "line"){
                        self.link = new JTopo.Link(self.tempNodeA, self.tempNodeZ);
                        self.link.lineType = "line";
                    }else if(self.lineType == "foldLine"){
                        self.link = new JTopo.FoldLink(self.tempNodeA, self.tempNodeZ);
                        self.link.lineType = "foldLine";
                        self.link.direction =  self.config.direction;
                    }else if(self.lineType == "flexLine"){
                        self.link = new JTopo.FlexionalLink(self.tempNodeA, self.tempNodeZ);
                        self.link.direction =  self.config.direction;
                        self.link.lineType = "flexLine";
                    }else if(self.lineType == "curveLine"){
                        self.link = new JTopo.CurveLink(self.tempNodeA, self.tempNodeZ);
                        self.link.lineType = "curveLine";
                    }
                    self.link.dashedPattern = 2;
                    self.link.lineWidth = self.config.lineWidth;
                    self.link.shadow = self.config.showLineShadow;
                    self.link.strokeColor =  JTopo.util.randomColor();
                    this.add(self.link);
                    self.tempNodeA.setLocation(e.x, e.y);
                    self.tempNodeZ.setLocation(e.x, e.y);
                }else if(e.target && e.target instanceof JTopo.Node && self.beginNode !== e.target){//结束连线
                    var endNode = e.target;
                    //判断两个节点是否有循环引用
                    for(var el = 0; el < endNode.outLinks.length ; el++){
                        //存在循环引用，线条变红
                        if(endNode.outLinks[el].nodeZ == self.beginNode){
                            if(self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }
                    }
                    //节点间是否有重复连线,即起点到终点有两条以上连线
                    for(var el2 = 0; el2 < self.beginNode.outLinks.length ; el2++){
                        //起始节点已经有一条线指向目标节点
                        if(self.beginNode.outLinks[el2].nodeZ == endNode){
                            if(self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }
                    }
                    //自定义路由器设备不能被别的设备指向
                    if(endNode.dataType == "ECVR"){
                        if(self.link)
                            this.remove(self.link);
                        self.beginNode = null;
                        return;
                    }
                    //自定义网络直接连接的设备必须是交换机
                    if(self.beginNode.dataType == "ECVR"){
                        if(endNode && endNode.dataType != "EC"){
                            if(self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }else{//每连接一个交换机，就在属性面板上添加一个连接信息属性面板
                            self.createPanel(self,self.beginNode.templateId,endNode.text + "--路由器连接信息",true,endNode.deviceId,endNode.templateId,self.beginNode.id, context + "vmvrManage/showVmvrRouterConnect",false);
                        }
                    }
                    //防火墙只能连接一个路由器
                    if(self.beginNode.dataType == "FW"){
                        if(endNode && endNode.dataType != "VR"){
                            if(self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }else{//只能连接一个VR
                            if(self.beginNode.outLinks.length > 0){
                                if(self.link)
                                    this.remove(self.link);
                                self.beginNode = null;
                                return;
                            }
                        }
                    }
                    if(self.beginNode.dataType == "VR"){//VR也只能连一个防火墙
                        if(endNode && endNode.dataType == "FW"){
                            var lines = endNode.outLinks.concat(endNode.inLinks);
                            for(var ln = 0 ; ln < lines.length; ln++){
                                if(lines[ln].nodeA.dataType == "VR" || lines[ln].nodeZ.dataType == "VR"){
                                    if(self.link)
                                        this.remove(self.link);
                                    self.beginNode = null;
                                    return;
                                }
                            }
                        }
                    }
                    var l;
                    if(self.lineType == "line"){
                        l = new JTopo.Link(self.beginNode, endNode);
                        l.lineType = "line";
                    }else if(self.lineType == "foldLine"){
                        l = new JTopo.FoldLink(self.beginNode, endNode);
                        l.direction = self.config.direction;
                        l.bundleOffset = self.config.offsetGap;//折线拐角处的长度
                        l.lineType = "foldLine";
                    }else if(self.lineType == "flexLine"){
                        l = new JTopo.FlexionalLink(self.beginNode, endNode);
                        l.direction = self.config.direction;
                        l.lineType = "flexLine";
                        l.offsetGap = self.config.offsetGap;
                    }else if(self.lineType == "curveLine"){
                        l = new JTopo.CurveLink(self.beginNode, endNode);
                        l.lineType = "curveLine";
                    }
                    //连线所处拓扑层级
                    l.topoLevel = editor.stage.topoLevel;
                    l.parentLevel = $("#parentLevel").val();
                    l.fontColor = self.config.lineFontColor;
                    //保存线条所连接的两个节点ID
                    l.deviceA = self.beginNode.deviceId;
                    l.deviceZ = endNode.deviceId;
                    if(self.lineType != "curveLine")
                        l.arrowsRadius = self.config.arrowsRadius;
                    l.strokeColor = self.config.strokeColor;
                    l.lineWidth = self.config.lineWidth;

                    this.add(l);
                    self.beginNode = null;
                    this.remove(self.link);
                    self.link = null;
                }else{
                    self.beginNode = null;
                }
            }else{
                if(self.link)
                    this.remove(self.link);
                self.beginNode = null;
            }
        }
    })

    // 动态更新连线坐标
    this.scene.mousemove(function (event) {
        if (!self.isSelectedMode && self.beginNode) {
            self.tempNodeZ.setLocation(event.x, event.y)
        }
    })

    this.scene.mousedrag(function (event) {
        console.log('scene.mousedrag')
        // console.log(event)
        if (!self.isSelectedMode && self.beginNode) {
            self.tempNodeZ.setLocation(event.x, event.y)
        }
    })

    this.stage.click(function (event) {

    })

    this.stage.mouseout(function (event) {
        console.log('stage.mouseout')
    })

    $(document).keyup(function (e) {
        if(e.which == 17){
            self.isSelectedMode = false;
            return false;
        }
    });
    //第一次进入拓扑编辑器,生成stage和scene对象
    if(topologyJson == "-1"){
        this.saveToplogy(false);
    }
}

/**
 * 图元拖放功能实现
 * @param modeDiv
 * @param drawArea
 */
 topologyEditor.prototype.drag = function (modeDiv, drawArea, text) {
    if (!text) text = "";
    let self = this;
    //拖拽开始,携带必要的参数
    modeDiv.ondragstart = function (event) {
        event = event || window.event;
        let dragSrc = this;
        let backImg = $(dragSrc).find("img").eq(0).attr("src");
        backImg = backImg.substring(backImg.lastIndexOf('/') + 1)
        let dataType = $(this).attr('dataType')
        try {
            //IE只允许KEY为text和URL
            event.dataTransfer.setData('text', backImg + ";" + text + ";" + dataType);
        } catch (ex) {
            console.log(ex);
        }
    }

    drawArea.ondragover = function (event) {
        event.preventDefault()
        return false
    }

    //创建节点
    drawArea.ondrop = function (event) {
        event = event || window.event
        console.log(event)
        let data = event.dataTransfer.getData('text')
        let img, text, dataType
        if (data) {
            let datas = data.split(';')
            if (datas && datas.length === 3) {
              img = datas[1]+'.png'
              text = datas[1]
              dataType = datas[2]
              let node = new JTopo.Node()
              node.fontColor = self.config.nodeFontColor
              node.setBound((event.offsetX ? event.offsetX : event.layerX) - self.scene.translateX - self.config.defaultWidth*2 + 50, (event.offsetY ? event.offsetY : event.layerY) - self.scene.translateY - self.config.defaultHeight * 2 + 50, self.config.defaultWidth, self.config.defaultHeight)
            //   node.setBound((event.layerX ? event.layerX : event.offsetX) - self.scene.translateX - self.config.defaultWidth / 2, (event.layerY ? event.layerY : event.offsetY) - self.scene.translateY - self.config.defaultHeight / 2,self.config.defaultWidth,self.config.defaultHeight)
            // console.log((event.layerX ? event.offsetX : event.offsetX) - self.scene.translateX - self.config.defaultWidth/2)
            // console.log((event.layerY ? event.offsetY : event.offsetY) - self.scene.translateY - self.config.defaultHeight / 2)
            //  node.setImage('https://qmplusimg.henrongyi.top/gva_header.jpg', true)
              node.setImage(require('../../src/assets/' + img), true)
              var cuurId = "" + new Date().getTime() * Math.random();
              node.deviceId = cuurId
              node.dataType = dataType
            //   ++self.modeIdIndex;
              node.text = text;
              node.layout = self.layout;
            //   node.nodeImage = img
            //   node.x = '236.7085889570552'
            //   node.y = '27.0659509202454'
              self.scene.add(node)
              self.currentNode = node
            //   window.filterTopoLeftData();
            }
        }
    }
}

topologyEditor.prototype.utils = {
    //获取所有选择的节点实例
    getSelectedNodes : function(){
        var selectedNodes = [];
        var nodes = editor.scene.selectedElements;
        return nodes.forEach(function(n){
            if(n.elementType === "node")
                selectedNodes.push(n);
        }),selectedNodes;
    },
    //删除连线
    deleteLine : function(){
        if(editor.currentNode instanceof  JTopo.Link){
            editor.scene.remove(editor.currentNode);
            if(editor.currentNode.id)
                editor.deleteNodeById(editor.currentNode.id,"link");
            editor.currentNode = null;
            editor.lineMenu.hide();
        }
    },
    //删除节点
    deleteNode : function(n){
        editor.scene.remove(n);
        if (n.id)
            editor.deleteNodeById(n.id, n.elementType, n.dataType);
        editor.currentNode = null;
        //连线重置
        editor.beginNode = null;
        if (editor.link)
            editor.scene.remove(editor.link);
        editor.link = null;
    },
    //删除选择的节点
    deleteSelectedNodes : function(){
        var self = this;
        var nodes = editor.scene.selectedElements;
        if(nodes && nodes.length > 0){
            for(var i=0 ; i < nodes.length ; i++){
                self.deleteNode(nodes[i]);
            }
        }
    },
    //保存节点初始状态,便于回退
    saveNodeInitState: function () {
        if(!editor.currentNode.hasInitStateSaved){
            editor.currentNode.historyStack.push(JTopo.util.clone(editor.currentNode));
            editor.currentNode.hasInitStateSaved = true;
        }
    },
}
