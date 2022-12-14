import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){}

  /**
   * Los Guard se ejecutan antes de cargar una ruta y determinan si se puede cargar
   * dicha ruta o no 
   * canActivate: Antes de cargar los componentes de la ruta 
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoggedIn() && this.loginService.getUserRol() == 'ROLE_ADMIN'){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}