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

  public search(term: string, page: string): Observable<{ cards: Card[], totalCards: number }> {
    return this.http
      .get<{ cards: Card[], total_cards: number }>('/cards/search', { params: { name: term, page: page } })
      .map((results) => {
        return { cards: results.cards, totalCards: results.total_cards };
      });
  }
}
