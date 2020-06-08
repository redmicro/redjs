/**
 * Created by dwj on 2017/2/28.
 */
Rsd.define('Rsd.data.Menu', {
    extend: 'Rsd.common.Object',
    xtype:'menu',
    text:'unnamed',
    icon:null,
    /*页面*/
    viewType:'',
    key:'',
    parent:null,
    /*
    * 子节点
    * */
    //children:[],
    tag:null,
    /*
    * 页面参数
    * */
    args:null,
    onAfterAddItem:null,
    /*
    *
    * */
    constructor: function Menu(config) {

        config = config || {};
        var _children = config['children'];
        delete config['children'];
        this.apply(config);
        this.__mapping = {};
        this.loadData(_children || []);
    },
    /*
    *
    * */
    loadData:function loadData(data)
    {
        var _ds = data||[];
       if(Rsd.isArray(_ds))
       {
           this.children = _ds;
       }
    },
    /*
    * */
    removeAll:function removeAll()
    {
        this.children=[];
    },
    /**
    *
     *  */
    addItem:function addItem(menu)
    {
        //debugger;
        var me = this;
        var _m = menu;
        if(_m == null ||_m == undefined)
        {
            return;
        }
        if(_m instanceof  Array)
        {
            for(var i in _m)
            {
                this.addItem(_m[i]);
            }

            return _m;
        }

        var _list = _m.children;
        delete _m['children'];

        if(_m instanceof Rsd.data.Menu)
        {

        }else
        {
            _m = Rsd.create('Rsd.data.Menu',Rsd.isObject(menu)?menu:{text:menu});
        }
        if(_m.key==null ||_m.key== undefined || _m.key=='')
        {
            _m.key = me.key + '_' + me.children.length;
        }
        if(_m.onAfterAddItem == null || _m.onAfterAddItem == undefined)
        {
            _m.onAfterAddItem  = me.onAfterAddItem;
        }

        _m.parent = me;

        this.__mapping[_m.key] = _m;
        me.children.push(_m);
        setTimeout(function () {
            me.funApplyByIOC(me.onAfterAddItem,[_m]);
        },0);


        if(Rsd.isArray(_list))
        {
            for(var i in _list)
            {
                _m.addItem(_list[i])
            }
        }

        return _m;
    },
    /*
    *
    * */
    getItem:function getItem(key)
    {
        if(Rsd.isEmpty(key))
        {
            throw  new Error('argument key is not allow null.');
        }
        return  this.__mapping[key];
    }

},function(type)
{
    var childrenGetter = function () {
        //debugger;
        if (this.__children == undefined) {
            this.__children = [];
        }

        return this.__children;
    };
    var childrenSetter = function (children) {

        if(this.__children==undefined)
        {
            this.__children = [];
        }

        if(Rsd.isArray(children))
        {
            for(var i in children)
            {
                this.addItem(children[i]);
            }
        }
    }

    this.defineProperty(type, "children", childrenGetter, childrenSetter, true);
});