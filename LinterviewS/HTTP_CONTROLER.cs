using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinterviewS.Template;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Threading;

namespace LinterviewS
{
    class HTTP_CONTROLER
    {
        public async Task<string> SendPOST(object Object, string uri)
        {
            using (var client = new HttpClient())
            {
                // send "i am alive" signal and get the data setting
                try
                {
                    client.BaseAddress = new Uri(SETTING.Instance.ServerUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var content = new StringContent(JsonConvert.SerializeObject(Object), Encoding.UTF8, "application/json");
                    HttpResponseMessage res = await client.PostAsync(uri, content);
                    if (res.IsSuccessStatusCode)
                    {
                        GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = false;
                        string x = await res.Content.ReadAsStringAsync();
                        return x;
                    }
                    else
                    {
                        GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = false;
                        return res.StatusCode.ToString();
                    }
                    
                }
                catch (Exception e)
                {
                    if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("Connection lost! sleep. Reconnect after " + SETTING.Instance.TIME_TO_RECONNECT + " milisecond");
                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = true;
                    return "";
                }
            }
        }

        public async Task<string> sendGET(string uri)
        {
            using (var client = new HttpClient())
            {
                // send "i am alive" signal and get the data setting
                try
                {
                    client.BaseAddress = new Uri(SETTING.Instance.ServerUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage res = await client.GetAsync(uri);
                    if (res.IsSuccessStatusCode)
                    {
                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = false;
                        string x = await res.Content.ReadAsStringAsync();
                        return x;
                    }
                    else
                    {
                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = false;
                        return res.StatusCode.ToString();
                    }
                }
                catch (Exception e)
                {
                    if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("Connection lost! sleep. Reconnect after " + SETTING.Instance.TIME_TO_RECONNECT + " milisecond");
                    GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = true;
                    Thread.Sleep(SETTING.Instance.TIME_TO_RECONNECT);
                    return "";
                }
            }
        }
    }
}
