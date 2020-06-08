/*
* 计数器
* */
Rsd.define('Rsd.control.Scaler', {
    extend: 'Rsd.control.Component',
    xtype: 'scaler',
    ctrlTagName: 'nobr',
    dataIndex:'',
    /*
    * 数字颜色
    * */
    color:null,
    height:30,
    defaultText:'--.--',
    /*
    * 数字跳动次数
    * */
    timer:100,
    /*
    * 单位
    * */
    unit:'',
    /*
    * 字体放大倍数：80（80%），100（100%），300(300%)...
    * */
    zoom:300,
    /*
    * */
    constructor: function Label(config) {
        config = config || {};
        this.apply(config);
    },

    /*
     * */
    onAfterInit: function onAfterInit() {
        var me = this;


        if(Rsd.isNumber(this.height))
        {
            this.ctrl.style.lineHeight = this.height+ 'px';
        }


        if (me.ctrl) {

            me.__scaler = document.createElement('span');
            me.__scaler.style.fontSize = (me.zoom||'300') + '%';
            me.__scaler.style.fontWeight ='bold';
            me.__scaler.appendChild(document.createTextNode(me.defaultText));
            me.ctrl.appendChild(me.__scaler);
            me.ctrl.appendChild(document.createTextNode(me.unit));
            if(me.color)
            {
                me.__scaler.style.color = me.color;
            }
        }
        this.callParent();

        setTimeout(function () {

            var i = 0;
            if(me.timer<1)
            {
                me.timer = 1;
            }

            var _t = me.value / me.timer;
            var _id = setInterval(function () {

                if(i < me.timer)
                {
                    me.__scaler.innerHTML = i++ * _t;

                }else
                {
                    me.__scaler.innerHTML = me.value;
                    clearInterval(_id);
                }

            },1);

        },500);

    },


});
