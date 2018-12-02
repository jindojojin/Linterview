import { Component, OnInit } from '@angular/core';
import { getCookie } from '../_services/Cookies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
admincode;
  constructor() {
    this.admincode = getCookie("userID");
   }

  ngOnInit() {
  }

}
