import { reducer, initialState } from './auth.reducers';
import { Login, LoginSuccess, LoginFailure, Logout } from '../actions/auth.actions';
import { LoginModelUIFactory, UserModelUIFactory } from './../models/auth.models';

describe('Auth Reducer', () => {

    const mockedUserLoginCredentials = LoginModelUIFactory.build();
    const mockedUser = UserModelUIFactory.build();

    describe('Undefined Action', () => {
        it('should return the default state', () => {

            const action = { type: 'Not defined action' } as any;
            const result = reducer(undefined, action);

            expect(result).toEqual(initialState);
        });
    });

    describe('[Auth] Login', () => {
        it('should toggle loading state when user tries to login', () => {
            const action = new Login(mockedUserLoginCredentials);
            const result = reducer(initialState, action );
            expect(result).toEqual({
                ...initialState,
                loading: true
            });
        });
    });

    describe('[Auth] Login Success', () => {

    it('should add the user to state upon login success', () => {
        const action = new LoginSuccess(mockedUser);
        const result = reducer(initialState, action );
        expect(result).toEqual({
            ...initialState,
            loggedUser: {...mockedUser},
            authorized: true
        });
        });
    });

    describe('[Auth] Login Failure', () => {

        it('should set the loginFailureField to true if login fails', () => {
            const action = new LoginFailure({});
            const result = reducer(initialState, action );
            expect(result).toEqual({
                ...initialState,
                hasLoginError: true
            });
            });
        });

    describe('[Auth] Logout', () => {
            it('should set the state to default when user log out', () => {
                const action = new Logout({});
                const result = reducer(initialState, action );
                expect(result).toEqual({
                    ...initialState
                });
                });
            });
});
