/**
 * Created by seeker910 on 13-12-10.
 */

Rsd.define('Rsd.control.File', {
    extend: 'Rsd.control.Input',
    xtype: 'file',
    ctrlCls: 'x-control-file',
    inputType: 'file',
    accept: '*/*',
    multiple:true,
    url:null,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /*
    * */
    onAfterInit:function onAfterInit()
    {
        this.callParent();
        this.ctrl.accept = this.accept;
        this.ctrl.multiple = this.multiple;
    },
    /*
    * */
    getFiles: function () {
        var _files = [];
        //debugger;
        if(Rsd.isArray(this.ctrl.files) || this.ctrl.files instanceof  FileList)
        {
            for(var j=0;j<this.ctrl.files.length;j++)
            {
                var _item = this.ctrl.files[j];
                if(_item instanceof  FileList)
                {
                    for(var i=0 ;i<_item.length;i++)
                    {
                        _files.push(_files[i]);
                    }
                }
                if(_item instanceof  File)
                {
                    _files.push(_item);
                }
            }
        }
        //console.log(_files);
        return _files;
    },
    /*
    * */
    getValue:function()
    {
        return this.getFiles();
    }

});