/*
 * redmicro all Copyright (c)

 * Created by seeker910 on 2014/12/29.
 *
 * 对于不要显示但需要保存但数据（如：主键）的数据建议使用隐藏控件，有利于数据专递。
 *
 */
Rsd.define('Rsd.controlEx.ModelViewer', {
    extend: 'Rsd.container.Form',
    requires: [
        'Rsd.container.FieldSet',
        'Rsd.control.Text',
        'Rsd.control.Date',
        'Rsd.control.Number',
        'Rsd.control.Hidden',
        'Rsd.control.CheckBox'
    ],
    xtype:'model-viewer',
    layout:'fit',
    margin: '10 20 10 20',
    height: 'auto',
    isLoaded:false,
    readOnly:true,
    errorList:[],
    /*
    * 对于不要显示但需要保存但数据（如：主键）的数据建议使用隐藏控件，有利于数据专递。
    * */
    fields:[],
    //最后一次加载的数据对象
    //data:{},
    items:[
        {
            xtype:'fieldset',
            legend:'明 细 信 息',
            items:[],
            layout:{type:'vbox',align:'left'}
        }
    ],
    /*
     * */
    constructor: function ModelViewControl(config) {
        config = config || {};
        this.apply(config);
        if(this.legend != undefined && this.legend != null)
        {
            this.items[0].legend = this.legend;
        }

    },
    /*
    * */
    onAfterRender:function onAfterRender()
    {
        this.callParent();
        this.loadFields(this.readOnly);

    },
    /*
    * */
    loadFields:function loadFields(readOnly)
    {
        //debugger;

        var me = this;
        if(me.isLoaded)
        {
            return;
        }
        //debugger;
        if(me.items[0] == null || me.items[0]  == undefined)
        {
            return;
        }
        var _readOnly = true;

        if(readOnly !== undefined)
        {
            _readOnly = readOnly;
        }
        var formfields = me.fields ;
        var _w = 0 ;
        var _width = me.getWidth()||me.parent.getWidth();
        if(formfields && formfields.length > 0)
        {
            var fields =  formfields;
            var _field = null;
            var _height = 30;
            for (var f in fields) {
                //debugger;
                _field = Rsd.clone(fields[f]);

                if(_field.label)
                {
                    _field.label.content = _field.label.content || _field.label.text;
                    delete _field.label.text;
                }
                if(_field.hasOwnProperty('readOnly'))
                {
                    _field.readOnly = (_readOnly?true :_field.readOnly);
                }
                else
                {
                    _field.readOnly = _readOnly;
                }
                var _h = 0;
                if(_field.xtype != 'hidden')
                {
                    _h = _field.height || 30;
                }
                _w += _field.width||0;
                if( _field.width && _width && _w < _width)
                {
                }else
                {
                    _w = _field.width||0;
                    _height += _h;
                }


                var _new_field = Rsd.apply(
                    {
                        id:_field.id || _field.name,
                        dataIndex: _field.dataIndex||_field.dataindex || _field.name,
                        height:_h,
                        width:'90%',
                        tabIndex:f,
                        margin:'2 5 2 5',
                        xtype:'text'
                    },_field);


                if(me.items[0] instanceof Rsd.container.Component)
                {
                    me.items[0].add(_new_field);
                }
                else
                {
                    me.items[0].items.push(_new_field);
                }

            }

            me.isLoaded = true;
        }
        if( me.height =='auto')
        {
            me.height = (_height + 50);
            me.items[0].height = _height+30;
            if(me.items[0] instanceof Rsd.container.Component) {
                me.doLayout();
            }

        }
        return this;
    },
    /*
    *
    * */
    checkRecord:function checkRecord() {

        var _item = null;
        var _form = this.items[0];
        this.errorList = [];
        for (var i=0; i< _form.items.length;i++) {
            _item =  _form.items[i];

            if(!Rsd.isFunction(_item.checkValue))
            {
                Rsd.error('Control [' + _item.$className + '] has no function \'checkValue\'.');
                continue;
            }
            if(!_item.checkValue())
            {
                this.errorList.push(_item.getError());
            }

        }

        return this.errorList.length == 0;
    },
    /*
    错误消息处理
    *handler:方法注入
    * */
    showError:function showError(handler) {
        if(handler)
        {
            handler.call(this,[this.errorList]);
        }
        else
        {
            Rsd.alert('错误提示',this.errorList);
        }

    },
    /*
    * 在验证通过时，将控件获取到到数据合并到obj中返回。
    * 不通过，返回null.
    * */
    getRecord:function getRecord(obj)
    {
        if(this.checkRecord())
        {
            var _obj = obj||this.data||{};
            var me = this;
            var _item = null;
            var _form = me.items[0];

            for (var i=0; i< _form.items.length;i++) {
                _item =  _form.items[i];

                if(_item.readOnly)
                {
                    //continue;
                }

                _obj[_item.dataIndex||_item.dataindex||_item.name] = _item.getValue();
            }

            return _obj;
        }else
        {
            return null;
        }

    },
    /*
    *
    * 获取字段值
    * */
    getFieldValue:function getFieldValue(name)
    {
        var _obj = this.data||{};
        var me = this;
        var _item = null;
        var _form = me.items[0];

        for (var i=0; i< _form.items.length;i++) {
            _item =  _form.items[i];
            if(_item.readOnly)
            {
                continue;
            }
            _obj[_item.dataIndex||_item.dataindex] = _item.getValue();
        }

        return _obj[name];
    },
    /*
     *
     * */
    loadData: function loadData(record) {

        var _r = record || this.data || {};
        this.data = _r;
        if(!_r)
        {
            return;
        }
        var me = this;
        var _item = null;
        var _dataIndex = null;
        for (var i=0; i < me.items[0].items.length;i++) {
              try
              {
                  _item =  me.items[0].items[i];
                  _dataIndex = _item.dataIndex||_item.dataindex;
                  if(Rsd.hasProperty(_r,_dataIndex)) {
                      _item.setValue(_r[_dataIndex]);
                  }
                  else
                  {
                      var list = _dataIndex.split('.');
                      var j = 0;
                      var _p = _r;
                      while(list.length > 1 && j<list.length && Rsd.hasProperty(_p,list[j]))
                      {
                          _p = _p[list[j]];
                          j++;
                      }
                      if(j==list.length)
                      {
                          _item.setValue(_p);
                      }
                  }
              }
              catch (e) {

              }

        }
        return this;
    },

    /*
    *@param key:index or name or id  or xtype
    * */
    getFieldControl:function getFieldControl(key) {
        if(Rsd.isNumber(key))
        {
            return this.items[0].items[index];
        }
        return this.items[0].getItemByName(key)||this.items[0].getItemById(key)||this.items[0].getItemByXtype(key);
    }


},function (type) {

    var _dataGetter = function () {

        if (!this.hasOwnProperty('__data')) {
            this.__data = {};
        }
        return this.__data;
    };
    var _dataSetter = function (value) {

        this.__data = value;
        return;

    };
    this.defineProperty(type,"data", _dataGetter, _dataSetter,true);
});
