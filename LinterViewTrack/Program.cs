using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Threading;
using LinterViewTrack.Template;
using Microsoft.Win32;

namespace LinterViewTrack
{
    class Program
    {
        static bool isNewSession;
        static void Main(string[] args)
        {
            isNewSession = true;
            setupApplication();
            //start check signup info , if signuped => run else signup
            checkAndWriteRegisterKey();
            if (GLOBAL_INSTANCE.Instance.FLAG_SIGNUP_CANCLED) return;
            //end signup

            GhostMan gm = new GhostMan();//theo doi dns
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
            string x = await new HTTP_CONTROLER().sendGET(SETTING.Instance.AliveUri+GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID);
            if(x != "" && x!="Unauthorized") 
            {
                if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(x);
                if (x == "1" || isNewSession) //have updated or have not got DarkList yet (cause restart)
                {                    
                    try
                    {
                        string list = await new HTTP_CONTROLER().sendGET(SETTING.Instance.GetDarkListUri + GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ADMIN+"/"+GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID);
                        if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(list);
                        BannedSites a = JsonConvert.DeserializeObject<BannedSites>(list);
                        GLOBAL_INSTANCE.Instance.DARKLIST = a.listBanned;
                        isNewSession = false;
                    }
                    catch (Exception e)
                    {
                        if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(e);
                    }
                }
            }
            else
            {
                if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("Ha ha lỗi rồi");
            }
           
        }

        static void setupApplication()
        {
            SETTING.Instance.ServerUri = "http://localhost:3000/";
            SETTING.Instance.TIME_TO_RECHECK = 5000;
            SETTING.Instance.TIME_TO_RECONNECT = 10000;
            SETTING.Instance.TIME_TO_SEND_ALIVE_SIGNAL = 5000;
            SETTING.Instance.SnitchUri = "/iamsorry";
            SETTING.Instance.AliveUri = "/iamalive/";
            SETTING.Instance.SignUpUri = "/signupTrack";
            SETTING.Instance.GetDarkListUri = "/listWebsiteBanned/";
            SETTING.Instance.REGISTER_SETUP_NAME = "LINTERVIEW_SS";
            SETTING.Instance.FLAG_IS_IN_DEBUG_MODE = true;
            //if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("");
            
        }

        static void checkAndWriteRegisterKey()
        {   //get all register at currentUser         
            string[] RegisterValue = Registry.CurrentUser.GetSubKeyNames();
            // check for setup already in register
            foreach(string name in RegisterValue)
            {
                if(name == SETTING.Instance.REGISTER_SETUP_NAME)
                {
                    RegistryKey reg = Registry.CurrentUser.OpenSubKey(SETTING.Instance.REGISTER_SETUP_NAME);
                    GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID= reg.GetValue("hkeynopar").ToString();
                    GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ADMIN = reg.GetValue("adhkeynopar").ToString();
                    return;
                }
            }
            SignUpForm registerForm = new SignUpForm();
            registerForm.ShowDialog();
        }
    }
}
