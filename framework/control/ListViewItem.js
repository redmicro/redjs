Rsd.define('Rsd.control.ListViewItem', {
    extend: 'Rsd.common.Object',
    requires: ['Rsd.control.Label'],
    xtype: 'list-view-item',
    ctrl:null,
    cls:'',
    key:null,
    hover:false,
    /**
    * @description Item 具体内容
     * rsd control,string ,element，object
    * */
    content:null,
    style:null,
    /*
    * */
    constructor: function ListViewItem(config) {
        config = config || {};
        this.apply(config);

    },
    /*
    *
    * */
    init:function init() {

        var me = this;
        me.callParent();

        if(!me.ctrl)
        {
            me.ctrl = document.createElement('li');
        }
        if(me.ctrl && me.cls)
        {
            me.ctrl.classList.add(me.cls);
        }
        if(this.key)
        {
            me.ctrl.setAttribute('id',this.key);
        }
        if(me.style)
        {
            Rsd.setElStyle(me.ctrl,me.style,me.parent.sizeUnit);
        }
        if(me.hover)
        {
            me.ctrl.classList.add('x-li-hover');

        }
        var item = me.content;
        if(Rsd.isString(item)){

            var _txt = document.createTextNode(item);

            me.ctrl.appendChild(_txt);

            return;
        }

        if(item instanceof HTMLElement){

            me.ctrl.style.display = 'flex';
            item.style.alignSelf='center';
            me.ctrl.appendChild(item);

            return;
        }

        //debugger;
        if(Rsd.isObject(item)){

            item.parent = me;

            var _xtype = item.xtype||me.parent.itemXtype||'label';
            me.ctrl.style.display = 'flex';
            var c = Rsd.widget(_xtype,item);
            c.style.alignSelf='center';
            c.renderTo(me.ctrl).doLayout();

            return ;
        }
    }
});