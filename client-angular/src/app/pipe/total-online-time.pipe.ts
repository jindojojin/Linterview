import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalOnlineTime'
})
export class TotalOnlineTimePipe implements PipeTransform {

  transform(value: any, date: any): any {
    let time = Math.round((value*5/3600)*100)/100 ;
    console.log(date);
    let avg = this.date_diff_indays(date);
    if(avg == 0) avg=1;
    return time + " tiếng  ( trung bình "+ Math.round((time/avg)*100)/100 +" tiếng/ngày)";
  }

  date_diff_indays(date1) {
    let dt1 = new Date(date1);
    let dt2 = new Date();
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

}
