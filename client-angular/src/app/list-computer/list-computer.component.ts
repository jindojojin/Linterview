import { Component, OnInit } from '@angular/core';
import { AdminManagerService } from '../_services/admin-manager.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list-computer',
  templateUrl: './list-computer.component.html',
  styleUrls: ['./list-computer.component.css'],
})
export class ListComputerComponent implements OnInit {

  list_computers: any[] = [];
  constructor(private admin: AdminManagerService,private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.admin.getComputers().then(r => {
      console.log(r);
      this.list_computers = r;
    }
    ).catch(e => console.log(e))
    this.spinnerService.hide();
  }

  ngOnInit() {
  }
}