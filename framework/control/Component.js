/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:24
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.Component', {
    extend: 'Rsd.common.ComponentX',
    requires: ['Rsd.common.Layouter'],
    xtype: 'control',
    ctrlTagName: '',
    labelTagName:'label',
    //ctrl: null,
    /*
    * */
    ctrlCls: '',
    /*
    * ctrl 快捷访问件
    * */
    accessKey:null,
    /*
    *
    * {
    *     xtype:'',//控件xtype
    *     //xtype 控件初始化配置参数
    *     config:{
    *     },
    *     //承载label的html dom元素
    *     element: null,
    *     //label 的内容对象 ，可以是字符串 也可以是组件
    *     content: null,//{string|control|object}
    *     position: 'left',
    *     align: 'right',
    *     visible: null,//null:有内容显示，无内容不显示 ,true:始终显示，false：始终不显示
    *     space: 10,
    *     cls: '',
    *     //承载label的element样式
    *     style:{}, 
     }
    * */
    //label:,
    cursor: null,
    /*
    * */
    disabled: false,
    /*
    * */
    focused:false,
    /*
     * click:方法可被注入
     * */
    handler: null,
    /*
    * */
    handlerTarget:'ctrl',
    /*
    * */
    constructor: function Component(config) {
        config = config || {};
        this.apply(config);
    },
    /*
     * */
    initComponentEx: function initComponentEx() {
        //debugger;
        if (!this.label.element && this.labelTagName) {
            this.label.element = document.createElement(this.labelTagName);
        }
        if(Rsd.isEmpty(this.ctrlTagName))
        {
            return;
        }
        if (!this.ctrl && this.ctrlTagName) {
            this.ctrl = document.createElement(this.ctrlTagName);
        }

        this.label.element.id = this.id + '_label';
        this.ctrl.id = this.id + '_ctrl';

        this.elements['label'] = this.label.element;
        this.elements['ctrl'] = this.ctrl;

        if (!Rsd.isEmpty(this.label.xtype)) {
            this.label.content = Rsd.widget(this.label.xtype,this.label.config||this.label);
            this.label.content.parent = this;
        }
        if (this.label.content == null && this.label.text) {
            this.label.content = this.label.text;
        }
        // 不能使用text 属性 与 link ,label控件 属性text 冲突
        if (this.label.content == null && Rsd.isString(this.title)) {
            this.label.content = this.title;
        }

        if(this.labelTagName.toLowerCase() == 'img' )
        {
            if(Rsd.isEmpty(this.label.content) && Rsd.isEmpty(this.label.src))
            {

                this.label.element.src = Rsd.emptyImage();
            }
            else
            {
                this.label.element.src = this.label.content||this.label.src;
            }
        }
        else
        {
            if (Rsd.isString(this.label.content)) {
                this.label.element.innerHTML = this.label.content;
            }

        }



        if (this.tabIndex != null) {
            this.ctrl.tabIndex = this.tabIndex;
        }

        if (this.tip != undefined && this.tip != null) {

            this.ctrl.title = this.tip;
        }
        if(this.overflow)
        {
            this.ctrl.style.overflow = this.overflow;
        }
        if(this.accessKey)
        {
            this.ctrl.accessKey = this.accessKey;
        }
    },
    /*
     * */
    onBeforeInit: function onBeforeInit() {

        if(this.handler)
        {
            this.listeners = this.listeners || {};
            Rsd.apply(this.listeners, {
                click: {
                    element: this.handlerTarget||'ctrl',
                    fn: function(){
                        var _flag = true;
                        //beforeClick
                        if (Rsd.isFunction(this.beforeClick)) {
                            _flag =  this.beforeClick.apply(this,arguments);
                        }
                        if (Rsd.isString(this.beforeClick)){
                            _flag =  this.funApplyByIOC(this.beforeClick,arguments)
                        }
                        if(_flag == false)
                        {
                            return ;
                        }
                        //click
                        if (Rsd.isFunction(this.handler)) {
                            return this.handler.apply(this,arguments);
                        }
                        if (Rsd.isString(this.handler)){
                            return this.funApplyByIOC(this.handler,arguments)
                        }
                    }
                }
            })
        }

        this.callParent();
    },
    /*
     * */
    onAfterInit: function onAfterInit() {
        this.callParent();
    },
    /*
     * */
    onAfterRender: function onAfterRender() {

        var me = this;
        me.container.appendChild(me.label.element);
        me.container.appendChild(me.ctrl);

        if (me.border) {
            me.addCls('container','x-control-border') ;
        }

        me.addCls('ctrl','x-ctrl') ;
        me.addCls('container',me.cls) ;
        me.addCls('ctrl',me.ctrlCls) ;

        if (me.cursor) {
            me.ctrl.style.cursor = me.cursor;
        }

        me.label.element.classList.add('x-label');

        if (Rsd.isEmpty(me.label.xtype) && me.label.cls) {
            me.label.element.classList.add(me.label.cls);
        }
        //debugger;
        if(me.label.content instanceof  Rsd.common.ComponentX)
        {
            me.label.content.renderTo(me.label.element);
        }
        if(me.label.content instanceof  Element)
        {
            me.label.element.appendChild(me.label.content);
        }

        me.label.element.style.display = me.label.visible ? 'inline-block' : 'none';

        me.callParent();

        me.setDisabled(me.disabled);

        if(me.focused)
        {
            me.focus();
        }
    },


    /*
    * */
    setDisabled: function setDisabled(disabled) {
        this.disabled = disabled;
        if (disabled) {
            this.dom.style.pointerEvents = 'none';
            this.dom.classList.add('x-control-disabled');
        }
        else {
            this.dom.style.pointerEvents = 'all';
            this.dom.classList.remove('x-control-disabled');
        }
    },
    /*
    * */
    focus:function focus() {

        if(this.ctrl)
        {
            this.ctrl.focus();
        }
    },
    /*
    * */
    select:function select() {
        if(this.ctrl)
        {
            this.ctrl.select();
        }
    },
    /*
    * */
    checkValue:function checkValue() {
      return true;
    },
    /*
     *
     * */
    getError:function getError() {
        return this.error;
    },
    /*
    * 复制到剪贴板
    * */
    copy:function () {

        if( this.ctrl && this.ctrl.select)
        {
            this.ctrl.select(); // 选择对象
            return document.execCommand("Copy"); // 执行浏览器复制命令

        }

        return false;
    }


},function(type){

    var _labelGetter = function () {

        if (this.hasOwnProperty('__label') == false) {
            this.__label = Rsd.apply({
                    content: null,
                    position: 'left',
                    align: 'right',
                    visible: null,
                    space: 10,
                    cls: '',
                    element: null},this.__proto__['__label']||{});
        }

        if(this.__label.visible == null)
        {
            this.__label.visible = (Rsd.isString(this.__label.content) && this.__label.content.length > 0);
            this.__label.visible = this.__label.visible || (this.__label.content instanceof Rsd.common.ComponentX);
            this.__label.visible = this.__label.visible || (this.__label.xtype && this.__label.xtype.length > 0);
        }

        return this.__label;
    };
    var _labelSetter = function (label) {
        //debugger;

        if (this.hasOwnProperty('__label') == false) {
            this.__label = Rsd.apply({
                content: null,
                position: 'left',
                align: null,
                visible: null,
                space: 10,
                cls: '',
                element: null},this.__proto__['__label']||{});
        }


        if(Rsd.isObject(label))
        {
            Rsd.apply(this.__label,label);
        }
        if(Rsd.isString(label))
        {
            this.__label.content = label;
        }
    };

    this.defineProperty(type,"label", _labelGetter, _labelSetter,true);

    var _titleGetter = function () {

        return this.label.content;
    };
    var _titleSetter = function (value) {

        if(Rsd.isEmpty(this.label.content) || Rsd.isString(this.label.content))
        {
            this.label.content = value;
        }
        //this.label.element.appendChild(document.createTextNode(this.label.content));//不支持html标签
        if(this.labelTagName.toLowerCase() == 'img' )
        {
            if($empty(this.label.content))
            {

                this.label.element.src = Rsd.emptyImage();
            }
            else
            {
                this.label.element.src = this.label.content;
            }
            return;
        }
        if(this.label && this.label.content instanceof  Rsd.common.ComponentX)
        {
            this.label.content.setValue(value);
            return;
        }
        if(this.label && this.label.content instanceof  Element)
        {
            this.label.content.innerHTML = value;
            return;
        }
        if(this.label && this.label.element)
        {
            this.label.element.innerHTML = value;
            return;
        }

        return;

    };
    this.defineProperty(type,"title", _titleGetter, _titleSetter,true);

    var _errorGetter = function () {
        return this.__error;
    }
    var _errorSetter = function (error) {
        this.__error = error;
    }
    this.defineProperty(type,"error", _errorGetter, _errorSetter,true);


});

