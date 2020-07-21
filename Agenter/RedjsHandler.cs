
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
            string appId = "52cf3e6e-25df-4dd7-a7a1-db8a7718c3b0";
            string appKey = "81a452a9-ca88-11ea-bc97-1418772e9399"; 
            var code = @"CEd7yntcMdP81/6DRwpK6gj1bAvjmA38hRJOnrWUCboX4vDCcyOS9XdseEYDn9qw\r\nVADhu9q37gJdD8mKWQ6PfMeFPoB9pP6eJakLAjfiLz0=";
            var expireAt = ServicesContainer.RegistCode(appId, appKey, code);
            var host = System.Web.Configuration.WebConfigurationManager.AppSettings["sourceHost"];
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
