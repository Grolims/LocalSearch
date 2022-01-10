import { Injectable } from '@angular/core';
import { SalepointResponse } from '../models/salepoint';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class  Salepointservice {
  constructor(private http: HttpClient) { }



 getSalepoint(): Observable<SalepointResponse> {
  return this.http
    .get<SalepointResponse>("https://localsearch-ch.herokuapp.com/salepoints");

 }


}



