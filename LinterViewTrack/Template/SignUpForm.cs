using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using Newtonsoft.Json;
using System.Windows.Forms;
using Microsoft.Win32;

namespace LinterViewTrack.Template
{
    public partial class SignUpForm : Form
    {
        private string computerName_s;
        private string adminCode_s;
        public SignUpForm()
        {
            InitializeComponent();
            Control.CheckForIllegalCrossThreadCalls = false;
        }

        private void Regis_btn_Click(object sender, EventArgs e)
        {
            this.adminCode_s = this.adminCode.Text;
            this.computerName_s = this.this_computer_name.Text;
            if (adminCode_s == "") { this.status_label.Text = "ADMIN CODE không hợp lệ !"; return; }
            if (computerName_s == "") { this.status_label.Text = "Tên người sử dụng không hợp lệ !"; return; }
            this.status_label.Text = "Đang kết nối tới Server ........";
            GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST = false;
            ThreadStart ts = new ThreadStart(SignUP);
            Thread s = new Thread(ts);
            s.Start();
            //SignUP(adminCode, computerName);

        }

        private void Cancel_btn_Click(object sender, EventArgs e)
        {
            GLOBAL_INSTANCE.Instance.FLAG_SIGNUP_CANCLED = true;
            if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(GLOBAL_INSTANCE.Instance.FLAG_SIGNUP_CANCLED);
        }

        private async void SignUP ()
        {
            //try to resend if server is off but not over 3 times
            for (int i = 0; i < 3; i++)
            {
                //if (GLOBAL_INSTANCE.Instance.FLAG_CONNECTION_LOST == false)
                //{
                    SignUpInfo info = new SignUpInfo();
                    info.adminCode = this.adminCode_s;
                    info.computerName =this.computerName_s;
                    string newid = await new HTTP_CONTROLER().SendPOST(info,SETTING.Instance.SignUpUri);
                    if (newid != "")
                    {
                        if( newid == "Unauthorized")
                        {
                            this.status_label.Text = "ADMIN CODE không tồn tại trên hệ thống, vui lòng kiểm tra lại!";
                            return;
                        }
                        this.status_label.Text = "Đăng kí thành công! Xin chờ giây lát ....";
                        //ghi thông tin id vào register
                        RegistryKey LinterviewRegistryKey = Registry.CurrentUser.CreateSubKey(SETTING.Instance.REGISTER_SETUP_NAME);
                        LinterviewRegistryKey.SetValue(SETTING.Instance.REGISTER_USER_ID_KEY, newid);
                    GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ID = newid;
                        LinterviewRegistryKey.SetValue(SETTING.Instance.REGISTER_USER_ADMIN_KEY, this.adminCode_s);
                    GLOBAL_INSTANCE.Instance.THIS_COMPUTER_ADMIN = this.adminCode_s;
                        LinterviewRegistryKey.Close();
                    this.Close();
                    return;
                    }
                    else
                    {
                    this.status_label.Text = "Lỗi mạng hoặc Server không phản hồi. Đang đợi kết nối lại ......";
                    Thread.Sleep(SETTING.Instance.TIME_TO_RECONNECT);
                    this.status_label.Text = "Đang thử lại lần thứ " + (i+1) + ".....";
                    }
                    //if (SETTING.Instance.FLAG_IS_IN_DEBUG_MODE) Console.WriteLine(newid);
                    
                //}                
            }
            for(int i=5; i>=0; i--)
            {
                Thread.Sleep(1000);
                this.status_label.Text = "Không thể đăng ký, Thoát ứng dụng sau " + i + "(s)";                
            }
            this.CancelButton.PerformClick();            
        }
    }
}
