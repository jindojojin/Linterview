import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { getCookie, setCookie, getCookieObject } from './Cookies';
import { myWebsiteDomain } from './config';
@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {

  constructor(private http: Http) { 
    console.log(getCookieObject());
  }
  getComputers() {
    var url = myWebsiteDomain + '/admin/listComputers';
    return this.http.post(url,getCookieObject(),{ withCredentials: true })
      .toPromise()
      .then(res => {
        return res.json()
      }).catch(e => false);
  }

  getOverView(data) {
    let body = getCookieObject();
      body.data=data;
    if (data.mode == 'computer') {
      var url = myWebsiteDomain + '/admin/overviewByUser';
      return this.http.post(url, body, { withCredentials: true })
        .toPromise()
        .then(res => {
          return res.json()
        }).catch(e => false);
    }
    if (data.mode == 'website') {
      var url = myWebsiteDomain + '/admin/overviewByWebsite';
      return this.http.post(url, body, { withCredentials: true })
        .toPromise()
        .then(res => {
          return res.json()
        }).catch(e => false);
    }
  }

  getListWeb() {
    var url = myWebsiteDomain + '/admin/listWebsite';
      return this.http.post(url,getCookieObject(), { withCredentials: true })
        .toPromise()
        .then(res => {
          return res.json()
        }).catch(e => false);
  }

  updateListWeb(listweb){
    let body = getCookieObject();
      body.data=listweb;
    var url = myWebsiteDomain + '/admin/listWebsite';
      return this.http.put(url,body,{ withCredentials: true })
        .toPromise()
        .then(res => {
          return res.json()
        }).catch(e => false);
  }

  getComputerInfo(computerID,firstID){
    var url = myWebsiteDomain + '/admin/computerInfo/'+computerID+"/"+firstID+"/20";
      return this.http.post(url,getCookieObject(),{ withCredentials: true })
        .toPromise()
        .then(res => {
          return res.json()
        }).catch(e => {console.log(e);return false});
  }
}
