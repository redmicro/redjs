/**
 * Created by seeker910 on 2017/6/19.
 */
Rsd.define('Rsd.view.BaseListGuider', {
    extend: 'Rsd.container.Guider',
    requires: [ 'Rsd.control.Grid'],
    xtype: 'base-list-guider',
    width: '100%',
    layout: 'fit',
    items:[
        {
            xtype:'grid',
            margin: '0 1 0 0',
            rowdblclick: null,
            toolBar:null,
            footBar:null
        }
    ],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /*
     *
     * */
    onBeforeInit:function onBeforeInit( ) {


        if(this.footBar) {

            this.items[0].footBar = this.footBar;
        }
        if(this.toolBar)
        {
            this.items[0].toolBar = this.toolBar;
        }
        this.callParent();
    },
    /*
     args :api 接口需要的参数
     * */
    load:function load(args,callback) {
        //debugger;
        var me = this;
        Rsd.showWaiting(this.id, this.items[0]);
        var grid = me.items[0];
        grid.dataSource = me.dataStore;

        setTimeout(function () {
            grid.loadData(args, function () {
                Rsd.callFunction(me, callback, arguments);
                Rsd.closeWaiting(me.id);
            });
        }, 50);

        return this;
    },
    /*
     * @private
     * */
    buildGridColumns:function buildGridColumns() {
        var _cols = this.gridColumns;
        _cols.push({
            name: 'space',
            text: '',
            xtype: 'template',
            width: 5,
            hideable: false,
            sortable: false
        })
        var grid = this.items[0];
        if(grid instanceof Rsd.control.Grid)
        {
            grid.buildColumns(_cols);
        }
        else
        {
            grid.columns = _cols;
        }
    },

    /**
     *  @description 获取表格的数据
     * */
    getListData:function getListData()
    {
        var grid = this.items[0];
        return grid.rows;
    }
    /*
    * @description 获取表格的数据
    *
    getData:function getData() {
        var grid = this.items[0];
        return grid.rows;
    }
    */

},function (type) {
    this.defineProperty(type,'sort',function(){return this.__sort||[];},function(sort){
        this.__sort = sort;
    },false);

    this.defineProperty(type,'where',function(){return this.__where||[];},function(where){
        this.__where = where;
    },false);

    var _columnsGetter = function () {
        if(this.__gridColumns == undefined)
        {
            this.__gridColumns = [];
        }
        return this.__gridColumns;
    };

    var _columnsSetter = function (value) {
        this.__gridColumns = value;

        this.buildGridColumns();
    }

    this.defineProperty(type,"gridColumns", _columnsGetter, _columnsSetter,true);

});