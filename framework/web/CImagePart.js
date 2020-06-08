/**
 * Created by seeker910 on 2017/7/27.
 */
Rsd.define('Rsd.web.CImagePart', {
    extend: 'Rsd.control.ImageList',
    xtype: 'c-image',
    requires: [],
    /*
    * [{src:'',formatString:'',text:''},{src:'',text:''}]
    * */
    dataSource:[],
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    afterInit:function() {

        var me = this;
        var i = 0;
        var _fn = function () {
            if(Rsd.isArray(me.dataSource) && me.dataSource.length > 0) {


                i = i % me.dataSource.length;
                var _item = me.dataSource[i];
                me.setSrc(_item.src);
                me.url = _item.url;
                i++;
            }

        }

        if(Rsd.isArray(me.dataSource) && me.dataSource.length > 0) {
            me.setSrc(me.dataSource[0].src);

        }

        setInterval(_fn, 4000);
    },
    loadData:function loadData (data) {
        this.dataSource = data||this.dataSource;
    },
    handler:function onClick() {
        if(this.url)
        {
            window.open(this.url);
        }
    }
});
