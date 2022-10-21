import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

const sleep = (milliseconds: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    console.log('sleeping for', milliseconds);
    setTimeout(() => {
      console.log(
        'waking, this message should appear before any component logs'
      );
      resolve();
    }, milliseconds);
  });
};

interface LogAble {
  log(message: string): void;
}

@Injectable({
  providedIn: 'root',
})
export class TestInitializationDependency implements LogAble {
  constructor() { 
    console.log("Constructing TestInitializationDependency");
  }

  log(message: string) {
    console.log('TestInitializationDependency invoked with message: ', message);
  }

  async init(): Promise<void> {
    // If you remove the await here, the app initialization will not wait for
    // this sleep to finish before turning on
    await sleep(2500);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SecondaryTestDep implements LogAble {
  constructor() {
    console.log("Constructing SecondaryTestDep");
  }

  log(message: string) {
    console.log('SecondaryTestDep invoked with message: ', message);
  }

  async init(): Promise<void> {
    // If you remove the await here, the app initialization will not wait for
    // this sleep to finish before turning on
    await sleep(2000);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: TestInitializationDependency) => () =>
        initService.init(),
      deps: [TestInitializationDependency],
      multi: true,
    },
    {
      provide: SecondaryTestDep,
      useFactory: () => new SecondaryTestDep()
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
