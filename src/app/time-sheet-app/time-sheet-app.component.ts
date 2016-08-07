import { Component, OnInit } from '@angular/core';
import { TimeEntryService } from '../time-entry.service';

@Component({
  moduleId: module.id,
  selector: 'time-sheet-app',
  templateUrl: 'time-sheet-app.component.html',
  styleUrls: ['time-sheet-app.component.css']
})
export class TimeSheetAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
