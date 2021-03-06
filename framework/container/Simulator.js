/*
*
* */
Rsd.define('Rsd.container.Simulator', {
    extend: 'Rsd.container.Component',
    xtype: 'simulator',
    //margin: '10 0 10 0',
    height: '100%',
    width: '100%',
    title: '模拟器',
    layout:'fit',
    header:{cls:'x-phone-header',space:1,visible:true},
    cls:'x-simulator',
    bodyCls:'x-phone-body',
    items:[],
    setting:[
        {name:'$className',text:'类名',readOnly:true}, 
        {name:'xtype',text:'类名简称',readOnly:true},
        {name:'id',text:'ID',readOnly:true},
        {name:'style',text:'dom样式',readOnly:false}, 
        {name:'bodyCls',text:'body样式',readOnly:true},
        {name:'cls',text:'container演示',readOnly:true},
        {name:'label',text:'组件头部',readOnly:false,children:['style']},
        {name:'header',text:'组件头部',readOnly:false},
        {name:'title',text:'标题',readOnly:false},
        {name:'name',text:'html dom name',readOnly:false},
        {name:'height',text:'高度',readOnly:false},
        {name:'width',text:'宽度',readOnly:false}, 
        {name:'layout',text:'布局方式',readOnly:false},
        {name:'floating',text:'浮动',readOnly:false},
        {name:'text',text:'文字',readOnly:false},  
        {name:'mulitiLine',text:'多行',readOnly:false},
        {name:'action',text:'表单提交API',readOnly:false},
        {name:'method',text:'表单提交方法',readOnly:false},
        {name:'src',text:'图片地址',readOnly:false}
    ],
    //已加载的控件
    controls:{},
    /** 
     * */ 
    constructor: function Simulator(config) {
        config = config || {};
        this.apply(config);
        this.items.push({
            width:'100%',
            height:'100%',
            header:{cls:'x-app-header',height:45,space:1,visible:true},
            bodyTagName:'iframe',
            bodyCls:'x-app-body',
            afterLayout:'app_afterLayout',
            border:false
        });
    }, 
    /** 
     * */ 
    onAfterInit:function onAfterInit()
    {
        var me = this;
        this.callParent();

        this.body.style.bottom ='45px';
        var _footer = document.createElement('div');
        _footer.classList.add('x-phone-footer');
        this.container.appendChild(_footer);
        //this.items[0].body.src ='#';
        this.items[0].body.onload = function () {

            var _doc = me.getDocument();
            Rsd.onDrop(_doc, function (event) {
                //console.log('doc drop');
                var _data = Rsd.toJson(event.dataTransfer.getData('Text'));
                if (_data&&_data.id) {

                    var _ctrl = me.getControl(_data.id);
                    _ctrl.parent = null;
                    _doc.body.appendChild(_ctrl.dom);

                    if(me.onChanged)
                    {
                        me.funApplyByIOC(me.onChanged,[_ctrl,event]);
                    }
                }
            });
            Rsd.onDragOver (_doc,function (event) {
                //console.log('doc DragOver')
            });
        }
        this.simulator = this.items[0];
    },
    /**
     * @description 加载 page 数据
     * @param {*} data 
     */
    loadData:function loadData(data)
    {
        var _data = data||{};
        var items = _data.items||[];
        for(var i in items)
        {
            this.addControl(items[i]);
        }
    },
    /**
     * 
     *  */ 
    app_afterLayout:function app_afterLayout()
    {
        var _height =  parseInt(this.items[0].container.clientHeight);
        this.items[0].body.style.height = _height - 46 + 'px';
    },
     /**
      * @description 添加控件
      */ 
   addControl:function addControl(config) 
   {
        var me = this;
        var _doc = this.getDocument();
        var _config = Rsd.apply({},config || {});

        _config.parent= _doc;
        _config.domFlag='simulator';
        _config.domFlagValue='redmicro';
        _config.listeners= {
                'click': {
                    element: 'dom',
                    fn: function (sender, event) {
                        me.funApplyByIOC(me.onSelectChanged, [sender, event])
                    }
                },
                'focus': {
                    element: 'dom',
                    fn: function (sender, event) {
                        me.funApplyByIOC(me.onSelectChanged, [sender, event])
                    }
                },
                'blur': {
                    element: 'dom',
                    fn: function (sender, event) {
                        Rsd.showPopup('blur');
                    }
                },
                'mouseover': {
                    element: 'dom',
                    fn: function (sender, event) {
                        sender.addCls('container', 'x-component-edit-box');

                    }
                },
                'mouseout': {
                    element: 'dom',
                    fn: function (sender, event) {

                        sender.removeCls('container', 'x-component-edit-box');
                    }
                },
                'dragstart':{
                    element:'dom',
                    fn:function (sender,event) {
                        sender.addCls('container', 'x-component-edit-box');

                        event.dataTransfer.setData('Text',Rsd.toString({cmd:'move',id:sender.id,pageX:event.pageX||event.clientX,pageY:event.pageY||event.clientY}));
                    }
                },
                'dragover':{
                    element:'body',
                    fn:function (sender,event) {
                        event.preventDefault();

                        var _data = Rsd.toJson(event.dataTransfer.getData('Text'));
                        if(_data == null || _data.id == this.id)return;
                        //console.log(this.id + 'over');
                    }
                },
                'dragend':{
                    element:'dom',
                    fn:function (sender,event) {

                        sender.removeCls('container', 'x-component-edit-box');
                        event.dataTransfer.clearData();

                        //console.log(this.id + 'end');
                        //event.dataTransfer.setData('Text',Rsd.toString({cmd:'move',pageX:event.pageX||event.clientX,pageY:event.pageY||event.clientY}));
                    }
                },
                'dragenter':{
                    element:'body',
                    fn:function (sender,event) {
                        //console.log(this.id + 'enter');
                        event.preventDefault();

                        var _data = Rsd.toJson(event.dataTransfer.getData('Text'));
                        if(_data == null || _data.id == this.id)return;




                    }
                },
                'dragleave':{
                    element:'dom',
                    fn:function (sender,event) {
                        sender.removeCls('container', 'x-component-edit-box');
                        //console.log(this.id + 'leave');
                        event.preventDefault();

                        var _data = Rsd.toJson(event.dataTransfer.getData('Text'));
                        if(_data == null || _data.id == this.id)return;

                        //event.dataTransfer.setData('Text',Rsd.toString({cmd:'move',pageX:event.pageX||event.clientX,pageY:event.pageY||event.clientY}));
                    }
                },

                'drop':{
                    element:'dom',
                    fn:function (sender,event) {
                        //console.log(this.id + 'drop');
                        event.preventDefault();
                        event.cancelBubble = true;
                        event.stopPropagation();

                        var _data = Rsd.toJson(event.dataTransfer.getData('Text'));
                        if(_data== null)
                        {
                            return;
                        }
                    
                        var _obj = me.getControl(_data.id);
                        if(_obj == null)
                        {
                            console.error('未找到对象'+_data.id);
                        }
                        if(sender instanceof  Rsd.container.Component)
                        {
                            sender.add(_obj);
                        }
                        else
                        { 
                            sender.dom.parentNode.insertBefore(_obj.dom,sender.dom);
                        }
                        if(me.onChanged)
                        {
                            me.funApplyByIOC(me.onChanged,[_obj,event]);
                        }
                    }
                }
            };

        if(Rsd.xtypes.hasOwnProperty(_config.xtype)==false)
        {
            Rsd.showMessage('未找到xtype为:['+_config.xtype + ']的类。');
            return null;

        }

        var _ctrl = Rsd.widget(_config);
        this.controls[_ctrl.id]= _ctrl;
        _ctrl.renderTo(_doc.body);
        _ctrl.doLayout();
        _ctrl.animate(300);
        return _ctrl;
    
    },

    /**
     * @description 获取控件
     * @param {*} id 
     */
    getControl:function getControl(id)
    { 
        return this.controls[id];
    },
    /**
     * @description 清除所有选择
     */
    clearSelected:function selectControl()
    { 
        for(var i in this.controls)
        {
            var ctrl = this.controls[i];
            ctrl.removeCls('container', 'x-component-select-box');
        }
    },
    /**
     * 选择控件
     * @param {*} id 
     */
    selectControl:function selectControl(id)
    {
        var doc = this.getDocument();
        var ctrl = this.controls[id];
        if(ctrl)
        {
            ctrl.addCls('container', 'x-component-select-box');
            doc.body.classList.remove( 'x-component-select-box');
        }
        else
        {
           
            if(id == doc.id)
            {
                doc.body.classList.add( 'x-component-select-box');
            }
        }
    },
    /** 
     * @@description 获取文档dom
     * */ 
    getDocument:function getDocument() {

        if( this.items[0].body.contentWindow)
        {
            var _doc = this.items[0].body.contentWindow.document;
            _doc.id = 'doc_'+this.id;
            return _doc;
        }
        return null;
    },
    
    /**
     * @description 设置doc标题
     */ 
    setDocumentTitle:function setDocumentTitle(title) {
        var me = this;
        var _doc = this.getDocument();
        _doc.title = title;

        this.items[0].title = title ;

    },
    /**
     * 
     * @param {*} indexHtml 
     */
    setDocumentIndex:function setDocumentIndex(indexHtml)
    {
        Rsd.showPopup('设置 index html 未实现');
    },
     
    /** 
     * @description 设置控件属性值
     * */ 
    setControlProperty:function(id,name,value)
    {
        var ctrl = this.getControl(id);
        if(ctrl)
        {
            ctrl[name] = value;
        }
    },
   
    /**
     * 获取整个文档配置
     * @param {*} forSave 
     */
    getDocConfig:function getDocConfig(forSave) {

        var _doc = this.getDocument();
        
        var _config = {title: _doc.title,id:_doc.id,element:_doc, dataSource: '', indexFile: '', items: []};
        if(_doc)
        {
            var _list = _doc.querySelectorAll('[simulator=redmicro]');
            for (var i = 0; i < _list.length; i++) {
                var _id = _list[i].getAttribute('id');
                var _obj =  this.getControl(_id);
                if(_obj == null)
                {
                    Rsd.showMessage('未找到对象,id['+_id + ']。');
                }
                _config.items.push(this.getControlConfig(_obj,forSave));
            }
        }
        if(forSave)
        {
           delete _config['element'];
           delete _config['id'];
        }
        
        return _config;

    },
    /**
    * @description 获取文档设计组件配置项
     * */
    getControlConfig:function getControlConfig(ctrl,forSave) {

        
        var _config = {element:ctrl};
         //set parent id
         if(ctrl.parent instanceof Rsd.common.ComponentX)
         {
             _config['parent'] = ctrl.parent.id;
         }
         if(Rsd.isType(ctrl.parent , HTMLDocument))
         {
             _config['parent'] = 'doc_'+this.id;
         }

        if(Rsd.isType(ctrl,HTMLDocument)) {

            _config['xtype'] = 'document';
            _config['indexFile'] = this.items[0].body.src;
            _config['title'] = ctrl.title;
            _config['dataSource'] = ''; 

        }else
        {
            for(var i in this.setting)
            {
                var _name = this.setting[i].name;
                var _readonly = this.setting[i].readOnly;
                if(ctrl.hasProperty(_name))
                {
                    if(Rsd.isObject(ctrl[_name]))
                    {
                        _config[_name] = Rsd.clone(ctrl[_name]);
                        continue;
                    }
                     
                    _config[_name] = Rsd.clone(ctrl[_name])||null;
                }

            }
        }


       
        if(forSave)
        {
           delete _config['element'];
           delete _config['id'];
           delete _config['$className'];
           if(_config.label)
           {
              delete _config.label['element'];
           }
           if(_config.header)
           {
              delete _config.header['element'];
           }
           
        }
        return _config;
    }

});