/**
 * Created by seeker910 on 2017/10/23.
 */
Rsd.define('Rsd.controlEx.ImageViewer', {
    extend: 'Rsd.container.Component',
    requires: ['Rsd.control.ImageFile'],
    xtype: 'image-viewer',
    floating: true,
    modular: true,
    width:'100%',
    height:'100%',
    style:{opacity:1},
    cls:'x-controlex-image-viewer',
    /*
    * 允许点击关闭
    * */
    closeEnabled:true,
    listeners: {
        'click': {
            element: 'body',
            fn: function (sender, event) {
                if(this.closeEnabled)
                {
                    this.close();
                }

            }
        },
        "touchstart": {
            element: 'body',
            fn: function (sender, event) {
                this.startTime = new Date().getTime();
                this.startX = event.touches[0].pageX;
                this.startY = event.touches[0].pageY;
            }

        },
        "touchmove": {
            element: 'body',
            fn: function (sender, event) {
                event.preventDefault();
                //console.log("touchmove:" + event.touches[0].clientX+ ',' + event.touches[0].clientY);
            }
        },
        "touchend": {
            element: 'body',
            fn: function (sender, event) {

                var endx = event.changedTouches[0].pageX;
                var endy = event.changedTouches[0].pageY;
                var endtime = new Date().getTime();
                var touch = this.getTouched(this.startX, this.startY, endx, endy,this.startTime,endtime);
                if(touch.speed < 500)
                {
                    touch.speed = 500;
                }
                touch.speed=parseInt(touch.speed/500) * 500;
                switch (touch.direction) {
                    case 'none':
                        //console.log("未滑动！");
                        break;
                    case 'up':
                        this.next({top:'-100%',left:null},{top:'200%',left:null},touch.speed);

                        break;
                    case 'down':
                        this.previous({top:'200%',left:null},{top:'-100%',left:null},touch.speed);
                        break;
                    case 'left':
                        this.next({top:null,left:'-100%'},{top:null,left:'200%'},touch.speed);
                        break;
                    case 'right':
                        this.previous({top:null,left:'200%'},{top:null,left:'-100%'},touch.speed);

                        break;
                    default:
                }
            }
        }
    },
    header:{
        height:40,
        visible:true,
        space:0,
        cls:'x-header'
        //content:'this is image viewer'
    },
    /**
     * @description 数据源
     * @example [{title:'logo',text:'this is a picture',src:'http://image.website.com/imagefile',link:'http://www.website.com/target'}]
     * */
    dataSource: [],
    images:[],
    /*
    * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /*
    * */
    initComponentEx: function initComponentEx() {
        this.callParent();

        var me = this;

        var _ele = me.header.element;
        //重写header, 要确保 title 为第一个子控件
        var _title = document.createElement('div');
        _title.innerHTML = me.header.content;
        _title.classList.add('x-title');
        _ele.appendChild(_title);
        this._titleEle = _title;

        var _arrL = document.createElement('span');
        _arrL.appendChild(document.createTextNode('←'));
        _arrL.classList.add('x-previous');
        _arrL.title = '上一张';
        _arrL.onclick = function (ev) { me.previous(); };


        var _arrR = document.createElement('span');
        _arrR.appendChild(document.createTextNode('→'));
        _arrR.title = '下一张';
        _arrR.classList.add('x-next');
        _arrR.onclick = function (ev) { me.next(); };

        _ele.appendChild(_arrL);
        _ele.appendChild(_arrR);

        var _footer = document.createElement('div');
        me.footer = _footer;
        _footer.classList.add('x-footer');
        me.container.appendChild(_footer);

    },
    /*
    * */
    onAfterLayout:function onAfterLayout() {
        this.callParent();
        this.body.style.bottom = '40px';
    },
    /*
    * */
    setTitle:function setTitle(title)
    {
        if( this._titleEle)
        {
            this._titleEle.innerHTML = title;
        }
        return this;
    },
    /*
    *
    * */
    loadData: function loadData(data) {

        var me = this;
        this.index=-1;
        this.images=[];
        this.dataSource = data || this.dataSource;
        me.body.style.overflow='hidden';
       if(Rsd.isArray(this.dataSource))
       {
           for(var i in this.dataSource)
           {
               if(Rsd.isString(this.dataSource[i]))
               {
                   this.dataSource[i] = {src:this.dataSource[i]};
               }
               var _item = me.dataSource[i];
               var _img = document.createElement('img');

               _img.title = _item.text||'';
               _img.src = _item.src;

               _img.style.opacity = 0;
               _img.style.display = 'none';
               _img.style.maxWidth = '100%';
               _img.style.maxHeight = '100%';

               this.images.push(_img);
               me.body.appendChild(_img);
           }
       }
        var _animate = {opacity:1};
        var _speed = 500;
        this.select(0,null,_animate,_speed);
        return this;
    },

    /**
    *   @description 将控件以动画的形式将对象显示出来
     *   @param {int} index
     *   @param {stting|Object} outAnimate 退出图片动画目标样式：fadeIn,slideDown,{top,30,left:100,backgroudColor:'red'}
     *   @param {stting|Object} inAnimate 进入图片动画起始样式：fadeIn,slideDown,{top,30,left:100,backgroudColor:'red'}
     *   @param {int} speed 速度
    * */
    select:function(index,outAnimate,inAnimate,speed)
    {
        var _outAnimate = Rsd.apply({opacity:0,left:'-100%'},outAnimate||{});
        var _inAnimate = Rsd.apply({display:'inline-block',opacity:0,left:'200%'},inAnimate||{});
        var _speed = speed||200;
        if(_speed < 200)
        {
            _speed = 200;
        }

        var me = this;
        var i = index;

        me.dom.style.opacity = 1;
        if (Rsd.isArray(me.images) && me.images.length > 0) {

            i = i % me.images.length;
            if (i < 0) {
                i = me.images.length - 1;
            }

            this.block(function () {

                if (me.index > -1 && me.index < me.images.length) {

                    var _img_l = me.images[me.index];
                    try {
                        _img_l.style.transitionDuration = (_speed / 1000.00) + "s";
                        _img_l.style.transitionProperty = "all";


                    }catch (e) {

                    }

                    //out image
                    setTimeout(function () {

                        me.setElStyle(_img_l, _outAnimate);

                    }, 0);
                    //
                    setTimeout(function () {
                        try {
                            _img_l.style.transition=null;
                            _img_l.style.display = 'none';
                        }catch (e) {

                        }

                    }, _speed+10);

                }
                var _img = this.images[i];

                try {
                    me.setElStyle(_img,_inAnimate);
                    _img.style.transitionDuration = (_speed / 1000.00) + "s";
                    _img.style.transitionProperty = "all";
                    //_img.style.transitionTimingFunction= _fun;
                    //_img.style.transitionDelay=(0/1000.00) + "s"

                }catch (e) {

                }
                //in image
                setTimeout(function () {

                    try {
                        me.setElStyle(_img, {opacity : 1,left:null,right:null,top:null,bottom:null});

                        me.index = i;
                        var _item = me.dataSource[i];
                        me.footer.innerHTML = (_item.text || '图') + '（' + (i + 1) + '/' + me.images.length + '）';
                    }catch (e) {

                    }

                }, 0);


            }, _speed);

        }
        return this;
    },
    /*
    *
    * */
    next:function next(outAnimate,inAnimate,speed) {

        var _speed = speed||1000;
        this.select( this.index+1,outAnimate,inAnimate,_speed);
        return this;
    },
    /*
    *
    * */
    previous:function previous(outAnimate,inAnimate,speed)
    {
        var _speed = speed||1000;
        this.select(this.index-1,outAnimate||{left:'200%'},inAnimate||{left:'-100%'},_speed);
        return this;
    }

});