import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class  Itemservice {
  constructor(private http: HttpClient) { }

 getItem(): Observable<Item[]> {
  return this.http
    .get<Item[]>("https://localsearch-ch.herokuapp.com/items");
    //.pipe(map(convertJokeResponseToJoke));
 }

}
