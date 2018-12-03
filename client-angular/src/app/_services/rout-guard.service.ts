import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { getCookie } from './Cookies';

@Injectable({
  providedIn: 'root'
})
export class RoutGuardService implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router) { }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
        if (getCookie('tk') == null) { // it is amazing for hacking haha :v 
          // redirect the user
          this.router.navigate(['login']);
          return false;
        }
        return true;
    }
}
