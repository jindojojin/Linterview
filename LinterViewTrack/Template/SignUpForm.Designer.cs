namespace LinterViewTrack.Template
{
    partial class SignUpForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.Regis_btn = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.adminCode = new System.Windows.Forms.TextBox();
            this.this_computer_name = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.Cancel_btn = new System.Windows.Forms.Button();
            this.status_label = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // Regis_btn
            // 
            this.Regis_btn.Location = new System.Drawing.Point(323, 202);
            this.Regis_btn.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.Regis_btn.Name = "Regis_btn";
            this.Regis_btn.Size = new System.Drawing.Size(113, 40);
            this.Regis_btn.TabIndex = 0;
            this.Regis_btn.Text = "Đăng kí";
            this.Regis_btn.UseVisualStyleBackColor = true;
            this.Regis_btn.Click += new System.EventHandler(this.Regis_btn_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(7, 13);
            this.label1.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(144, 29);
            this.label1.TabIndex = 1;
            this.label1.Text = "ADMIN CODE";
            // 
            // adminCode
            // 
            this.adminCode.Location = new System.Drawing.Point(11, 48);
            this.adminCode.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.adminCode.Name = "adminCode";
            this.adminCode.Size = new System.Drawing.Size(547, 36);
            this.adminCode.TabIndex = 3;
            // 
            // this_computer_name
            // 
            this.this_computer_name.Location = new System.Drawing.Point(11, 127);
            this.this_computer_name.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.this_computer_name.Name = "this_computer_name";
            this.this_computer_name.Size = new System.Drawing.Size(547, 36);
            this.this_computer_name.TabIndex = 5;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(7, 92);
            this.label2.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(285, 29);
            this.label2.TabIndex = 4;
            this.label2.Text = "Tên người dùng máy tính này";
            // 
            // Cancel_btn
            // 
            this.Cancel_btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Cancel_btn.Location = new System.Drawing.Point(446, 202);
            this.Cancel_btn.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.Cancel_btn.Name = "Cancel_btn";
            this.Cancel_btn.Size = new System.Drawing.Size(113, 40);
            this.Cancel_btn.TabIndex = 6;
            this.Cancel_btn.Text = "Thoát";
            this.Cancel_btn.UseVisualStyleBackColor = true;
            this.Cancel_btn.Click += new System.EventHandler(this.Cancel_btn_Click);
            // 
            // status_label
            // 
            this.status_label.AutoSize = true;
            this.status_label.ForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.status_label.Location = new System.Drawing.Point(12, 160);
            this.status_label.Name = "status_label";
            this.status_label.Size = new System.Drawing.Size(0, 29);
            this.status_label.TabIndex = 7;
            // 
            // SignUpForm
            // 
            this.AcceptButton = this.Regis_btn;
            this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 28F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.CancelButton = this.Cancel_btn;
            this.ClientSize = new System.Drawing.Size(565, 249);
            this.ControlBox = false;
            this.Controls.Add(this.status_label);
            this.Controls.Add(this.Cancel_btn);
            this.Controls.Add(this.this_computer_name);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.adminCode);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.Regis_btn);
            this.Cursor = System.Windows.Forms.Cursors.Default;
            this.Font = new System.Drawing.Font("Calibri Light", 13.8F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.Name = "SignUpForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Đăng kí thông tin";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button Regis_btn;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox adminCode;
        private System.Windows.Forms.TextBox this_computer_name;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button Cancel_btn;
        private System.Windows.Forms.Label status_label;
    }
}