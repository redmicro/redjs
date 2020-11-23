/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:24
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.Table', {
    extend: 'Rsd.control.Component',
    requires: ['Rsd.control.CheckBox'],
    xtype: 'table',
    caption: '',
    headerFixed: true,
    headerVisible: true,
    /*
     name:'myColumn',
     text:‘序号’，
     tip:'1:男，2:女',
     dataIndex:'user_name',
     align:right,
     xtype:date(日期类型)|timestamp(时间戳类型)|number(数字类型)|bool(布尔类型)|string(字符串类型)|text(文本类型)|index(索引列)|checkbox(选择列)|template(模版列)|enum(枚举列)|autocomplete(自动完成列)|json(json列)|已定义控件类型
     style:null,
     editable:false,
     //可排序，根据dataIndex 指定的列排序
     sortable:false,
     nobr:true,
     //最大行数
     lineClamp:0,
     //子标题
     sub:[],
     //仅在xtype=template时有效
     //格式化字符串，优先级低于format方法，format不为null时，该属性无效
     //example:'<span>this is<b>#=user_alias=#</b><a href="#">click to view</a></span> '
     formatString:null,
     //仅在xtype=template|timestamp|date时有效
     //格式化方法，优先级高于formatString,参数：row, sender({parent: me, tr: tr, rowIndex: tr.id,dataIndex:_dataIndex})
     format:function(row, sender){return [];}
     //小数位(毫秒)精度，仅在xtype=number或xtype=timestamp时有效
     precision:0,
     //仅在xtype=image时有效 空图片地址
     emptyImg:'http://image.redmicro.cn/logo.png'
     //是否允许多选，仅在xtype=checkbox时有
     multiple:true,
     //合计
    total:false
    * */
    //columns: [],
    headers: [],
    __hDeep: 0,
    columnsTitle: '',
    /**
    * @description table 的数据源
     *
     * */
    rows: [],
    //合计行
    subTotalRow:{},
    emptyText: '',
    //height:250,
    //toolBar: null,
    //footBar:null,
    ctrlTagName: 'div',
    labelTagName: 'div',
    ctrlCls: 'x-table',
    /*
    * */
    rowdblclick:null,
    /*
    * */
    rowclick:null,
    /*
     * */
    constructor: function Table(config) {
        config = config || {};
        this.apply(config);
        this.label = {position: 'top', align: 'left', height: 40, cls: 'x-header', visible: true};
    },

    /*
    * */
    onAfterRender: function onAfterRender() {
        this.callParent();
        this.buildTable();
    },
    /*
     * */
    initComponentEx: function initComponentEx() {

        this.callParent();

        this.ctrl.style.overflow = 'auto';
        this.ctrl.style.marginBottom = '5px';
        this.table = document.createElement('table');
        this.table.setAttribute('id',this.id + '_table' );
        if(this.tableCls)
        {
            this.addCls(this.table,this.tableCls);
        }
        this.ctrl.appendChild(this.table)
        //this.table.classList.add('x-table');
        this.tcaption = this.table.createCaption();
        this.thead = this.table.createTHead();
        this.tfoot = this.table.createTFoot();
        var me = this;
        var timer;
        var i = 0;
        var scrollHandle = function scrollHandle(e) {
            clearTimeout(timer);
            var scrollTop = this.scrollTop;// this is me.ctrl
            if (i > 0 && scrollTop < 3) {
                me.thead.style.transform = '';
                me.thead.style.borderStyle = '';
                me.thead.style.visibility = 'visible';
                return;
            }

            me.thead.style.visibility = 'hidden';

            timer = setTimeout(function () {
                me.thead.style.transform = 'translate3d(0px,' + (me.ctrl.scrollTop < 3 ? 0 : me.ctrl.scrollTop - 2) + 'px,0px)';
                me.thead.style.visibility = 'visible';

            }, 1);
            i++;
        };
        if (me.headerFixed)
        {
            this.ctrl.addEventListener('scroll', scrollHandle);
        }
    },

    /**
     *
    * */
    clear: function clear() {
        var me = this;
        if (me.table) {
            while (me.table.rows.length > 0) {
                me.table.deleteRow(me.table.rows[0]);
            }
        }
        if(me.thead){
            me.thead.style.transform = '';
            me.thead.style.borderStyle='';
        }

    },

    /**
     @private
     @desc 内部使用，用于绘制表结构 不含数据
     * */
    buildTable: function buildTable() {

        //console.log(arguments.callee.caller);

        var me = this;
        try {
            me.clear();
            me.drawCaption();
            me.drawHeader(me.columns);
            me.drawFoot();
        }
        catch (ex) {
            Rsd.error('table buildTable', 'Rsd.control.Table', ex);
        }
    },

    /**
    *
    */
    drawCaption: function () {
        this.tcaption.appendChild(document.createTextNode(this.caption || ''));
        return;
    },
    /**
     @private
     * */
    drawHeader: function drawHeader(columns) {

        if (!columns) {
            return;
        }

        var me = this;
        me.setHeaderDeep(columns);
        me.setHeaderRow(columns);

        var _tr;
        var _th;
        var _cell;
        var _height = 0;
        var _headers = me.headers;

        this.thead.innerHTML = '';
        for (var h in _headers) {
            _tr = document.createElement("TR");

            for (var c in _headers[h]) {
                var _col = _headers[h][c];
                _th = document.createElement("th");
                _th.style.transform = 'translate3d(0,0,1px)';
                _cell = null;
                if (_col.xtype === 'checkbox' && (Rsd.isObject(_col.tag) && _col.tag.checkAll)) {
                    if(!_col.tag.hasOwnProperty('editable'))
                    {
                        _col.tag.editable=true;
                    }

                    _cell = document.createElement('nobr');
                    var _txt = document.createTextNode(_col.text ? _col.text : '全选');

                    var _chk = document.createElement('input');
                    _chk.classList.add('x-control-checkbox');
                    _chk.style.visibility = 'hidden';
                    _chk.type = 'checkbox';
                    _chk.name = _col.dataIndex;
                    _chk.setAttribute('id','__chk__' + _chk.name)
                    _chk.onchange = function () {

                        for (var i in me.rows) {
                            me.rows[i][this.name] = this.checked;
                        }
                        me.refresh(this.name);

                    };

                    _cell.appendChild(_chk);
                    var _label = document.createElement('label');
                    _label.setAttribute('for',_chk.getAttribute('id'));
                    _label.style.lineHeight = (_chk.clientHeight||20) + 'px';
                    _cell.appendChild(_label);
                    _cell.appendChild(_txt);
                }

                if (_cell === null) {
                    _cell = document.createTextNode(_col.text ? _col.text : '');
                }

                if (_col.colSpan) {
                    _th.colSpan = _col.colSpan;
                }
                if (_col.rowSpan) {
                    _th.rowSpan = _col.rowSpan;
                }

                if (h > 0) {
                    _th.classList.add('sub');
                }
                if (_col.tip) {
                    _th.title = _col.tip;
                }
                _th.appendChild(_cell);
                if (_col.sortable) {
                    var _link = document.createElement('a');
                    //_link.href='javascript:void(0);'

                    var _none = {
                        "viewBox": "0 0 1024 1024",
                        "path": "M355.84 11.776c-10.24-3.584-21.504-0.512-28.16 7.68l-216.576 254.976c-9.216 10.752-7.68 27.136 3.072 35.84 10.752 9.216 27.136 7.68 35.84-3.072l171.008-201.728 0 882.688c0 14.336 11.264 25.6 25.6 25.6s25.6-11.264 25.6-25.6l0-952.32C372.736 25.088 366.08 15.36 355.84 11.776zM909.824 713.728c-10.752-9.216-27.136-7.68-35.84 3.072l-171.008 201.728L702.976 35.84c0-14.336-11.264-25.6-25.6-25.6s-25.6 11.264-25.6 25.6l0 952.32c0 10.752 6.656 20.48 16.896 24.064 3.072 1.024 5.632 1.536 8.704 1.536 7.168 0 14.336-3.072 19.456-9.216l216.576-254.976C921.6 739.328 920.576 722.944 909.824 713.728z"
                    };
                    var _asc = {
                        "viewBox": "0 0 1024 1024",
                        "path": "M899.3 655.8L714.8 843.4V243.6H697v599.7L527.1 670.7l-12.7 12.5 185.1 188.1c1.6 1.7 3.9 2.6 6.3 2.6s4.7-1 6.3-2.6l199.9-203-12.7-12.5z m-198 191.9h9.3l-4.6 4.7-4.7-4.7zM697 150h17.8v42.8H697zM112 319.3h335.3v17.8H112zM112 151.7h335.3v17.8H112zM112 654.7h335.3v17.8H112zM112 822.4h335.3v17.8H112zM112 487h335.3v17.8H112z"
                    };
                    var _desc = {
                        "viewBox": "0 0 1024 1024",
                        "path": "M912 355.7L712.2 152.6c-1.6-1.7-3.9-2.6-6.3-2.6s-4.7 1-6.3 2.6L514.5 340.8l12.7 12.5L697 180.6v599.7h17.8V180.6l184.5 187.6 12.7-12.5zM705.9 171.6l4.6 4.7h-9.3l4.7-4.7zM697 831.2h17.8V874H697zM112 686.9h335.3v17.8H112zM112 854.5h335.3v17.8H112zM112 351.5h335.3v17.8H112zM112 183.8h335.3v17.8H112zM112 519.2h335.3V537H112z"
                    };


                    _link.innerHTML = '';
                    var _svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    _svg.style.width ='13px';
                    _svg.style.position ='relative';
                    _svg.style.top='3px';
                    _svg.style.left ='4px';

                    _svg.setAttribute("viewBox", _none.viewBox);
                    var _path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                    _path.setAttributeNS(null, "d", _none.path);
                    _path.setAttributeNS(null, "fill", 'black');
                    //_path.setAttributeNS(null, "style","opacity:0.8" );
                    _path.setAttributeNS(null, "stroke", 'red');
                    _svg.appendChild(_path);
                    _link.appendChild(_svg);

                    _link.dataIndex = _col.dataIndex;
                    _link.sort = 'none';
                    _link.title = '点击排序';
                    _link.classList.add('x-sort-link');
                    _link.onclick = function () {
                        var _list = document.querySelectorAll('.x-sort-link-current');

                        for (var i = 0; i < _list.length; i++) {

                            var _item = _list.item(i);
                            if (_item == this) {
                                continue;
                            }
                            _item.innerHTML = '';

                            var _svg = document.createElementNS('http://www.w3.org/2000/svg','svg' );
                            _svg.style.width ='13px';
                            _svg.style.position ='relative';
                            _svg.style.top='3px';
                            _svg.style.left ='4px';

                            _svg.setAttribute("viewBox", _none.viewBox);
                            var _path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                            _path.setAttributeNS(null, "d", _none.path);
                            _path.setAttributeNS(null, "fill", 'black');
                            //_path.setAttributeNS(null, "style","opacity:0.8" );
                            _path.setAttributeNS(null, "stroke", 'red');
                            _svg.appendChild(_path);

                            _item.appendChild(_svg);

                            _item.sort = 'none';
                            _item.title = '点击排序';
                            _item.classList.remove('x-sort-link-current');
                        }

                        this.classList.add('x-sort-link-current');

                        if (this.sort == 'none' || this.sort == 'asc') {

                            this.innerHTML = '';
                            var _svg = document.createElementNS('http://www.w3.org/2000/svg','svg' );
                            _svg.style.width ='16px';
                            _svg.style.position ='relative';
                            _svg.style.top='4px';
                            _svg.style.left ='4px';

                            _svg.setAttribute("viewBox", _desc.viewBox);
                            var _path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                            _path.setAttributeNS(null, "d", _desc.path);
                            _path.setAttributeNS(null, "fill", 'red');
                            //_path.setAttributeNS(null, "style","opacity:0.8" );
                            _path.setAttributeNS(null, "stroke", 'red');
                            _svg.appendChild(_path);

                            this.appendChild(_svg);

                            this.sort = "desc";
                            this.title = '当前排序：从小到大';
                            me.sort(this.dataIndex, true);
                            return false;
                        }
                        if (this.sort == 'desc') {

                            this.innerHTML = '';
                            var _svg = document.createElementNS('http://www.w3.org/2000/svg','svg' );
                            _svg.style.width ='16px';
                            _svg.style.position ='relative';
                            _svg.style.top='4px';
                            _svg.style.left ='4px';

                            _svg.setAttribute("viewBox", _asc.viewBox);
                            var _path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                            _path.setAttributeNS(null, "d", _asc.path);
                            _path.setAttributeNS(null, "fill", 'red');
                            //_path.setAttributeNS(null, "style","opacity:0.8" );
                            _path.setAttributeNS(null, "stroke", 'red');
                            _svg.appendChild(_path);

                            this.appendChild(_svg);

                            this.sort = "asc";
                            this.title = '当前排序：从大到小';
                            me.sort(this.dataIndex, false);
                            return false;
                        }

                    };
                    _th.appendChild(_link);
                }
                _tr.appendChild(_th);
                //枚举类型
                if(_col.xtype == 'enum' && Rsd.isObject(_col.tag.enum) && !(_col.tag.enum instanceof Rsd.data.Enum))
                {
                    var _enum = _col.tag.enum;
                    if(Rsd.classes[_enum.name] == null)
                    {
                        Rsd.define(_enum.name,{
                            extend:'Rsd.data.Enum',
                            xtype:_enum.name,
                            textMember: _enum.textMember||'text',
                            valueMember: _enum.valueMember||'code',
                            colorMember:_enum.colorMember||'color',
                            name:_enum.name,
                            constructor:function(){},
                            items:_enum.items}
                        );

                    }
                    _col.tag.enum = Rsd.create(_enum.name,{});
                }
            }
            this.thead.appendChild(_tr);
            _height += _tr.clientHeight;
        }
        this.thead.style.display = this.headerVisible ? '' : 'none';
        //this.thead.style.translate = 'translate3d(0,0,0)';
        //this.thead.style.height = _height + 'px';
    },

    /**
    * @private
     * */
    formatTemplateString:function formatTemplateString(str, row) {

        var html = Rsd.formatTemplateString(str,row);
        return Rsd.parseDom(html);
    },

    /**
     @private
     @description 绘制table.td
     @param {object} col 列
     @param {dom} tr table.tr
     @param {object} row 行数据
     @param {number} index 行序号
     @param {string} emptyText cell数据为空时，替代字符
     @param {dom} td table.tr.td 在更新时使用
     */
    drawCell:function drawCell(col, tr,row, index, emptyText, td) {
        var me = this;
        var _dataIndex = (typeof (col) == 'object' ? col.dataindex || col.dataIndex || col.name || col.text : col) || ('col_' + index);

        _dataIndex = _dataIndex.trim();
       
        var _subtotalRow = me.subTotalRow || {};

        if (col.subs && col.subs.length > 0) {
            for (var s in col.subs) {
                if (row[_dataIndex] != null && typeof (row[_dataIndex]) == 'object') {
                    me.drawCell(col.subs[s], tr, row[_dataIndex] != null && Rsd.getType(row[_dataIndex]) == '[object Object]' ? row[_dataIndex] : row, index, col['emptyText'] || emptyText || '', td);
                }
                else {
                    me.drawCell(col.subs[s], tr, row, index, col['emptyText'] || emptyText || '', td);
                }
            }
        }
        else {
            setTimeout(function () {
                var _cell;
                var _td = td || document.createElement("TD");
                var _xtype = col.xtype || 'string';
                var _value = (Rsd.isEmpty(row) || Rsd.isEmpty(_dataIndex)) ? null : row[_dataIndex];

                if(col.style && td != _td)
                {
                    me.setElStyle(_td,col.style)
                }

                switch (_xtype) {
                    case 'date': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'right';
                        col.formatString = col.formatString || 'yyyy-MM-dd';
                        {
                            if (row[_dataIndex] != null) {
                                _value = row[_dataIndex];
                                try {
                                    _value = new Date(_value).format(col.formatString);
                                    _cell = document.createTextNode(_value || emptyText);
                                } catch (ex) {
                                    Rsd.error("绘制【date】型单元数据", 'Rsd.control.Table', ex);
                                    _cell = document.createTextNode(_value);
                                }
                            }
                        }
                        break;
                    }
                    case 'timestamp': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'right';
                        col.formatString = col.formatString || 'yyyy-MM-dd hh:mm:ss';
                        col.precision = Rsd.isNullOrUndefined(col.precision) ? 6 : col.precision;
                        {
                            if (!Rsd.isEmpty(row) && !Rsd.isEmpty(_dataIndex) && row[_dataIndex] != null) {
                                _value = row[_dataIndex];
                                if(_value > 0)
                                {
                                    for (var i = 0; i < 6 - col.precision; i++) {
                                        _value = _value * 10;
                                    }
                                    try {
                                        _value = Rsd.formatTimestamp(_value, col.formatString);
                                        _cell = document.createTextNode(_value || emptyText);
                                    } catch (ex) {
                                        Rsd.error("绘制【date】型单元数据", 'Rsd.control.Table', ex);
                                        _cell = document.createTextNode(_value);
                                    }

                                }else
                                {
                                    _cell = document.createTextNode(_value==0?'':_value);
                                }

                            }
                        }
                        break;
                    }
                    case 'number': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'right';
                        {
                            if (col.precision && col.precision < 0) {
                                throw new Error('precision 值不得小于0。');
                            }
                            try {

                                if (_value == null) {
                                    _cell = document.createTextNode(emptyText);

                                }
                                else {
                                    var _v = parseFloat(_value).toFixed(col.precision || 0);

                                    _cell = document.createTextNode(isNaN(_v) ? _value : _v);

                                }

                            } catch (ex) {
                                Rsd.error("绘制列" + col.name + "【number类型】单元数据失败", 'Rsd.control.Table', ex);
                                _cell = document.createTextNode(_value);
                            }

                        }
                        break;
                    }
                    case 'bool' : {
                        _td.style.textAlign = col.align || 'center';
                        if( td !=null && Rsd.isEmpty(col.format))
                        {
                            _cell = td.childNodes ;
                            _cell[0].checked = Rsd.isTrue(_value);
                            _cell=[];
                        }else
                        {
                            if( td !=null )
                            {
                                td.innerHTML='';
                            }
                            var _className = Rsd.xtypes['checkbox'];
                            var _class = Rsd.classes[_className];
                            _cell = _class.prototype.makeControl({}, row);
                            _cell[0].checked = Rsd.isTrue(_value); 
                        }

                        break;
                    }

                    case 'string': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'left';
                        {
                            _cell = document.createTextNode((_value == null || _value == undefined || _value == '') ? emptyText : _value);
                        }
                        break;
                    }
                    case 'text': {
                        _td.style.textAlign = col.align || 'left';
                        _cell = [];
                        var _p = document.createElement('p');
                        if(col.lineClamp)
                        {
                            _p.style.width ='100%';
                            //_p.style.height = '100%';
                            _p.style.textOverflow = 'ellipsis';
                            _p.style.overflow = 'hidden'; 
                            _p.style.maxHeight = (col.lineClamp*14)+'px'; 
                        }
                        var _txt = document.createTextNode((_value == null || _value == undefined || _value == '') ? emptyText : _value);
                        _p.appendChild(_txt);
                        _cell.push(_p);
                         
                        var _tip = document.createElement('a');
                        _tip.style.float = 'right';
                        _tip.style.backgroundColor = 'rgba(255, 0, 0, 0.65)';
                        _tip.style.width = '8px';
                        _tip.style.height = '8px';
                        _tip.style.verticalAlign = 'text-bottom';
                        _tip.title = '点击查看详细信息';
                        _tip.onclick = function (e) {
                            //console.log('this is mouseover'); 
                            Rsd.showHtml(col.text||'详细内容',_value); 
                            return false;
                        };
                         
                        _cell.push(_tip);


                        break;
                    }

                    case  'enum': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'center'; 
                        _cell = Rsd.controlEx.ComboBoxEnum.prototype.makeControl(col, row); 
                        break;
                    }
                    case 'json': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'center';

                        _cell = document.createTextNode(Rsd.toString(_value) || emptyText);
                        break;
                    }
                    case 'checkbox': {
                        //始终可编辑
                        _td.style.textAlign = col.align || 'center';
                        if( td !=null && Rsd.isEmpty(col.format))
                        {
                            _cell = td.childNodes ;
                            _cell[0].checked = Rsd.isTrue(_value);
                            _cell=[];
                        }else{
                            if( td !=null )
                            {
                                td.innerHTML='';
                            }
                            var _className = Rsd.xtypes[_xtype];
                            var _class = Rsd.classes[_className];

                            _cell = _class.prototype.makeControl(col, row);

                            _cell[0].checked = Rsd.isTrue(_value); 
                            {
                                _cell[0].onchange = function () {
                                    if (col.multiple == false && this.checked) {
                                        for (var i in me.rows) {
                                            me.rows[i][_dataIndex] = false;
                                        }
                                        me.refresh(_dataIndex);
                                    }
                                    me.rows[this.parentNode.parentNode.id][_dataIndex] = this.checked;
                                };
                            }
                        }

                        break;
                    }
                    case 'template': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'center';

                        if (Rsd.isString(col.formatString)) {
                            _cell = me.formatTemplateString(col.formatString, row);
                        }
                        break;
                    }
                    //以上是数据类型，以下是控件类型
                    case 'index': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'center';
                        if (_value == null) {
                            _value = index;
                        }
                        _cell = document.createTextNode(_value || emptyText);
                        break;
                    }
                    case  'autocomplete': {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'left';
                        _cell = Rsd.control.AutoComplete.prototype.makeControl.apply(me, [col, row]);
                        break;
                    }

                    default : {
                        if( td !=null )
                        {
                            td.innerHTML='';
                        }
                        _td.style.textAlign = col.align || 'left';
                        var _className = Rsd.xtypes[_xtype];
                        var _class = Rsd.classes[_className];
                        if (!_class) {
                            throw new Error("Could not find class xtype with [" + _xtype + "].");
                        }
                        if (!Rsd.isFunction(_class.prototype.makeControl)) {
                            throw new Error('Class ' + _className + ' has no function makeControl(config,row).');
                        }
                        if (!Rsd.isEmpty(row)) {
                            _cell = _class.prototype.makeControl(col, row);
                        }

                        break;
                    }
                }

                var _list = [];
                try {
                    if (Rsd.isFunction(col.format)) {

                        _list = col.format(row, {parent: me, tr: tr, rowIndex: tr.id, dataIndex: _dataIndex});
                    }
                    if (Rsd.isString(col.format)) {
                        _list = me.funApplyByIOC(col.format, [row, {
                            parent: me,
                            tr: tr,
                            rowIndex: tr.id,
                            dataIndex: _dataIndex
                        }]);
                    }

                }catch (e) {
                    console.error(e);
                }

                if (col.nobr) {
                    var _nobr = document.createElement('nobr');
                    if (_cell != null) {
                        if (_cell instanceof NodeList || Rsd.isArray(_cell)) {
                            setTimeout(function () {
                                var i = _cell.length;
                                while (i > 0) {
                                    _nobr.appendChild(_cell[0]);
                                    i--;
                                }
                            }, 0);
                        }
                        if (Rsd.isArray(_cell)) {
                            setTimeout(function () {
                                for (var i = 0; i < _cell.length; i++) {
                                    _nobr.appendChild(_cell[i]);
                                }
                            }, 0);

                        }
                        if (_cell instanceof Node) {
                            _nobr.appendChild(_cell);
                        }
                        if (_cell instanceof Rsd.common.ComponentX) {

                            _cell.renderTo(_td);
                        }
                    }
                    if (_list instanceof NodeList) {
                        setTimeout(function () {
                            var i = _list.length;
                            while (i > 0) {
                                _nobr.appendChild(_list[0]);
                                i--;
                            }
                        }, 0);

                    }
                    if (Rsd.isArray(_list)) {
                        setTimeout(function () {
                            for (var i in _list) {
                                _nobr.appendChild(_list[i]);
                            }
                        }, 0);

                    }
                    if (_list instanceof Rsd.common.ComponentX) {

                        _list.renderTo(_nobr);
                    }
                    _td.appendChild(_nobr);

                }
                else {
                    if (_cell != null) {

                        if (_cell instanceof NodeList) {
                            setTimeout(function () {
                                var i = _cell.length;
                                while (i > 0) {
                                    _td.appendChild(_cell[0]);
                                    i--;
                                }
                            }, 0);

                        }
                        if (Rsd.isArray(_cell)) {
                            setTimeout(function () {
                                for (var i = 0; i < _cell.length; i++) {
                                    _td.appendChild(_cell[i]);
                                }
                            }, 0);

                        }
                        if (_cell instanceof Node) {
                            _td.appendChild(_cell);
                        }
                        if (_cell instanceof Rsd.common.ComponentX) {

                            _cell.renderTo(_td);
                        }
                    }
                    if (_list instanceof NodeList) {
                        setTimeout(function () {
                            var i = _list.length;
                            while (i > 0) {
                                _td.appendChild(_list[0]);
                                i--;
                            }
                        }, 0);

                    }
                    if (Rsd.isArray(_list)) {
                        setTimeout(function () {
                            for (var i in _list) {
                                _td.appendChild(_list[i]);
                            }
                        }, 0);

                    }
                    if (_list instanceof Node) {
                        _td.appendChild(_list);
                    }
                    if (_list instanceof Rsd.common.ComponentX) {
                        //debugger;
                        _list.renderTo(_td);
                    }

                }

                if (col.tip) {
                    _td.title = (Rsd.isEmpty(_value) ? '' : _value) + (col.tip ? col.tip : '');
                }

                if (_value != null) {
                    //合计列
                    if (col.total) {

                        var _v = parseFloat(_value).toFixed(col.precision || 0);

                        if (!isNaN(_v)) {
                            if (_subtotalRow.hasOwnProperty(_dataIndex)) {
                                _subtotalRow[_dataIndex] += _value;
                            }
                            else {
                                _subtotalRow[_dataIndex] = _value;
                            }
                        }


                    }
                }


                if(td==null) {

                    if (col.width) {
                        _td.style.maxWidth = col.width + 'px';
                        _td.style.minWidth = col.width + 'px';
                    }
                    if (col.fixWidth) {
                        _td.style.width = col.fixWidth + 'px';
                    }
                    if (col.maxWidth) {
                        _td.style.maxWidth = col.maxWidth + 'px';
                    }
                    if (col.minWidth) {
                        _td.style.minWidth = col.minWidth + 'px';
                    }
                    _td.style.overflow = 'hidden';
                    _td.style.textOverflow = 'ellipsis';
                    if(col.nobr)
                    {
                        _td.setAttribute('nowrap',true);
                    } 
                    _td.style.whiteSpace = col.nobr?'nowrap':'break-spaces';

                    tr.appendChild(_td);
                  
                }

            }, 0);
        }

    },
    /*
    @private
     * */
    drawRows: function drawRows(rows) {

        //console.log(arguments.callee.caller);

        if (!rows) {
            return;
        }
       
        this.columns = this.columns || [];
        for (var i = 0; i < this.columns.length; i++) {
            if (!Rsd.isEmpty(this.columns[i]['format']) && Rsd.isString(this.columns[i]['format'])) {
                try{
                    this.funBindByIOC(this.columns[i], 'format');
                }catch (e) {
                    console.error(e);
                }

            }
        }

        var me = this;
        var _el = this.table.tBodies;
 
        while (_el && _el.length > 0) {
            
            this.table.removeChild(_el[0]);
        }
        //清空合计
        me.subTotalRow={};

        var _tbody = document.createElement('tbody');
        
        //隐藏渲染时 出现的抖动
        _tbody.style.visibility = 'hidden';

        setTimeout(function () { 
            _tbody.style.visibility = 'visible';
        },200);

        // 在国产浏览器中 _tbody.top 起始位置 为 thead, capiton,之后
        //_tbody.style.top = this.thead.clientHeight + this.tcaption.clientHeight + 'px';
        //_tbody.style.bottom = this.tfoot.clientHeight + 'px';

        //插入在第一个位置，防止滚动时内容遮挡表头
        this.table.prepend(_tbody); 
      
        this.tbodies = [_tbody];

        var _height = 0;
        var _tr;

        var _indexStart = this.indexStart || 1;  //debugger;
        for (var i = 0; i < rows.length; i++) { 
            _tr = document.createElement("TR");
            _tr.id = i;
            _tr.tag = rows[i];
            _tr.addEventListener("dblclick", function (e) {
                if (Rsd.isString(me.rowdblclick) && me.rowdblclick != '') {
                    me.funApplyByIOC(me.rowdblclick, [me.rows[this.id], {
                        parent: me,
                        tr: _tr,
                        event: e,
                        rowIndex: this.id
                    }]);
                }
                if (Rsd.isFunction(me.rowdblclick)) {
                    me.rowdblclick.call(me, me.rows[this.id], {parent: me, tr: _tr, event: e, rowIndex: this.id});
                }
            });
            _tr.addEventListener("click", function (e) {
                if (Rsd.isString(me.rowclick) && me.rowclick != '') {
                    me.funApplyByIOC(me.rowclick, [me.rows[this.id], {
                        parent: me,
                        tr: _tr,
                        event: e,
                        rowIndex: this.id
                    }]);
                }
                if (Rsd.isFunction(me.rowclick)) {
                    me.rowclick.call(me, me.rows[this.id], {parent: me, tr: _tr, event: e, rowIndex: this.id});
                }
            });
            if (i % 2 == 1) {
                _tr.classList.add('alt');
            }
            //_tr.addEventListener("mouseover")
            for (var c in this.columns) {

                me.drawCell(this.columns[c], _tr, rows[i], _indexStart + parseInt(i), this.columns[c]['emptyText'] || this.emptyText || '');
 
            }
            
            _tbody.appendChild(_tr);
           
            _height += _tr.clientHeight;  
        }
       
        setTimeout(function () {
            var _subtotalRow = me.subTotalRow || {};

            if (!Rsd.isEmpty(_subtotalRow)) {

                me.addTotalRow(_subtotalRow, {});
            }
        },1000);

      
        _tbody.style.height = _height + 'px';

        if(me.ctrl.clientHeight > me.table.clientHeight)
        {
            me.thead.style.transform = 'translateY(0px)';
            me.thead.style.visibility = 'visible';
        }
    },

    /**
    * @description 添加统计行
     * @param subtotal 列合计
     * @param total 总计
    * */
    addTotalRow: function setTotalRow(subtotal, total) {

        if (this.table.tBodies && this.table.tBodies.length > 0) {
            var _subtotalRow = subtotal || {};
            var _row = this.table.insertRow(this.table.rows.length);
            _row.style.fontSize = '110%';

            this.table.tBodies[0].appendChild(_row);
            for (var i in this.columns) {
                var col = this.columns[i];
                var c = _row.insertCell(i);
                if (i == 0) {
                    c.innerHTML = "合计";
                }
                c.style.textAlign = col.align || 'right';
                var _dataIndex = (typeof (col) == 'object' ? col.dataindex || col.dataIndex || col.name || col.text : col) || ('col_' + i);
                if (_subtotalRow.hasOwnProperty(_dataIndex)) {
                    c.innerHTML = parseFloat(_subtotalRow[_dataIndex]).toFixed(col.precision || 0);
                }

            }
        }

        //总计未实现 total


    },

    /*
     @private
     * */
    drawFoot: function drawFoot() {


        var __bar = this.footBar;
        if (Rsd.isEmpty(__bar)) {
            return;
        }
        if (Rsd.isString(__bar)) {
            __bar = {xtype: __bar};
        }

        if (!Rsd.isCreated(__bar)) {
            __bar.xtype = __bar.xtype || 'container';

            __bar = Rsd.widget(__bar.xtype, __bar);
            this.footBar = __bar;
        }

        var _el = this.table.tFoot;
        _el.style.minHeight = '5px';
        _el.style.height = 'auto';
        while (_el && _el.children.length > 0) {
            _el.removeChild(_el.children[0]);
        }

        var _td = document.createElement("TD");
        var _tr = document.createElement("TR");

        _td.style.height = 'auto';
        _tr.style.height = 'auto';

        _td.colSpan = this._hColCount;
        _tr.appendChild(_td);

        this.tfoot.appendChild(_tr);
        //debugger;
        __bar.parent = this;
        __bar.style = {position: 'relative'};
        setTimeout(function () {
            if(__bar.isRendered())
            {
                _td.appendChild(__bar.dom);

            }else {
                __bar.renderTo(_td);
            }
            __bar.show(0,function () {
                __bar.doLayout();
            });
        },30);
        return this;
    },

    /**
     @private
     @description 表头最大行数
     * */
    setHeaderDeep: function (columns) {
        var me = this;

        function iterate(col, deep) {
            var _d = deep;
            var _subs = col.subs || col.sub || col.children;
            if (_subs) {
                for (var c in _subs) {
                    _d = iterate(_subs[c], deep + 1);
                }
            }
            col.deep = deep;
            if (me.__hDeep < _d) {
                me.__hDeep = _d;
            }
            return col.deep;
        }

        me.__hDeep = 1;
        for (var c in columns) {
            iterate(columns[c], 1);
        }
    },

    /*
     @private
     * */
    setHeaderRow: function (columns) {
        var me = this;
        me.colsMapping = {};
        function iterate(col, rowIndex, colIndex) {
            var _header, _col, _cell, _colSpan;

            _col = col;
            if (!me.headers[rowIndex]) {
                _header = [];
                me.headers.push(_header);
            } else {
                _header = me.headers[rowIndex];
            }

            _cell = {};
            _cell.xtype = (typeof (_col) == 'object' ? _col.xtype : 'string');
            _cell.dataIndex = (typeof (_col) == 'object' ? (_col.dataIndex || _col.dataindex || _col.name ||colIndex) : _col);
            _cell.name = (typeof (_col) == 'object' ? (_col.name || _cell.dataIndex): _col);
            _cell.text = (typeof (_col) == 'object' ? _col.text : _col);
            _cell.tip = (typeof (_col) == 'object' ? (_col.tip || '') : '');
            _cell.sortable = _cell.dataIndex && ((typeof (_col) == 'object' && _col.hasOwnProperty('sortable')) ? _col.sortable : false);
            _cell.tag = _col;


            if (_col.subs && col.subs.length > 0) {
                _cell.rowSpan = 1;
            } else {
                _cell.rowSpan = me.__hDeep - _col.deep + 1;
            }
            if (_col.rowSpan) {
                _cell.rowSpan = _col.rowSpan;
            }

            if (_col.subs && _col.subs.length > 0) {

                var _cIndex = colIndex;
                var _rIndex = rowIndex + 1;
                _cell.colSpan = 0;
                _cell.index = _cIndex + '-' + _col.subs.length;

                for (var c in _col.subs) {
                    _cell.colSpan += iterate(_col.subs[c], _rIndex, _cIndex + '-' + parseInt(c) );

                }
            }
            else {
                _cell.index = me._hColCount;
                _cell.colSpan = 1;
                 me._hColCount += _cell.colSpan;
            }
            if (_col.colSpan) {
                _cell.colSpan = _col.colSpan;
            }
            me.colsMapping[_cell.name]=_cell;
            _header.push(_cell);

            return _cell.colSpan;
        }

        me.headers = [];
        me._hColCount = 0;
        for (var c in columns) {
             iterate(columns[c], 0, c);
        }
    },

    /*
     * 获取当前的table的数据视图
     * */
    getGrid: function () {
        var me = this;
        var grid = [];
        var _row = null;
        var _cell = null;
        var _c_index = 0;
        var _r_index = 0;
        for (var r = 0; r < me.table.rows.length; r++) {

            if (grid[r] == null) {
                grid[r] = [];
            }
            _row = me.table.rows[r];

            _c_index = 0;

            for (var c = 0; c < _row.cells.length; c++) {
                _cell = _row.cells[c];

                for (var i = 0; i < _cell.colSpan; i++) {
                    while (grid[r][_c_index] != null) {
                        _c_index++;
                    }
                    _r_index = r;
                    for (var j = 0; j < _cell.rowSpan; j++) {
                        if (grid[_r_index] == null) {
                            grid[_r_index] = [];
                        }
                        grid[_r_index][_c_index] = _cell;
                        _r_index++;

                    }
                    //grid[r][_c_index] =_cell;
                    _c_index++;
                }

            }
        }
        return grid;
    },

    /**
     @public
     @description 对外提供重新绘制表头和表底的入口
    * */
    buildColumns: function buildColumns(cols) {

        try {
            this.columns = cols;
            this.drawHeader(this.columns);
            this.drawFoot(this.footBar);
        }
        catch (e) {
            console.trace(e);
        }
    },

    /**
     @public
     @description 设置表行数据表，并显示 翻页显示
     @param {number} rows 数据源
     @param {number} indexStart 起始序号
    * */
    buildRows: function buildRows(rows, indexStart) {
        //console.log(arguments.callee.caller);

        var me = this;
        me.rows = rows;
        me.indexStart = indexStart;
        me.drawRows(me.rows);
        me.table.scrollIntoView(true);
    },
    /**
     @public
     @description 刷新
     @param {string} colName 要刷新的列名称
     @param {number} rowIndex 要刷新的行序号
    * */
    refresh: function refresh(colName, rowIndex) {
        var me = this;
        if(arguments.length == 0)
        {
            this.buildRows(this.rows);
            return this;
        }
        //刷新列
        if(arguments.length == 1 && Rsd.isString(arguments[0]) && !Rsd.isEmpty(arguments[0]))
        {
            var _name = arguments[0];
            var col = me.colsMapping[_name];
            if(col)
            {
                for(var i = 0; i < me.tbodies.length; i++)
                {
                    for(var j=0; j< me.tbodies[i].rows.length;j++)
                    {
                        var tr = me.tbodies[i].rows[j];
                        if(tr.getAttribute('id'))
                        {
                            var td = tr.cells[col.index];
                            me.drawCell(col.tag, tr,tr.tag, tr.id, '', td);
                        }
                    }

                }
            }
            return this;
        }
        //刷新行
        if(arguments.length == 1 && Rsd.isNumber(arguments[0]))
        {
            var _r = arguments[0];

            if (-1 < _r && _r < me.tbodies[0].rows.length) {
                var tr = me.tbodies[0].rows[_r];
                 for (var j = 0 ;j< tr.cells.length ;j++)
                 {
                     var td = tr.cells[j];
                     me.drawCell(me.columns[j], tr,tr.tag, tr.id, '', td);
                 }
            }
            return this;
        }
        return this;
    },
    /*
    @public
     * */
    selectRow: function (rowIndexs) {
        var me = this;

        var _indexs = rowIndexs;
        var _row;
        if (Rsd.getType(_indexs) != '[object Array]') {
            _indexs = [rowIndexs];
        }
        if (_indexs == null || _indexs.length == 0) {
            return;
        }
        for (var i = 0; i < me.tbodies[0].rows.length; i++) {
            _row = me.tbodies[0].rows[i];
            _row.classList.remove('x-row-selected');
        }
        for (var i in _indexs) {
            if (-1 < _indexs[i] && _indexs[i] < me.tbodies[1].rows.length) {
                me.tbodies[0].rows[_indexs[i]].classList.add('x-row-selected');
            }
        }

        //
        var _h = me.tbodies[0].clientHeight * _indexs[0] / (me.tbodies[0].rows.length);
        me.body.scrollTop = _h;

    },

    /**
    * @description 新增一行
    * @param row 新增数据，
    * @param edit 新增后状态是否为可编辑状态
    * */
    newRow: function newRow(row, edit) {
        if (!this.rows) {
            this.rows = [];
        }

        for(var i in this.table.rows)
        {
            var tr = this.table.rows[i];
            if(tr && tr.classList && tr.classList.contains('x-row-edit'))
            {
               Rsd.apply(this.rows[tr.getAttribute('id')] ,this.getTrData(tr)||{});
            }
        }
        this.rows.splice(0, 0, row || {});

        this.refresh();
        if (edit) {
            this.editRow(0, true);
        }
    },

    /**
     *
    * @desc 删除一条row行
    * */
    deleteRow: function deleteRow(rowIndex) {
        var me = this;
        var trs = $(this.table).find('tr[id=' + rowIndex + ']');

        if (trs) {
            var tr = trs[0];
            me.table.deleteRow(tr.rowIndex);
        }
    },

    /**
     * @public
     * @param rowIndex 行号 从标题栏 开始计起
     * @param edit：true 编辑装，flase 只读状态
     * @param colIndex 列号 不设置时，编辑整行，设置时编辑指定行的指定列。
     * @param ctrl {xtype|control}编辑状态的控件类型，不指定为默认类型
     * */
    editRow:function editRow(rowIndex,edit,colIndex,ctrl)
    {
        var me = this;

        if(this.table)
        {
           // this.table.style.tableLayout = edit ? 'fixed' :'automatic';
        }


        var tr = $(this.table).find('tr[id=' + rowIndex + ']');

        if(tr)
        {
            tr = tr[0];

            if(edit)
            {

                var row = this.rows[rowIndex];

                tr.classList.add('x-row-edit');
                //设置 tr 编辑模式
                for(var i in  this.columns)
                {
                    var col = this.columns[i];
                    if(!col.editable)
                    {
                        continue;
                    }
                    if(colIndex != undefined && colIndex!= i)
                    {
                        continue;
                    }

                    var _dataIndex = (typeof (col) == 'object' ? col.dataindex || col.dataIndex || col.name || col.text : col) || ('col_' + i);
                    var _value = row.hasOwnProperty(_dataIndex) ? row[_dataIndex] : '';
                    var _td = tr.cells[i];
                    $(_td).empty();

                    if(ctrl && ctrl instanceof  Rsd.common.ComponentX)
                    {
                        _cell = ctrl;
                    }
                    else
                    {
                        var _xtype = ctrl || col.xtype || 'string';
                        var _cell = null;
                        switch (_xtype) {
                            case 'date':
                            {
                                col.formatString = col.formatString || 'yyyy-MM-dd';
                                _cell = document.createElement('input');
                                _cell.value = _value;
                                break;
                            }
                            case 'timestamp':
                            {
                                col.formatString = col.formatString || 'yyyy-MM-dd hh:mm:ss';
                                col.precision = Rsd.isNullOrUndefined(col.precision )? 6:col.precision;
                                _cell = document.createElement('input');
                                _cell.type = 'number';
                                _cell.value = _value;
                                break;
                            }
                            case 'number': {
                                _cell = document.createElement('input');
                                _cell.value = _value;
                                break;
                            }
                            case 'bool': {
                                _cell = document.createElement('input');
                                _cell.type = 'checkbox';
                                _cell.checked = _value;
                                break;
                            }
                            case 'string':{
                                _cell = document.createElement('input');
                                _cell.value = _value;
                                break;
                            }
                            case 'text':
                            {
                                _cell = document.createElement('textarea');
                                break;
                            }
                            case 'index':
                            case 'checkbox':
                            case 'template':
                            case 'enum':
                            case 'autocomplete':
                            case 'json':
                            default : {
                                var _className = Rsd.xtypes[_xtype];
                                var _class = Rsd.classes[_className];
                                if (!_class) {
                                    throw new Error("Could not find class xtype with [" + _xtype + "].");
                                }

                                _cell = Rsd.create(_className,Rsd.apply({width:'100%',height:'100%',value:_value},col));

                                break;
                            }
                        }
                    }


                    if(_cell != null)
                    {
                        if(_cell instanceof NodeList || Rsd.isArray(_cell))
                        {
                            for(var i = 0; i < _cell.length; i++ )
                            {
                                _td.appendChild(_cell[i]);
                            }
                        }
                        if(_cell instanceof Node)
                        {
                            _td.appendChild(_cell);
                        }
                        if(_cell instanceof  Rsd.common.ComponentX){
                            //debugger;
                            _cell.parent = me;
                            _cell.renderTo(_td);
                            _cell.doLayout();
                            _cell.setValue(_value);
                            _cell.focus();
                            _td.setAttribute('rsdid',_cell.id);
                        }
                    }

                    if(col.tip)
                    {
                        _td.title = col.tip ?  col.tip  :'';
                    }
                }

            }
            else
            {
                tr.classList.remove('x-row-edit');
                this.refresh();
            }
        }


    },

    /**
    * @description 更新rowIndex行的 row 数据
    * */
    updateRow:function updateRow(rowIndex,newRow) {

        //设置原始 row 数据
        this.rows[rowIndex] = newRow;
        //重新绘制指定行
        this.refresh(rowIndex);
    },

    /**
    * @description 获取编辑后的 row 值
     * @param {number} rowIndex
    * */
    getRowData:function getRowData(rowIndex) {

        var trs = $(this.table).find('tr[id=' + rowIndex + ']');
        if (trs) {
            return this.getTrData(trs[0]);

        } else {
            return {};
        }
    },

    /**
     * @private
    *@desc 编辑后获取当前row的值
    * */
    getTrData:function getTrData(tr)
    {
        var row = {};
        if(tr) {

            var rowIndex = tr.getAttribute('id');
            for(var i  in  this.columns) {
                var col = this.columns[i];
                var _dataIndex = (typeof (col) == 'object' ? col.dataindex || col.dataIndex || col.name || col.text : col) || ('col_' + i);
                if (!col.editable) {
                    row[_dataIndex] = this.rows[rowIndex][_dataIndex];
                }
                else
                {
                    var _td = tr.cells[i];
                    var _xtype = col.xtype || 'string';
                    var _cell = _td.childNodes[0];
                    switch (_xtype) {
                        case 'date': {
                            col.formatString = col.formatString || 'yyyy-MM-dd';
                            row[_dataIndex] = _cell.value;
                            break;
                        }
                        case 'timestamp': {
                            col.formatString = col.formatString || 'yyyy-MM-dd hh:mm:ss';
                            col.precision = Rsd.isNullOrUndefined(col.precision )? 6:col.precision;
                            row[_dataIndex] = _cell.value;
                            break;
                        }
                        case 'number': {
                            row[_dataIndex] = _cell.value;
                            break;
                        }
                        case 'bool' :
                        case 'checkbox': {
                            row[_dataIndex] = _cell.checked;
                            break;
                        }
                        case 'string':{
                            row[_dataIndex] = _cell.value;
                            break;
                        }
                        case 'text': {
                            row[_dataIndex] = _cell.value;
                            break;
                        }
                        case 'index':
                        case 'template':
                        case  'enum':
                        case  'autocomplete':
                        case 'json':
                        default : {
                            var id = _td.getAttribute('rsdid');
                            _cell = Rsd.get(id);
                            if(_cell)
                            {
                                row[_dataIndex] = _cell.getValue();
                            }

                            break;
                        }
                    }

                }
            }
        }
        return row;
    },

    /**
     @public
     * */
    selectColumn: function selectColumn(columnIndex) {

        if (columnIndex < 0) {
            return;
        }
        var me = this;
        var row;
        var _colIndex = 0;
        var _colSpan = me.table.rows[0].cells[columnIndex].colSpan;


        for (var i = 0; i < columnIndex; i++) {
            _colIndex += me.table.rows[0].cells[i].colSpan;
        }
        var _grid = me.getGrid();
        for (var i in  _grid) {

            row = _grid[i];
            for (var c in row) {

                if (_colIndex - 1 < c && c < (_colIndex + _colSpan )) {
                    if (row[c] && row[ c].classList) {
                        row[c].classList.add('x-row-selected');
                    }
                } else {
                    if (row[c] && row[c].classList) {
                        row[c].classList.remove('x-row-selected');
                    }
                }
            }
        }

    },

    /**
    * @param {string} col 列名称
    * @param {boolean} direction  true:降序，false:升序
    * */
    sort:function sort (col,direction) {

        if(Rsd.isEmpty(col))
        {
            Rsd.alert('列dataIndex属性为空，无法排序。');
            return;
        }

        this.rows.sort(function (a,b) {

            if(direction)
            {
                return b[col] > a[col] ? -1 : 1;
            }
            else
            {
                return b[col] < a[col] ? -1 : 1;
            }
        });

        this.refresh();
    },

    /**
     @public
     @description 行列互换
     * */
    exchange: function exchange(name) {
        var me = this;
        var _data = [];
        var _newData = [];
        var _columns = [];
        var _rows = [];
        var _row;
        for (var i = 0; i < me.table.rows.length; i++) {
            _r = me.table.rows[i];
            _row = [];
            for (var j = 0; j < _r.cells.length; j++) {
                _row.push(_r.cells[j].innerHTML);
            }
            _data.push(_row);
        }
        for (var i = 0; i < _data.length; i++) {
            _row = _data[i];
            for (var j = 0; j < _row.length; j++) {

                if (j == 0) {
                    _columns.push(_row[j]);
                    continue;
                }
                if (!_rows[j]) {
                    _rows[j] = [];
                }
                _rows[j].push(_row[j]);
            }

        }
        _columns[0] = name || _columns[0];
        me.headers = [];
        me.setRowSpan(_columns);
        me.iterate(_columns, 0, 0);
        me.draw(me.caption, me.headers, _rows);
        me.exchanged = true;
    },

    /**
     * @description 导出当前表格数据到Excel 
     * @param {*} sheet 
     * @param {*} file  仅文件名称（不是路径）
     */
    "export": function _export(sheet,file) {

        var table = this.table;

        if (table instanceof HTMLElement) {

            if (Rsd.detectNavigator().startWith('IE')) {
                var curTbl = table;
                var oXL = new ActiveXObject("Excel.Application");
                var oWB = oXL.Workbooks.Add();
                var xlsheet = oWB.Worksheets(1);
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                sel.select();
                sel.execCommand("Copy");
                xlsheet.Paste();
                oXL.Visible = true;

                try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                    print("Nested catch caught " + e);
                } finally {
                    oWB.SaveAs(fname);
                    oWB.Close(savechanges = false);
                    oXL.Quit();
                    oXL = null;
                    var idTmr = window.setInterval(function () {

                        window.clearInterval(idTmr);
                        CollectGarbage();

                    }, 1);
                }

            }
            else {
                var name = sheet || 'mySheet', filename = file || 'export_file.xls';

                var uri = 'data:application/vnd.ms-excel;base64,';

                var template = Rsd.Base64ToUTF8("PGh0bWw+PGhlYWQ+PG1ldGEgY2hhcnNldD0iVVRGLTgiPjwvaGVhZD48Ym9keT48dGFibGUgYm9yZGVyPSIxIj57dGFibGV9PC90YWJsZT48L2JvZHk+PC9odG1sPg==");

                var base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                };
                var format = function (s, c) {
                    return s.replace(/{(\w+)}/g,
                        function (m, p) {
                            return c[p];
                        })
                };


                var ctx = {worksheet: name, table: table.innerHTML};

                var dlink = document.createElement('a');
                dlink.style.display = 'none';
                dlink.href = uri + base64(format(template, ctx))
                dlink.download = filename;
                if(Rsd.isEmpty(dlink.parentNode))
                {
                   this.container.appendChild(dlink);
                }

                dlink.click();

                this.container.removeChild(dlink);

            }
            return true;
        }
        return false;

    }


},function(type){

    this.defineProperty(type,'table',function(){return this['__table_'+this.id];},function(table){
        this['__table_'+this.id] = table;
    },false);

    this.defineProperty(type,'columns',function(){return this.__columns;},function(columns){
        this.__columns = columns;
    },false);

    this.defineProperty(type,'toolBar',function(){return this.label.content;},function(bar){

        this.label = bar;

    },false);

    this.defineProperty(type,'footBar',function(){return this.__footbar;},function(bar){
        this.__footbar = bar;

    },false);

});



