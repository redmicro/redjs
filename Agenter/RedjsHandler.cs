
using Rsd.Dudu;
using Rsd.Dudu.Helpers;
using Rsd.Dudu.Web;
using Rsd.Dudu.Web.Core;
using Rsd.Dudu.Web.Script;
using System;
using System.Collections.Generic;
using System.Web;

namespace Rsd.Redjs.Agent
{
    public class RedjsHandler : Rsd.Dudu.Web.Controllers.UIController
    {

        static RedjsHandler()
        {
            ServicesContainer.RegistCode("redjs".PadRight(40,'s'),"","");
            var host = System.Web.Configuration.WebConfigurationManager.AppSettings["sourceHost"]; ;
             //host = "http://221.226.117.23:8080/";
            ServicesContainer.AddService(new WebUIService(host, "", "index.html"));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="uiService"></param>
        /// <param name="url"></param>
        protected override void DoUrlRequest(IWebUIService uiService, string url)
        {
            uiService.RedjsPathMap(this.Context, uiService.SourceHost, url,"",false);
            
        }
       
        
    }
}
