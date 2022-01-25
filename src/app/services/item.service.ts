import { Injectable } from '@angular/core';
import { ItemResponse } from '../models/item';
import { ItemResponseValue } from '../models/item';
import { ItemName } from '../models/item';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class  Itemservice {
  constructor(private http: HttpClient) { }



 getItem(): Observable<ItemResponse> {
  return this.http
    .get<ItemResponse>("https://localsearch-ch.herokuapp.com/items");

 }

 delItem(itemId): Observable<ItemResponse> {
  return this.http
    .delete<ItemResponse>("https://localsearch-ch.herokuapp.com/items/"+itemId);

 }

 postItem(item): Observable<ItemResponse> {
  return this.http
    .post<ItemResponse>("https://localsearch-ch.herokuapp.com/items/", item);

 }



}



