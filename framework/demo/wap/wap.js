Rsd.createApplication({
        appTitle: 'Avengers',
        appName: 'Rsd.Avengers',
        appFolder: './src',
        appHost:'http://221.226.117.22/web',
        loginUrl: 'login',
        indexUrl: 'release.html',
        isDebug:false,
        appVersion:'1.0.0.1',
        appDate:new Date().getTime(),//开发时使用
        //appDate:new Date('2018-08-07').getTime(),
        isDemo:window.location.protocol == 'file:',
        imgHost:'http://image.redmicro.cn/',
        requires:[],
        beforeRun:function beforeRun() {
            Rsd.onResize(function () {
                Rsd.defineRem(Rsd.isMobile()?640:800);
            });
            //Rsd.loadPlugin('plugin/jquery/jquery.md5.js');
            //Rsd.loadScriptFile('./resources/storages/enums.js');
            //Rsd.alert("您当前使用的浏览器是：" + Rsd.detectNavigator());
            //Rsd.alert("您当前使用的操作系统是：" + Rsd.detectOS());
        },
        launch: function launch() {
            var _spm = Rsd.getUrlParam('spm')||'';
            var str = Rsd.getUrlParam('view')||'';
            str = str.toLowerCase();
            var _class = str.replace(/\b\w+\b/g, function(word){
                return word.substring(0,1).toUpperCase()+word.substring(1);
            });
            var _c = Rsd.getUrlParam('c');
            var _class = _c || 'Merch';
            var _wap = Rsd.create('Rsd.template.eBiz.wap.T' + _class + 'Wap', {spm:_spm}).show();

        }
    }
);