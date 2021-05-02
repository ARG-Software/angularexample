import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTS
import { AppComponent } from './app.component';

// REDUX
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

// ROUTING
import { RouterModule, Routes } from '@angular/router';

// CONFIGURATIONS
import { GlobalEnvironmentService } from './global.environment.service';
import { APP_CONFIG, AppConfig } from './app.config';
// CUSTOM MODULES
import { ApiModule } from '@api/api.module';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  const localStorage = localStorageSync({ rehydrate: true, keys: ['auth'] })(
    reducer
  );
  return localStorage;
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const Paths: Routes = [
  { path: '', loadChildren: './auth/auth.module#AuthModule' }
];

const RouterRoot = RouterModule.forRoot(Paths);

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterRoot,
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    ApiModule.forRoot(),
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 15 })
  ],
  providers: [
    GlobalEnvironmentService,
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
