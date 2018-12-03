import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(private userservice: UserService,private spiner: Ng4LoadingSpinnerService) { 
    this.formRegister= new FormGroup({
      username:new FormControl(),
      name:new FormControl(),
      password:new FormControl(),
      password2:new FormControl()
    })
  }

  ngOnInit() { };

  register(){
    // console.log(this.formRegister.value);
    this.spiner.show();
    this.userservice.register(this.formRegister.value).then(r=>{
      this.spiner.hide();
      console.log(r);
      if(!r) window.alert("Tài khoản với tên đăng nhập đã tồn tại!")
      else{
        window.alert("Đăng kí tài khoản mới thành công")
      }

    }).catch(e=>{
      window.alert("Mất kết nối với server!")
    })
  }

}
