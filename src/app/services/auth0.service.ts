import { Injectable, Inject } from '@angular/core';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindNodeCallback';

import * as Auth0 from 'auth0-js';

interface Auth0Options {
  clientID: string;
  domain: string;
  responseType: string;
  audience: string;
  redirectUri: string;
  scope: string;
}

@Injectable()
export class Auth0Service {
  private webAuth;

  constructor() {
    this.webAuth = new Auth0.WebAuth({...this.auth0Options()});
  }

  public parseHash(): Observable<any> {
    return Observable.bindNodeCallback(this.webAuth.parseHash.bind(this.webAuth))();
  }

  public authorize(): void {
    this.webAuth.authorize();
  }

  private auth0Options(): Auth0Options {
    let redirectUri;
    if (environment.production) {
      redirectUri = 'https://www.pokemonko.com/callback';
    } else {
      redirectUri = 'http://localhost:4200/callback';
    }

    return {
      clientID: 'uxLQFbrlF8S2BkmAlVPzrg89O6K2hciJ',
      domain: 'getabetterpic.auth0.com',
      responseType: 'token id_token',
      audience: 'https://getabetterpic.auth0.com/userinfo',
      redirectUri: redirectUri,
      scope: 'openid email'
    };
  }
}
