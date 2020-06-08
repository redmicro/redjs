Rsd.define('Rsd.control.ImageItem', {
    extend: 'Rsd.common.Object',
    requires: ['Rsd.control.Label'],
    xtype: 'image-item',
    ctrl:null,
    cls:'',
    key:null,
    src:null,
    link:'',
    html:null,
    style:null,
    constructor: function ListViewItem(config) {
        config = config || {};
        this.apply(config);

    },
    /*
    * */
    init:function init() {

        var me = this;
        me.callParent();

        if(!me.ctrl && me.link)
        {
            me.ctrl = document.createElement('a');
            me.ctrl.href = me.link;
        }
        if(!me.ctrl && Rsd.isEmpty(me.html))
        {
            me.ctrl = document.createElement('img');
            me.ctrl.src = me.src;
        }
        if(!me.ctrl)
        {
            me.ctrl = document.createElement('div');

        }
        if(me.ctrl && me.cls)
        {
            me.ctrl.classList.add(me.cls);
        }
        if(this.key)
        {
            me.ctrl.setAttribute('id',this.key);
        }

        if( me.ctrl instanceof HTMLImageElement)
        {
            me.style = Rsd.apply(me.style||{},{opacity:0,display:'none', maxWidth:'100%', maxHeight:'100%'});
        }
        else
        {
            me.style = Rsd.apply(me.style||{},{
                overflow:'hidden',
                maxWidth:'100%',
                maxHeight:'100%',
                display:'none',
                opacity:0,
                position:'absolute',
                top:0,
                left:0,
                right:0,
                bottom:0,
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat',
                backgroundSize:'contain',
                height:'100%',
                width:'100%',
                backgroundImage:'url('+ me.src||'' + ')'});
        }


        if(me.style)
        {
            Rsd.setElStyle(me.ctrl,me.style,me.parent.sizeUnit);
        }

        if(me.html) {

            me.ctrl.innerHTML = me.html;
        }
    }



});