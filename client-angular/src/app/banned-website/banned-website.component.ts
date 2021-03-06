import { Component, OnInit } from '@angular/core';
import { AdminManagerService } from '../_services/admin-manager.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-banned-website',
  templateUrl: './banned-website.component.html',
  styleUrls: ['./banned-website.component.css']
})
export class BannedWebsiteComponent implements OnInit {

  constructor(private admin_service:AdminManagerService,private spiner: Ng4LoadingSpinnerService) {
    this.spiner.show();
  }
  listWebs=[];
  ngOnInit() {
    this.spiner.show();
    this.admin_service.getListWeb().then(r=>{
      console.log(r);
      if(r!=null) this.listWebs = r;
      this.spiner.hide();
    }).catch(e=> console.log(e))
  }
  deleteRow(i){
    console.log(i);
    this.listWebs.splice(i,1);
    // this.ngOnInit();
  }
  addRow(i){
    let name = document.getElementById("name_ip") as HTMLInputElement;
    let url = document.getElementById("url_ip") as HTMLInputElement;
    if(url.value!="" && name.value!="") this.listWebs.push({"name":name.value,"url":url.value});
    else{
      window.alert("Thông tin không hợp lệ!");
    }
    name.value="";
    url.value=""
  }

  submitNewList(){
    this.spiner.show();
    this.admin_service.updateListWeb({list:this.listWebs}).then(r=>{
      console.log(r);
      this.spiner.hide();
      window.alert("Cập nhập thành công");}).catch(e=>window.alert("Hệ thống đã xảy ra sự cố, hãy thử lại!"))
  }

}
