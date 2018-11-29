import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { myWebsiteDomain, User } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(myWebsiteDomain+"/users");
  }

  getById(id: number) {
      return this.http.get(myWebsiteDomain+"/users/" + id);
  }

  register(user: User) {
      return this.http.post(myWebsiteDomain+"/users/register", user);
  }

  update(user: User) {
      return this.http.put(myWebsiteDomain+"/users/" + user.id, user);
  }

  delete(id: number) {
      return this.http.delete(myWebsiteDomain+"/users/" + id);
  }
}
