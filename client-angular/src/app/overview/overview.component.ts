import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js'
import { log } from 'util';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminManagerService } from '../_services/admin-manager.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  chart = [];
  classForChart="col-9"; // show chart in full screen or right-side mode, find and check hideCustom() to understand
  showCustom=true;
  labels=[];
  datas=[];
  customForm : FormGroup;
  constructor(private admin_mngr : AdminManagerService, private spiner: Ng4LoadingSpinnerService) {
    this.customForm = new FormGroup({
      mode: new FormControl("computer"),
      time: new FormControl("today"),
      fromDate: new FormControl(new Date().toISOString().substr(0,10)),
      toDate: new FormControl(new Date(new Date().getTime()+(1000*24*60*60)).toISOString().substr(0,10))
    })
  }

  ngOnInit() {
    this.onSubmit();
    console.log(new Date().toISOString().substr(0,10));
  }

  onSubmit(){
    if(this.customForm.value.time == 'lastWeek') this.customForm.value.fromDate = new Date(new Date().getTime()-(1000*24*60*60*7)).toISOString().substr(0,10);
    if(this.customForm.value.time == 'lastMonth') this.customForm.value.fromDate = new Date(new Date().getTime()-(1000*24*60*60*30)).toISOString().substr(0,10);
    if(this.customForm.value.time == 'lastYear') this.customForm.value.fromDate = new Date(new Date().getTime()-(1000*24*60*60*365)).toISOString().substr(0,10);
    // console.log(this.customForm.value);
    this.spiner.show();
    this.admin_mngr.getOverView(this.customForm.value).then(r=>{
      console.log(r);
      this.datas =[];
      this.labels = [];
      r.forEach(element => {
        if(this.customForm.value.mode == "website") this.labels.push(element.name+"( "+element.url+")");
        else this.labels.push(element.name);
        this.datas.push(element.sum);
      });
      this.generateChart();
    }).catch(e=>console.log(e));
  }

  generateChart(){
    let div = document.getElementById('chartArea') as HTMLDivElement;
    div.innerHTML='<canvas id="chart">{{chart}}</canvas>';
    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# Số lần vi phạm',
          data: this.datas,
          fill: false,
          backgroundColor: "#00A01B",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.spiner.hide();
  }
}
