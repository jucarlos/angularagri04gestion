import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService ) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if ( this.authService.estaAutenticado() ) {
        console.log('Pasando por LoginGuard AUTENTICADO');
        return true;
      } else {
        console.log('Pasando por LoginGuard NO AUTENTICADO');
        
        return false;
      }

  }


  canLoad(route: Route, segments: UrlSegment[]): boolean {


    if ( this.authService.estaAutenticado() ) {
      console.log('Pasando por LoginGuard AUTENTICADO');
      return true;
    } else {
      console.log('Pasando por LoginGuard NO AUTENTICADO');
     
      return false;
    }
  }
 



  
}
