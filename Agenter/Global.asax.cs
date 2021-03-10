using Rsd.Dudu;
using Rsd.Dudu.Log;
using Rsd.Dudu.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace Rsd.Redjs.Agenter
{
    public class Global : System.Web.HttpApplication
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Application_Start(object sender, EventArgs e)
        {
            string appId = "52cf3e6e-25df-4dd7-a7a1-db8a7718c3b0";
            string appKey = "81a452a9-ca88-11ea-bc97-1418772e9399";
            var code = @"CEd7yntcMdP81/6DRwpK6gj1bAvjmA38hRJOnrWUCboX4vDCcyOS9XdseEYDn9qw\r\nVADhu9q37gJdD8mKWQ6PfMeFPoB9pP6eJakLAjfiLz0=";
            var expireAt = ServicesContainer.RegistCode(appId, appKey, code);

            var host = System.Web.Configuration.WebConfigurationManager.AppSettings["sourceHost"]; 
             
            WebApplication.Initial(this,()=>{

                 WebApplication.LoadPlugins(Rsd.Dudu.UI.Config.GetConfig(null, Dudu.UI.Core.UILogLevelTypes.All,null));

                 ServicesContainer.AddService(new FileLogService(), new RedjsUIService(), new RedjsGetFilesService(host)); 
            });
          
            
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}