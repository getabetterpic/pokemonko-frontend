import { Component, OnInit } from '@angular/core';

import { CardService } from '../../services/card.service';

import { Subject } from 'rxjs/Subject';
import { Card } from '../../models/card.model';

@Component({
  selector: 'pko-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  public searchTerm$ = new Subject<string>();
  public cards: Card[];
  public totalCards: number;

  private term: string;
  private page = '1';

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.searchTerm$
      .filter((term) => term && term.length > 0)
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term) => {
        this.page = '1';
        this.term = term;
        return this.cardService.search(term, this.page);
      })
      .subscribe((results) => {
        this.cards = results.cards;
        this.totalCards = results.totalCards;
      });
  }

  public pageChange($event): void {
    this.page = $event.pageIndex + 1;
    this.cardService.search(this.term, this.page.toString())
      .subscribe((results) => {
        this.cards = results.cards;
        this.totalCards = results.totalCards;
      });
  }

  public pageAsNumber(): number {
    return parseInt(this.page, 10);
  }
}
