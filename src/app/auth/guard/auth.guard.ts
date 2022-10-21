import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router ) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if ( this.authService.estaAutenticado() ) {
        console.log('Pasando por LoginGuard AUTENTICADO');
        return true;
      } else {
        console.log('Pasando por LoginGuard NO AUTENTICADO');
        this.router.navigate(['/home']);
        Swal.fire('Autenticación', 'No puedes ver este recurso', 'info');
        
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
