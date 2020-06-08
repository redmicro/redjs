/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:16
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.container.Page', {
    extend: 'Rsd.container.Component',
    xtype: 'page',
    //margin: '0 1 1 1',
    height:'100%',
    width:'100%',
    /**
    * @description 页面标题，用于tab页展示，不影响header内容
    * */
    //tabTitle: 'tabPage',
    /**
    * */
    selected:false,
    /**
    * @description 开发页面后自动加载数据
    * */
    //autoLoad:true,
    /**
    * @description 打开页面后判断数据是否已加载数据
    * */
    //isLoaded:false,
    //@description 当前页面的menu
    //menu:null,
    /*
    * */
    constructor: function Page(config) {
        config = config || {};
        this.apply(config);
    },


    /*
    * 展示页面，页面展示后自动加载数据。
    * */
    show:function show(speed){

        var _spees = arguments.length == 0?1000:speed;
         this.callParent(null,_spees);

         if(this.autoLoad && !this.isLoaded)
         {
             var me = this;
             setTimeout(function () {
                 me.funApplyByIOC('load');
                 me.isLoaded = true;
             },_spees);

         }
        if(Rsd.Logger)
        {
            Rsd.Logger.pv(this.$className,this.tabTitle);
        }
        return this;
    },
    /*
    * 选中标签
    * */
    select:function select(speed)
    {
        this.show(speed||0);
        return this;
    },
    /*
    * 加载页面数据
    * */
    load:function load() {

        Rsd.debug('Page ' +  this.id+ ' is load('+this.title+').');
        if(Rsd.Logger)
        {
            Rsd.Logger.send();
        }

        return this;
    }

},function(type)
    {
        var _autoLoadGetter = function () {

            if (this.__autoLoad == undefined) {
                this.__autoLoad = true;
            }

            return this.__autoLoad;
        };
        var _autoLoadSetter = function (autoLoad) {

            this.__autoLoad = autoLoad;
        }

        this.defineProperty(type, "autoLoad", _autoLoadGetter, _autoLoadSetter, true);

        var _isLoadedGetter = function () {

            if (this.__isLoaded == undefined) {
                this.__isLoaded = false;
            }

            return this.__isLoaded;
        };
        var _isLoadedSetter = function (loaded) {

            this.__isLoaded = loaded;
        }

        this.defineProperty(type, "isLoaded", _isLoadedGetter, _isLoadedSetter, true);

        //menu
        var _menuGetter = function () {

            return this.__menu||{};
        };
        var _menuSetter = function (menu) {

            this.__menu = menu;
        }

        this.defineProperty(type, "menu", _menuGetter, _menuSetter, true);



    });

