/**
 * Created by seeker910 on 2017/4/7.
 */
Rsd.define('Rsd.container.Dialog', {
    extend: 'Rsd.container.Component',
    xtype: 'dialog',
    domCls: 'x-dialog',
    floating: true,
    /** 
     * @description 可拖动
     * */ 
    draggable: true,
    modular: true,
    closeBtn: true,
    maxBtn: true,
    minBtn: true,
    width: '100%',
    height: 300,
    /**
     * @description 页面展示后自动加载数据
     */
    autoLoad:true,
    header:{visible: true, height: 35, cls: 'x-f-header',style:{color:'#ffffff'}},
    title:'无标题',
    listeners:{
        'dragstart':{
            element:'dom',
            fn:function (sender,event) {
                event.dataTransfer.setData('Text',Rsd.toString({cmd:'move',pageX:event.pageX||event.clientX,pageY:event.pageY||event.clientY}));
            }
        }
    },
    /**
     * 
     * @param {*} config 
     */
    constructor: function Dialog(config) {

        config = config || {};
        this.apply(config);
    },

    /** 
     * */
    onAfterInit: function onAfterInit() {
        this.callParent();
        var me = this;
        var _closeBtn = Rsd.getRedjsUrl('/resources/images/container/floating_btn_close.png');
        var _closeBtn1 = Rsd.getRedjsUrl('/resources/images/container/floating_btn_close1.png');
         
        var _close = document.createElement('img');
        _close.classList.add('x-f-close');
        _close.src = _closeBtn;
        _close.addEventListener('click', function () {
            me.close();
        });
        _close.addEventListener('mouseover', function () {
            this.src = _closeBtn1;
        });
        _close.addEventListener('mouseout', function () {
            this.src = _closeBtn;
        });
        _close.style.display = this.closeBtn ? '' : 'none';
        me.header.element.appendChild(_close);
    },
    /** 
     * */
    onAfterRender: function onAfterRender() {
        var me = this;


        this.callParent();

        /*
        * */
        Rsd.onDragOver(null,function (event) {
                //console.log(event.dataTransfer.getData('Text'));
            }
        );
        /*
        * */
        Rsd.onDrop(null,function (event) {
            var _data = Rsd.toJson(event.dataTransfer.getData('Text'));
                if(_data['cmd'] == 'move')
                {

                    var _pX = event.pageX||event.clientX;
                    var _pY = event.pageY||event.clientY;

                    var _x = _data.pageX ;
                    var _y = _data.pageY ;

                    var tx = _pX  - _x + parseInt(me.dom.style.left);
                    var ty = _pY - _y + parseInt(me.dom.style.top);

                    me.dom.style.left = tx + "px";
                    me.dom.style.top =  ty + "px";

                    event.dataTransfer.clearData();
                }
        }
        );
        /*
        *
        * */
        Rsd.onDragEnd(null,function (event) {


        });
    },

    /**
     * @description 参数格式： (parent),(animate,speed), (parent,x, y), (parent,x, y,animate), (parent,x, y,animate,speed)
    *  @description 展示页面，指定x，y值可以提高页面加载速度；页面展示后自动加载数据（autoLoad==true）。
     * @param {*} parent 
     * @param {*} x 
     * @param {*} y 
     * @param {*} animate 
     * @param {*} speed 
     */
    showDialog:function showDialog(parent, x, y,animate,speed){

        var _parent = parent;
        var _x = x;
        var _y = y;
        var _animate = animate;
        var _spees = arguments.length == 0?1000:speed;
        if(arguments.length == 2)
        {
            _animate = arguments[0];
            _spees = arguments[1];
        }
        if(arguments.length == 5)
        {
            _parent = arguments[0];
            _x = arguments[1];
            _y = arguments[2];
            _animate = arguments[3];
            _spees =arguments[4];
        }
        this.callParent(_parent, _x, _y,_animate,_spees);

        if(this.autoLoad && !this.isLoaded)
        {
            var me = this;
            setTimeout(function () {
                me.funApplyByIOC('load');
                me.isLoaded = true;
            },_spees);

        }
        if(Rsd.Logger)
        {
            Rsd.Logger.pv(this.$className,this.Title);
        }
        return this;
    },
    /*
        * 加载页面数据
        * */
    load:function load() {

        return this;
    }
});
