import { Component, OnInit } from '@angular/core';
import { getCookie, deleteAllCookies } from './_services/Cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-angular';
  name;
  constructor(){
    this.name = getCookie("name");
  }
  ngOnInit() {
  }
  logout(){
    deleteAllCookies();
    window.location.reload();
  }
}
