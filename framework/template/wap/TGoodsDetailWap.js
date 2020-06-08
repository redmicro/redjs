/**
 * Created by seeker910 on 2019/1/8.
 */
//
Rsd.define('Rsd.template.wap.TGoodsDetailWap', {
    extend: 'Rsd.template.wap.TWap',
    requires: [],
    width:'100%',
    height:'100%',
    layout:'border',
    sizeUnit:'rem',
    //cls:'x-home-bar',
    //float:'',
    //top:'',
    //content:'',
    //bottom:'',
    items:[
        {
            name:'float',
            xtype:'template',
            floating:true,
            domCls:'x-master-float',
            fixed:true,
            width:'5rem',
            height:'5rem',
            border:true
        },
        {
            name:'top',
            region:'top',
            xtype:'template',
            width:'100%',
            domCls:'x-master-top',
            border:false
        },
        {
            name:'content',
            region:'center',
            xtype:'template',
            width:'100%',
            domCls:'x-master-content',
            overflow:'auto',
            border:false
        },
        {
            name:'bottom',
            region:'bottom',
            fixed:true,
            xtype:'template',
            width:'100%',
            domCls:'x-master-bottom',
            border:false
        }
    ],
    dataSource:null,
    /*
     *
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    load:function load() {
        if(this.dataSource)
        {
            this.float.value = this.dataSource.float;
        }

        this.callParent();
    }


},function(type){

    var _floatGetter = function () {
        return this.items[0];
    };

    var _floatSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[0].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[0],value,3);
            return;
        }
    }

    this.defineProperty(type,"float", _floatGetter, _floatSetter,true);

    var _topGetter = function () {
        return this.items[1];
    };

    var _topSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[1].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[1],value,3);
            return;
        }
    }

    this.defineProperty(type,"top", _topGetter, _topSetter,true);

    var _contentGetter = function () {

        return this.items[2];
    };

    var _contentSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[2].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[2],value,3);
            return;
        }
    }

    this.defineProperty(type,"content", _contentGetter, _contentSetter,true);


    var _bottomGetter = function () {

        return this.items[3];
    };

    var _bottomSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[3].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[3],value,3);
            return;
        }
    }

    this.defineProperty(type,"bottom", _bottomGetter, _bottomSetter,true);


});