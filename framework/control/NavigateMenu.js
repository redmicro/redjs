/**
 * Created by seeker910 on 2017/9/5.
 */
Rsd.define('Rsd.control.NavigateMenu', {
    extend: 'Rsd.control.Component',
    xtype: 'navigate-menu',
    domTagName:'li',
    headerTagName:'a',
    ctrlTagName: 'ul',
    cls:'x-control-menu',
    useHoverStyle:true,
    height:30,
    width:200,
    handlerTarget:'label',
    listeners:{
        'focus':{
            element:'label',
            fn:function (sender,event) {
                this.showSubMenu();
                return true;
            }
        },
        'mouseover':{
            element:'dom',
            fn:function (sender,event) {
                this.showSubMenu();
            }
        },
        "mouseout":{
            element:'dom',
            fn:function () {
                this.ctrl.style.display = 'none';
            }
        },
        'keyup':{
            element:'label',
            fn:function (sender,event) {

                if (event.code == 'Enter')
                {
                    this.ctrl.style.display = 'none';
                }
                if (event.code == 'Escape')
                {
                    this.ctrl.style.display = 'none';
                }
                if (event.code == 'ArrowUp')
                {

                }
                if (event.code == 'ArrowDown')
                {

                }

            }
        }
    },
    /*
    *Rsd.control.NavigateMenu 对象配置
    * */
    dataSource:[],
    /*
    * */
    constructor: function NavigateMenu(config) {
        config = config || {};

        if(
            Rsd.isEmpty( config.label)
            && config.text
            && Rsd.isString(config.text)
        )
        {
            config.label = {content:config.text,position:'top',align:'center',height:30,style:{fontSize:'100%'}};
        }
        this.apply(config);

    },
    /*
    * */
    onAfterInit:function onAfterInit()
    {
        var me = this;

        me.callParent();
        me.loadData();
    },
    /*
    * */
    onAfterLayout:function onAfterLayout() {

        var me = this;
        me.callParent();
        me.ctrl.style.display = 'none';
        me.ctrl.style.listStyleType = 'none';
        me.label.element.style.width = me.width+'px';
        me.label.element.style.textAlign = 'center';
        me.ctrl.style.width = me.width  +'px';

        me.setElStyleValue(me.ctrl,'background-color','transparent')
        me.ctrl.style.marginTop='0px';
    },

    /*
    * */
    showSubMenu:function showSubMenu()
    {
        var me = this;
        var list = this.dataSource||[];
        if(list.length == 0)
        {
            return;
        }
        switch (me.label.position)
        {
            case 'top':
                me.ctrl.style.top = me.height+'px';
                break;
            case  'left':
                me.ctrl.style.top ='0px';
                me.ctrl.style.left = me.width  +'px';

                break;
        }

        me.ctrl.style.height = me.subMenuHeight +'px';
        me.ctrl.style.display = '';
    },
    /*
    *
    * */
    loadData:function loadData(data)
    {
        var me = this;
        me.ctrl.innerHTML='';

        var list = data||this.dataSource||[];
        var _h = 0;
        for(var i in list)
        {
            var config = Rsd.isObject(list[i])?list[i]:{text:list[i]};

            var xtype = config.xtype||'navigate-menu';
            var li = Rsd.widget(xtype,Rsd.apply({id:i, cls:'x-control-menu-sub',width:me.width},config));
            _h += li.height;
            li.renderTo(me.ctrl);
            li.doLayout();
        }
        me.dataSource = list;
        me.subMenuHeight = _h;
        if(list.length == 0)
        {
            me.ctrl.style.display = 'none';
        }
    }
});