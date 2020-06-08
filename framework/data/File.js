/**
 * Created by seeker910 on 13-12-10.
 * 文件上传
 */
Rsd.define('Rsd.data.File', {
    extend:'Rsd.data.Ajax',
    xtype:'a-file',
    type: 'POST',
    cache: false,
    contentType: false,
    processData: false,
    /*
     * */
    constructor: function File(config) {
       Rsd.apply(this,config||{});
    },
    xhr: function() {
        // custom xhr
        var me = this;
        var myXhr = $.ajaxSettings.xhr();

        if(myXhr.upload){
            // check if upload property exists
            // for handling the progress of the upload
            myXhr.upload.addEventListener('progress',function (e) {
                if(e.lengthComputable){

                    me.events.fire(me,'progress',{value:e.loaded,max:e.total});
                }
            }, false);

        }
        return myXhr;
    },
    //Ajax事件
    beforeSend:function onBeforeSend(){
        // debugger;
        var me = this;
        me.events.fire(me,'beforeSend',arguments);
    },
    /*

    * */
    requestJson:function requestJson(files,callback)
    {
        //debugger;
        var me = this;
        var formData = new FormData();
        var _files = [];
        if(Rsd.isArray(files))
        {
            _files = files;
        }
        else
        {
            _files.push(files);
        }
        for(var i=0; i < _files.length;i++)
        {
            var _f = _files[i];
            if(_f instanceof  File)
            {
                formData.append(_f.name,_f);
            }

        }

        me.callParent(formData,callback);

    },
    /*
    *
    * */
    request:function request(files,callback)
    {
        //debugger;
        var me = this;
        var formData = new FormData();
        var _files = [];
        if(Rsd.isArray(files))
        {
            _files = files;
        }
        else
        {
            _files.push(files);
        }
        for(var i=0; i < _files.length;i++)
        {
            var _f = _files[i];
            formData.append(_f.name,_f);
        }
        me.callParent(formData,callback);

    },



},function (type) {

});
