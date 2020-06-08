(function(){
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, {passive: false});

    window.onload = function(){
        app.init({
            container: document.getElementById('container')
        });
}

var app = {
    init: function(config){
        var me = this, doc = document, body = doc.body
            vendor = Hilo.browser.jsVendor;

        //禁止默认行为
        body.style[vendor + 'TouchCallout'] = 'none';
        body.style[vendor + 'UserSelect'] = 'none';
        body.style[vendor + 'TextSizeAdjust'] = 'none';
        body.style[vendor + 'TapHighlightColor'] = 'rgba(0,0,0,0)';

        //禁止页面滚动
        body.addEventListener('touchmove', function(e){
          e.preventDefault();
        }, false);
        
        me.config = config;
        me.initViewport();
        
        //改变设备方向，重新加载
        if(Hilo.browser.supportOrientation){
            window.addEventListener('orientationchange', function(e){
                window.location = location;
            });
        }
    },

    initViewport: function(){
        var me = this, win = window;

        var size = me.adaptSize({
            maxWidth: 640,
            maxHeight: 480,
            //minWidth: 640,
            //minHeight: 480,
            lockAspectRatio: true
        });

        // console.log('size:', size.width, size.height, win.innerWidth, win.innerHeight);

        //设置容器
        var container = me.config.container;
        container.innerHTML = '';
        container.style.width = size.width + 'px';
        container.style.height = size.height + 'px';
        container.style.overflow = 'hidden';

        //启动游戏
        win.game.init({
            container: container,
            width: size.width, 
            height: size.height
        });
    },

    adaptSize: function(sizeConfig){
        sizeConfig = sizeConfig || {};

        var max = 1e5, min = -max;
        var minWidth = sizeConfig.minWidth || min;
        var maxWidth = sizeConfig.maxWidth || max;
        var minHeight = sizeConfig.minHeight || min;
        var maxHeight = sizeConfig.maxHeight || max;
        var screenWidth =  sizeConfig.screenWidth || window.innerWidth;
        var screenHeight = sizeConfig.screenHeight || window.innerHeight;
        var lockAspectRatio = sizeConfig.lockAspectRatio !== false;

        var width = screenWidth >= maxWidth ? maxWidth : screenWidth <= minWidth ? minWidth : screenWidth;
        var height = screenHeight >= maxHeight ? maxHeight : screenHeight <= minHeight ? minHeight : screenHeight;

        if(lockAspectRatio){
            var rawRatio = width / height;
            var maxRatio = (maxWidth < max && maxHeight < max) ? maxWidth / maxHeight : 0;
            var minRatio = (minWidth > 0 && minHeight > 0) ? minWidth / minHeight : 0;
            
            var ratio = 0;
            if(maxRatio && minRatio){
                ratio = Math.abs(maxRatio - rawRatio) < Math.abs(minRatio - rawRatio) ? maxRatio : minRatio;
            }else if(maxRatio){
                ratio = maxRatio;
            }else if(minRatio){
                ratio = minRatio;
            }

            if(ratio && ratio > rawRatio){
                height = Math.min(Math.round(width / ratio), height);
            }else if(ratio && ratio < rawRatio){
                width = Math.min(Math.round(height * ratio), width);
            }
        }

        return {
            width: width,
            height: height
        }
    }

};

})();