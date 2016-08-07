/* tslint:disable:no-unused-variable */
/// <reference path="../typings.d.ts" />

import { addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: Timesheet', () => {
  beforeEach(() => {
    addProviders([AppComponent]);
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));
});
