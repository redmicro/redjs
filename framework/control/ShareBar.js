/*
 * Created by seeker910 on 2017/8/14.
 */
Rsd.define('Rsd.control.ShareBar', {
    extend: 'Rsd.control.Component',
    requires: [],
    xtype:'share-bar',
    ctrlTagName: 'div',
    "static":function __init() {

        var url = window.location.protocol + "";
        Rsd.loadCssFile(url);
    },
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    initComponentEx:function initComponentEx() {
        this.callParent();


        this.ctrl.appendChild($('<script type="text/javascript" id="bdshare_js" data="type=tools" ></script>')[0]);
        var _bdshell_js = $('<script type="text/javascript" id="bdshell_js"></script>')[0];

        _bdshell_js.src = "" + new Date().getHours();

        this.ctrl.appendChild(_bdshell_js);

        var _bdshare = document.createElement('div');
        _bdshare.id = "bdshare";
        _bdshare.className =  "bdshare_t bds_tools_32 get-codes-bdshare";
        this.ctrl.appendChild(_bdshare);

        _bdshare.appendChild($('<a class="bds_tsina"></a>')[0]);
        _bdshare.appendChild($('<a class="bds_tqq"></a>')[0]);
        _bdshare.appendChild($('<a class="bds_renren"></a>')[0]);
        _bdshare.appendChild($('<a class="bds_qzone"></a>')[0]);
        _bdshare.appendChild($('<a class="bds_douban"></a>')[0]);
        _bdshare.appendChild($('<a class="bds_xg"></a>')[0]);
        _bdshare.appendChild($('<a class="bds_tsina"></a>')[0]);
        _bdshare.appendChild($('<span class="bds_more">更多</span>')[0]);
        _bdshare.appendChild($('<a class="shareCount"></a>')[0]);


    }
});

