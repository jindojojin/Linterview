using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinterViewTrack.Template
{
    class GLOBAL_INSTANCE
    {
        public static GLOBAL_INSTANCE Instance = new GLOBAL_INSTANCE();
        private GLOBAL_INSTANCE() { }
        public List<WebSite> DARKLIST { get; set; }
        public bool FLAG_CONNECTION_LOST { get; set; }
        public bool FLAG_SIGNUP_CANCLED { get; set; }
        public string THIS_COMPUTER_ID { get; set; }
    }
}
