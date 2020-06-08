/**
 * Created by seeker910 on 2018/1/18.
 */
Rsd.define('Rsd.view.MajorSubDialog', {
    extend: 'Rsd.container.Dialog',
    requires: ['Rsd.controlEx.MajorSubViewer'],
    layout: 'border',
    items: [
        {
            xtype:'major-sub-viewer',
            region:'center'
        },
        {
            region:'bottom'
        }
    ],
    title:'无标题',
    //sub:null,
    //major:null,
    /*
     * */
    constructor: function constructor(config) {

        config = config || {};
        this.apply(config);

    },
    /*
    * */
    onBeforeInit:function onBeforeInit() {
        if(this.footer)
        {
            this.items[1] = this.footer;
            this.items[1].region = 'bottom';
        }
        this.callParent();
    },
    /*
     * */
    load:function load(row,subList)
    {
        if(!this.major)
        {
            throw  new Error('Property \'major\' not found.');
        }
        if(!Rsd.isString(this.major.key))
        {
            throw  new Error('Property \'key\'  is undefined or not string value  in major.');
        }
        if(!Rsd.isString(this.sub.fk))
        {
            throw  new Error('Property \'fk\' is undefined or not string value in sub.');
        }

        var me = this;
        var _ms =  this.items[0];
        var _row = row||this.data;


        if(_ms && _row) {

            var _key = this.major.key;
            var _fk = this.sub.fk;
            var _type = this.sub.modelType;

            setTimeout(function () {

                _ms.loadMajor(_row);

                if (_key && (_row[_key] == null || _row[_key] == undefined)) {
                    throw new Error('Key [' + _key + '] value is null or not undedined.');
                }

                _ms.loadSub(subList||{
                        modelType:_type,
                        where:[{
                            name: _fk,
                            op: 'like',
                            value: _row[_key]
                        }], sort:me.sub.sort || [{name:'CreateTime',direction:'asc'}]});
            },50);


        }

        return this;
    },
    /*
    * */
    loadMajor:function loadMajor(row)
    {
        var _ms =  this.items[0];
        var _row = row||this.data;
        _ms.loadMajor(_row);
    },
    /*
    * */
    loadSub:function loadSub(list)
    {
        var _ms =  this.items[0];
        _ms.loadSub(list||[]);
    },
    /*
     * */
    openItem:function openItem(record) {

        var _titleField = 'columnname';
        var _sub = (_titleField== null || _titleField.length ==0) ?"titleField未设置" :(record ? record[_titleField] :'*');
        var _title = this.title +  '[' + _sub + ']';
        Rsd.app.showModelView(this.sub.modelType,this.sub.fields,record,_title);
    }

},function (type) {

    var _subGetter = function () {
        var _ms =  this.items[0];

        return _ms.sub;

    };

    var _subSetter = function (value) {

        var _ms =  this.items[0];

        _ms.sub = Rsd.apply({modelType:'',fk:''},value || {});

        if(Rsd.isString(value.dataSource )) {
            _ms.sub.dataSource = Rsd.widget(value.dataSource);
        };


    }

    this.defineProperty(type,"sub", _subGetter, _subSetter,true);

    var _majorGetter = function () {
        var _ms =  this.items[0];

        return _ms.major;

    };

    var _majorSetter = function (value) {
        var _ms =  this.items[0];
        _ms.major = Rsd.apply({key:'',titleField:''},value || {});
    }

    this.defineProperty(type,"major", _majorGetter, _majorSetter,true);
});