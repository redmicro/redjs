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
    setting:['$className','id','bodyCls','cls','height','layout','floating','text','title','name','width','xtype','label','header','action','method'],
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
     *  */ 
    app_afterLayout:function app_afterLayout()
    {
        var _height =  parseInt(this.items[0].container.clientHeight);
        this.items[0].body.style.height = _height - 46 + 'px';
    },
     /*
    *
    * */
   addControl:function addControl(config) {
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
    
    /*
    * */
    getDocument:function getDocument() {

        if( this.items[0].body.contentWindow)
        {
            return this.items[0].body.contentWindow.document;
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
     * @description 加载子控件
     */ 
    loadData:function loadData(items)
    {
        console.log('加载子控件',items);
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
    *
    * */
    getDocConfig:function getDocConfig() {

        var _doc = this.getDocument();
        var _config = {title: _doc.title,id:'doc_'+this.id, element:_doc, dataSource: '', indexFile: '', items: []};
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
                _config.items.push(this.getControlConfig(_obj));
            }
        }

        return _config;

    },
    /**
    *
     * */
    getControlConfig:function getControlConfig(ctrl) {

        var _config = {element:ctrl};
        if(Rsd.isType(ctrl,HTMLDocument)) {

            _config['indexFile'] = this.items[0].body.src;
            _config['title'] = ctrl.title;
            _config['dataSource'] = '';
            _config['xtype'] = 'document';

        }else
        {
            for(var i in this.setting)
            {
                var _name = this.setting[i];
                if(ctrl.hasProperty(_name))
                {
                    _config[_name] = ctrl[_name]||null;
                }

            }
        }


        //set parent id
        if(ctrl.parent instanceof Rsd.common.ComponentX)
        {
            _config['parent'] = ctrl.parent.id;
        }
        if(Rsd.isType(ctrl.parent , HTMLDocument))
        {
            _config['parent'] = 'doc_'+this.id;
        }
        return _config;
    }

});