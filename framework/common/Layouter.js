/**
 * Created by seeker910 on 13-12-31.
 */
/*
 layouter 所用到的数据全部来自对象本身属性，不是dom对象数据。
 * */
Rsd.define("Rsd.common.Layouter", {
    extend:'Rsd.common.Object',
    singleton:true,
    xtype: 'layouter',
    constructor: function Layouter () {

    },
    /**
     *
     * @description 设置位置相关属性：width、height、margin...以及自定义style，display=none 不参与布局
     * */
    layout: function layout(obj) {

        if (Rsd.isCreated(obj) == false) {
            return;
        }

        if (obj.isHidden()) {
            return;
        }

        if (obj.dom == null) {
            return;
        }

        if (!Rsd.isUndefined(obj.width)) {
            obj.style.width = obj.width;
        }

        if ( !Rsd.isUndefined(obj.height) ) {
            obj.style.height = obj.height;
        }

        var _sizeUnit = obj.sizeUnit||'px';

        obj.setElStyle(obj.dom,obj.style,_sizeUnit);

        var _names = ['top', 'right', 'bottom', 'left'];
        var _margin = obj.margin;
        obj.margin ={ top: 0, right: 0, bottom: 0, left: 0 };

        if (_margin) {

            var _ms;
            if (Rsd.getType(_margin) == '[object String]') {
                _ms = _margin.split(' ');
                 
                for (var i in _ms) {
                    if ( Rsd.isNumber(_ms[i])) {
                        obj.margin[_names[i]] = _ms[i] + _sizeUnit;
                    }
                    else {
                        obj.margin[_names[i]] = _ms[i];
                    }
                }
            }
            if (Rsd.getType(_margin) == '[object Array]') {
                _ms = _margin;

                for (var i in _ms) {
                    if ( Rsd.isNumber(_ms[i])) {
                        obj.margin[_names[i]] = _ms[i] + _sizeUnit;
                    }
                    else {
                        obj.margin[_names[i]] = _ms[i];
                    }
                }
            }
            if (Rsd.getType(_margin) == '[object Object]') {
                _ms = _margin;
                for (var i in _ms) {
                    if ( Rsd.isNumber(_ms[i])) {
                        obj.margin[i] = _ms[i] + _sizeUnit;
                    }
                    else {
                        obj.margin[i] = _ms[i];
                    }
                }
            }
        }

        obj.container.style.marginTop = obj.margin.top;
        obj.container.style.marginRight = obj.margin.right;
        obj.container.style.marginBottom = obj.margin.bottom;
        obj.container.style.marginLeft = obj.margin.left;

        //debugger;

        this.layoutContent(obj.header || obj.label, obj.body || obj.ctrl,obj.sizeUnit);

        setTimeout(function () {
            obj.dom.style.opacity = null;
        },0);

    },
    /**
     * @description layoutBorder,layoutVbox,layoutHbox,layoutFit,layoutAuto
     * */
    layoutItems:function layoutItems(obj){
        //debugger;
        if (obj.items && Rsd.getType(obj.items) == '[object Array]' && obj.items.length > 0) {

            switch (obj.layout.type) {
                case 'border':
                    this.layoutBorder(obj);
                    break;
                case 'vbox':
                    this.layoutVbox(obj);
                    break;
                case 'hbox':
                    this.layoutHbox(obj);
                    break;
                case 'fit':
                    this.layoutFit(obj);
                    break;
                case 'auto':
                    this.layoutAuto(obj);
                    break;
                default:
                    throw new Error('Property type of layout is unknown value ['+obj.layout.type+'].');
                    break;
            }

        }
    },
    /**
     * */
    layoutBorder:function layoutBorder(obj){
        //debugger;
        if(obj.layout.type != 'border')
        {
            return;
        }
        var _item;
        var _i_margins = [0, 0, 0, 0];
        var _sizeUnit = obj.sizeUnit||'px';
        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(!_item)
            {
                throw new Error('items['+i+'] is null in object '+ obj.id + '.');
            }
            if(!Rsd.isObject(_item))
            {
                throw new Error('items['+i+'] is not a object in object '+ obj.id + '.');
            }
            if(!(_item instanceof  Rsd.common.ComponentX))
            {
                continue;
            }
            if(_item.floating || _item.fixed)
            {
                continue;
            }

            switch (_item.region) {
                case 'top':
                case 'north':
                    _item.addCls('dom','x-layout-border-north');
                    var _position = {};
                    _position.top = _i_margins[0] + _sizeUnit;
                    _position.right = _i_margins[1] + _sizeUnit;
                    _position.bottom = null;
                    _position.left = _i_margins[3] + _sizeUnit;
                    _item.setPosition(_position);
                    if (!_item.height) {
                        continue;
                    }

                    if (typeof (_item.height) == 'string' && parseInt(_item.height)) {
                        _i_margins[0] += parseInt(_item.height);
                    }else
                    {
                        _i_margins[0] += _item.height;
                    }
                    break;
                case 'right':
                case 'east':
                    _item.addCls('dom','x-layout-border-east');
                    var _position = {};
                    _position.top = _i_margins[0] + _sizeUnit;
                    _position.right = _i_margins[1] + _sizeUnit;
                    _position.bottom = _i_margins[2] + _sizeUnit;
                    _position.left = null;
                    _item.setPosition(_position);
                    if (!_item.width) {
                        continue;
                    }

                    if (typeof (_item.width) == 'string' && parseInt(_item.width)) {
                        _i_margins[1] += parseInt(_item.width);
                    }else {
                        _i_margins[1] += _item.width;
                    }

                    break;
                case 'bottom':
                case 'south':
                    _item.addCls('dom','x-layout-border-south');
                    var _position = {};
                    _position.top = null;
                    _position.right = _i_margins[1] + _sizeUnit;
                    _position.bottom = _i_margins[2] + _sizeUnit;
                    _position.left = _i_margins[3] + _sizeUnit;
                    _item.setPosition(_position);
                    if (!_item.height) {
                        continue;
                    }

                    if (typeof (_item.height) == 'string' && parseInt(_item.height)) {
                        _i_margins[2] +=  parseInt(_item.height);
                    }else {
                        _i_margins[2] += _item.height;
                    }

                    break;
                case 'left':
                case 'west':
                    _item.addCls('dom','x-layout-border-west');
                    var _position = {};
                    _position.top = _i_margins[0]+ _sizeUnit;
                    _position.right = null;
                    _position.bottom = _i_margins[2]+ _sizeUnit;
                    _position.left = _i_margins[3]+ _sizeUnit;
                    _item.setPosition(_position);
                    if (!_item.width) {
                        continue;
                    }

                    if (typeof (_item.width) == 'string' && parseInt(_item.width)) {
                        _i_margins[3] += parseInt(_item.width);
                    }else {
                        _i_margins[3] += _item.width;
                    }

                    break;
                case 'center':
                    _item.width = 'auto';
                    _item.height = 'auto';
                    break;
                default:
                    throw new Error('Property region(top/north,right/east,bottom/south,left/west,center) of component['+ _item.$className +'] is unknown value ['+_item.region+'] in '+ obj.$className +'.');
                    break;
            }


        }

        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(!(_item instanceof  Rsd.common.ComponentX))
            {
                continue;
            }
            if(_item.floating || _item.fixed)
            {
                continue;
            }
            switch (_item.region) {
                case 'center':
                    _item.width = null;
                    _item.height = null;
                    _item.addCls('dom','x-layout-border-center');
                    var _position = {};
                    _position.top = _i_margins[0] + _sizeUnit;
                    _position.right = _i_margins[1] + _sizeUnit;
                    _position.bottom = _i_margins[2] + _sizeUnit;
                    _position.left = _i_margins[3] + _sizeUnit;

                    _item.setPosition(_position);

                    if(_i_margins[0]==0 && _i_margins[2]==0)
                    {
                        _item.height = '100%';
                    }

                    if(_i_margins[1]==0 && _i_margins[3]==0) {

                        _item.width = '100%';
                    }
                    break;
                default:
                    break;
            }
        }

    },
    /**
     * 一列多行布局
     * */
    layoutVbox:function layoutVbox(obj){

        if(obj.layout.type != 'vbox')
        {
            return;
        }
        var _item;
        var _height_rest = obj.body.clientHeight;
        var _t_flex = 0;
        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(_item.floating || _item.fixed)
            {
                continue;
            }
            if (_item.flex) {
                _t_flex += _item.flex;
                continue;
            }
            _height_rest -= _item.getHeight();

        }
        var _p_top=0;
        if(_t_flex)
        {
            obj.body.style.display= "flex";
        }
        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(_item.floating || _item.fixed)
            {
                continue;
            }
            if( _item.width == null)
            {
                _item.width = '100%';
            }

            //if (_height_rest && _t_flex && _item.flex) {
            //    _item.height = parseInt(_height_rest * _item.flex / _t_flex) + 'px';
            //}

            if(_item.flex)
            {
                _item.style = _item.style||{};
                _item.style.flex = _item.flex;
            }
            switch (_item.align || obj.layout.align)
            {
                case 'left':
                    _item.addCls('dom','x-layout-vbox-left');
                    break;
                case 'right':
                    _item.addCls('dom','x-layout-vbox-right');
                    break;
                case 'top':
                    _item.addCls('dom','x-layout-vbox-top');
                    break;
                case 'bottom':
                    _item.addCls('dom','x-layout-vbox-bottom');
                    break;
                case 'center':
                    _item.addCls('dom','x-layout-vbox-center');
                    break;
                default :
                    throw new Error('Property align of layout is unknown value ['+_item.align || obj.layout.align+'].');
                    break;
            }
        }

        if(obj.height==undefined || obj.height == null || obj.height == 'auto')
        {
            var _h = 0;
            for (var i =0; i < obj.items.length;i++){
                _item = obj.items[i];
                _h += _item.height;
            }
            if(obj.margin)
            {
                _h += parseInt(obj.margin.top)  + parseInt(obj.margin.bottom);
            }

            obj.dom.style.height = _h +'px';
        }
    },
    /**
     * 一行多列布局
     * */
    layoutHbox:function layoutHbox(obj){
        if(obj.layout.type != 'hbox')
        {
            return;
        }
        var _item;
        var _width_rest = obj.body.clientWidth;
        var _t_flex = 0;
        
        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(_item.floating || _item.fixed)
            {
                continue;
            }
            if( _item.height == null)
            {
                _item.height = '100%';
            }

            if (_item.flex) {
                _t_flex += _item.flex;
                continue;
            }
            _width_rest -= _item.getWidth();

        }
        if(_t_flex)
        {
            obj.body.style.display= "flex";
        }
        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(_item.floating || _item.fixed)
            {
                continue;
            }
            //if (_width_rest && _t_flex && _item.flex) {
            //    _item.width = parseInt(_width_rest * _item.flex / _t_flex) + 'px';
            //}
            if(_item.flex)
            {
                _item.style = _item.style||{};
                _item.style.flex = _item.flex;
            }
            switch (_item.align || obj.layout.align)
            {
                case 'left':
                    _item.addCls('x-layout-hbox-left');
                    break;
                case 'right':
                    _item.addCls('x-layout-hbox-right');
                    break;
                case  'top':
                    _item.addCls('x-layout-hbox-top');
                case 'bottom':
                    _item.addCls('x-layout-hbox-bottom');
                    break;
                case 'center':
                    _item.addCls('x-layout-hbox-center');
                    break;
                default :
                    throw new Error('Property align(left,right,top,bottom,center) of layout is unknown value ['+_item.align || obj.layout.align+'].');
                    break;
            }
        }
        if(_width_rest> 0 && _t_flex>0)
        {
           // console.error("Layout error:In object("+obj.id+") _width_rest:" + _width_rest +" and  _t_flex:"+ _t_flex );
        }
        //debugger;
        if(obj.width == undefined || obj.width == null || obj.width == 'auto')
        {
            var _w = 0;
            for (var i=0; i< obj.items.length ;i++){
                _item = obj.items[i];
                _w += _item.width;
            }
            if(obj.margin)
            {
                _w += parseInt(obj.margin.left)  + parseInt(obj.margin.right);
            }

            obj.dom.style.width = _w +'px';
        }
    },
    /**
     * */
    layoutFit:function layoutFit(obj){
        if(obj.layout.type != 'fit')
        {
            return;
        }
        var  _item;

        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(_item.floating || _item.fixed)
            {
                continue;
            }

            if(_item.height == null)
            {
                _item.height='100%';
            }
            if(_item.width == null)
            {
                _item.width='100%';
            }

            var _align = _item.align || obj.layout.align;
            switch (_align)
            {
                case 'center':
                    _item.changeCls('dom','x-componentx-dom','x-layout-fit-center');
                    break;
                case 'left':
                    _item.addCls('dom','x-layout-fit-left');
                    break;
                case 'right':
                    _item.addCls('dom','x-layout-fit-right');
                    break;
                case  'top':
                    _item.addCls('dom','x-layout-fit-top');
                    break;
                case  'bottom':
                    _item.addCls('dom','x-layout-fit-bottom');
                    break;
                default :
                    throw new Error('Property align of layout is unknown value ['+_align+'].');
                    break;
            }
        }
    },
    /**
    * */
    layoutAuto:function layoutAuto(obj){
        if(obj.layout.type != 'auto')
        {
            return;
        }

        var  _item;

        for (var i=0; i< obj.items.length ;i++) {
            _item = obj.items[i];
            if(_item.floating || _item.fixed)
            {
                continue;
            }

            var _align = _item.align || obj.layout.align;
            switch (_align)
            {
                case 'center':
                    _item.changeCls('dom','x-componentx-dom','x-layout-auto-center');
                    break;
                case 'left':
                    _item.addCls('dom','x-layout-auto-left');
                    break;
                case 'right':
                    _item.addCls('dom','x-layout-auto-right');
                    break;
                case  'top':
                    _item.addCls('dom','x-layout-auto-top');
                    break;
                case  'bottom':
                    _item.addCls('dom','x-layout-auto-bottom');
                    break;
                default :
                    throw new Error('Property align of layout is unknown value ['+_align+'].');
                    break;
            }
        }
    },

    /** 
     * */ 
    layoutContent: function layoutContent(header, body,sizeUnit) {

        var _h_style =  header.style || {};
        var _h_element = header.element;
        var _sizeUnit = sizeUnit||'px';

        Rsd.setElStyle(_h_element,_h_style,_sizeUnit);

        var _w,_h;
        if (header.visible) {
            switch (header.position.toLowerCase()) {
                case 'top':
                    _h_element.style.textAlign = header.align || 'center';
                    _h_element.style.width = '100%';
                    _h_element.style.height = Rsd.isNumber(header.height)?  (header.height + _sizeUnit):header.height;
                    _h_element.style.top = '0px';
                    _h_element.style.left = '0px';
                    _h_element.style.right = '0px';

                    body.style.width = '100%';
                    body.style.top = (_h_element.clientHeight + parseInt(header.space)) + 'px';
                    body.style.bottom = '0px';
                    body.style.left = '0px';
                    body.style.right = '0px';
                    break;
                case 'bottom':
                    _h_element.style.textAlign = header.align || 'center';

                    _h_element.style.height = Rsd.isNumber(header.height) ? ( header.height + _sizeUnit):header.height;
                    _h_element.style.bottom = '0px';
                    _h_element.style.left = '0px';
                    _h_element.style.right = '0px';
                    _h_element.style.width = '100%';
                    if(body.parentNode)
                    {
                        body.style.height = (body.parentNode.clientHeight - _h_element.clientHeight - parseInt(header.space)||0) + 'px';
                    }else
                    {
                        console.warn('body.parentNode is null (body id: '+ body.getAttribute('id')+').');
                    }

                    body.style.left = '0px';
                    body.style.right = '0px';
                    body.style.top = '0px';
                    body.style.bottom = (_h_element.clientHeight + parseInt(header.space)||0) + 'px';

                    body.style.width = '100%';

                    break;
                case 'left':
                    header.align = header.align || 'right';
                    _h_element.style.textAlign = header.align ;
                    _h_element.style.height = '100%';
                    _h_element.style.width = header.width == null ? 'auto' : ( header.width + _sizeUnit);

                    _h_element.style.left = '0px';

                    _w = (header.width == null ? _h_element.clientWidth :header.width);
                    body.style.right = '0px';
                    body.style.left = ( _w + parseInt(header.space)) + 'px';
                    if(body.parentNode)
                    {
                        //chrome 浏览器 下 input left right  两个属性不能同时生效
                        //calc(100% - 130px)
                        body.style.width = 'calc(100% - ' + ( _w + parseInt(header.space)+2) + 'px)';
                        //body.style.width = (body.parentNode.clientWidth - _w - parseInt(header.space)-2) + 'px';
                        body.style.height = (body.parentNode.clientHeight - 2) + 'px';

                    }
                    else
                    {
                        console.warn('body.parentNode is null (body id:'+ body.getAttribute('id')+').');
                    }
                    break;
                case 'right':
                    //debugger;
                    header.align =  header.align || 'left';
                    _h_element.style.textAlign = header.align ;
                    _h_element.style.height = '100%';
                    _h_element.style.width = header.width == null ? 'auto' : (header.width + _sizeUnit);


                    _w = (header.width == null ? _h_element.clientWidth :header.width);
                    body.style.left = '0px';
                    body.style.right = ( _w + parseInt(header.space)) + 'px';
                    if(body.parentNode)
                    {
                        //chrome 浏览器 下 input left right  两个属性不能同时生效
                        body.style.width = (body.parentNode.clientWidth - _w - parseInt(header.space)-2) + 'px';
                        body.style.height = (body.parentNode.clientHeight - 2) + 'px';
                    }
                    else
                    {
                        console.warn('body.parentNode is null (body id:'+ body.getAttribute('id')+').');
                    }

                    _h_element.style.textAlign = header.align;
                    _h_element.style.right = '0px';
                    body.style.right = ( _h_element.clientWidth + parseInt(header.space)) + 'px';

                    break
                default:
                    throw new Error('Property position of header or label is unknown value ['+header.position+'].');
                    break;
            }

            var _line_height = (header.lineHeight || header.height );
            if(_line_height)
            {
                _h_element.style.lineHeight = _line_height + _sizeUnit;
            }

        }
        else{
            if(_h_element)
            {
                _h_element.style.display = 'none';
            }

            body.style.top="0px";
            body.style.left="0px";
            body.style.right="0px";
            body.style.bottom="0px";
            body.style.width = '100%';
            body.style.height = '100%';
            body.style.margin = 'auto 0px';
        }

        if(header.content instanceof  Rsd.common.ComponentX)
        {
            header.content.doLayout();

        }
    }
});
