import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CommonService } from '../../../helpers/services/common.service';
import { Colegio } from '../interfaces/interfaces';
import { AuthService } from '../../../auth/service/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ColegiosService extends CommonService<Colegio>{

  protected override httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'token': this.authService.token || '0'
  });

  protected override baseEndpoint = 'colegio';

  constructor(protected override http: HttpClient ,
              protected override authService: AuthService) {
    super(http, authService);

  }


  
  override ver( id: string ): Observable<Colegio> {
    const url = BASE_URL + '/colegio' + '/' + id;
    return this.http.get<Colegio>( url,  { headers: this.httpHeaders } )
    .pipe(
      map( (resp: any) => {
        return resp.colegio;
      })
    );
  }

  


}
