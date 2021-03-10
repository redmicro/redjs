/*
 * redmicro all Copyright (c)
 */

/**
 * Created by seeker910 on 2015/6/30.
 * 数据源来自DataStore,在DataStore数据量不大时，或数据已加载到本地时，适合使用该控件。
 */
Rsd.define('Rsd.controlEx.ComboBoxEx', {
    extend: 'Rsd.control.ComboBox',
    xtype: 'combobox-ex',
    dataStore:null,
    /*
    * */
    constructor: function ComboBoxEx (config) {
        this.apply(config||{});
    },
    /*
    @private
    未实现dataStore带筛选的功能数据加载
    * */
    onAfterInit:function onAfterInit()
    {
        var me = this;
        if(Rsd.isString( this.dataStore))
        {
            this.dataStore = Rsd.widget(this.dataStore,{});
        }
        this.dataStore.load(null,function(data){

            var _list = null;

            if(Rsd.isEmpty(me.dataStore.listName) )
            {
                _list = data.hasOwnProperty('data')?data.data:data;
            }else
            {
                if(!data.data.hasOwnProperty(me.dataStore.listName))
                {
                    me.error('Data has no property(listName is ['+me.dataStore.listName+']).',data.data);
                }
                _list = data.data[me.dataStore.listName];
            }
            me.setDataSource(_list) ;

            if(me.seclectIndex !=null
                && me.seclectIndex != undefined
                && me.seclectIndex > -1)
            {
                me.select(me.seclectIndex);
            }
        });
        this.callParent();
    },
    /*
     @private
    * 在表格列属性中需要设置以下属性
    * dataStore ：数据源，
    * textMember ：现实到文本列名称，
    * 「colorMember」：颜色属性，选填
    * */
    makeControl:function makeControl(config,row)
    {
        if(Rsd.isEmpty(row))
        {
            return[];
        }
        var _config = config ||{};
        var _editable = _config.editable;

        var _value = row[_config.dataIndex|| _config.dataindex || _config.name];
        if(Rsd.isEmpty(_value))
        {
            return [];
        }

        var _textMember = _config.textMember || 'text';
        var _colorMember = _config.colorMember || 'color';


        if(Rsd.isString( _config.dataStore))
        {
            _config.dataStore = Rsd.widget(_config.dataStore,{});
        }

        var _ctrl = null;

        if(_editable)
        {
            var _dataSource = data.data;
            _config.dataSource = _dataSource;

            _ctrl = document.createElement('label');
            _ctrl.appendChild(document.createTextNode("Error:ComboBoxEx编辑模式未实现"));
        }
        else
        {
            _ctrl = document.createElement('label');
            _ctrl.style.position = 'relative';
            _ctrl.style.width = '100%';
            _ctrl.style.height = '100%';

            _config.dataStore.load(null,function(data){
 
                var _txt = _value;
                _config.dataStore.getObject(_value,function (obj) {
                    var _item = obj;
                    var _timer = 0;
                    if(_item)
                    {
                        _timer = 10;
                        _txt = _item[_textMember];
                        if(_colorMember && _item.hasOwnProperty(_colorMember))
                        {
                            _ctrl.style.color = _item[_colorMember];
                        }
                    }
                    else
                    {
                        _timer = 50;
                    }
                    setTimeout(function () {

                        _ctrl.appendChild(document.createTextNode(_txt));


                    },_timer);
                });

            });


        }
        return [_ctrl];
    }
});
