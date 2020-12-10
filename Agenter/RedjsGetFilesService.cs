using Rsd.Dudu;
using Rsd.Dudu.Core;
using Rsd.Dudu.Helpers;
using Rsd.Dudu.UI.Core;
using Rsd.Dudu.UI.Models;
using Rsd.Dudu.UI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rsd.Redjs.Agenter
{
    /// <summary>
    /// 
    /// </summary>
    public class RedjsGetFilesService : BaseService, IGetUIFilesService, IService
    {
        public override ServiceProxcy Proxcy => ServiceProxcy.Sington;
        
        /// <summary>
        /// 
        /// </summary>
        private string SourceHost { get; set; }
        /// <summary>
        /// 
        /// </summary>
        private string IndexPage { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sourceHost"></param>
        public RedjsGetFilesService(string sourceHost, string defaultIndex = "index.html")
        {
            this.AddSourceHost("js.redmicro.cn", "", sourceHost, "", defaultIndex);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="domainName"></param>
        /// <param name="pathPrefix"></param>
        /// <param name="sourceHost"></param>
        /// <param name="appJs"></param>
        /// <param name="defaultIndex"></param>
        public void AddSourceHost(string domainName, string pathPrefix, string sourceHost, string appJs, string defaultIndex = "index.html")
        {
            this.SourceHost = sourceHost;
            this.IndexPage = defaultIndex;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="url"></param>
        /// <param name="files"></param>
        public void AddUrlMapping(string url, params string[] files)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 获取源站信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public Site GetSourceSite(HttpRequest request)
        {
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public string[] GetFiles(HttpRequest request)
        {
            //来源 域名 有效性验证

            //来源域名 和 uirlReferer 验证
            var path = this.GetRequestPath(request);
            string sourceHost = this.SourceHost.TrimEnd('/');

            if (path.Trim('/') == "")
            {
                return new string[] { string.Format("{0}/{1}", this.SourceHost, path) };
            }
          
            var file = path.ToLower().Split('?')[0];
            if (file.EndsWith("rsd-min.js"))
            {
                RedjsConfig _config = null;
                //获取最新config.js文件
                var _cfg = this.HttpGet(sourceHost + "/config.js?v=" + DateTime.Now.ToLongTimeStamp().ToString()); ;
                if (_cfg.Success)
                {
                    //解析 config.js文件
                    _config = new RedjsConfig(_cfg.Data);

                    var version = _config.Version;
                    var releaseTime = _config.ReleaseTime.ToLongTimeStamp().ToString();

                    //在每个文件后，追加版本号和发布时间 防止服务器缓存
                    var list = this.GetRedjsMin(sourceHost, version, releaseTime);
                    return list.ToArray();
                }

                return new string[] { };
            }
            if (file.EndsWith("rsd-all.js"))
            {

                RedjsConfig _config = null;
                //获取最新config.js文件
                var _cfg = this.HttpGet(sourceHost + "/config.js?v=" + DateTime.Now.ToLongTimeStamp().ToString()); ;
                if (_cfg.Success)
                {
                    //解析 config.js文件
                    _config = new RedjsConfig(_cfg.Data);

                    var version = _config.Version;
                    var releaseTime = _config.ReleaseTime.ToLongTimeStamp().ToString();

                    //在每个文件后，追加版本号和发布时间 防止服务器缓存
                    var list = this.GetRedjsAll(sourceHost, version, releaseTime);
                    return list.ToArray();
                }

                return new string[] { };

            }
            //
            if (file.EndsWith("rsd-wap.js"))
            {

                RedjsConfig _config = null;
                //获取最新config.js文件
                var _cfg = this.HttpGet(sourceHost + "/config.js?v=" + DateTime.Now.ToLongTimeStamp().ToString()); ;
                if (_cfg.Success)
                {
                    //解析 config.js文件
                    _config = new RedjsConfig(_cfg.Data);

                    var version = _config.Version;
                    var releaseTime = _config.ReleaseTime.ToLongTimeStamp().ToString();

                    //在每个文件后，追加版本号和发布时间 防止服务器缓存
                    var list = this.GetRedjsWap(sourceHost, version, releaseTime);
                    return list.ToArray();
                }

                return new string[] { };
            }
            //
            if (file.EndsWith("rsd-wap-mini.js"))
            {
                RedjsConfig _config = null;
                //获取最新config.js文件
                var _cfg = this.HttpGet(sourceHost + "/config.js?v=" + DateTime.Now.ToLongTimeStamp().ToString()); ;
                if (_cfg.Success)
                {
                    //解析 config.js文件
                    _config = new RedjsConfig(_cfg.Data);

                    var version = _config.Version;
                    var releaseTime = _config.ReleaseTime.ToLongTimeStamp().ToString();

                    //在每个文件后，追加版本号和发布时间 防止服务器缓存
                    var list = this.GetRedjsWapMin(sourceHost, version, releaseTime);
                    return list.ToArray();
                }

                return new string[] { };
            }
            if (file.EndsWith("rsd-wxapp.js"))
            {

                RedjsConfig _config = null;
                //获取最新config.js文件
                var _cfg = this.HttpGet(sourceHost + "/config.js?v=" + DateTime.Now.ToLongTimeStamp().ToString()); ;
                if (_cfg.Success)
                {
                    //解析 config.js文件
                    _config = new RedjsConfig(_cfg.Data);

                    var version = _config.Version;
                    var releaseTime = _config.ReleaseTime.ToLongTimeStamp().ToString();

                    //在每个文件后，追加版本号和发布时间 防止服务器缓存
                    var list = this.GetRedjsWxApp(sourceHost, version, releaseTime);
                    return list.ToArray();
                }

            }
            return new string[] { string.Format("{0}/{1}", sourceHost, path.TrimStart('/')) };
        }

    
        /// <summary>
        /// 未完成
        /// </summary>
        /// <param name="sourceHost"></param>
        /// <param name="version"></param>
        /// <param name="releaseTime"></param>
        /// <returns></returns>
        public virtual string[] GetRedjsMin (string sourceHost, string version, string releaseTime)
        {
            var redjs = new string[] { "config.js", "Redjs.js", "Rsd.js", };
           
            var list_v = new List<string>();
            foreach (var js in redjs)
            {
                list_v.Add(sourceHost + "/" + js.Trim() + "?v=" + version + "&t=" + releaseTime);
            }

            return list_v.ToArray();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="version"></param>
        /// <param name="releaseTime"></param>
        /// <returns></returns>
        public virtual string[] GetRedjsAll(string sourceHost, string version, string releaseTime)
        {
            var redjs = new string[] { "config.js", "Redjs.js", "Rsd.js", "common/Object.js", "common/Lang.js", "common/Layouter.js", "data/Logger.js" };
            var common = new string[] { "common/EventList.js", "common/Application.js", "common/Svg.js", "common/ComponentX.js" };
            var data = new string[] { "data/Ajax.js", "data/Cache.js", "data/EnumItem.js", "data/Enum.js", "data/File.js", "data/Json.js", "data/Menu.js", "data/Schema.js", "data/Service.js", "data/Store.js", "data/WebSocket.js" };
            var control = new string[] {"control/Component.js","container/Component.js","control/Input.js", "control/AutoComplete.js", "control/Button.js", "control/Calendar.js", "control/Chart.js", "control/CheckBox.js","control/Table.js", "control/ComboBox.js",
                                                "control/Label.js","controlEx/ComboBoxEnum.js", "container/Dialog.js","control/MessageBox.js",
                                                "container/Form.js", "container/FieldSet.js", "control/ToolBar.js","control/NumberIndex.js","control/PagingBar.js",
                                                "control/Date.js","control/Email.js","control/File.js", "control/Link.js" ,"control/Text.js","control/GridToolBar.js","control/GridToolBarSimple.js", "control/Grid.js",
                                                "control/Hidden.js","control/HtmlBox.js", "control/Image.js", "control/ImageFile.js", "control/Number.js", "control/RichTextBox.js",
                                                "control/Svg.js", "control/ListItem.js", "control/List.js","control/ListView.js", "control/ListMenu.js",
                                                "control/ToolBarSeparator.js","control/ShareBar.js","control/LoadingBar.js","control/NavigateMenu.js"

                                                };
            var controlEx = new string[] { "controlEx/ModelViewer.js", "controlEx/ComboBoxEx.js" };
            var container = new string[] { "container/WaitingBox.js", "container/PageContainer.js", "container/Page.js" };
            var view = new string[] { "view/Header.js", "view/WelcomePage.js", "view/Footer.js", "view/Master.js", "view/MasterLTC.js", "view/BaseListPage.js" };



            var list = new List<string>();

            list.AddRange(redjs);
            list.AddRange(data);
            list.AddRange(common);
            list.AddRange(control);
            list.AddRange(controlEx);
            list.AddRange(container);
            list.AddRange(view);
            var list_v = new List<string>();
            foreach (var js in list)
            {
                list_v.Add(sourceHost + "/" + js.Trim() + "?v=" + version + "&t=" + releaseTime);
            }

            return list_v.ToArray();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sourceHost"></param>
        /// <param name="version"></param>
        /// <param name="releaseTime"></param>
        /// <returns></returns>
        public virtual string[] GetRedjsWap(string sourceHost, string version, string releaseTime)
        {

            var redjs = new string[] { "config.js", "Redjs.js", "Rsd.js", "common/Object.js", "common/Lang.js", "common/Layouter.js", "data/Logger.js" };
            var common = new string[] { "common/EventList.js", "common/Application.js", "common/Svg.js", "common/ComponentX.js" };
            var data = new string[] { "data/Ajax.js", "data/Cache.js", "data/EnumItem.js", "data/Enum.js", "data/File.js", "data/Json.js", "data/Menu.js", "data/Schema.js", "data/Service.js", "data/Store.js", "data/WebSocket.js" };
            var control = new string[] {"control/Component.js","container/Component.js","control/Input.js", "control/AutoComplete.js", "control/Button.js", "control/Calendar.js", "control/CheckBox.js","control/Table.js", "control/ComboBox.js",
                                                "control/Label.js","controlEx/ComboBoxEnum.js", "container/Dialog.js","control/MessageBox.js",
                                                "container/Form.js", "container/FieldSet.js", "control/ToolBar.js","control/NumberIndex.js","control/PagingBar.js",
                                                "control/Date.js","control/Email.js","control/File.js", "control/Link.js" ,"control/Text.js","control/GridToolBarSimple.js", "control/Grid.js",
                                                "control/Hidden.js","control/HtmlBox.js", "control/Image.js",  "control/ImageFile.js","control/Number.js", "control/RichTextBox.js",
                                                "control/Svg.js", "control/ListItem.js","control/List.js", "control/ListView.js", "control/ListMenu.js",
                                                "control/ToolBarSeparator.js","control/ShareBar.js","control/LoadingBar.js","control/NavigateMenu.js"

                                                };
            var wap = new string[] { "wap/CBannerPart.js", "wap/CGoodsListItemPart.js", "wap/CHomeBottomPart.js", "wap/CStoreHomeBottomPart.js", "wap/CStoreHomeContentPart.js", "wap/CStoreHomeTopPart.js" };
            var container = new string[] { "container/WaitingBox.js", "container/PageContainer.js", "container/Page.js" };
            var tempalte = new string[] { "template/Component.js", "template/TWap.js", "template/eBiz/wap/TFrameWap.js", "template/eBiz/wap/TActivateHomeWap.js", "template/eBiz/wap/THomeWap.js", "template/eBiz/wap/TPersonalWap.js", "template/eBiz/wap/TMerchWap.js", "template/eBiz/wap/TGoodsDetailWap.js" };



            var list = new List<string>();

            list.AddRange(redjs);
            list.AddRange(data);
            list.AddRange(common);
            list.AddRange(control);
            list.AddRange(wap);
            list.AddRange(container);
            list.AddRange(tempalte);

            var list_v = new List<string>();
            foreach (var js in list)
            {
                list_v.Add(sourceHost + "/" + js.Trim() + "?v=" + version + "&t=" + releaseTime);
            }

            return list_v.ToArray();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sourceHost"></param>
        /// <param name="version"></param>
        /// <param name="releaseTime"></param>
        /// <returns></returns>
        public virtual string[] GetRedjsWapMin(string sourceHost, string version, string releaseTime)
        {
            var redjs = new string[] { "config.js", "Redjs.js", "Rsd.js", "common/Object.js", "common/Lang.js", "common/Layouter.js", "data/Logger.js" };
            var common = new string[] { "common/EventList.js", "common/Application.js", "common/Svg.js", "common/ComponentX.js" };
            var data = new string[] { "data/Ajax.js", "data/Cache.js", "data/EnumItem.js", "data/Enum.js", "data/File.js", "data/Json.js", "data/Menu.js", "data/Schema.js", "data/Service.js", "data/Store.js", "data/WebSocket.js" };
            var control = new string[] {"control/Component.js","container/Component.js","control/Input.js", "control/AutoComplete.js", "control/Button.js", "control/Calendar.js", "control/CheckBox.js", "control/Table.js","control/ComboBox.js",
                                                "control/Label.js","controlEx/ComboBoxEnum.js", "container/Dialog.js","control/MessageBox.js",
                                                "container/Form.js", "container/FieldSet.js", "control/ToolBar.js","control/NumberIndex.js","control/PagingBar.js",
                                                "control/Date.js","control/Email.js","control/File.js", "control/Link.js" ,"control/Text.js","control/GridToolBarSimple.js", "control/Grid.js",
                                                "control/Hidden.js","control/HtmlBox.js", "control/Image.js",  "control/ImageFile.js","control/Number.js", "control/RichTextBox.js",
                                                "control/Svg.js", "control/ListItem.js","control/List.js", "control/ListView.js", "control/ListMenu.js",
                                                "control/ToolBarSeparator.js","control/ShareBar.js","control/LoadingBar.js","control/NavigateMenu.js"

                                                };
            var wap = new string[] { "wap/CBannerPart.js", "wap/CGoodsListItemPart.js", "wap/CHomeBottomPart.js", "wap/CStoreHomeBottomPart.js", "wap/CStoreHomeContentPart.js", "wap/CStoreHomeTopPart.js" };
            var container = new string[] { "container/WaitingBox.js", "container/PageContainer.js", "container/Page.js" };
            var tempalte = new string[] { "template/Component.js", "template/TWap.js", "template/eBiz/wap/TFrameWap.js", "template/eBiz/wap/TActivateHomeWap.js", "template/eBiz/wap/THomeWap.js", "template/eBiz/wap/TPersonalWap.js", "template/eBiz/wap/TMerchWap.js", "template/eBiz/wap/TGoodsDetailWap.js" };



            var list = new List<string>();

            list.AddRange(redjs);
            list.AddRange(data);
            list.AddRange(common);
            //list.AddRange(control);
            list.AddRange(wap);
            //list.AddRange(container);
            list.AddRange(tempalte);

            var list_v = new List<string>();
            foreach (var js in list)
            {
                list_v.Add(sourceHost + "/" + js.Trim() + "?v=" + version + "&t=" + releaseTime);
            }

            return list_v.ToArray();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sourceHost"></param>
        /// <param name="version"></param>
        /// <param name="releaseTime"></param>
        /// <returns></returns>
        public virtual string[] GetRedjsWxApp(string sourceHost, string version, string releaseTime)
        {
            var wxapp_js = new string[] { "config.js", "wxApp/Rsd.js","wxApp/Adapter.js" };//, "Redjs.js"
                                                                     //以下 类型 无法在小程序环境下定义
                                                                     //var common = new string[] { "common/Object.js", "common/Lang.js", "common/Layouter.js", "data/Logger.js" ,"common/EventList.js", "common/Application.js", "common/Svg.js", "common/ComponentX.js" };
                                                                     // var data = new string[] { "data/Ajax.js", "data/Cache.js", "data/EnumItem.js", "data/Enum.js", "data/File.js", "data/Json.js", "data/Menu.js", "data/Schema.js", "data/Service.js", "data/Store.js", "data/WebSocket.js" };
             
            var list_v = new List<string>();

            foreach (var js in wxapp_js)
            {
                list_v.Add(sourceHost + "/" + js.Trim() + "?v=" + version + "&t=" + releaseTime);
            }

            return list_v.ToArray();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="pathPrefix"></param>
        /// <param name="defaultIndex"></param>
        /// <returns></returns>
        public string GetRequestPath(HttpRequest request)
        {
            string pathPrefix = "";
            string defaultIndex = "";
            var url = "";
            var site = this.GetSourceSite(request);
            if (site != null)
            {
                pathPrefix = site.PathPrefix;
                defaultIndex = site.DefaultIndex;
            }
            if (!string.IsNullOrEmpty(request.Path))
            {
                if (!string.IsNullOrEmpty(request.RawUrl))
                {
                    url = request.RawUrl.TrimStart('/');
                }
                if (string.IsNullOrEmpty(url) && !string.IsNullOrEmpty(request.Path))
                {
                    url = request.Path.TrimStart('/');
                }
            }
            else
            {
                url = request.QueryString.ToString();
            }

            url = System.Web.HttpUtility.UrlDecode(url, System.Text.Encoding.UTF8);

            if (StringHelper.IsBase64(url))
            {
                var enService = ServicesContainer.GetService<Rsd.Dudu.Core.IEncryptService>(null);
                url = enService.DecodeBase64(url);
            }

            url = url.Trim('/');
            url = url.Substring(pathPrefix == null ? 0 : pathPrefix.Length);

            // 返回默认首页
            if (string.IsNullOrWhiteSpace(url) || string.IsNullOrEmpty(url))
            {
                url = (defaultIndex == null ? "" : defaultIndex);
            }

            return url;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override dynamic GetMonitorInfo()
        {
            throw new NotImplementedException();
        }

       
    }
}