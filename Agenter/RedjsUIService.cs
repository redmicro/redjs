using Rsd.Dudu;
using Rsd.Dudu.Core;
using Rsd.Dudu.UI.Core;
using Rsd.Dudu.UI.Services;
using Rsd.Dudu.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Rsd.Redjs.Agenter
{
    /// <summary>
    /// 
    /// </summary>
    public sealed class RedjsUIService : BaseUIService, IWebUIService
    {

        /// <summary>
        ///  Redjs 代码处理 并输出到浏览器
        /// </summary>
        /// <param name="context"></param>
        /// <param name="compress"></param>
        public void WebPathMap(HttpContext context, bool compress)
        {
            //域名 有效性验证

            //域名 和 uirlReferer 验证


            string url = context.Request.RawUrl;  //不含域名和端口
            //redjs 对外主站
            string _redjsHost = "//" + context.Request.Url.Host + "/";
             
            var _path = new[] { "plugin/" };
            if (_path == null)
            {
                _path = new string[] { };
            }

            bool _f_compress = true;
            foreach (var p in _path)
            {

                if (url.StartsWith(p))
                {
                    _f_compress = false;
                    break;
                }
            }

            var getFilesService = ServicesContainer.GetService<IGetUIFilesService>(new GetUIFilesService());
            var files = getFilesService.GetFiles(context.Request);

            context.Response.Cache.SetCacheability(HttpCacheability.Public);

            var file = context.Request.Path.ToLower();
            //js文件
            if (file.EndsWith(".js"))
            {
                context.Response.ContentType = "application/javascript";
 

                //压缩指定文件
                if (files.Length > 0)
                {
                    string _startTime = DateTime.Now.ToLongTimeStamp().ToString();


                    //小程序 
                    if (file.EndsWith("rsd-wxapp.js"))
                    {

                        if (url.Contains("?"))
                        {
                            context.Response.Cache.SetExpires(DateTime.Now.AddDays(30.0));
                            context.Response.Expires = 60 * 24 * 30;
                            context.Response.AddHeader("Last-Modified", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss ffffff"));
                        }
                        else
                        {
                            //不带版本参数，不缓存
                            context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                            context.Response.Cache.SetExpires(DateTime.Now);
                            context.Response.Expires = 0;
                        }

                        var js_list = this.CompressJs(context.Request.IsAjaxRequest(), _f_compress, files);
                        foreach (var js in js_list)
                        {
                            context.Response.Write(js.TrimEnd(';') + ";");
                        }

                        context.Response.Write("if(wx.rsd){module.exports=wx.rsd;}else{");
                        context.Response.Write("Rsd.__isAgentHost=true;");
                        context.Response.Write("Rsd.__buildStartTime=" + _startTime + ";");
                        context.Response.Write("Rsd.__loadStartTime= new Date().getTime();");

                        context.Response.Write("Rsd.getApp = getApp;");
                        context.Response.Write("wx.rsd = Rsd;");


                        context.Response.Write("Rsd.__buildEndTime=" + DateTime.Now.ToLongTimeStamp().ToString() + ";");
                        context.Response.Write("Rsd.__loadEndTime= new Date().getTime();");


                        //list_v.Clear();
                        //foreach (var js in wxAppEnd)//适配 
                        //{
                        //    list_v.Add(js.Trim() + "?v=" + version + "&t=" + releaseTime);
                        //}
                        //js_list = this.CompressJs(context.Request.IsAjaxRequest(), _f_compress, list_v.ToArray());
                        //foreach (var js in js_list)
                        //{
                        //    context.Response.Write(js.TrimEnd(';') + ";");
                        //}
                        context.Response.Write("module.exports=Rsd;}");
                        context.Response.End();
                        return;
                    }
                    if(file.EndsWith("rsd-all.js") || file.EndsWith("rsd-wap.js") || file.EndsWith("rsd-wap-mini.js") || file.EndsWith("rsd-min.js"))
                    {
                        if (url.Contains("?"))
                        {
                            context.Response.Cache.SetExpires(DateTime.Now.AddDays(30.0));
                            context.Response.Expires = 60 * 24 * 30;
                            context.Response.AddHeader("Last-Modified", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss ffffff"));
                        }
                        else
                        {
                            //不带版本参数，不缓存
                            context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                            context.Response.Cache.SetExpires(DateTime.Now);
                            context.Response.Expires = 0;
                        }


                        var js_list = this.CompressJs(context.Request.IsAjaxRequest(), _f_compress, files);

                        context.Response.Write("window.Rsd=window.Rsd||{};");
                        //授权APP验证
                        var appId = context.Request.QueryString["appid"];
                        //if (!string.IsNullOrEmpty(appId))
                        {
                            //输出头部脚本
                            context.Response.Write("window.Rsd.__isAgentHost=true;");
                            context.Response.Write("window.Rsd.__jsHomePath= '" + _redjsHost + "';");
                            context.Response.Write("window.Rsd.__appId= '" + appId + "';");
                            context.Response.Write("window.Rsd.__requestUrl='" + (context.Request.Url != null ? context.Request.Url.AbsoluteUri : "") + "';");
                            context.Response.Write("window.Rsd.__refererHost='" + (context.Request.UrlReferrer != null ? context.Request.UrlReferrer.AbsoluteUri : "") + "';");
                        }

                        context.Response.Write("window.Rsd.__buildStartTime=" + _startTime + ";");
                        context.Response.Write("window.Rsd.__loadStartTime= new Date().getTime();");

                        //输出文件组脚本
                        foreach (var js in js_list)
                        {
                            context.Response.Write(js.TrimEnd(';') + ";");
                        }
                        //输出尾部脚本
                        context.Response.Write("window.Rsd.__buildEndTime=" + DateTime.Now.ToLongTimeStamp().ToString() + ";");
                        context.Response.Write("window.Rsd.__loadEndTime= new Date().getTime();");

                        context.Response.End();
                        return;
                    }


                }

                //动态加载单个文件
                {
                    var js = this.CompressJs(context.Request.IsAjaxRequest(), _f_compress, files);
                    context.Response.Write(js[0]);
                    context.Response.End();
                    return;
                }

            }

            //css 文件
            if (file.EndsWith(".css"))
            {
                context.Response.ContentType = "text/css";
                var css = this.CompressCss(context.Request.IsAjaxRequest(), _f_compress, files);
                context.Response.Write(css[0]);

                context.Response.End();
                return;
            }

            var ext = this.GetPictureExt(file);
            if (!string.IsNullOrEmpty(ext))
            {
                byte[] bytes = this.RequestFileBytes(files[0]);
                if (bytes != null && bytes.Length != 0)
                {
                    context.Response.ContentType = "image/" + ext;
                    context.Response.BinaryWrite(bytes);
                }
                else
                {
                    context.Response.StatusCode = 404;
                }

                context.Response.End();
                return;
            }

            context.Response.ContentType = "text/html;charset=utf-8";
            var str = this.RequestFileContent(files[0]);
            context.Response.Write(str);

            context.Response.End();
            return;

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
