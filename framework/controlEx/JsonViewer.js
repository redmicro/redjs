/*
*
*
* */
Rsd.define('Rsd.controlEx.JsonViewer', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.controlEx.ModelViewer',
        'Rsd.control.Grid',
        'Rsd.control.GridToolBarSimple',
        'Rsd.controlEx.ComboBoxEx',
        'Rsd.control.Timestamp',
        'Rsd.container.FieldSet',
        'Rsd.control.Text',
        'Rsd.control.Date',
        'Rsd.control.Number',
        'Rsd.control.Hidden',
        'Rsd.control.CheckBox'
    ],
    layout: 'vbox',
    xtype:'json-viewer',
    items: [],

    /*
     * */
    constructor: function MajorSubViewControl(config) {

        config = config || {};
        this.apply(config);

    },


    /**
     *
     * */
    loadData:function loadData(data)
    {
        //console.log(data);
        var me = this;
        var _data  = data||{};
        var _height = 0;
        var _g_list = [];
        for (var f in _data) {
            //debugger;
            var _h = 0;
            if(Rsd.isArray(_data[f]))
            {
                var _cols = [];
                if(_data[f].length > 0)
                {
                    for(var c in _data[f][0])
                    {
                        _cols.push({name:c,text:c});
                    }
                }

                _h =  250;

                var _grid = {
                    id:_field.id || _field.name,
                    dataIndex: _field.dataIndex||_field.dataindex || _field.name,
                    height:_h,
                    name:f,
                    label:f,
                    width:'100%',
                    columns:_cols,
                    value:_data[f],
                    readOnly:true,
                    border:true,
                    tabIndex:f,
                    dataSource:data[f],
                    margin:'2 5 2 5',
                    xtype:'grid'
                };
                var _g = me.add(_grid);
                _g_list.push(_g);

            }
            else
            {
                var _field = {name:f,dataIndex:f,label:f};
                if(_field.xtype != 'hidden')
                {
                    _h = _field.height || 30;
                }

                var _new_field = Rsd.apply(
                    {
                        id:_field.id || _field.name,
                        name:f,
                        dataIndex: _field.dataIndex||_field.dataindex || _field.name,
                        height:_h,
                        width:'33%',
                        value:_data[f],
                        readOnly:true,
                        tabIndex:f,
                        margin:'2 5 2 5',
                        xtype:'text'
                    },_field);


                me.add(_new_field);
            }
            _height += _h;


        }

        for(var i in _g_list)
        {
            _g_list[i].loadData();
        }
    }


},function (type) {

});