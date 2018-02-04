import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';

import { CardService } from '../../services/card.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  let cardService: CardService;
  const cardServiceMock = {
    search: () => Observable.of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent ],
      providers: [
        { provide: CardService, useValue: cardServiceMock }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    cardService = TestBed.get(CardService);
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('searches for cards when search term is changed or when page changes', fakeAsync(() => {
      spyOn(cardService, 'search').and.returnValue(Observable.of());
      component.ngOnInit();
      component.searchTerm$.next('test');
      tick(300);
      expect(cardService.search).toHaveBeenCalledWith('test', '1');
      component.pageChange({ pageIndex: 1 });
      expect(cardService.search).toHaveBeenCalledWith('test', '2');
    }));
  });
});
