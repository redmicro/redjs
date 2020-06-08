Rsd.define('Rsd.developer.WapPageEditorPage', {
    extend: 'Rsd.container.Page',
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
        'Rsd.control.Svg'],
    layout: 'border',
    header:{
        xtype:'list-menu',
        width:'100%',
        visible:true,
        cls:'x-list-view-toolbar',
        height:50,
        itemClick:'btn_add',
        "itemStyle":{"height":'50px',"width":'auto',"float":'left',"textAlign":'center',"marginRight":'2px'}
        },
    items:[
        {
            xtype: 'grid',
            region:'left',
            label:{
               xtype:'combobox',
               label: {
                   content: '文档列表',
                   height:30,
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
                onchange:'btn_type_change',
                height:40
            },
            height:'100%',
            overflow:'auto',
            "style":{backgroundColor:'rgba(255, 255, 255, 0.25)'},
            border:false,
            columns:[{xtype:'index',text:'序号'},{text:'名称',width:80,dataIndex:'name'},{text:'类型',width:100,dataIndex:'value',editable:true},{dataIndex:'op',width:20}],
            dataSource:[{name:'春节档首页'},{name:'元霄档首页'},{name:'2-14情人节首页'},{name:'3-8节首页'}],
            rowdblclick:'doc_rowdblclick',
            margin:'0 0 10 0',
            width:250
        },
        {
            xtype:'simulator',
            region:'center',
            title:'',
            height:'100%',
            border:false,
            margin:'10px auto 10px auto',
            onChanged:'buildTree',
            onSelectChanged:'showProperty',
            flex:500
        },
        {
            xtype: 'grid',
            region:'right',
            label:{content:'属性',style:{backgroundColor:'rgba(31, 116, 227, 0.247059)',fontSize:'120%'},position:'top',height:40},
            height:'100%',
            overflow:'auto',
            "style":{backgroundColor:'rgba(255, 255, 255, 0.25)'},
            border:false,
            columns:[{text:'名称',width:80,dataIndex:'name'},{text:'值',width:100,dataIndex:'value',editable:true},{dataIndex:'op',width:20}],
            rowdblclick:'pr_rowdblclick',
            margin:'0 0 10 0',
            width:250
        },
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
            style:{backgroundColor:'#rgba(255, 255, 255, 0.25)'},
            height:'100%',
            nodeClick:'select_ele',
            showRoot:false,
            border:false,
            margin:'0 10 0 0',
            width:250
        },
        {
            height:50,
            //width:'500px',
            border:false,
            margin:'10 50 0 50',
            style:{backgroundColor:'rgba(31, 116, 227, 0.247059)',lineHeight:50},
            fixed:{bottom:30,right:500,left:250},
            layout:'hbox',
            items:[
                {flex:1},
                {xtype:'button',text:'预 览',handler:'btn_preview'},
                {xtype:'button',text:'保 存',handler:'btn_save'},
                {xtype:'button',text:'发 布',handler:'btn_relase'},
                {xtype:'button',text:'重 置',handler:'btn_reset'},
                {flex:1}
            ]
        }

    ],
    ctrlConfig:[
        {text:'Form',icon:'default.123',width:80,config:{xtype:'form',draggable:true,text:'Form',border:true,width:'100%',height:100}},
        {text:'Box',icon:'default.123',width:80,config:{xtype:'container',draggable:true,text:'Box',border:true,width:'100%',height:100}},
        {text:'图片',width:90,config:{xtype:'image',draggable:true,text:'Image',border:false,view:false,width:'100%',height:150,
                src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532410988540&di=33cd12dd3d1b9b96af35c45c77064a1f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa686c9177f3e67097d4b8ed230c79f3df8dc5550.jpg'}
        },
        {text:'文本',icon:'default.6',width:90,config:{xtype:'label',draggable:true,label:'标题',text:'文字信息',width:'100%'}},
        {text:'Image',width:100,config:{xtype:'image',draggable:true,text:'Image'}},
        {text:'按钮',width:90,config:{xtype:'button',draggable:true,text:'提交按钮'}},
        {text:'幻灯片',width:110,config:{}},
        {text:'Icons',width:110,config:{}},
        {text:'tabList',width:110,config:{}},
        {text:'导航栏',width:110,config:{}},
        {text:'统计',width:90,config:{}}
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
    /*
    *
    * */
    load:function load() {
        //this.items[4].dom.style.left = ( Rsd.app.MainForm.left.dom.clientWidth + 250)+'px';
        this.items[0].loadData();
        this.items[1].setDocumentIndex("javascript:void(0);");

        var svg = Rsd.create('Rsd.common.Svg',{});
        svg.load(Rsd.getRedjsUrl('/resources/svg/default.js'));


        var  btns = Rsd.create('Rsd.data.Menu',{});
        for(var i in this.ctrlConfig)
        {
            btns.addItem(this.ctrlConfig[i]);
        }

        var listView = this.header.content ;
        listView.loadData(btns);


        var me = this;
        var _doc = me.items[1].getDocument();
        if(_doc==null)
        {
            setTimeout(function () {

                var _doc = me.items[1].getDocument();
                if(_doc != null)
                {
                    var link = _doc.createElement('link');
                    link.type = 'text/css';
                    link.rel = 'stylesheet';
                    link.href = Rsd.getRedjsHost() + '/resources/css/Rsd.css';
                    var head = _doc.getElementsByTagName('head')[0];
                    head.appendChild(link);

                    me.items[1].setDocumentTitle('无标题');
                }
                me.buildTree();
            },100);
        }

    },
    /*
    * */
    btn_preview:function btn_preview()
    {
        Rsd.showPopup('预览');
    },
    btn_save:function btn_save()
    {
        Rsd.showPopup('保存成功');
    },
    btn_relase:function btn_relase()
    {
        Rsd.showPopup('发布');
    },
    btn_reset:function btn_reset()
    {
        Rsd.showPopup('重置');
    },
    btn_type_change:function btn_type_change()
    {
        Rsd.showPopup('筛选');
    },
    /*
    *
    * */
    btn_add:function btn_add(item) {
        var me = this;
        var _menu = item.content.menu;

        var _ctrl = this.items[1].addControl(_menu.config);

        this.showProperty(_ctrl, null);

        setTimeout(function () {
            me.buildTree();
        },20);

    },
    /*
    * */
    btn_refresh:function btn_refresh()
    {
        this.buildTree();
    },
    /*
    *
    * */
     buildTree:function buildTree() {


         var _doc = this.items[1].getDocConfig();
         var _tree = this.items[3];

         var _nodes = [];
         _nodes.push({text: _doc.title,id:_doc.id,  autoExpanded: true, dynamic: true, tag: _doc.element})
         var _list = _doc.items;

         for (var i = 0; i < _list.length; i++) {
             var _obj = _list[i];
             var _config = {
                 id: _obj.id,
                 pid: _obj.parent,
                 text: _obj.text + '[' + _obj.xtype + ']',
                 title: _obj.title,
                 autoExpanded: true,
                 dynamic: true,
                 tag: _obj.element
             };
             _nodes.push(_config);
         }

         _tree.loadData(_nodes);

     },
    /*
    * */
    select_ele:function select_ele(node,event)
    {
        if(node.tag)
        {
            this.showProperty(node.tag,event);
        }else
        {
            Rsd.showMessage('对象不存在');
        }

    },
    /*
    * */
    showProperty:function showProperty(sender, event) {

        var _grid = this.items[2];
        _grid.element = sender;
        var arr = [];


        var _config = this.items[1].getControlConfig(sender);

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
    /*
    * */
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
                textChanged:'on_change',
            }));
        }

    },
    /*
    *
    * */
    on_change:function on_change(sender,event) {

        var _grid = this.items[2];
         if(Rsd.isType(_grid.element ,HTMLDocument))
         {
             if(sender.name == 'title')
             {
                 this.items[1].setDocumentTitle(sender.getValue());
             }
             if(sender.name == 'indexFile')
             {
                 this.items[1].setDocumentIndex(sender.getValue());
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