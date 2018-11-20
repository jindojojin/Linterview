using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Threading;
using LinterViewTrack.Template;
using System.Collections.Generic;

namespace LinterViewTrack
{
    class Program
    {
        static void Main(string[] args)
        {
            setupApplication();
            GhostMan gm = new GhostMan();
            Thread follow = new Thread(gm.run);
            GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = true;
            follow.Start();
            while (true)
            {
                GetAlive().Wait();
                Thread.Sleep(SETTING.Instance.TIME_TO_SEND_ALIVE_SIGNAL);
            }
        }

        static async Task GetAlive()
        {
            using (var client = new HttpClient())
            {
                // send "i am alive" signal and get the data setting
                try
                {
                    client.BaseAddress = new Uri(SETTING.Instance.ServerUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage res = await client.GetAsync(SETTING.Instance.AliveUri);
                    if (res.IsSuccessStatusCode)
                    {
                        string x = await res.Content.ReadAsStringAsync();
                        BannedSites a = JsonConvert.DeserializeObject<BannedSites>(x);
                        //List<string> list = new List<string>();
                        GLOBAL_INSTANCE.Instance.DARKLIST = a.listBanned;
                    }
                    else
                    {

                    }
                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = false;
                }
                catch (Exception e)
                {
                    if(SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("Connection lost! sleep. Reconnect after "+SETTING.Instance.TIME_TO_RECONNECT+" milisecond");
                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = true;
                    Thread.Sleep(SETTING.Instance.TIME_TO_RECONNECT);
                }
            }
        }

        static void setupApplication()
        {
            SETTING.Instance.ServerUri = "http://localhost:3000/";
            SETTING.Instance.TIME_TO_RECHECK = 5000;
            SETTING.Instance.TIME_TO_RECONNECT = 10000;
            SETTING.Instance.TIME_TO_SEND_ALIVE_SIGNAL = 5000;
            SETTING.Instance.SnitchUri = "/iamsorry";
            SETTING.Instance.AliveUri = "/iamalive";
            SETTING.Instance.FLAG_IS_IN_DEBUG_MODE = true;
            //if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("");
        }
    }
}
