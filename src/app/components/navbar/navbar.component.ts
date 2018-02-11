declare const Hammer: any;

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'pko-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    const mc = new Hammer(this.element.nativeElement);
    mc.on('swiperight', () => this.sidenav.open());
    mc.on('swipeleft', () => this.sidenav.close());
  }

}
