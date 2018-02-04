import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CardService } from './card.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Card } from '../models/card.model';

describe('CardService', () => {
  let httpMock: HttpTestingController;
  const fakeCards: Card[] = [
    {
      id: '1', name: 'Glaceon-EX', image_url: '', image_url_hi_res: '', subtype: '', supertype: '', number: '',
      artist: '', rarity: '', series: '', set_code: '', types: ['']
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  describe('#search', () => {
    it('searches for cards', fakeAsync(inject([CardService], (service: CardService) => {
      service.search(Observable.of('test')).subscribe((cards) => {
        expect(cards).toEqual(fakeCards);
      });
      tick(300);
      const req = httpMock.expectOne('/cards/search?name=test');
      req.flush({ cards: fakeCards });

      httpMock.verify();
    })));
  });
});
