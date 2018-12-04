using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using LinterviewS.Template;
using System.Threading;
using Newtonsoft.Json;
using Microsoft.Win32;
using System.Timers;


namespace LinterviewS
{
    public partial class Service1 : ServiceBase
    {
        protected bool isNewSession;
        public Service1()
        {
            InitializeComponent();
        }
        public void OnDebug()
        {
            OnStart(null);
        }
        protected override void OnStart(string[] args)
        {
            try
            {
                Thread init = new Thread(startApp);
                init.Start();

                //GhostMan gm = new GhostMan();//theo doi dns
                //Thread follow = new Thread(gm.run);
                //GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = true;
                //follow.Start();
                
            }catch(Exception e)
            {
                EventLog.WriteEntry(e.ToString(), EventLogEntryType.Information);
            }

        }

        private void startApp()
        {
            isNewSession = true;
            setupApplication();
            //start check signup info , if signuped => run else signup
            checkAndWriteRegisterKey();
            if (GLOBAL_INSTANCE.Instance.FLAG_SIGNUP_CANCLED) this.Stop();
            //end signup
            System.Timers.Timer _timer = new System.Timers.Timer(SETTING.Instance.TIME_TO_SEND_ALIVE_SIGNAL);
            _timer.Elapsed += new ElapsedEventHandler(alive);
            _timer.Start();
            //System.IO.File.Create(AppDomain.CurrentDomain.BaseDirectory + "Onstart.txt");

        }

        private void alive(object sender, ElapsedEventArgs e)
        {
            //System.IO.File.Create(AppDomain.CurrentDomain.BaseDirectory + "Onwhile.txt");
            GetAlive().Wait();
        }

        protected async Task GetAlive()
        {

            string x = await new HTTP_CONTROLER().sendGET(SETTING.Instance.AliveUri + GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID);
            if (x != "" && x != "Unauthorized")
            {
                if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(x);
                if (x == "1" || isNewSession) //have updated or have not got DarkList yet (cause restart)
                {
                    try
                    {
                        string list = await new HTTP_CONTROLER().sendGET(SETTING.Instance.GetDarkListUri + GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ADMIN + "/" + GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID);
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

        protected void setupApplication()
        {
            SETTING.Instance.ServerUri = "https://linterview.herokuapp.com/";
            SETTING.Instance.TIME_TO_RECHECK = 10000;
            SETTING.Instance.TIME_TO_RECONNECT = 5000;
            SETTING.Instance.TIME_TO_SEND_ALIVE_SIGNAL = 10000;
            SETTING.Instance.SnitchUri = "/iamsorry";
            SETTING.Instance.AliveUri = "/iamalive/";
            SETTING.Instance.SignUpUri = "/signupTrack";
            SETTING.Instance.GetDarkListUri = "/listWebsiteBanned/";
            SETTING.Instance.I_AM_DEAD = "/iamdead/";
            SETTING.Instance.REGISTER_SETUP_NAME = "NLOLPLALRLTLY";
            SETTING.Instance.REGISTER_USER_ADMIN_KEY = "adhkeynopar";
            SETTING.Instance.REGISTER_USER_ID_KEY = "hkeynopar";
            SETTING.Instance.FLAG_IS_IN_DEBUG_MODE = false;
            //if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine("");

        }

        protected void checkAndWriteRegisterKey()
        {   //get all register at currentUser         
            string[] RegisterValue = Registry.CurrentUser.GetSubKeyNames();
            // check for setup already in register
            foreach (string name in RegisterValue)
            {
                if (name == SETTING.Instance.REGISTER_SETUP_NAME)
                {
                    RegistryKey reg = Registry.CurrentUser.OpenSubKey(SETTING.Instance.REGISTER_SETUP_NAME);
                    GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID = reg.GetValue(SETTING.Instance.REGISTER_USER_ID_KEY).ToString();
                    GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ADMIN = reg.GetValue(SETTING.Instance.REGISTER_USER_ADMIN_KEY).ToString();
                    return;
                }
            }
            SignUpForm registerForm = new SignUpForm();
            registerForm.ShowDialog();
        }

        protected override void OnStop()
        {
            DEAD().Wait();
        }

        protected override void OnShutdown()
        {
            DEAD().Wait();
        }

        async Task DEAD()
        {

            await new HTTP_CONTROLER().sendGET(SETTING.Instance.I_AM_DEAD + GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID);
           // No idea in here, i only send status to Server
        }
    }
}
