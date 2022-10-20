import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../auth/service/auth.service';

import { BASE_URL } from '../../../../environments/environment';
import { Cliente, RESTClientes } from '../interfaces/interfaces';
import { SubirArchivoService } from '../../../helpers/services/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  protected baseEndpoint = 'cliente';

  constructor(private http: HttpClient,
    private subirArchivoService: SubirArchivoService,
    private authService: AuthService) { }


    // este método tiene que llevar el token
  buscarClientes( termino: string ) {

    // Si no  lo borro lo añade siempre y a la segunda, da error.
    this.httpHeaders = this.httpHeaders.delete('token');
    this.httpHeaders = this.httpHeaders.append( 'token', this.authService.token);

    const url = `${BASE_URL}/buscar/${this.baseEndpoint}/${termino}`;
    return this.http.get( url,  { headers: this.httpHeaders } )
    .pipe(
      map ( (resp: any) => {
        return resp;
      })
    );

  }


  listar(desde = 0 ): Observable<RESTClientes> {

    const url = `${BASE_URL}/${this.baseEndpoint}?limite=5&desde=${desde}`;
    return this.http.get<RESTClientes>( url )
    .pipe(
      map ( resp => {
        //return resp.clientes;
        return resp;
      })
    );
  }

  ver( id: string ): Observable<Cliente> {
    const url = BASE_URL + '/cliente' + '/' + id;
    return this.http.get<Cliente>( url )
    .pipe(
      map( (resp: any) => {
        return resp.cliente;
      })
    );
  }

  crearActualizar( cliente: Cliente): Observable<Cliente> {

    let url = BASE_URL + '/' + this.baseEndpoint;

    if ( cliente._id ){
      url += '/' + cliente._id;
      return this.http.put<Cliente>( url, cliente, { headers: this.httpHeaders} );
    } else {

      return this.http.post<Cliente>( url, cliente, { headers: this.httpHeaders} );
    }

  }

  borrar( id: string ): Observable<Cliente> {
    const url = BASE_URL + '/' + this.baseEndpoint + '/' + id;
    return this.http.delete<Cliente>( url );

  }

  cambiarImagen( archivo: File, id: string ) {

    return this.subirArchivoService.subirArchivo( archivo , 'clientes', id );
  }

}
