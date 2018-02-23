import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/bindNodeCallback';

import { environment } from '../../environments/environment';

import { Auth0Service } from './auth0.service';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth0: Auth0Service
  ) { }

  public handleAuthentication(): Observable<object> {
    return this.auth0.parseHash()
      .switchMap((authResult: any) => {
        return this.setSession(authResult);
      }, (err) => {
        return Observable.throw(err);
      });
  }

  public login() {
    this.auth0.authorize();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('email');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  private setSession(authResult): Observable<object> {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('email', authResult.idTokenPayload.email);

    const params = {
      access_token: authResult.accessToken,
      id_token: authResult.idToken,
      expires_at: expiresAt,
      email: authResult.idTokenPayload.email
    };
    return this.http.post('/callback', params);
  }
}
