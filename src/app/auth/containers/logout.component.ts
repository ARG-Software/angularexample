import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from '../auth.reducers.index';
import { Logout } from '../actions/auth.actions';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {
  public constructor(private store: Store<fromModule.AuthState>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new Logout({}));
  }
}
