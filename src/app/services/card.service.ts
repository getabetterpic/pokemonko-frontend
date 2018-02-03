import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Card } from '../models/card.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

@Injectable()
export class CardService {

  constructor(private http: HttpClient) { }

  public search(searchTerm: Observable<string>): Observable<Card[]> {
    return searchTerm
      .filter((term) => term && term.length > 0)
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term) => this.searchCards(term));
  }

  private searchCards(term: string): Observable<Card[]> {
    return this.http.get('/cards/search', { params: { name: term } })
      .map((resp: { cards: Card[] }) => {
        return resp.cards;
      });
  }
}
