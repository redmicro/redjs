/**
 * Created by seeker910 on 2017/4/16.
 *
 *  @memberof Rsd.data
 */
Rsd.define('Rsd.data.Schema', {
    extend:'Rsd.common.Object',
    xtype:'schema',
    text:'',
    name:'',
    keys:[],
    insertService:'',
    updateService:'',
    deleteService:'',
    findService:'',
    getService:'',
    //columns:[],
    //fields:[],
    /**
     * @constructs Rsd.data.Schema
     * @classdesc Rsd.common.Service 在js环境中，进一步对模型的结构和模型的CURD service操作进行封装。
     *
     */
    constructor: function Schema (config) {
        config = config || {};
        this.apply(config);
    },
    /**
    * @description 对已存在但列进行合并，对不存在列不会添加到原始数组中
    * */
    getColumns:function getColumns(cols) {


        var  _temp = [];
        var _list = cols||[];
        for(var i in _list)
        {
            var _c = _list[i];
            if(Rsd.isEmpty(_c.name))
            {
                continue;
            }
            if(this.__columns_m[_c.name])
            {
                this.__columns_m[_c.name].tip = this.__columns_m[_c.name].text;
                Rsd.apply(this.__columns_m[_c.name],_c)
            }
            else
            {
                _temp.push(_c);
            }
        }
        _temp = _temp.concat(this.columns||[]);
        _temp.sort(function (a,b) {
            return a.index - b.index;
        })

        return _temp;
    },
    /*
    *
    * 对已存在但字段进行合并，对不存在字段不会添加到原始数组中
    * */
    getFields:function getFields(fields) {

        var  _temp = [];

        var _list = fields||[];
        for(var i in _list)
        {
            var _f = _list[i];
            if(Rsd.isEmpty(_f.name))
            {
                continue;
            }
            if(this.__fields_m[_f.name])
            {
                Rsd.apply(this.__fields_m[_f.name],_f)
            }
            else
            {
                _temp.push(_f);
            }
        }

        _temp = _temp.concat(this.fields||[]);
        _temp.sort(function (a,b) {
            return a.index - b.index;
        })

        return _temp;
    },
    /*
    *获取键值
    * */
    getKeyValue:function getKeyValue(object)
    {
        if(Rsd.isEmpty(this.keys))
        {
            return null;
        }
        var obj = object || {};
        return obj[this.keys[0]];
    },
    /*
    *创建初始对象
    * */
    makeObject:function makeObject(object)
    {
        var _old_obj = object||{};
        var _new_obj = {};
        for(var i in this.fields)
        {
            var _p = this.fields[i].dataIndex;
            if(Rsd.isNullOrUndefined(_p))
            {

                continue;
            }
            var _type = this.fields[i].xtype;
            if(_old_obj.hasOwnProperty(_p))
            {
                _new_obj[_p]= _old_obj[_p];
            }
            else
            {
                switch (_type)
                {
                    case 'number':
                    case 'checkbox':
                        _new_obj[_p]= 0;
                        break;
                    case 'date':
                        break;
                    default:
                        _new_obj[_p]= '';
                        break;
                }

            }

        }
        for(var i in this.keys)
        {
            var _p = this.keys[i];
            if(Rsd.isNullOrUndefined(_p))
            {

                continue;
            }

            if(_old_obj.hasOwnProperty(_p))
            {
                _new_obj[_p]= _old_obj[_p];
            }
        }
        return _new_obj;
    },
    /*
    *
    *
    * */
    insertObject:function insertObject(object,callback) {
        if(Rsd.isEmpty(this.insertService))
        {
            Rsd.msg("权限限制，无法执行新增。(ERROR:00001)");
            return;
        }

        if (Rsd.isString(this.insertService)) {

            var _data = {modelType: this.name, record: this.makeObject(object)};

            Rsd.app.getService(this.insertService).requestJson(_data, callback);
        }
    },
    /*
    *
    *
    * */
    updateObject:function updateObject(object,callback) {

        if(Rsd.isEmpty(this.updateService))
        {
            Rsd.msg("权限限制，无法执行修改。(ERROR:00002)");
            return;
        }

        if (Rsd.isString(this.updateService)) {

            var _data = {modelType: this.name, record: object};

            Rsd.app.getService(this.updateService).requestJson(_data, callback);
        }
    },
    /*
    *
    *
    * */
    deleteObject:function deleteObject(key,callback) {

        if(Rsd.isEmpty(this.deleteService))
        {
            Rsd.msg("权限限制，无法执行删除。(ERROR:00003)");
            return;
        }
        if(Rsd.isEmpty(this.keys))
        {
            Rsd.msg("类型：" + this.name + "主键不存在，无法删除。");
            return ;
        }
        if (Rsd.isString(this.deleteService)) {
            var _data = {modelType: this.name,key:key};

            Rsd.app.getService(this.deleteService).requestJson(_data, callback);
        }
    },
    /*
    *
    * */
    findObject:function getObject(key,callback) {
        if(Rsd.isEmpty(this.findService))
        {
            Rsd.msg("权限限制，无法执行查看。(ERROR:00004)");
            return;
        }

        if(Rsd.isEmpty(this.keys))
        {
            return null;
        }

        if (Rsd.isString(this.findService)) {
            var _data = {modelType: this.name};
            _data[this.keys[0]] = key;
            Rsd.app.getService(this.findService).requestJson(_data, callback);
        }
    },
    /*
    *
    * */
    getObjects:function listObjects(where,callback) {
        if(Rsd.isEmpty(this.getService))
        {
            Rsd.msg("权限限制，无法执行查找。(ERROR:00005)");
            return;
        }
        if (Rsd.isString(this.getService)) {
            var _data = {modelType: this.name};
            _data['where'] = where;
            Rsd.app.getService(this.getService).requestJson(_data, callback);
        }
    }

},function (type) {

    var _columnsGetter = function () {
       if(this.__columns == undefined)
       {
           this.__columns = [];
       }
        return this.__columns;
    };

    var _columnsSetter = function (value) {

        this.__columns = value;
        this.__columns_m ={};
        for(var i in this.__columns)
        {
            var _c = this.__columns[i];
            if(Rsd.isEmpty(_c.name))
            {
                continue;
            }
            this.__columns_m[_c.name] = _c;

        }
    }

    this.defineProperty(type,"columns", _columnsGetter, _columnsSetter,false);


    var _fieldsGetter = function () {
        if(this.__fields == undefined)
        {
            this.__fields = [];
        }
        return this.__fields;
    };

    var _fieldsSetter = function (value) {

        this.__fields = value;
        this.__fields_m = {};
        for(var i in this.__fields)
        {
            var _f = this.__fields[i];
            if(Rsd.isEmpty(_f.name))
            {
                continue;
            }
            this.__fields_m[_f.name] = _f;
        }
    }

    this.defineProperty(type,"fields", _fieldsGetter, _fieldsSetter,false);
});