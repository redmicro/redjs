/**
 * Created by seeker910 on 2017/7/28.
 */
Rsd.define('Rsd.template.wap.TActivateHomeWap', {
    extend: 'Rsd.template.wap.TWap',
    requires: [
        'Rsd.wap.CStoreHomeTopPart',
        'Rsd.wap.CHomeBottomPart'
    ],
    top:'',
    content:'',
    bottom:'',
    items:[
        {
            name:'top',
            xtype:'t-component',
            domCls:'x-master-top',
            border:false
        },
        {
            name:'content',
            xtype:'t-component',
            domCls:'x-master-content',
            //cls:'x-home-button',
            border:false
        },
        {
            name:'bottom',
            xtype:'t-component',
            domCls:'x-master-bottom',
            border:false
        }
    ],
    /*
     *
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    showTop:function showTop(obj) {
        this.showPart(obj,'top');
    },
    showMessage:function showMessage(msg) {
        Rsd.alert(msg);
    },
    showContent:function showContent(obj) {

        this.showPart(obj,'content');

    },
    showBottom:function showBottom(obj) {

        this.showPart(obj,'bottom');
    },
    showPart:function showPart(obj,part) {
        var _obj = null;
        var _part =  this.getItemByName(part);
        if(obj && Rsd.isString(obj))
        {
            _obj = Rsd.widget(obj,{});
        }

        if(obj && obj instanceof  Rsd.common.ComponentX) {
            _obj = obj;
        }

        if(_obj )
        {
            _part.show();
            _obj.parent = _part;
            _obj.renderTo(_obj.parent);
        }
        else
        {
            _part.hide();
        }
        if(_obj && Rsd.isFunction(_obj.load))
        {
            setTimeout(function () {

                try {
                    _obj.load();
                }
                catch (err)
                {
                    console.error(err);
                }

            },50);
        }


    },
    load:function load() {

        this.showTop(this.top);
        this.showContent(this.content);
        this.showBottom(this.bottom);

        return this;
    }

});
