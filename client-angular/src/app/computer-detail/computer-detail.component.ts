import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdminManagerService } from '../_services/admin-manager.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.css']
})
export class ComputerDetailComponent implements OnInit {
  violations=[];
  user={};
  computer_id:string;
  constructor(private route : ActivatedRoute, private ad_service: AdminManagerService,private spiner: Ng4LoadingSpinnerService) {
    this.spiner.show();    
    this.route.paramMap.subscribe((params:ParamMap)=>this.computer_id=params.get('id'))
  }

  ngOnInit() {
    console.log(this.computer_id);
    this.spiner.show();
    this.ad_service.getComputerInfo(this.computer_id,0).then(r=>{
      console.log(r);
      this.user=r.info;
      this.violations=r.violation;
    }); // lấy các vi phạm mới nhất
    this.spiner.hide();
  }

  loadMore(){
    let firstID = this.violations[this.violations.length-1]._id;
    this.spiner.show();
    this.ad_service.getComputerInfo(this.computer_id,firstID).then(r=>{
      console.log(r);
      this.user=r.info;
      this.violations=r.violation;
    }).catch(e=> console.log(e));
    this.spiner.hide();
  }
}
