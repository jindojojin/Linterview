import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { setCookie } from '../_services/Cookies';
import { AuthService,SocialUser } from "angularx-social-login";
import { GoogleLoginProvider} from "angularx-social-login";
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(private userservice: UserService,private authService: AuthService,private route: Router,private spiner: Ng4LoadingSpinnerService) {
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password:new FormControl()
    })
   }

  ngOnInit() {
  }

  login(){
    console.log(this.formLogin.value);
    this.spiner.show();
    this.userservice.login(this.formLogin.value).then(r=>{
      if(!r) window.alert("Tên đăng nhập hoặc mật khẩu không đúng!")
      else{
      setCookie("userID",r.userID,2);
      setCookie("tk",r.tk,2);
      setCookie("name",r.name,2);
      window.location.reload();
      this.route.navigate(['Dashboard']);
      }
    }).catch(e=>{
      window.alert("Tên đăng nhập hoặc mật khẩu không đúng!")
    })
    this.spiner.hide();
  }

  signInWithGoogle(){
    this.spiner.show();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>{
      // console.log(r.idToken);
      this.userservice.loginWithGoole({t:res.idToken}).then(r=>{
        if(r.tk == undefined) {
          this.spiner.hide();
          window.alert("Đăng nhập bằng google không thành công :( !");
          return;
        }
        console.log(r);
        setCookie("userID",r.userID,2);
        setCookie("tk",r.tk,2);
        setCookie("name",r.name,2);
        window.location.reload();
        this.route.navigate(['Dashboard']);
      }).catch(e=>{
        window.alert("Máy chủ không phản hồi!")
      })
    }).catch(err=> window.alert("Đăng nhập bằng google không thành công :( !"));
    this.spiner.hide();
  }

}
