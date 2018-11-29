import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText'
})
export class LimitTextPipe implements PipeTransform {
  maxlength=10;

  transform(value: any, length?: number): any {
    this.maxlength = length;
    if(value == null) return null;
    return (value.length > this.maxlength)?(value.substring(0,this.maxlength)+"..."):value;
  }

}
