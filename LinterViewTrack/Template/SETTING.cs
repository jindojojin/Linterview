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
        public bool FLAG_CONNECTION_LOST { get; set; }
        public bool FLAG_IS_IN_DEBUG_MODE { get; set; }
    }
}
