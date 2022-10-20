import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RESTUser, Usuario } from '../models/interfaces';
import { BASE_URL } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _tituloBotonLogin = 'Login';

  usuario: Usuario = {
    nombre: '',
    email: ''
  };

  token = '';

  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage(); 
    console.log( this.token );
    console.log( this.usuario );
    this.isAutenticated();
  }


  public get tituloBotonLogin(): string {
    return this._tituloBotonLogin;
  }

 
  isAutenticated(): boolean  {

     if ( this.token.length > 5 && this.estaAutenticado() ) {
       return true;
     } else {
       this.logout();
       // this.router.navigate(['/home']);
       return false;
     }
  }

  logout() {
    this.borrarStorage();
    this._tituloBotonLogin = 'Login';
  }

  

  login( email: string, password: string ): Observable<boolean> {

    const url = `${BASE_URL}/login`;

    return this.http
    .post<RESTUser | any>( url, { email, password }, {headers: this.httpHeaders} )
    .pipe(
      map( (resp ) => {
        console.log( resp );
        this.usuario.nombre = resp.usuario.nombre
        this.usuario.email =  resp.usuario.email;
        this.token = resp.token;
        console.log( this.token );
        this._tituloBotonLogin = `Salir ( ${this.usuario.nombre} )`;
        this.guardarStorage();
        return true ;
      }),
      catchError ( error => {
        console.log( error );
        return of( false );
      })
     
    );


  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify( this.usuario ) );
    localStorage.setItem('token', this.token );
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')!;
      this.usuario = JSON.parse( localStorage.getItem('usuario')!);
      this._tituloBotonLogin = `Salir ( ${this.usuario.nombre} )`;
    };

  }

  borrarStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token = '';
    this.usuario.nombre = '';
    this.usuario.email = '';
  }




  obtenerDatosToken(): any {

    if (this.token.length > 5) {
       return JSON.parse(atob(this.token.split('.')[1]));
    }
    return null;
  }


  estaAutenticado() {

    const payload: any = this.obtenerDatosToken();

    if ( payload != null && payload.usuario.nombre.length > 3 && payload.usuario.nombre === this.usuario.nombre ) {

      console.log( payload );
      if ( this.isTokenExpirado( payload.exp )) {
        return false;
      }

      return true;

    } else {
      return false;
    }
  }

  isTokenExpirado(exp: number ): boolean {

    const now = new Date().getTime() / 1000;
    

    console.log( 'Fecha actual: ', new Date(now * 1000));
    console.log ( exp );
    console.log( 'Fecha caduda: ', new Date(exp * 1000));

    if (exp < now) {
      return true;
    }
    return false;

  }



  
}
