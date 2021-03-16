/*
 * redmicro all Copyright (c)
 *
 * 主键通过隐藏控件传递。
 * */
Rsd.define('Rsd.view.SingleDialog', {
    extend: 'Rsd.container.Dialog',
    requires: ['Rsd.controlEx.ModelViewer'],
    xtype: 'single-form',
    width: 480,
    layout:'vbox',
    height:500,
    readOnly:true,
    style:{overflow:'hidden'}, 
    buttons:['save','delete','cancel'],
    items:[
        {
            xtype:'model-viewer',
            "style":{"overflow":'visible'},
            height:'auto',
            region:'center',
            width:'100%' 
        },
        {
            height: 55,
            margin: '10 2 2 10',
            region:'bottom',
            layout:'hbox',
            width:'100%',
            "style":{"float": 'right'},
            items: []

        }
    ],
    fields:[],
    //Rsd.data.Schema
    schema:null,
    readOnly:true,
    /*
    * */
    constructor: function constructor(config) {
        config = config || {};
        //delete config.layout;
        this.apply(config);

        var btns = this.buttons || [];
        for(var i in btns)
        {
            if(Rsd.isString(btns[i]))
            {
                switch (btns[i])
                {
                    case 'save':
                        this.items[1].items.push({
                            xtype: 'button',
                            text: '保 存',
                            delayMS:2000,
                            width:100,
                            minWidth: 80,
                            height:40,
                            minHeight: 40,
                            margin: '2 10 2 5',
                            handler: '_btn_save'
                        });
                        break;
                    case 'delete':
                        this.items[1].items.push({
                            xtype: 'button',
                            text: '删 除',
                            delayMS:2000,
                            width:100,
                            minWidth: 80,
                            height:40,
                            minHeight: 40,
                            margin: '2 10 2 5',
                            handler: '_btn_delete'
                        });
                        break;
                    case 'cancel':
                        this.items[1].items.push({
                            xtype: 'button',
                            text: '取 消',
                            width:100,
                            minWidth: 80,
                            height:40,
                            minHeight: 40,
                            margin: '2 10 2 5',
                            handler: '_btn_cancel'
                        });
                        break;
                }

            }

            if(Rsd.isObject(btns[i]))
            {
                var _btn = Rsd.apply(
                    {
                        xtype: 'button',
                        width:100,
                        minWidth: 80,
                        height:40,
                        minHeight: 40,
                        margin: '2 10 2 5'
                    },btns[i]);

                _btn.__fn = _btn.handler;
                var me = this;
                _btn.handler = function () {
                   var _rs = me.funApplyByIOC(this.__fn,[me.items[0].getRecord(),me]);
                   if(_rs===true)
                   {
                       me.close();
                   }
                }
                this.items[1].items.push(_btn);
            }
        }
    },
    /*
    *
    * */
    onAfterRender:function onAfterRender()
    {

        var mv = this.items[0];
        try
        {
            mv.fields = this.fields;
            mv.loadFields(this.readOnly);

        }catch (ex)
        {
            Rsd.error('SingleForm加载模型结构失败', 'Rsd.view.SingleDialog',ex);
        }

        this.callParent();

       if(this.height =='auto')
       {
           this.height =  100 + mv.height;
       }else
       {
           this.container.style.overflowY='auto';
       }

    },
    /*
    * */
    _btn_save:function _btn_save() {

        var me = this;
        var _form = me.items[0];

        if (_form.checkRecord() == false) {
            _form.showError();
            return;
        }

        var _record = _form.getRecord();

        if(_record==null)
        {
            Rsd.msg("数据错误，无法保存。");
            return;
        }
        if(me.saveHandler)
        {
            me.saveHandler(_record);
            return;
        }

        if (me.schema && me.schema instanceof Rsd.data.Schema) {
        }
        else {
            Rsd.msg("保存失败:Schema错误。");
            return;
        }
        if (Rsd.isEmpty(me.schema.keys)) {
            Rsd.msg("主键不存在，无法执行保存。");
            return;
        }
        if (Rsd.isEmpty(_record[me.schema.keys[0]])) {

            me.schema.insertObject(_record, function (data) {
                if (data.success) {
                    me.close();
                    Rsd.showPopup("新增数据保存成功。");
                    return false;
                }
                return true;
            });

            return;
        }
        me.schema.updateObject(_record, function (data) {
            if (data.success) {
                me.close();
                Rsd.showPopup("修改数据保存成功。");
                return false;
            }
            return true;
        });

        return;

    },
    /*
    * */
    _btn_delete:function _btn_delete() {
        var me = this;

        if (me.schema && me.schema instanceof Rsd.data.Schema) {

        } else {
            Rsd.msg("删除失败:Schema错误。");
            return;
        }
        var _form = me.items[0];
        var key = _form.getFieldValue(me.schema.keys[0]);

        if(Rsd.isEmpty(key))
        {
            Rsd.msg('主键值不存在，无法删除。');
            return;

        }

        me.schema.deleteObject(key, function (data) {

            if (data.success) {

                me.close();
                Rsd.showPopup("删除数据成功。");
                return false;
            }

            return true;
        });


    },
    /*
    * */
    _btn_cancel:function _btn_cancel() {

        this.close();
    },

    /**
     * @description 加载数据
     *  */
    load: function load(record) {

        this.data = record||this.data;
        this.items[0].loadData(this.data);
        return this;
    },
    /**
    * */
    foucsField:function foucsField(index) {
        if(Rsd.isEmpty(index))
        {
            return this;
        }
        var ctrl = this.items[0].getFieldControl(index);
        ctrl&&ctrl.focus();

        return this;
    },
    /** 
    *获取字段控件
    * */
    getFieldControl:function getFieldControl(index) {

        return this.items[0].getFieldControl(index);
    },
    /*
   * 获取字段值
   * */
    getFieldValue:function getFieldControl(index) {

        return this.items[0].getFieldControl(index).getValue();
    },
    /*
    * 设置字段值
    * */
    setFieldValue:function(index,value)
    {
        return this.items[0].getFieldControl(index).setValue(value);
    },
    /*
    * 同步更新数据 将form 控件数据 和 form.data数据同步一致
    * */
    syncData:function syncData() {

        var _form =  this.items[0];
        if (_form.checkRecord()) {
            return _form.getRecord(_form.data);

        }
        return _form.data;
    },
    /*
    * 获取form数据
    *  */
    getData:function () {
        var _form =  this.items[0];
        return _form.getRecord();
    }

},function (type) {


});