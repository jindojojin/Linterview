import { Component, OnInit } from '@angular/core';
import { getCookie, deleteAllCookies } from './_services/Cookies';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-angular';
  name;
  constructor(private athservice : AuthService,private route: Router){
    this.name = getCookie("name");
  }
  ngOnInit() {
  }
  logout(){
    this.athservice.signOut();
    deleteAllCookies();
    window.location.reload();
    this.route.navigate(['Dashboard'])
  }
}
