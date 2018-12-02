import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { setCookie } from '../_services/Cookies';
import { AuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  private user: SocialUser;
  private loggedIn: boolean;
  constructor(private userservice: UserService,private authService: AuthService) {
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password:new FormControl()
    })
   }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  login(){
    console.log(this.formLogin.value);
    this.userservice.login(this.formLogin.value).then(r=>{
      if(!r) window.alert("Tên đăng nhập hoặc mật khẩu không đúng!")
      else{
      setCookie("userID",r.userID,2);
      setCookie("tk",r.tk,2);
      setCookie("name",r.name,2);
      window.location.reload();
      }
    }).catch(e=>{
      window.alert("Tên đăng nhập hoặc mật khẩu không đúng!")
    })
  }

  signInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>{
      // console.log(r.idToken);
      this.userservice.loginWithGoole({t:res.idToken}).then(r=>{
        console.log(r);
        setCookie("userID",r.userID,2);
        setCookie("tk",r.tk,2);
        setCookie("name",r.name,2);
        window.location.reload();
      }).catch(e=>{
        window.alert("Tên đăng nhập hoặc mật khẩu không đúng!")
      })
    }).catch(err=> window.alert("Đăng nhập bằng google không thành công :( !"));
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  
  // signInWithLinkedIn(): void {
  //   this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  // }  

  signOut(): void {
    this.authService.signOut();
  }


}
