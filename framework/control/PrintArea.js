Rsd.define('Rsd.control.PrintArea', {
    extend: 'Rsd.control.Component',
    requires: ['Rsd.control.CheckBox'],
    xtype: 'print-area',
    ctrlTagName: 'div',
    labelTagName: 'div',
    /**
     * @description table 的数据源
     *  cell: {
     *  xtype:'',//cell or list
     *  text:'',
     *  title:'',//仅 xtype=='list' 有效
     *  dataIndex:'',
     *  align:'left',
     *  rowSpan:1,
     *  colSpan:1,
     *  tag:'span',
     *  width:100,
     *  height:50,
     *  nobr:true,
     *  print:true,
     *  style:{},
     *  }
     * */
    rows: [],
    /**
     * @description 是否打印边框
    * */
    printBorder:false,
    /*
    * 是否显示table边框
    * */
    tableBorder:false,
    cls:'x-print-area',
    /**
    * @description 打印区域大小
    * */
    size:{},
    /**
    * @description 数据源
    * */
    data:{},
    /**
     *@description 尺寸缩放比例
     * */
    scale:1.25,
    /*
    * */
    constructor: function PrintArea(config) {
        config = config || {};
        this.apply(config);


    },
    /*
    * */
    initComponentEx:function initComponentEx()
    {
        this.callParent();
        this.callParent();

        this.ctrl.style.overflow = 'auto';
        this.ctrl.style.marginBottom = '5px';
        this.table = document.createElement('table');
        if(this.tableCls)
        {
            this.addCls(this.table,this.tableCls);
        }
        this.ctrl.appendChild(this.table)
        if(this.tableBorder)
        {
            this.table.style.border="1px black solid";
        }
        var size = Rsd.MmToPx(this.size.width,this.size.height,this.scale||1);
        this.table.style.maxWidth = size.width + 'px';
        this.table.style.maxHeight = size.height + 'px';
        this.table.style.margin = 'auto';
        if(this.printBorder == false)
        {
            this.table.classList.add('x-not-print-border');
        }
    },
    /**
     * @private
    * */
    drawCell: function drawCell(tr, cell,data) {

        var _cell = cell;
        var _td = document.createElement("TD");
        _td.style.textAlign = _cell.align || 'left';
        _td.colSpan = _cell.colSpan||1;
        _td.rowSpan = _cell.rowSpan||1;
        var size = Rsd.MmToPx(_cell.width||0,_cell.height||0,this.scale||1);

        if(size.width)
        {
            _td.style.width = size.width + 'px';
        }
        if(size.height)
        {
            _td.style.height = size.height + 'px';
        }

        size = Rsd.MmToPx(_cell.maxWidth||0,_cell.maxHeight||0,this.scale||1);

        if(size.width)
        {
            _td.style.maxWidth = size.width + 'px';
        }
        if(size.height)
        {
            _td.style.maxHeight = size.height + 'px';
        }

        size = Rsd.MmToPx(_cell.minWidth||0,_cell.minHeight||0,this.scale||1);

        if(size.width)
        {
            _td.style.minWidth = size.width + 'px';
        }
        if(size.height)
        {
            _td.style.minHeight = size.height + 'px';
        }

        if (_cell.border === true) {
            _td.style.border = "1px black solid";
        }
        if (_cell.border === false)
        {
            _td.style.border = "0px black solid";
        }
        if(Rsd.isObject(_cell.border))
        {
            var list = ['top','right','bottom','left'];
            for (var b in list)
            {
                var name = list[b];
                var _pName =  'border'+  name.slice(0, 1).toUpperCase() + name.slice(1);
                if(_cell.border[name] === true)
                {
                    _td.style[_pName] = "1px black solid";
                }
                if(_cell.border[name] === false)
                {
                    _td.style[_pName] = "0px black solid";
                }
                if(Rsd.isString(_cell.border[name]))
                {
                    _td.style[_pName] = _cell.border[name];
                }
            }

        }

        var _span = document.createElement(_cell.tag||'nobr');
        if(_cell.id)
        {
            _span.setAttribute("id",  _cell.id);
        }
        if(_cell.text==null||_cell.text==undefined||_cell.text=='')
        {

        }else
        {
            var _txt = document.createTextNode(this.formatTextString(_cell.text,data||{}));
            _span.appendChild(_txt);
        }
        if(_cell.dataIndex==null||_cell.dataIndex==undefined||_cell.dataIndex=='')
        {

        }else
        {
            var _txt = document.createTextNode(data[_cell.dataIndex]||'');
            _span.appendChild(_txt);
        }

        if(_cell.print==false)
        {
            _span.classList.add("x-not-print");
        }
        Rsd.setElStyle(_span,_cell.style);
        _td.appendChild(_span);
        tr.appendChild(_td);
    },
    /**
    *
    * */
    drawList:function drawList(row,data)
    {
        var tr = document.createElement("TR");
        for (var i in row.items) {
            var _cell = row.items[i];
            var _td = document.createElement("TD");
            _td.style.textAlign = _cell.align || 'left';
            _td.colSpan = _cell.colSpan || 1;
            _td.rowSpan = _cell.rowSpan || 1;


            var size = Rsd.MmToPx(_cell.width||0,_cell.height||0,this.scale||1);
            //console.log(size);
            if(size.width)
            {
                _td.style.maxWidth = size.width + 'px';
            }
            if(size.height)
            {
                _td.style.maxHeight = size.height + 'px';
            }

            var _span = document.createElement(_cell.tag||'nobr');
            var _txt = document.createTextNode(_cell.title||'');
            _span.appendChild(_txt);

            if(_cell.print==false)
            {
                _span.classList.add("x-not-print");
            }
            Rsd.setElStyle(_span,_cell.style);

            _td.appendChild(_span);
            tr.appendChild(_td);

        }
        this.table.appendChild(tr);

        for(var i in data)
        {
            var r = data[i];
            var tr = document.createElement("TR");
            for (var j in row.items)
            {
                var _cell = row.items[j];
                var _td = document.createElement("TD");
                _td.style.textAlign = _cell.align || 'left';
                _td.colSpan = _cell.colSpan||1;
                _td.rowSpan = _cell.rowSpan||1;

                //暂不设置边框

                var _span = document.createElement(_cell.tag||'nobr');

                var _txt = document.createTextNode((_cell.dataIndex==null||_cell.dataIndex==undefined)?'':this.formatTextString('#='+_cell.dataIndex+'=#',r||{}));
                if(_cell.print==false)
                {
                    _span.classList.add("x-not-print");
                }
                //暂不应用样式
                //Rsd.setElStyle(_span,_cell.style);

                _span.appendChild(_txt);
                _td.appendChild(_span);
                tr.appendChild(_td);
            }

            this.table.appendChild(tr);
        }

    },
    /**
     * @private
     * */
    formatTextString:function formatTextString(str, row) {

        if(str.indexOf('#=')>-1 && str.indexOf('=#')>-1)
        {
            return Rsd.formatTemplateString(str,row);
        }
        return str;

    },
    /*
    * */
    loadData:function loadData(data){
        for(var i in this.rows)
        {
            var row = this.rows[i];

            if(row.xtype=='list')
            {
                this.drawList(row,this.data[row['dataSource']]||[]);
            }
            else
            {
                var tr = document.createElement("TR");
                for (var j in row.items)
                {
                    this.drawCell(tr,row.items[j],data||this.data);
                }

                this.table.appendChild(tr);
            }

        }
    }



});