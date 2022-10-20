import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BASE_URL } from 'src/environments/environment';
import { Generic } from '../interfaces/interfaces';


export abstract class CommonService<E extends Generic> {


  protected httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'token': this.authService.token || '0'
  });

  protected baseEndpoint = '';


  constructor(protected http: HttpClient, protected authService: AuthService) { }


  listar(desde = 0 ): Observable<E> {

    const url = `${BASE_URL}/${this.baseEndpoint}?limite=5&desde=${desde}`;
    return this.http.get<E>( url, { headers: this.httpHeaders } )
    .pipe(
      map ( resp => {
        //return resp.clientes;
        return resp;
      })
    );
  }

  borrar( id: string ): Observable<E> {
    const url = BASE_URL + '/' + this.baseEndpoint + '/' + id;
    return this.http.delete<E>( url,  { headers: this.httpHeaders } );

  }


  ver( id: string ): Observable<E> {
    const url = BASE_URL + '/' + this.baseEndpoint + '/' + id;
    return this.http.get<E>( url , { headers: this.httpHeaders})
    .pipe(
      map( (resp: any) => {
        return resp.cliente;
      })
    );
  }


  crearActualizar( e: E): Observable<E> {

    let url = BASE_URL + '/' + this.baseEndpoint;

    if ( e._id ){
      url += '/' + e._id;
      return this.http.put<E>( url, e, { headers: this.httpHeaders} );
    } else {

      return this.http.post<E>( url, e, { headers: this.httpHeaders} );
    }

  }

 
}
