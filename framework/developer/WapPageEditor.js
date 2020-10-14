Rsd.define('Rsd.developer.WapPageEditor', {
    extend: 'Rsd.container.Dialog',
    requires: [
        'Rsd.container.Form',
        'Rsd.control.Button',
        'Rsd.control.Text',
        'Rsd.control.ComboBox',
        'Rsd.control.Grid',
        'Rsd.control.Image',
        'Rsd.control.ListView',
        'Rsd.control.ListMenu',
        'Rsd.container.Simulator',
        'Rsd.control.Tree',
        'Rsd.control.Svg'
    ],
    layout: 'border',
    width:'100%',
    height:'100%', 
    closeBtn:false,
    header:{height:55,style:{border:'0px',backgroundColor:'rgba(0,0,0,0.55)'}},
    style:{overflow:'auto'},
    cls:'',
    autoLoad:true,
    items:[ 
        //page list
        {
            xtype: 'grid',
            region:'left',
            margin:'0 10 10 0',
            width:350,
            label:{
               xtype:'combobox',
               label: {
                   content: '文档类型',
                   height:30,
                   width:100,
                   "style": {
                       fontWeight: 300,
                       //backgroundColor:'rgba(31, 116, 227, 0.247059)',
                       fontSize: '120%'
                   }
               },
                margin:'5 0 5 0',
                width:'100%',
                position:'top',
                nullText: '--请选择类型--',
                dataSource:[{text:'商场首页'},{text:'专题活动'},{text:'会员中心'},{text:'商品详情'},{text:'商品分类'}],
                textChanged:'page_type_changed',
                height:40
            },
            height:'100%',
            overflow:'auto',
            "style":{backgroundColor:'rgba(214,214,214,0.2)'},
            border:false,
            columns:
            [
                {xtype:'index',text:'序号'},
                {text:'名称',width:180,dataIndex:'name'},
                {text:'类型',width:100,dataIndex:'value',editable:true},
                {dataIndex:'op',width:20}
            ],
            dataSource:
            [
                {name:'春节档首页'},
                {name:'元霄档首页'},
                {name:'2-14情人节首页'},
                {name:'3-8节首页'}
            ],
            rowdblclick:'doc_rowdblclick'
        },
        //control list
        {
            xtype:'list-menu', 
            region:'left',
            margin:'0 10 10 0',
            width:100,
            visible:true,
            border:false,
            style:{backgroundColor:'rgba(31, 116, 227, 0.247059)',lineHeight:50,zIndex:9999,border:'1px black solid'},
            cls:'x-list-view-toolbar',  
            itemClick:'btn_add',
            "itemStyle":{"height":'50px',"width":'80px',"float":'left',"textAlign":'left',"marginRight":'2px'}
        },
        //simulator
        {
            xtype:'simulator',
            region:'center',
            title:'',
            height:'100%',
            border:false,
            margin:'10px auto 10px auto',
            onChanged:'buildTree',
            onSelectChanged:'showProperty',
            flex:500, 
        },
        //property list
        {
            xtype: 'grid',
            region:'right',
            label:{content:'属性',style:{backgroundColor:'rgba(31, 116, 227, 0.247059)',fontSize:'120%'},position:'top',height:40},
            height:'100%',
            overflow:'auto',
            "style":{backgroundColor:'rgba(214,214,214,0.2)'},
            border:false,
            columns:[{text:'名称',width:80,dataIndex:'name'},{text:'值',width:100,dataIndex:'value',editable:true},{dataIndex:'op',width:20}],
            rowdblclick:'pr_rowdblclick',
            margin:'0 0 10 10',
            width:350
        },
        //doc tree
        {
            xtype:'tree',
            region:'right',
            label:{
                xtype:'button',
                margin:'5 0 5 0',
                height:40,
                label:{
                    content:'文档结构',
                    align:'left',
                    height:30,
                    width:150,
                    "style":{
                        fontWeight:300,
                        //backgroundColor:'rgba(31, 116, 227, 0.247059)',
                        fontSize:'120%'
                    },
                },
                text:'刷新',
                width:'100%',
                handler:'btn_refresh'
            },
            "style":{backgroundColor:'rgba(214,214,214,0.2)',border:'1px black solid'},  
            nodeClick:'tree_select_ctrl',
            showRoot:false,
            border:false,
            margin:'0 0 0 0',
            width:280
        },
        //buttons
        {
            height:50,
            region:'bottom',
            //width:'500px',
            border:false,
            margin:'10 50 10 50',
            "style":{backgroundColor:'rgba(31, 116, 227, 0.247059)',lineHeight:50,display:'flex'}, 
            layout:'hbox',
            items:[
                {flex:1},
                {xtype:'button',text:'预 览',handler:'_btn_preview'},
                {xtype:'button',text:'保 存',handler:'_btn_save'}, 
                {xtype:'button',text:'重 置',handler:'btn_reset'},
                {xtype:'button',text:'退 出',handler:'btn_close'},
                {flex:1}
            ]
        }

    ],
    ctrlConfig:[
        {
            text:'Form',
            icon:'default.123',
            config:
            {
                xtype:'form',
                draggable:true,
                text:'Form',
                border:true,
                width:'100%',
                height:100
            }
        },
        {
            text:'Box',
            icon:'default.123',
            config:{
                xtype:'container',
                draggable:true,
                text:'Box',
                border:true,
                width:'100%',
                height:100
            }
        },
        {
            text:'图片',
            icon:'default.146',
            config:{
                xtype:'image',
                draggable:true,
                text:'Image',
                border:false,
                view:false,
                width:'100%',
                height:150,
                src:'http://image.redmicro.cn/wxapp/xchief/emptyImg.png'
            }
        },
        {
            text:'文本',
            icon:'default.6',
            config:{xtype:'label',draggable:true,label:'标题',text:'文字信息',width:'100%'}
        },
        {
            text:'连接',
            icon:'default.5',
            config:{xtype:'link', width:'100%',draggable:true,text:'点击跳转'}
        },
        {
            text:'按钮',
            icon:'default.14',
            config:{xtype:'button',draggable:true,text:'提交按钮'}
        },
        {
            text:'幻灯片',
            config:{}
        },
        {text:'Icons',config:{}},
        {text:'tabList',config:{}},
        {text:'导航栏',config:{}},
        {text:'报表',config:{}}
    ],
    saveApi:null,
    getApi:null,
    listApi:null,
    previewApi:null,
    puplishApi:null,
    /*
    * */
    constructor: function WapPageEditorPage(config) {
        config = config || {};
        this.apply(config);
    },
    /**
     * 
     */
    onAfterInit:function onAfterInit()
    {
        this.callParent();
        this.setElStyle('container',{minHeight:900,minWidth:1600});
    },
    /*
    * 加载数据
    * */
    load:function load() {
        //this.items[4].dom.style.left = ( Rsd.app.MainForm.left.dom.clientWidth + 250)+'px';
        this.items[0].loadData();
        
        var svg = Rsd.create('Rsd.common.Svg',{});
        svg.load(Rsd.getRedjsUrl('/resources/svg/default.js'));


        var  btns = Rsd.create('Rsd.data.Menu',{});
        for(var i in this.ctrlConfig)
        {
            btns.addItem(this.ctrlConfig[i]);
        }

        var listView = this.items[1];

        setTimeout(function(){
            listView.loadData(btns);
        },1000);
        

        var me = this;
        var _doc = me.items[2].getDocument();
        //if(_doc==null)
        {
            setTimeout(function () {

                var _doc = me.items[2].getDocument();
                if(_doc != null)
                {
                    var link = _doc.createElement('link');
                    link.type = 'text/css';
                    link.rel = 'stylesheet';
                    link.href = Rsd.getRedjsHost() + 'resources/css/Rsd.css';
                    var head = _doc.getElementsByTagName('head')[0];
                    head.appendChild(link);

                    me.items[2].setDocumentTitle('无标题');
                }
                me.buildTree();
            },100);
        }

    },
    /**
     * 
     */ 
    _btn_preview:function _btn_preview()
    {
        Rsd.showPopup('预览');
    },
    /**
     * 
     */
    _btn_save:function _btn_save()
    {
        var simulator = this.items[2];
        var doc = simulator.getDocConfig(); 
        this.funApplyByIOC(this.saveApi,[doc]); 
    },
     /**
      * 
      */
    btn_reset:function btn_reset()
    {
        Rsd.showPopup('重置');
    },
    /**
     * 
     */
    btn_close:function btn_close()
    {
        Rsd.showPopup('退出');
        this.close();
    },
    /**
     * 
     */
    page_type_changed:function page_type_changed(sender,e)
    {
        this.funApplyByIOC(this.listApi,[sender.selectedItem]);  
    },
    /** 
     * 
    */
    btn_add:function btn_add(item) {
        var me = this;
        var _menu = item.content.menu;
        if(_menu.config=== undefined || _menu.config==null)
        {
            Rsd.alert('控件['+_menu.text +']未设置config');
            return;
        }
        if(Rsd.isEmpty(_menu.config.xtype))
        {
            Rsd.alert('控件['+_menu.text +']config属性未设置xtype');
            return;
        }
        var _ctrl = this.items[2].addControl(_menu.config);

        this.showProperty(_ctrl, null);

        setTimeout(function () {
            me.buildTree();
        },20);

    },
    /**
     * 
     */
    btn_refresh:function btn_refresh()
    {
        this.buildTree();
    },
    /**
     * 构建文档结构树
     */
    buildTree:function buildTree() {


         var _doc = this.items[2].getDocConfig();
         var _tree = this.items[4];

         var _nodes = [];
         _nodes.push({text: _doc.title,id:_doc.id,  autoExpanded: true, dynamic: true, tag: _doc.element})
         var _list = _doc.items;

         for (var i = 0; i < _list.length; i++) {
             var _obj = _list[i];
             var _config = {
                 id: _obj.id,
                 pid: _obj.parent,
                 text: _obj.id + '[' + _obj.xtype + ']',
                 title: _obj.title,
                 autoExpanded: true,
                 dynamic: true,
                 tag: _obj.element
             };
             _nodes.push(_config);
         }

         _tree.loadData(_nodes);

     },
    /**
     * 文档结构中 选择则控件
     * @param {*} node 
     * @param {*} event 
     */
    tree_select_ctrl:function tree_select_ctrl(node,event)
    {
        if(node.tag)
        {
            this.loadCtrlProperty(node.tag,event);
        }else
        {
            Rsd.showMessage('对象不存在');
        }

    },
    /** 
     * 展示控件属性值
     * */ 
    loadCtrlProperty:function loadCtrlProperty(sender, event) {

        var _grid = this.items[3];
        _grid.element = sender;
        var arr = [];


        var _config = this.items[2].getControlConfig(sender);

        for (var i in _config) {
            var _c = _config[i];

            var _r = {name: i, value: _config[i], op: '...'};

            if(Rsd.isType(_c,HTMLDocument))
            {
                _r['op'] = '';
            }
            if (_c instanceof Element) {
                _r['op'] = '';
            }
            if (_c instanceof Rsd.common.ComponentX) {
                _r['op'] = '';
            }
            if (i == 'id') {
                _r['op'] = '';
            }
            if (i == 'xtype') {
                _r['op'] = '';
            }
            if (i == 'parent') {
                _r['op'] = '';
            }
            if (i == '$className') {
                _r['op'] = '';
            }
            arr.push(_r);

        }

        _grid.loadData(arr);

    },
    /**
     * 修改属性值
     */ 
    pr_rowdblclick:function pr_rowdblclick(row,data) {
        var me = this;
        var grid = data.parent;
        var rowIndex = data.rowIndex;
        if(Rsd.isEmpty(row['op']))
        {
            return;
        }

        if(Rsd.isObject(row['value']))
        {
            Rsd.create('Rsd.control.JsonEidtor',{ onChange:function (json) {
                    row['value'] = json;
                    grid.element[row['name']] = json;
                    grid.element.doLayout();
                    me.buildTree(_grid.element,null);
                }}).showDialog().loadData(row['value']);
        }
        else
        {
            grid.editRow(rowIndex, true,1,Rsd.widget(row['xtype']||'text',{
                margin:'3 5 3 5',
                width:'100%',
                height:'90%',
                name:row['name'],
                textChanged:'pr_on_changed',
            }));
        }

    },
    /**
    *属性值发生改变
    * */
   pr_on_changed:function pr_on_changed(sender,event) {

        var _grid = this.items[3];
         if(Rsd.isType(_grid.element ,HTMLDocument))
         {
             if(sender.name == 'title')
             {
                 this.items[2].setDocumentTitle(sender.getValue());
             }
             if(sender.name == 'indexFile')
             {
                 this.items[2].setDocumentIndex(sender.getValue());
             }
             //
         }
         else
         {
             _grid.element[sender.name] = sender.getValue();
             _grid.element.doLayout();

         }
        this.buildTree();
    }

});