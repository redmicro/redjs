
using Rsd.Dudu;
using Rsd.Dudu.UI.Script;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rsd.Redjs.Agenter
{
    /// <summary>
    /// redjs 框架 配置项
    /// 在C# 环境中，执行 config.js脚本
    /// </summary>
   public class RedjsConfig
    {

        /// <summary>
        /// 
        /// </summary>
        public string Version { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime ReleaseTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CopyRight { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Script { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="script"></param>
        public RedjsConfig(string script)
        {
            this.Script = script;

            //执行js 脚本，获取版本号 和 发布时间
            using (ScriptEngine engine = new ScriptEngine("jscript"))
            {
                var _c = engine.Eval(script);
                ParsedScript _v_parsed = engine.Parse("function getVersion(){var _c = new Config(); return  _c.version ;}");

                var _v = _v_parsed.CallMethod("getVersion");

                ParsedScript _t_parsed = engine.Parse("function getTime(){var _c = new Config(); return  _c.releaseTime ;}");

                var _t = _t_parsed.CallMethod("getTime");

                this.Version = _v.ToString();

                this.ReleaseTime = _t.ToString().ConvertTo<DateTime>(); ;
            }
        }
    }
}
