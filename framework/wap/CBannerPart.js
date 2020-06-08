/**
 * Created by seeker910 on 2017/7/27.
 */
Rsd.define('Rsd.wap.CBannerPart', {
    extend: 'Rsd.control.ImageList',
    xtype: 'c-banner',
    requires: [],
    /**
    * @description 图片切换的时间间隔，默认5000毫秒
    * */
    interval:5000,
    /*
    * [{src:'',formatString:'',text:'',url:''},{src:'',text:'',url:''}]
    * */
    dataSource:[],
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },

    /*
    * */
    loadData:function loadData (data) {

        var me  = this;
        me.images = [];
        me.dataSource = data||me.dataSource||[];

        setTimeout(function () {
            //遍历数组的路径，预加载到客户端
            for (var i = 0; i < me.dataSource.length; i++){
                var img = new Image();
                img.src = me.dataSource[i].src;
                me.images.push(img);
            }
        },0);


        var i = 0;
        var _fn = function () {
            if(Rsd.isArray(me.dataSource) && me.dataSource.length > 0) {

                i = i % me.dataSource.length;
                var _item = me.dataSource[i];

                me.setSrc(_item.src,0);
                me.url = _item.url;
                i++;
            }

        }

        if(Rsd.isArray(me.dataSource) && me.dataSource.length > 0) {
            me.setSrc(me.dataSource[0].src);
        }

        setInterval(_fn, me.interval||5000);

    },
    /*
    * */
    handler:function onClick() {
        console.debug(this.url);
        if(this.url)
        {
            window.open(this.url);
        }
    }
});
