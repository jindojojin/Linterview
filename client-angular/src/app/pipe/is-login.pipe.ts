import { Pipe, PipeTransform } from '@angular/core';
import { getCookie } from '../_services/Cookies';

@Pipe({
  name: 'isLogin'
})
export class IsLoginPipe implements PipeTransform {

  transform(): boolean {
    return (getCookie("userID") != null);
  }

}
