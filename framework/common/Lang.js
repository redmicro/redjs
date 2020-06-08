/**
 * Created by seeker910 on 2017/7/26.
 */
Rsd.define('Rsd.common.Lang', {
    extend:'Rsd.common.Object',
    singleton:true,
    "static":function __init(callback) {

        Rsd.resources= Rsd.resources ||{};
        Rsd.resources.lang={};

        if(callback)
        {
            callback.call();
        }
    },

    /*
     * */
    constructor: function Lang(config) {
        //debugger;
        this.apply(config);

    },
    /*
    * 加载语言包
    * */
    load:function (name) {

       var _lang = name||'zh-cn'

       var url = Rsd.getRedjsUrl('/resources/lang/'+ _lang +'.js?t=' + Rsd.timestamp);

       Rsd.loadScriptFile(url);
    },
    /*
    * */
    get:function get(name) {
        var arr = name.split('.');
        var lang = Rsd.resources.lang;
        for (var i in arr) {
            lang = lang[arr[i]];
        }
        return lang;
    }
});