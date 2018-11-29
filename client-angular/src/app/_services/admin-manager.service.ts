import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { getCookie, setCookie } from './Cookies';
import { myWebsiteDomain } from './config';
@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {

  constructor(private http :Http) { }
  getComputers() {
    let userID = getCookie("userID")
    var url = myWebsiteDomain + '/admin/listComputers/5bf3ec04e7179a56e21350f3';
    return this.http.get(url,{withCredentials:true})
      .toPromise()
      .then(res => {
        return res.json()
      }).catch(e => false);
  }

  getOverView(data){
    setCookie("userID","5bf3ec04e7179a56e21350f3",1);
    let userID = getCookie("userID");
    var url = myWebsiteDomain + '/admin/overviewByUser';
    return this.http.post(url,data,{withCredentials:true})
    .toPromise()
      .then(res => {
        return res.json()
      }).catch(e => false);
  }
}
