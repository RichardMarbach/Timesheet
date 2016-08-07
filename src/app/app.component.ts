import { Component } from '@angular/core';
import { TimeSheetAppComponent } from './time-sheet-app';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: '<time-sheet-app></time-sheet-app>',
  directives: [TimeSheetAppComponent]
})
export class AppComponent {
}
