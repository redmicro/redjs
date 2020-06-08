/**
 * Created by seeker910 on 2017/6/17.
 */
Rsd.define('Rsd.view.GuiderDialog', {
    extend: 'Rsd.container.Dialog',
    requires: ['Rsd.container.GuiderContainer'],
    xtype: 'guider-form',
    layout:'vbox',
    height:600,
    width:700,
    title:'操作向导',
    currentStep:-1,
    steps:[],
    items:[
        { xtype: 'guider-container',flex:10,width:'100%'},
        {
            xtype:'container',
            height:50,
            width:'100%',
            items:[
                {xtype:'button',text:'Back',width:100,handler:'btn_back'},
                {xtype:'button',text:'Next',width:100,handler:'btn_next'}
                ]
        }
    ],
    /*
     *
     * */
    constructor: function GuiderDialog(config) {

        config = config || {};
        this.apply(config);
    },
    onBeforeInit:function onBeforeInit() {
        //debugger;
        this.items[0].items = this.steps;
        for(var i in this.items[0].items)
        {
            this.items[0].items[i].dialog = this;
        }
        this.callParent();
        this.steps =  this.items[0].items;
    },
    btn_back:function btn_back() {

        if(this.currentStep == 0)
        {
            alert('已经是第一步。')
            return;
        }
        else
        {
            //debugger;
            var _flag = true;
            var _guider = this.items[0].items[this.currentStep];
            Rsd.isFunction(_guider.previousStep.fn)
            {
                _flag = _guider.previousStep.fn.call(_guider);

            }

            if(_flag)
            {
                this.setStep(this.currentStep-1);
            }

        }
    },
    btn_next:function btn_next() {

        if(this.currentStep < this.items[0].items.length )
        {
            var _flag = true;
            var _guider = this.items[0].items[this.currentStep];
            Rsd.isFunction(_guider.nextStep.fn)
            {
                _flag = _guider.nextStep.fn.call(_guider);

            }
            //console.log(_guider.getData());
            if(_flag)
            {
                this.setStep(this.currentStep+1);
            }


        }else
        {
            alert('已经是最后一步。')
            return ;
        }




    },
    setStep:function setStep(step) {
        var _guider = null;
        if(!this.isRendered())
        {
            alert('请在GuiderDialog展现后设置步骤值。')
            return _guider;
        }
        var _step = step||0;
        if(_step < this.items[0].items.length)
        {
            if(this.currentStep<0)
            {

            }else
            {
                this.items[0].items[this.currentStep].hide();
            }
             _guider = this.items[0].items[_step];
            _guider.show();//.doLayout();
            this.currentStep = _step;
            this.items[1].items[0].setValue(_guider.previousStep.text);
            this.items[1].items[1].setValue(_guider.nextStep.text)

            if(_guider.previousStep.visible)
            {
                this.items[1].items[0].show();
            }
            else
            {
                this.items[1].items[0].hide();
            }
            if(_guider.nextStep.visible)
            {
                this.items[1].items[1].show();
            }
            else
            {
                this.items[1].items[1].hide();
            }
            if(_guider.autoLoad)
            {
                setTimeout(function () {
                    _guider.funApplyByIOC('load');
                },0);
            }


        }
        else
        {
            alert('step值大于步骤最大值。');
        }
        return _guider;

    },
    getStep:function getStep(step)
    {
        if(step < 0)
        {
            alert('step值应大于0。');
            return null;
        }
        if(step < this.items[0].items.length)
        {
            return  this.items[0].items[step];
        }
        else
        {
            alert('step值大于步骤最大值。');
            return null;
        }



    }
});