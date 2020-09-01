/*
 * redmicro all Copyright (c)
 */

/**
 * Created by seeker910 on 2015/6/30.
 */
Rsd.define('Rsd.controlEx.ComboBoxEnum', {
    extend: 'Rsd.control.ComboBox',
    xtype: 'combobox-enum',
    textMember: 'text',
    valueMember: 'value',
    colorMember:'color',
    //enum:null,
    /*
     * */
    constructor: function ComboBoxEnum (config) {
        this.apply(config||{});

        if(Rsd.isString(this.enum))
        {
            if(Rsd.xtypes[this.enum])
            {
                this.dataSource = Rsd.widget(this.enum).items;
            }else
            {
                this.noData = true;
                this.listeners={
                    'mouseover':{
                            element:'dom',
                            fn:function()
                            {
                                if(this.noData && Rsd.isString(this.enum) && Rsd.xtypes[this.enum])
                                {
                                    this.noData = false;
                                    this.dataSource = Rsd.widget(this.enum).items;
                                }
                                if(this.noData)
                                {
                                    this.warn('类型' + this.enum +'不存在。');
                                }

                            }
                    }
                };
            }
            return;
        }
        if(this.enum instanceof Rsd.data.Enum)
        {
            this.dataSource = this.enum.items;
            return;
        }
        if(Rsd.isArray(this.enum ))
        {
            this.dataSource = Rsd.create('Rsd.data.Enum',{items:this.enum}).items;
            return;
        }
        if(Rsd.isObject(this.enum) && !(this.enum instanceof Rsd.data.Enum))
        {
           if(!Rsd.classes[this.enum.name])
           {
               Rsd.define(this.enum.name,{
                   extend:'Rsd.data.Enum',
                   xtype:this.enum.name,
                   name:this.enum.name,
                   textMember: this.enum.textMember ||'text',
                   valueMember: this.enum.valueMember ||'code',
                   //colorMember:'color',
                   constructor:function(){},
                   items:this.enum.items}
               );
           }
            this.dataSource = Rsd.create(this.enum.name,{}).items;
            return;
        }
    },
    /*
     * 返回 对象或数组
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

        //debugger;
        var _enum = _config.enum;
        if(Rsd.isString(_config.enum))
        {
            _enum = Rsd.widget(_config.enum);
        }
        if(Rsd.isArray(_config.enum))
        {
            _enum = Rsd.create('Rsd.data.Enum',{items:_config.enum});
        }

        if(Rsd.isObject(_config.enum) && !(_enum instanceof Rsd.data.Enum))
        {
           if(Rsd.classes[_config.enum.name] == null)
           {

               Rsd.define(_enum.name,{
                   extend:'Rsd.data.Enum',
                   xtype:_enum.name,
                   textMember: _enum.textMember||'text',
                   valueMember: _enum.valueMember||'code',
                   colorMember:_enum.colorMember||'color',
                   name:_enum.name,
                   constructor:function(){},
                   items:_enum.items}
               );

           }

            _config.enum = _enum = Rsd.create(_enum.name,{});
        }

        if(!(_enum instanceof Rsd.data.Enum))
        {
            throw new Error('config [enum] '+ _config.enum.toString() +' is not Rsd.data.Enum.');
        }


        if(_editable)
        {
            var _ctrl = null;
            _ctrl = document.createTextNode('Error:ComboBoxEnum编辑模式未实现');
            return [_ctrl]
        }
        else
        {
            var _enumItem = _enum.getItem(_value);
            if(_enumItem)
            {
                return _enumItem.makeControl();
            }
            else
            {
               var _ctrl = null;
               _ctrl = document.createTextNode(_value);
               return [_ctrl]
            }

        }

    }

},function (type) {
    var _enumGetter = function () {

        return this.__enum;
    };

    var _enumSetter = function (value) {

        this.__enum = value;

    }

    this.defineProperty(type,"enum", _enumGetter, _enumSetter,false);


});
