/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:25
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.container.Form', {
    extend: 'Rsd.container.Component',
    xtype: 'form',
    cls: 'x-form',
    bodyTagName:'form',
    /**
    * @description 提交url 地址*/
    //action:'',
    /**
    * @description 提交方法
    * */
    //method:'POST',
    constructor: function Form(config) {

        config = config || {};
        this.apply(config);
    },
    /**
    *
    * @description 提交表单数据
    * */
    submit:function submit(data) {
        if(this.body && this.body.action)
        {
            var formData = new FormData(this.body);
            if(Rsd.isObject(data))
            {
                for(var n in data)
                {
                    formData.append(n, data[p]);

                }
            }

            var request = new XMLHttpRequest();
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");

            request.open(this.method, this.action);
            request.send(formData);

        }

    },
    /**
    *@description 获取表单数据
    * */
    getFormData:function getFormData( ) {
        return this.bodyTagName=='form'? new FormData(this.body) :null;
    }

},function (type) {

    var _actionGetter = function () {
        return this.__action;
    };
    var _actionSetter = function (value) {
        this.__action = value;
        if(this.body)
        {
            this.body.action = this.__action;
        }
    };
    this.defineProperty(type,"action", _actionGetter, _actionSetter,true);

    var _methodGetter = function () {
        return this.__method || 'POST';
    };
    var _methodSetter = function (value) {
        this.__method = value;
        if(this.body)
        {
            this.body.method = this.__method;
        }
    };
    this.defineProperty(type,"method", _methodGetter, _methodSetter,true);
});
