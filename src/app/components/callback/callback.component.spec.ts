import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';

import { CallbackComponent } from './callback.component';

import { AuthService } from '../../services/auth.service';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let authService: AuthService;
  let router: Router;

  const authServiceMock = {
    handleAuthentication: () => true
  };

  const routerMock = {
    navigate: () => true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  describe('ngOnInit', () => {
    describe('when calling handleAuthentication', () => {
      it('routes to search on success', () => {
        spyOn(authService, 'handleAuthentication').and.returnValue(Observable.of({}));
        spyOn(router, 'navigate');
        component.ngOnInit();
        expect(authService.handleAuthentication).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/search']);
      });
    });
  });
});
