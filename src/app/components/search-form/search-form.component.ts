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

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.cardService.search(this.searchTerm$)
      .subscribe((cards: Card[]) => {
        this.cards = cards;
      });
  }

}
