Rsd.define('Rsd.control.ListItem', {
    extend: 'Rsd.common.Object',
    requires: ['Rsd.control.Label'],
    xtype: 'list-item',
    ctrl:null,
    cls:'',
    key:null,
    hover:false,
    /**
    * @description Item 具体内容
     * rsd control,string ,element，object
    * */
    content:null,
    style:{},
    flex:0,
    /*
    * */
    constructor: function ListItem(config) {
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
        
        var item = me.content ||'no content';
         
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
        //
        var _config = item;
        
        if(_config.flex)
        {
             me.ctrl.style.flex = _config.flex;
        }
        //debugger;
        if(Rsd.isObject(_config)){

            _config.parent = me;
            if(Rsd.isEmpty(_config.xtype))
            {
                console.error('xtype is null :',_config)
            }
            var _xtype = _config.xtype || 'label';
            
            me.ctrl.style.display = 'flex';
            var c = Rsd.widget(_xtype,_config);
            c.style.alignSelf='center';
            c.renderTo(me.ctrl).doLayout();

            return ;
        }
    }
});