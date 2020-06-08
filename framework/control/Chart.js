/**
 * Created by seeker910 on 2017/7/26.
 */
Rsd.define('Rsd.control.Chart', {
    extend: 'Rsd.control.Component',
    xtype: 'chart',
    cls:'x-chart',
    ctrlTagName: 'div',
    label:{visible:true,cls:'x-header',position:'top',align:'center',height:40},
    margin:'2 2 2 2',
    "static":function __init() {
        Rsd.chartProvider={provider:null,isLoading:true,cache:[]};
        setTimeout(function () {
            Rsd.loadPlugin('plugin/echart/echarts.js', function () {

            if (window.echarts == null) {
                Rsd.alert(Rsd.lang('container.chart.provider_not_exist'));
            }
            else {
                Rsd.chartProvider.provider = window.echarts;
                for(var i in Rsd.chartProvider.cache)
                {
                    Rsd.chartProvider.cache[i].load();
                }
                Rsd.chartProvider.cache=[];
            }

            Rsd.chartProvider.isLoading = false;
              });
        },0);
    },

    /*
    *
    * */
    constructor: function constructor (config) {
        config = config || {};
        this.apply(config);
    },
    /*
     *
     *  */
    loadData:function loadData(data) {

        var me = this;

        setTimeout(function () {
            var _provider = Rsd.chartProvider.provider;
            if(_provider)
            {
                var _chart = _provider.init(me.ctrl);
                _chart.setOption(data||me.data);
                me.closeLoading();
            }
            else
            {
                me.data = data;
                Rsd.chartProvider.cache.push(me);
            }
        },10);

        return this;
    }
});