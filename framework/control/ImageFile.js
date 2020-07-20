/** 
 * @description 图片上传控件
 * */ 
Rsd.define('Rsd.control.ImageFile', {
    extend: 'Rsd.control.Component',
    xtype: 'image-file',
    ctrlTagName: 'div',
    ctrlCls: 'x-control-image-file',
    dataIndex:'',
    clip:null,
    /**
    * 图地址,与value的区别是：src不做任何转换，直接将值设在img元素的src属性上， value 值可通过formatString进行格式化后设置到img元素的src属性上
    * */
    src: '',
    /**
    * @description 是否是只读模式：在只读模式下不能用于上传图片。
    * */
    readOnly:true,
    /**
     * @description image/jpeg, image/x-png, image/gif
     * */
    accept:'images/*',
    border:true,
    backgroundImage:true,
    /**
     * @description value 值格式化字符串
     * */
    formatString:null,
    /**
    * @description 允许看大图
    * */
    zoomView:true,
    /*
     * */
    constructor: function Image(config) {

        this.apply(config||{});
    },

    /**
     * */
    initComponentEx: function initComponentEx() {
        this.callParent();

        var _img = document.createElement('img');
        this.image = _img;
        if(this.border)
        {
            var _border = document.createElement('div');
            _border.classList.add('x-border');
            this.ctrl.appendChild(_border);
            _border.appendChild(_img);
        }
       else
        {
            this.ctrl.appendChild(_img);
        }

        var me = this;
        me.image.style.maxWidth = '100%';
        me.image.style.maxHeight = '100%';
        
        if(this.zoomView==undefined || this.zoomView)
        {
            this.image.onclick = function () {

                console.log(me.src);
                if(Rsd.isEmpty(me.src)|| me.src == '#')
                {
                    return;
                }
                var _view = Rsd.create('Rsd.controlEx.ImageViewer',{title:me.title});

                _view.showDialog(this.parent).loadData([{src:me.src,text: me.label.content}]);

            }
        }


        this.image.onload = function () {
            me.image.style.display='inline-block';
            me.closeLoading();
        };

        this.image.onerror = function () {
            me.image.style.display='inline-block';
            me.closeLoading();
        };

        if(!this.readOnly)
        {
            var _close = document.createElement('span');
            this.btnClose = _close;
            _close.appendChild(document.createTextNode('X'));
            _close.classList.add('x-close');
            _close.onclick = function () {
                me.setSrc('#');
            }
            this.ctrl.appendChild(_close);

            var _add = document.createElement('div');
            this.btnAdd = _add;
            _add.classList.add('x-add');

            _add.style.top = this.ctrl.style.top;
            _add.style.right = this.ctrl.style.right;
            _add.style.bottom = this.ctrl.style.bottom;
            _add.style.left = this.ctrl.style.left;
            _add.style.width = this.ctrl.width;
            _add.style.height = this.ctrl.height;

            var _file = document.createElement('input');
            _file.type = 'file';
            _file.style.width = "100%";
            _file.style.height = "100%";
            _file.style.opacity = 0;
            _file.accept = this.accept||'images/*';
            _file.multiple = false;
            _file.onchange =function () {
                if(_file.files.length > 0)
                {
                    var reader = new FileReader();
                    reader.onload = function(evt) {
                        var src = evt.target.result;
                        me.setSrc(src);
                    }
                    reader.readAsDataURL(_file.files[0]);
                }

            }
            _add.appendChild(_file);

            this.ctrl.appendChild(_add);

        }


        if(this.backgroundImage == false || this.backgroundImage =='none')
        {
            this.ctrl.classList.add('x-control-image-file-none-bg');
        }
        else
        {
            this.ctrl.style.backgroundImage = this.backgroundImage ;
        }
    },
    /*
    *
    * */
    onAfterInit: function onAfterInit() {

        this.callParent();
        //必须在此设置src
        this.setSrc(this.src)

        if (this.clip) {
            this.image.style.clip = this.clip;
        }


    },
    /*
     * */
    setSrc: function (src) {

        var me = this;
        me.src = (Rsd.isEmpty(src)? "#" :src);

        if (me.image) {
            me.image.style.display = 'none';
            me.showLoading('加载中...',null);

            setTimeout(function () {

                me.image.src = me.src;

            },20);

        }


        if(Rsd.isEmpty(me.src)|| me.src=='#')
        {
            this.image.style.display = 'none';
            if(this.btnClose)
            {
                this.btnClose.style.display = 'none';
            }


            if(this.btnAdd)
            {
                this.btnAdd.style.display = 'inline-block';
            }
        }
        else {

            this.image.style.display = 'inline-block';
            if (this.btnClose) {
                this.btnClose.style.display = 'inline-block';
            }
            if (this.btnAdd) {
                this.btnAdd.style.display = 'none';
            }

        }
    },
    /*
     * */
    getSrc: function () {
        return this.src;
    },
    /*
    * */
    setValue:function setValue(value) {

        this.value = value;
        var me = this;

        if(Rsd.isEmpty(value)|| value == 'null')
        {
            this.setSrc('#');
            return this;
        }

        function formatTemplateString(str)
        {      //debugger;
            var html = "";
            var arr = str.split('#');

            var _c_str = null;
            var _n_str = null;
            for(var i=0 ;i< arr.length;i++)
            {
                _c_str = arr[i];
                if(_c_str == undefined)
                {
                    continue;
                }
                if( _c_str.startWith('=') && _c_str.endWith('='))
                {
                    if(_c_str.replaceAll("=","")==me.dataIndex)
                    {
                        html += me.value ;
                    }
                    else
                    {
                        if(Rsd.app.hasOwnProperty(_c_str.replaceAll("=","")))
                        {
                            html += Rsd.app[_c_str.replaceAll("=","")] ;
                        }

                    }
                    continue;
                }

                html += _c_str;
                if(i < (arr.length -1) )
                {
                    _n_str =  arr[i+1];
                    if(_n_str == undefined || !( _n_str.startWith('=') && _n_str.endWith('=')))
                    {
                        html +='#';
                    }
                }
            }
            return html;
        }

        if((this.value && this.value.startWith('http://')) || Rsd.isEmpty(this.formatString))
        {
            this.setSrc(this.value);
        }
        else
        {
            var _src = formatTemplateString(this.formatString||'');

            this.setSrc(_src);
        }
        return this;
    },
    /*
    * */
    getValue:function getValue() {
        return this.value;
    },
    /*
    *
    * */
    makeControl:function makeControl(config,row)
    {
        function formatTemplateString(str,row)
        {      //debugger;
            var html = "";
            var arr = str.split('#');

            var _c_str = null;
            var _n_str = null;
            for(var i=0 ;i< arr.length;i++)
            {
                _c_str = arr[i];
                if(_c_str == undefined)
                {
                    continue;
                }
                if( _c_str.startWith('=') && _c_str.endWith('='))
                {
                    if(row.hasOwnProperty(_c_str.replaceAll("=","")))
                    {
                        html += row[_c_str.replaceAll("=","")] ;
                    }
                    else
                    {
                        if(Rsd.app.hasOwnProperty(_c_str.replaceAll("=","")))
                        {
                            html += Rsd.app[_c_str.replaceAll("=","")] ;
                        }

                    }
                    continue;
                }

                html += _c_str;
                if(i < (arr.length -1) )
                {
                    _n_str =  arr[i+1];
                    if(_n_str == undefined || !( _n_str.startWith('=') && _n_str.endWith('=')))
                    {
                        html +='#';
                    }
                }
            }
            return html;
        }

        var me = this;

        me.timer = (me.timer||10) + 0;
        if(me.timer > 3000)
        {
            me.timer=10;
        }
        var _config = config ||{};
        //var _editable = _config.editable;
        var _value = row[_config.dataIndex||_config.name];
        var _h = _config.height || 50;
        var _w = _config.width || 50;
        var _ctrl = document.createElement('img');
        setTimeout(function () {
            var _src = '';
            if(_value &&_value.startWith('http://'))
            {
                _src = _value;
            }else
            {
                _src = formatTemplateString(_config.formatString,row);
            }

            var list = _src.split('http://');
            if(list.length > 2)
            {
                _ctrl.src = list[list.length -1];
            }else {
                _ctrl.src = _src;
            }

        },me.timer);
        if(_config.clip)
        {
            _ctrl.style.clip = _config.clip;
        }
        _ctrl.width =_w;
        _ctrl.height = _h;

        return _ctrl;
    }

});

