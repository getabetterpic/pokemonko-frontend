import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Observable } from 'rxjs/Observable';

import { Auth0Service } from './auth0.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let router: Router;
  let http: HttpTestingController;
  let auth0: Auth0Service;

  const routerMock = {
    navigate: () => true
  };

  const auth0Mock = {
    parseHash: () => true
  };

  const authResult = {
    accessToken: 'test',
    idToken: '123',
    expiresIn: 7200,
    idTokenPayload: { email: 'test@example.com' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: Auth0Service, useValue: auth0Mock }
      ]
    });

    router = TestBed.get(Router);
    http = TestBed.get(HttpTestingController);
    auth0 = TestBed.get(Auth0Service);
  });

  describe('handleAuthentication', () => {
    it('sets items in localStorage', inject([AuthService], (service: AuthService) => {
      spyOn(auth0, 'parseHash').and.returnValue(Observable.of(authResult));
      service.handleAuthentication().subscribe();
      expect(auth0.parseHash).toHaveBeenCalled();
      expect(localStorage.getItem('access_token')).toEqual('test');
      expect(localStorage.getItem('id_token')).toEqual('123');
      expect(localStorage.getItem('email')).toEqual('test@example.com');
      expect(localStorage.getItem('expires_at')).toBeDefined();
    }));

    it('posts the callback info to the server', inject([AuthService], (service: AuthService) => {
      spyOn(auth0, 'parseHash').and.returnValue(Observable.of(authResult));
      service.handleAuthentication().subscribe();

      const req = http.expectOne('/callback');
      req.flush({});

      http.verify();
    }));
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem('access_token', 'test');
      localStorage.setItem('id_token', '123');
      localStorage.setItem('email', 'test@example.com');
      localStorage.setItem('expires_at', new Date().getTime().toString());
    });

    it('removes the authentication items from local storage', inject([AuthService], (service: AuthService) => {
      service.logout();
      expect(localStorage.getItem('access_token')).toBeFalsy();
      expect(localStorage.getItem('id_token')).toBeFalsy();
      expect(localStorage.getItem('email')).toBeFalsy();
      expect(localStorage.getItem('expires_at')).toBeFalsy();
    }));
  });
});
