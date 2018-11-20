using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Diagnostics;
using LinterViewTrack.Template;
// this class used to get information of user's web surfing
namespace LinterViewTrack
{
    class GhostMan
    {
        public GhostMan()
        {
            //Console.WriteLine("Ghost man working!");
        }
        public void run()
        {
            while (true)
            {
                if (GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST == true)
                {
                    Thread.Sleep(SETTING.Instance.TIME_TO_RECONNECT);
                }
                else
                {
                    this.getDNS();
                }
                Thread.Sleep(SETTING.Instance.TIME_TO_RECHECK);
            }
        }
        private void getDNS()
        {
            if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE)  Console.WriteLine("getting dns");
            Process p = new Process();
            p.StartInfo.FileName = "ipconfig";
            p.StartInfo.Arguments = "/displaydns";
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.CreateNoWindow = true;
            p.StartInfo.RedirectStandardError = true;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.RedirectStandardInput = false;
            p.Start();
            p.WaitForExit(2000);
            string output = p.StandardOutput.ReadToEnd();
            if (output == null || output == "") return;
            if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE)  Console.WriteLine("get dns done !");
            if (isTransgressing(output))
            {
                Process p2 = new Process();
                p2.StartInfo.FileName = "ipconfig";
                p2.StartInfo.Arguments = "/flushdns";
                p2.StartInfo.UseShellExecute = false;
                p2.StartInfo.CreateNoWindow = true;
                p2.StartInfo.RedirectStandardError = false;
                p2.StartInfo.RedirectStandardOutput = false;
                p2.StartInfo.RedirectStandardInput = false;
                p2.Start();
                p2.WaitForExit(5000);
            }
            //}
        }

        private bool isTransgressing(string dnscache)
        {
            bool flag = false;
            foreach( WebSite a in GLOBAL_INSTANCE.Instance.DARKLIST)
            {
                if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("Kiem tra "+ a.url);
                if (dnscache.Contains(a.url)){
                    if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE)  Console.WriteLine("vi pham: " + a.name);
                    if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("call to snitch");
                    new Snitch(a);
                    flag = true;
                }
            }
            return flag;
        }
    }
}
