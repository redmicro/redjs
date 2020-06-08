/**
 * Created by seeker910 on 2017/6/17.
 */
Rsd.define('Rsd.container.Guider', {
    extend: 'Rsd.container.Component',
    xtype: 'guider',
    cls: 'x-guider',
    margin:'15 5 15 5',
    bodyTagName: 'fieldset',
    layout:'fit',
    title:'',

    /*
    * Guider所在父容器
    * */
    dialog:null,
    /*
    * {
    *   text:'上一步',
        visible:true,
        fn:function(){return ture;}
    * }
    * */
    //previousStep:{}

    /*
    * {
    *   text:'下一步',
    *   visible:true,
    *   fn:function (){return true;}
    * }
    * */
    //nextStep:{}
    /*
     * true:页面展示后自动执行load方法。用于加载时不需要设置参数。
     * false:页面展示后不自动执行load方法，需要调用load方法加载。用于加载时需要设置参数。
     * */
    //autoLoad:true,
    /*
    *
    * */
    constructor: function Guider(config) {

        config = config || {};
        this.apply(config);
        this.hidden = true;
    },
    /*
    *
    * */
    onAfterRender: function onAfterRender() {
        //debugger;
        this.callParent();
        if(this.title !== '')
        {
            try
            {
                var el = document.createElement('legend');
                el.innerText = this.title;
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
                Rsd.error("添加legend失败",'Rsd.container.Guider',ex);
            }

        }
    },
    /*
     * 获取该步骤数据
     * */
    getData:function getData() {
        alert('getData');
    }

},function (type) {

    var _previousStepGetter = function () {
        return this.__previousStep || {
            text:'上一步',
                visible:true,
                guider:this,
                fn:function () {
                    return true;
            }};
    };

    var _previousStepSetter = function (value) {
        this.__previousStep = Rsd.apply(this.previousStep,value);
    }

    this.defineProperty(type, "previousStep", _previousStepGetter, _previousStepSetter, true);


    var _nextStepGetter = function () {
        return this.__nextStep || {
                text:'下一步',
                visible:true,
                guider:this,
                fn:function () {
                    return true;
                }};
    };
    var _nextStepSetter = function (value) {
        this.__nextStep = Rsd.apply(this.nextStep,value);
    }

    this.defineProperty(type, "nextStep", _nextStepGetter, _nextStepSetter, true);

    this.defineProperty(type,'autoLoad',function(){return this.__autoLoad;},function(autoLoad){
        this.__autoLoad = autoLoad;
    },false);
});