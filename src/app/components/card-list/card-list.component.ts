import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Card } from '../../models/card.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pko-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {
  @Input() public cards: Card[];
  @Input() public totalCards: number;
  @Input() public page: number;
  @Output() public pageChange = new EventEmitter<number>();

  public cardColumns = 1;
  private handsetAndTabletPortraitSubscription: Subscription;
  private tabletLandscapeSubscription: Subscription;
  private webSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) { }

  public ngOnInit() {
    this.setupHandsetAndTabletPortraitSubscriptions();
    this.setupTabletLandscapeSubscriptions();
    this.setupWebSubscriptions();
  }

  public ngOnDestroy() {
    if (this.handsetAndTabletPortraitSubscription) { this.handsetAndTabletPortraitSubscription.unsubscribe(); }
    if (this.tabletLandscapeSubscription) { this.tabletLandscapeSubscription.unsubscribe(); }
    if (this.webSubscription) { this.webSubscription.unsubscribe(); }
  }

  private setupHandsetAndTabletPortraitSubscriptions(): void {
    this.handsetAndTabletPortraitSubscription = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait
    ]).subscribe((results) => {
      if (results.matches) { this.cardColumns = 1; }
    });
  }

  private setupTabletLandscapeSubscriptions(): void {
    this.tabletLandscapeSubscription = this.breakpointObserver.observe([
      Breakpoints.TabletLandscape
    ]).subscribe((results) => {
      if (results.matches) { this.cardColumns = 2; }
    });
  }

  private setupWebSubscriptions(): void {
    this.webSubscription = this.breakpointObserver.observe([
      Breakpoints.Web
    ]).subscribe((results) => {
      if (results.matches) { this.cardColumns = 4; }
    });
  }
}
