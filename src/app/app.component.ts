import { Component } from '@angular/core';
import { TimeSheetAppComponent } from './time-sheet-app';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: '<time-sheet-app class="viewport"></time-sheet-app>',
  directives: [TimeSheetAppComponent],
  styleUrls: ['app.component.css']
})
export class AppComponent {
}