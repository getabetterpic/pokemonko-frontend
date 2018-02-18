import { Component, OnDestroy, OnInit } from '@angular/core';

import { CardService } from '../../services/card.service';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Card } from '../../models/card.model';

@Component({
  selector: 'pko-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public searchTerm$ = new Subject<string>();
  public cards: Card[];
  public totalCards: number;
  public term: string;

  private searchTerm$Subscription: Subscription;
  private page = '1';

  constructor(private cardService: CardService) { }

  public ngOnInit(): void {
    this.searchTerm$Subscription = this.searchTerm$
      .filter((term) => term && term.length > 0)
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.page = '1';
        this.term = term;
        return this.searchCardService();
      });
  }

  public ngOnDestroy(): void {
    if (this.searchTerm$Subscription) { this.searchTerm$Subscription.unsubscribe(); }
  }

  public pageChange($event): void {
    this.page = ($event.pageIndex + 1).toString();
    this.cardService.search(this.term, this.page)
      .subscribe((results) => {
        this.cards = results.cards;
        this.totalCards = results.totalCards;
      });
  }

  public pageAsNumber(): number {
    return parseInt(this.page, 10);
  }

  public searchKeyup(event) {
    console.log(event);
    if (event.keyCode === 13) {
      this.term = event.target.value;
      this.searchCardService();
      event.preventDefault();
    } else {
      this.searchTerm$.next(event.target.value);
    }
  }

  public onSubmit(event) {
    console.log(event);
    event.preventDefault();
  }

  public search() {
    this.page = '1';
    this.searchCardService();
  }

  private searchCardService() {
    return this.cardService.search(this.term, this.page)
      .subscribe((results) => {
        this.cards = results.cards;
        this.totalCards = results.totalCards;
      });
  }
}
