/**
 * Created by seeker910 on 2017/7/26.
 * Svg 数据对象
 */
Rsd.define('Rsd.data.Svg', {
    extend:'Rsd.common.Object',
    singleton:true,
    "static":function __init(callback) {
        Rsd.resources = Rsd.resources ||{};
        Rsd.resources.svg={};

        if(callback)
        {
            callback.call();
        }
    },

    /*
     * */
    constructor: function Svg(config) {
        //debugger;
        this.apply(config);

    },
    /*
    * 加载资源
    * */
    load:function (group,url,callback) {


        var _name = group||'';
        var _url = url||'';
        var _callback = callback||null;


        if(arguments.length ==1)
        {
            _url = arguments[0];
            _name = Rsd.getFileName(arguments[0]);
        }

        if(arguments.length ==2)
        {
          _url = arguments[0];
          _name = Rsd.getFileName(arguments[0]);
          _callback = arguments[1]

        }

        var _store = Rsd.create('Rsd.data.Store', {
            proxy: {
                url: _url,
                method: 'get'
            }
        });

        _store.load({}, function (data) {

            var _list = Rsd.toJson(data);

            var _svg_mapping = {};
            if(Rsd.isArray(_list))
            {
                for(var i in _list)
                {
                    _svg_mapping[i.toLowerCase()] = _list[i];
                }
            }
            if(Rsd.isObject(_list))
            {
                _svg_mapping = _list;
            }
            Rsd.resources.svg[_name.toLowerCase()] = _svg_mapping;

            if (Rsd.isFunction(_callback)) {
                _callback(_svg_mapping);
            }
        });
    },
    /*
    * */
    get:function get(gruop,tagName) {

        var _group =gruop||'default';
        var _tName = tagName;

        if(!Rsd.isEmpty(_tName) && Rsd.resources.svg[_group.toLowerCase()])
        {

            var _name = _tName.split('.');
            var _data = Rsd.resources.svg[_group.toLowerCase()][_name[0]];
            if(_name.length>1)
            {
                _data = _data[_name[1]];
            }
            return _data;
        }
        return {};
    }
});