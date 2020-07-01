/**
*@description  图片显示控件，没有大图预览功能
* */
Rsd.define('Rsd.control.Image', {
    extend: 'Rsd.control.Component',
    xtype: 'image',
    ctrlTagName: 'div',
    ctrlCls: 'x-control-image',
    dataIndex:'',
    /**
     * @description 图片剪切属性(style.clip)：rect(0px 50px 200px 0px)
     */
    clip:null,
    /**
     * 图地址
     */ 
    src: '',
    /**
     * 
     */
    border:false,
    /*
    * 背景图片URL
    * */
    backgroundImage:true,
    /*
    * @description 图片style.zoom属性
    */
    zoom:null,
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
        this.ctrl.style.textAlign = 'center';
        me.image.style.width = this.zoom?this.zoom:'100%';//需要 实现一个 部署（缩放）的方式
        me.image.style.maxWidth = '100%';
        me.image.style.maxHeight = '100%';


       /* this.image.onload = function () {
            me.image.style.display='inline-block';
            me.closeLoading();
        };

        this.image.onerror = function () {
            me.image.style.display='inline-block';
            me.closeLoading();
        };*/


        if(this.backgroundImage == false || this.backgroundImage =='none')
        {
            this.ctrl.classList.add('x-control-image-file-none-bg');
        }
        else
        {
            this.ctrl.style.backgroundImage = this.backgroundImage ;
        }
    },
    /**
     * 
     */ 
    onAfterInit: function onAfterInit() {

        this.callParent();
        //必须在此设置src
        this.setSrc(this.src)

        if (this.clip) {
            this.image.style.clip = this.clip;
        }
    },
    /** 
     * @description 必须在此设置src
     * */ 
    setSrc: function (src,ms) {

        var me = this;
        me.src = (Rsd.isEmpty(src)? "#" :src);

        if (me.image) {
            //me.image.style.display = 'none';
            //me.showLoading('加载中...',null);
            setTimeout(function () {

                me.image.src = me.src;

            },Rsd.isEmpty(ms)?20:ms);

        }

    },
    /**
     * 
     * */
    getSrc: function () {
        return this.src;
    },
    /**
     * 
     */ 
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
     /**
     * 
     */ 
    getValue:function getValue() {
        return this.value;
    },
    /*
    *
    * */
    makeControl:function makeControl(config,row)
    {
        var _fn = function formatTemplateString(str,row)
        {      //debugger;
            var _str = Rsd.isEmpty(str)?"":str;
            var html = "";
            var arr = _str.split('#');

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
        _ctrl.onerror = function()
        {
            this.onerror = null;
            var _src = this._src;
            var list = _src.split('http://');
            if(list.length > 2)
            {
                this.src = list[list.length -1];
            }
            else 
            {
                list = _src.split('https://');
                if(list.length > 2)
                {
                    this.src = list[list.length -1]; 
                }else
                {
                    this.src = _src;
                }
            }
            
        }

        setTimeout(function () {
            var _src = _value;
             
            if(_config.formatString)
            {
                _src = _fn(_config.formatString,row);
            }
            _ctrl.src = _src;
           

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

