/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:15
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.view.Master', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.container.TabPage',
        'Rsd.control.Separator',
        'Rsd.view.Header',
        'Rsd.view.Footer',
        'Rsd.control.Tree',
        'Rsd.view.WelcomePage'
    ],
    xtype: 'v-master',
    layout: 'border',
    height: window.screen.clientHeight,
    width: '100%',//window.screen.clientWidth,
    border: true,
    style: {
        //minHeight:600,
        //minWidth:800,
        overflowX: 'hidden',
        overflowY: 'hidden'
    },
    items: [
        {
            region: 'south',
            xtype:'v-footer',
            border: false
        },
        {
            xtype: 'separator',
            layout: 'hbox',
            region: 'center',
            items: [
                {
                    width: '20%',
                    xtype: 'tree',
                    height:'100%',
                    border: false
                },
                {
                    xtype:'tabPage',
                    height:'100%',
                    border: false
                }
            ]
        }

    ],
    /*
     * */
    constructor: function Master(config) {

        config = config || {};
        this.apply(config);
        var me = this;

        me.on('afterrender', function () {
            this.dom.classList.add('x-view-master');
        });

        me.on('aftershow', function () {

            window.onresize = function () {

                me.height = window.screen.clientHeight;
                me.width = window.screen.clientWidth;
                me.doLayout();
            }
        })
    },

    /*
    *
    * */
    onAfterInit:function onAfterInit() {


        this.callParent();
        var me = this;
        var _left = this.items[1].panelContainers[0];
        var _sep = this.items[1].separatorContainers[0];
        _sep.onclick = function () {
            if( _left.style.display == 'none')
            {
                _sep.title = '单击隐藏';
                me.showLeft();
            }else {
                me.hideLeft();
                _sep.title = '单击展开';
            }
        }
    },
    /*
    * */
    onAfterShow:function onAfterShow()
    {
        Rsd.showWaiting(this.id);
        this.callParent();
        var me = this;

        setTimeout(function () {
            Rsd.callFunction(me,me.load);
        },10);

    },
    
    /*
    *
    * */
    load:function load() {
        Rsd.callFunction(this.items[1].items[0],this.items[1].items[0].load);
        Rsd.closeWaiting(this.id);
    },
    /*
     * */
    addMenu: function (id, pid, text, title, icon, data) {
        var _pid = null;

        if(arguments.length == 1)
        {
            var node =   arguments[0];
            if(node.pid==null)
            {
                node.pid  =this.items[1].items[0].root.id;
            }
            this.items[1].items[0].addNode(node);
        }else{
            _pid = pid;
            if(_pid==null)
            {
                _pid  =this.items[1].items[0].root.id;
            }
            this.items[1].items[0].addNode(id, _pid, text, title, icon, data);
        }

    },
    /*

     * */
    showPage: function showPage(page,speed) {
        if(Rsd.isEmpty(page))
        {
            throw new Error("argumens page is null when call function showPage.");
            return;
        }
        if(page instanceof Rsd.container.Page)
        {
            page.selected = true;
            this.items[1].items[1].add(page,speed||0);

        }else
        {
            throw new Error("page is not instance of class 'Rsd.container.Page'.");
        }
    },
    /*
    * */
    hideLeft:function hideLeft() {

        this.items[1].panelContainers[0].style.display = 'none';
        var _sep = this.items[1].separatorContainers[0];
        _sep.title = '单击展开';

    },
    /*
    * */
    showLeft:function showLeft() {
        this.items[1].panelContainers[0].style.display = '';
        var _sep = this.items[1].separatorContainers[0];
        _sep.title = '单击隐藏';
    }
},function(type){

    var _leftGetter = function () {
        return this.items[1].items[0];
    };

    var _leftSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[1].items[0].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[1].items[0],value,3);
            return;
        }
    }

    this.defineProperty(type,"left", _leftGetter, _leftSetter,true);

   /* var _topGetter = function () {
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
   */
    var _contentGetter = function () {

        return this.items[1].items[1];
    };

    var _contentSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[1].items[1].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[1].items[1],value,3);
            return;
        }
    }

    this.defineProperty(type,"content", _contentGetter, _contentSetter,true);


    var _footerGetter = function () {

        return this.items[0];
    };

    var _footerSetter = function (value) {
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

    this.defineProperty(type,"footer", _footerGetter, _footerSetter,true);


});
