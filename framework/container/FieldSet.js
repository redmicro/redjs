/*
 * redmicro all Copyright (c)
 *
 * Created by seeker910 on 2015/3/22.
 */
Rsd.define('Rsd.container.FieldSet', {
    extend: 'Rsd.container.Component',
    xtype: 'fieldset',
    //margin: '10 0 10 0',
    height: '100%',
    width: '100%',
    title: '',
    bodyTagName:'fieldset',
    cls:'x-fieldset',
    /*
    * null or undefined 不使用 */
    legend:'',
    /*
    * */
    constructor: function FieldSet(config) {
        config = config || {};
        this.apply(config);

    },
    onAfterRender: function onAfterRender() {
        //debugger;
        this.callParent();
        if(!Rsd.isNullOrUndefined(this.legend))
        {
            try
            {
                var el = document.createElement('legend');
                el.innerText = this.legend;
                var _c = this.body.firstChild;
                if(_c == null)
                {
                    this.body.appendChild(el);
                }else
                {
                    this.body.insertBefore(el,_c);
                }
            }catch (ex)
            {
                Rsd.error("添加legend失败",'Rsd.container.FieldSet',ex);
            }

        }
    }
});