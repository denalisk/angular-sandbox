import { Component } from '@angular/core';
import { SecondaryTestDep, TestInitializationDependency } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'test-project-v2';
  
  constructor(private testService: TestInitializationDependency, private secondDep: SecondaryTestDep) {
    testService.log("App component");
  }
}
