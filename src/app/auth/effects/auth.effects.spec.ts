import 'jest';
import * as faker from 'faker/locale/en_US';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { IAuthorizationService } from '@api/services/interfaces/core/iauthorization.service';
import { AuthEffects } from './auth.effect';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from '../../app.config';
import { Login, LoginSuccess, LoginFailure, Logout } from '../actions/auth.actions';
import { LoginModelUIFactory, UserModelUIFactory, UserModelUI } from '../models/auth.models';
import { ILoginSession } from '@api/models/apimodels';

describe('AuthEffects', () => {
    let actions: Observable<any>;
    let effects: AuthEffects;
    let authService: IAuthorizationService;
    let router: any;
    let spy: jest.SpyInstance<any>;
    beforeAll(() => {
      TestBed.configureTestingModule({
        providers: [
        AuthEffects,
        provideMockActions(() => actions),
        {
            provide: IAuthorizationService,
            useValue: {
              login: jest.fn(),
            }
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
        {
          provide: ActivatedRoute,
          useValue: { }
        },
        { provide: APP_CONFIG, useValue: {} }
        ]
      }).compileComponents();

      effects = TestBed.get(AuthEffects);
      authService = TestBed.get(IAuthorizationService);
      router = TestBed.get(Router);
      spy = jest.spyOn(router, 'navigate');
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
    });

    describe('login', () => {
        let mockedUserLoginCredentials;
        let mockedUser;
        let mockedResponseFromApi;

        beforeEach(() => {
          mockedUserLoginCredentials = LoginModelUIFactory.build();
          mockedUser = UserModelUIFactory.build();
          mockedResponseFromApi = generateLoginResponseFromApi(mockedUser);
        });

        it('should return a LoginSuccess action, with the user session, on success', () => {
         const action = new Login(mockedUserLoginCredentials);
         const outcome = new LoginSuccess(mockedUser);

         actions = hot('a', { a: action });
         const response = cold('a|', { a: mockedResponseFromApi });
         const expected = cold('b', { b: outcome });
         authService.login = jest.fn(() => response);
         expect(effects.loginUser$ as any).toBeObservable(expected);
       });

        it('should return an LoginFailure action, with an error, on failure', () => {
         const action = new Login(mockedUserLoginCredentials);
         const error = new Error();
         const outcome = new LoginFailure(error);

         actions = hot('a', { a: action });
         const response = cold('-#|', {a: error });
         const expected = cold('-b', { b: outcome });
         authService.login = jest.fn(() => response);

         expect(effects.loginUser$).toBeObservable(expected);
       });

        it('should change route when LoginSuccess action is dispatched', () => {
        const action = new LoginSuccess( mockedUser);
        actions = hot('-a---', { a: action });
        effects.loginSuccess$.subscribe(() => {
         expect(spy).toHaveBeenCalledWith(['main']);
       });
     });
  });

    describe('logout', () => {
      it('should change route when Logout action is dispatched', () => {
        const action = new Logout({});
        actions = hot('-a---', { a: action });
        effects.loginSuccess$.subscribe(() => {
         expect(spy).toHaveBeenCalledWith(['login']);
       });
    });

  });
});

function generateLoginResponseFromApi(user: UserModelUI): ILoginSession {
    const response: ILoginSession = {
      AccessToken : faker.random.alphaNumeric(),
      RefreshToken : faker.random.alphaNumeric(),
      User: {...user}
    };
    return response;
  }
