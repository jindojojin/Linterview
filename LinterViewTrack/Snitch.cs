using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinterViewTrack.Template;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Threading;
// this class use to send the website name which browsed by user and be in the banned List
namespace LinterViewTrack
{
    class Snitch
    {
        public Snitch()
        {  
        }

        public async void snitch(WebSite webSite)
        {
            //try to resend if server is off but not over 3 times
            for (int i = 0; i < 3; i++)
            {
                Violation vio = new Violation();
                vio.userID = GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID;
                vio.webSite = webSite;
                string x = await new HTTP_CONTROLER().SendPOST(vio, SETTING.Instance.SnitchUri);
                //sendPOST(website).Wait();                    
                //break;
                if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(x);

                if (x != "") {
                    if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(x);
                    if (x == "Unauthorized")
                    {
                        continue; // no problem with network, retry
                    }
                    else return;  // success
                }
                else Thread.Sleep(SETTING.Instance.TIME_TO_RECONNECT);
            }
        }
    }
}
