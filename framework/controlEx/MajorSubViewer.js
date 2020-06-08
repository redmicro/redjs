/*
 * redmicro all Copyright (c)
 *
 * Created by seeker910 on 2015/7/2.
 */
Rsd.define('Rsd.controlEx.MajorSubViewer', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.controlEx.ModelViewer',
        'Rsd.control.Grid',
        'Rsd.control.GridToolBarSimple',
        'Rsd.controlEx.ComboBoxEx',
        'Rsd.control.Timestamp'
    ],
    layout: 'vbox',
    xtype:'major-sub-viewer',
    items: [
        {
            xtype: 'model-viewer',
            legend: '主表信息',
            fields:[],
            height: 'auto'
        },
        {
            xtype:'grid',
            margin: '10 20 10 20',
            "columns": [],
            "fields": [],
            titleMember:null,
            flex: 40
        }
    ],

    /*
     * */
    constructor: function MajorSubViewControl(config) {

        config = config || {};
        this.apply(config);

    },

    /**
    *@private
    * */
    applyMajor:function applyMajor(major)
    {
        Rsd.apply(this.items[0],major);
    },
    /**
    *@private
    * */
   applySub:function applySub(sub)
   {
       Rsd.apply(this.items[1],sub);
   },
    /*
     *
     * */
    loadMajor:function loadMajor(data)
    {
        var _major =  this.items[0];
        try {
            _major.loadData(data);
        } catch (ex) {
            Rsd.error('加载主表数据失败', 'Rsd.controlEx.MajorSubViewer',ex);
        }
    },
    /*
     *
     * */
    loadSub:function loadSub(args,callback)
    {
        var _sub = this.items[1];
        try {
            _sub.loadData(args,callback);
        } catch (ex) {
            Rsd.error('加载从表数据失败', 'Rsd.controlEx.MajorSubViewer',ex);
        }

    }

},function (type) {

    var _subGetter = function () {

        return this.__sub||{modelType:'',fk:''};

    };

    var _subSetter = function (value) {
        this.__sub = Rsd.apply({modelType:'',fk:''},value || {});
        this.applySub(this.__sub);
    }

    this.defineProperty(type,"sub", _subGetter, _subSetter,true);

    var _majorGetter = function () {

        return this.__major||{key:'',titleField:''} ;

    };

    var _majorSetter = function (value) {
        this.__major = Rsd.apply({key:'',titleField:''},value || {});
        this.applyMajor(this.__major);
    }

    this.defineProperty(type,"major", _majorGetter, _majorSetter,true);
});
