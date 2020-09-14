/**
 * Created by seeker910 on 2017/6/16.
 */
Rsd.define('Rsd.control.PagingBar', {
    extend: 'Rsd.control.ToolBar',
    requires:[
        'Rsd.control.NumberIndex',
        'Rsd.controlEx.ComboBoxEnum',],
    xtype: 'paging-bar',
    cls: 'x-paging-bar',
    margin: '5 0 5 0',
    position:'0 0 0 0',
    width: '100%',
    border: false,
    height: 40,
    //indexChanged:'',
    pagingOpt:{pageSize:100,pageIndex:0,pageCount:0,totalCount:0,pageSizeList:[20,50,100,200]},
    items: [
        {xtype: 'link', tip: '第一页',handler:'firstPage',border:true, cls: ['x-btn', 'x-first'], width: 30, margin: '5 5 5 5'},
        {xtype: 'link', tip: '上一页', handler:'previousPage',border:true, cls: ['x-btn','x-previous'], width: 30, margin: '5 5 5 5'},
        {xtype: 'number-index',header:{visible:false}, width: 260,selectedChanged:'goTo', margin: '0 2 0 2'},
        {xtype: 'link', tip: '下一页', handler:'nextPage',border:true,cls: ['x-btn','x-next'], width: 30, margin: '5 5 5 5'},
        {xtype: 'link', tip: '最后一页',handler:'lastPage',border:true,cls:['x-btn','x-last'], width: 30, margin: '5 5 5 5'},
        {xtype: 'text',id:'_padeIndex', tip: '要跳转到的页码', label:{content:'/',position:'right',width:5,space:5},width: 60, margin: '5 5 5 5'},
        {xtype: 'label', id: '_pageCount', text: '200',cls:'x-label', border: false, width:60,height:30,margin: '0 5 5 5'},
        {xtype: 'link', tip: '跳转到',text:'转到',handler:'setPageIndex',border:false, width:60,height:30, margin: '0 5 0 5'},
        {
            xtype: 'combobox', id:'_pageSize',
            tip: '用于分页的每页记录条数值',label:{text:'每页记录数:',height:30},
            selectedItemChanged:'onPageSizeChanged',
            margin: '0 2 0 2',
            height:30,
            border:false,
            value:100,dataSource:[{text:20,value:20},{text:50,value:50},{text:100,value:100}],
            width: 150
        },
        {xtype: 'label', id: '_msg', text: '信息',cls:'x-label', border: false, width:250,height:30, margin: '0 0 0 20'},
        {width:50}
    ],
    /*
     *
     *  */
    constructor: function ToolBar(config) {
        this.header.visible = false;
        config = config || {};
        this.apply(config);
    },
    /*
    *
     */
    goTo:function goTo(index) {

        var _pagingOpt = this.getPaging();
        var _index = index - 1;
        if(_pagingOpt.pageIndex == _index)
        {
            return ;
        }
        _pagingOpt.pageIndex = _index;

        if (Rsd.isString(this.indexChanged)) {
            this.funApplyByIOC(this.indexChanged, [_pagingOpt]);
        }

        if (Rsd.isFunction(this.indexChanged)) {
            this.indexChanged.call(this, _pagingOpt);
        }
    },
    /*
     * */
    previousPage: function () {

        if (this.pagingOpt.pageIndex > 0) {
            this.goTo(this.pagingOpt.pageIndex - 1);
        }
        else {
            Rsd.showPopup("已经是第一页");
        }
    },
    /*
     * */
    nextPage: function () {

        if (this.pagingOpt.pageIndex < (this.pagingOpt.pageCount - 1)) {
            this.goTo(this.pagingOpt.pageIndex + 1);
        }
        else {
            Rsd.showPopup("已经是最后一页");
        }

    },
    /*
     * */
    firstPage: function () {
        if (this.pagingOpt.pageIndex == 0) {
            Rsd.showPopup("已经是第一页");
            return;
        }
        this.goTo(1);
    },
    /*
     * */
    lastPage: function () {

        if (this.pagingOpt.pageIndex == this.pagingOpt.pageCount - 1) {
            Rsd.showPopup("已经是最后一页");
            return;
        }
        this.goTo(this.pagingOpt.pageCount);
    },
    setPageIndex:function()
    {
        var _pIndex = this.items[5].value;
        if(!Rsd.isNumber(_pIndex))
        {
            Rsd.showMessage("输输入页码不是有效值。");
            return ;
        }

        this.goTo(_pIndex);
    },
    /*
    *
    * */
    onPageSizeChanged:function onPageSizeChanged(v,e)
    {
        if(v)
        {
            this.pagingOpt.pageSize = v.value||100;
        }

    },
    /*
    * */
    getPaging:function getPaging() {
        return this.pagingOpt;
    },
    /*
    *
    * */
    setPaging:function setPaging(pagingOpt) {

        Rsd.apply(this.pagingOpt, pagingOpt);
        delete this.pagingOpt.where;
        delete this.pagingOpt.sort;
        var _pIndex = this.pagingOpt.pageIndex ;
        var _pSize = this.pagingOpt.pageSize;
        var _pCount = this.pagingOpt.pageCount;
        var _total = this.pagingOpt.totalCount;

        var numbar = this.items[2];
        numbar.value = _pIndex + 1;
        var _list = [];
        for(var i=0;i< _pCount ;i++)
        {
            _list.push(i+1);
        }
        numbar.valueList = _list;
        numbar.bind();

        var _s = _pIndex * _pSize + 1;
        var _e =_pSize + _pIndex * _pSize;
        var _t = _total;
        if(_e > _t)
        {
            _e = _t;
        }

        this.getItemById('_msg').setText('{0}-{1} / {2}'.format(_s,_e,_t ));
        this.getItemById('_pageCount').setText(_pCount) ;
        this.getItemById('_pageSize').setValue(_pSize) ;
    }

},function(type){
    var _indexChangedGetter = function () {

        return this.___indexChanged;
    };

    var _indexChangedSetter = function (value) {

        this.___indexChanged = value;

    }

    this.defineProperty(type,"indexChanged", _indexChangedGetter, _indexChangedSetter,false);

});