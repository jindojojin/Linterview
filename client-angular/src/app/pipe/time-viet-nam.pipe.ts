import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeVietNam'
})
export class TimeVietNamPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value).toLocaleString();
  }

}
