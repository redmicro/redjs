/**
 * Created by seeker910 on 14-1-6.
 */
Rsd.define('Rsd.control.Svg', {
    extend: 'Rsd.control.Component',
    xtype: 'svg',
    title: '',
    ctrlTagName: 'svg',
    ns: "http://www.w3.org/2000/svg",
    /*
    * svg 资源名称
    * */
    tagName:null,
    /*
    * svg
    * 大小*/
    size:'20 20',
    /*
     * @param {object} config
     */
    constructor: function Svg(config) {

        config = config || {};
        this.apply(config);
    },
    /*
    * */
    onBeforeInit:function onBeforeInit()
    {
        this.callParent();

        this.ctrl = document.createElementNS(this.ns,'svg' );

        if(!Rsd.isEmpty(this.tagName) )
        {
            var _rs_svg = Rsd.create('Rsd.data.Svg',{});
            var _data =  _rs_svg.get.apply(_rs_svg,this.tagName.split('.'));
            if(Rsd.isEmpty(_data))
            {
                console.error('svg data(tagName:'+this.tagName+')  is null or not exists.');
            }
            else
            {
                this.loadData(_data);
            }
           
        }


        var _desc = this.text||this.tagName;
        if (_desc) {
            this.setAttributeNS("desc",_desc);
        }
        this.ctrl.style.verticalAlign = "middle";
        this.ctrl.style.fill = 'currentColor';
        this.ctrl.style.cursor='inherit';

        var _list = Rsd.isString(this.size)?this.size.split(' '):this.size;
        if(_list.length == 1)
        {
            this.setAttributeNS("width", _list[0]+ 'px');
            this.setAttributeNS("height", _list[0] +  'px');
        }
        if(_list.length > 1) {
            this.setAttributeNS("width", _list[0]+ 'px');
            this.setAttributeNS("height", _list[1] + 'px');
        }


    },
    /*
    *
    * */
   loadData:function loadData(data) {

       var _data = data || [];

       if (_data && !Rsd.isEmpty(_data.viewBox)) {
           this.setAttributeNS("viewBox", _data.viewBox);
           if (_data.path) {
               this.addPath(_data.path, _data.fill || 'currentColor');
           }

       } else {
           console.error('svg(id:'+this.id+') data is error.');
           console.error('data is:',_data);
       }
   },
    /*
     * */
    setAttributeNS: function setAttributeNS(name, value) {

        this.ctrl.setAttribute(name,value);

    },
    /*
    * */
    addText:function addText(text,params)
    {
        var _txt = document.createElementNS(this.ns, "text");
        _txt.appendChild(document.createTextNode(text));
        for(var p in params)
        {
            _txt.setAttributeNS(null, p, params[p]);
        }

        this.ctrl.appendChild(_txt);
        return _txt;
    },
    /*
     * */
    addCurve: function addCurve() {

    },
    /*
     * */
    addRect: function addRect(x, y, width, height, fill, stroke) {
        var _rect = document.createElementNS(this.ns, "rect");
        _rect.setAttributeNS(null, "x", x);
        _rect.setAttributeNS(null, "y", y);
        _rect.setAttributeNS(null, "width", width<0?0:width);
        _rect.setAttributeNS(null, "height", height<0?0:height);
        _rect.setAttributeNS(null, "fill", fill || 'black');
        //_rect.setAttributeNS(null, "style","opacity:0.8" );
        _rect.setAttributeNS(null, "stroke", stroke || 'red');
        this.ctrl.appendChild(_rect);
        return _rect;
    },
    /*
     * */
    addCircle: function addCircle(cx, cy, r, fill, stroke) {
        var _circle = document.createElementNS(this.ns, "circle");
        _circle.setAttributeNS(null, "cx", cx);
        _circle.setAttributeNS(null, "cy", cy);
        _circle.setAttributeNS(null, "r", r);
        _circle.setAttributeNS(null, "fill", fill || 'black');
        //_circle.setAttributeNS(null, "style","opacity:0.8" );
        _circle.setAttributeNS(null, "stroke", stroke || 'red');
        this.ctrl.appendChild(_circle);
        return _circle;
    },
    /*
    * */
    addLine: function addLine(x1, y1, x2, y2, stroke) {
        var _line = document.createElementNS(this.ns, "line");
        _line.setAttributeNS(null, "x1", x1);
        _line.setAttributeNS(null, "y1", y1);
        _line.setAttributeNS(null, "x2", x2);
        _line.setAttributeNS(null, "y2", y2);
        //    _line.setAttributeNS(null, "stroke-width", width|| 1);
        //    _line.setAttributeNS(null, "style","opacity:0.8" );
        _line.setAttributeNS(null, "stroke", stroke || 'red');
        this.ctrl.appendChild(_line);
        return _line;
    },
    /*
     * */
    addPath: function addPath(path, fill, stroke) {

        var _path = document.createElementNS(this.ns, "path");
        var __path = "";
        if (Rsd.getType(path) == '[object Array]') {
            var _node;
            for (var p in path) {
                _node = path[p];
                __path += ' ' + _node['tag'];
                if (_node['value'] != null) {

                    for (var v in _node['value']) {
                        __path += ' ' + _node['value'][v];
                    }
                }
            }
        } else {
            __path = path;
        }
        _path.setAttributeNS(null, "d", __path);
        _path.setAttributeNS(null, "fill", fill || 'black');
        //_path.setAttributeNS(null, "style","opacity:0.8" );
        _path.setAttributeNS(null, "stroke", stroke || 'red');
        this.ctrl.appendChild(_path);

        return _path;
    }

},function(type){

    var _ctrlGetter = function () {
        if (this.__ctrl == undefined) {
            var _doc = window.svgDocument ||  window.document ;
            this.__ctrl =  _doc.createElementNS(this.ns, "svg");
        }

        return this.__ctrl;
    };
    var _ctrlSetter = function (value) {
        this.__ctrl = value;
    };

    this.defineProperty(type,"ctrl", _ctrlGetter, _ctrlSetter,true);

});

