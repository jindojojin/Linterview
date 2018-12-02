import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { myWebsiteDomain } from '../config';
import { deleteAllCookies } from './Cookies';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }
  login(form) {
    return this.http.post(myWebsiteDomain + "/admin/login", form)
      .toPromise()
      .then(res => {
        if (res.status = 201)
          return res.json();
        else return false;
      }).catch(e => false);
  }

  register(form) {
    return this.http.post(myWebsiteDomain + "/admin/register", form)
      .toPromise()
      .then(res => {
        console.log(res)
        return true;
      }).catch(e => { console.log(e) });
  }

  loginWithGoole(tkobject){
    return this.http.post(myWebsiteDomain+'/admin/loginGoogle',tkobject)
    .toPromise()
      .then(res => {
        console.log(res);
        return res.json();
      }).catch(e => { return e });
  }
}
