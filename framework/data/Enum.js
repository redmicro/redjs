/**
 * Created by seeker910 on 2017/4/15.
 * 枚举数据类型
 */
Rsd.define('Rsd.data.Enum', {
    extend:'Rsd.common.Object',
    requires:['Rsd.data.EnumItem'],
    xtype:'enum',
    singleton:false,
    /**
     * @description 仅在定义时使用，在创建Rsd.data.EnumItem对象时，从数据源items中 ，获取指定属性作为Rsd.data.EnumItem对象的text属性值
     */
    textMember: 'text',
    /**
     * @description 仅在定义时使用，在创建Rsd.data.EnumItem对象时，从数据源items中 ，获取指定属性作为Rsd.data.EnumItem对象的value属性值
     */
    valueMember: 'value',
    /**
     * @description 仅在定义时使用，在创建Rsd.data.EnumItem对象时，从数据源items中 ，获取指定属性作为Rsd.data.EnumItem对象的code属性值
     */
    codeMember: 'code',
    /**
     * @description 仅在定义时使用，在创建Rsd.data.EnumItem对象时，从数据源items中 ，获取指定属性作为Rsd.data.EnumItem对象的color属性值
     */
    colorMember:'color', 
    //items:[],
    text:'',
    constructor: function Enum (config) {
        config = config || {};
        this.apply(config);
    },

    /**
    *获取EnumItem
    * */
    getItem:function getItem(value) {

        if(!this.__mapping)
        {
            this.__mapping = {};
            this.__mapping_code = {};
            var _item = null;
            var _list = this.items || this.chidren;
            for(var i=0;i < _list.length ;i++)
            {
                _item = _list[i];
                this.__mapping[_item.value] = _item;
                this.__mapping[_item.code] = _item;
            }
        }
         
        return this.__mapping[value]|| this.__mapping[_item.value];
        
    }


},function (type) {
    var _itemsGetter = function () {

        if (this.__items == undefined) {
            this.__items = [];
        }

        return this.__items;
    };
    var _itemsSetter = function (value) {
        this.__items = value;
        for(var i in this.items)
        {
            //debugger;
            var _item = this.items[i];
            if(_item instanceof Rsd.data.EnumItem)
            {

            }
            else
            {
                this.items[i] = Rsd.create('Rsd.data.EnumItem',{
                    color:_item[this.colorMember||'color'],
                    text:_item[this.textMember||'text'],
                    code:_item[this.codeMember||'code'],
                    value:_item[this.valueMember||'value']});
                this.items[i].parent = this;
            }
        }
    };

    this.defineProperty(type,"items", _itemsGetter, _itemsSetter,true);
});