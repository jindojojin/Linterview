using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
// save all setting of this application
// the setting would be changed if admin (from server) require

namespace LinterViewTrack.Template
{
    class SETTING
    {
        public static SETTING Instance = new SETTING();
        private SETTING() { }

        public  int TIME_TO_RECHECK { get; set; }
        public int TIME_TO_RECONNECT { get; set; }
        public int TIME_TO_SEND_ALIVE_SIGNAL { get; set; }
        public string ServerUri { get; set; }
        public bool FLAG_IS_IN_DEBUG_MODE { get; set; }
        public string GetDarkListUri { get; set; }
        public string SignUpUri { get; set; }  
        public string SnitchUri { get; set; } // uri to send post request allow server see user's browsing banned website
        public string AliveUri { get; set; }  // uri to send get request allow server know client is fine :)
        public string REGISTER_SETUP_NAME { get; set; } // where to get setup infomation when startup
    }
}
