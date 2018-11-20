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
        public Snitch(WebSite website)
        {
            //try to resend if server is off but not over 3 times
            for ( int i =0; i< 3; i++)
            {
                if (GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST == false)
                {
                    sendPOST(website).Wait();
                    break;
                }                    
                else Thread.Sleep(SETTING.Instance.TIME_TO_RECONNECT);
            }
            
        }

        private async Task sendPOST(WebSite webSite)
        {
            using (var client = new HttpClient())
            {
                // send "i am alive" signal and get the data setting
                try
                {
                    client.BaseAddress = new Uri(SETTING.Instance.ServerUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var content = new StringContent(JsonConvert.SerializeObject(webSite), Encoding.UTF8, "application/json");
                    HttpResponseMessage res = await client.PostAsync(SETTING.Instance.SnitchUri,content);
                    if (res.IsSuccessStatusCode)
                    {
                        if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("snitch sent message! =-------------------------------=");
                    }
                    else
                    {

                    }
                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = false;
                }
                catch (Exception e)
                {
                    if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("Connection lost! sleep. Reconnect after " + SETTING.Instance.TIME_TO_RECONNECT + " milisecond");

                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = true;
                    Thread.Sleep(SETTING.Instance.TIME_TO_RECONNECT);
                }
            }
        }
    }
}
