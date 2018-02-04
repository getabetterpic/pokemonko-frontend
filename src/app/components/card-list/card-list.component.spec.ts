import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout/';

import { CardListComponent } from './card-list.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  const breakpointObserverMock = {
    observe: () => true
  };

  let breakpointObserver;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListComponent ],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverMock }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.get(BreakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      spyOn(breakpointObserver, 'observe').and.returnValue(Observable.of());
      component.ngOnInit();
    });

    it('watches for changes to handset or tablet portrait', () => {
      expect(breakpointObserver.observe).toHaveBeenCalledWith([Breakpoints.Handset, Breakpoints.TabletPortrait]);
    });

    it('watches for changes to tablet landscape', () => {
      expect(breakpointObserver.observe).toHaveBeenCalledWith([Breakpoints.TabletLandscape]);
    });

    it('watches for changes to web', () => {
      expect(breakpointObserver.observe).toHaveBeenCalledWith([Breakpoints.Web]);
    });
  });
});
