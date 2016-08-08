import { Component } from '@angular/core';
import { TimeUnit } from '../time-unit';
import { TimeEntry } from '../time-entry';
import { TimeEntryService } from '../time-entry.service';

@Component({
  moduleId: module.id,
  selector: 'time-sheet-app',
  templateUrl: 'time-sheet-app.component.html',
  styleUrls: ['time-sheet-app.component.css'],
  providers: [TimeEntryService]
})
export class TimeSheetAppComponent {

  newEntry: any = new TimeEntry();

  constructor(private timeEntry: TimeEntryService) { }

  addEntry() {
    this.timeEntry.addEntry(this.newEntry);
    this.newEntry = new TimeEntry();
  }

  removeEntry(entry: TimeEntry) {
    this.timeEntry.deleteEntryById(entry.id);
  }

  updateEntry(entry: TimeEntry) {
    this.timeEntry.updateEntryById(entry.id, entry);
  }

  clear() {
    this.timeEntry.clearEntries();
  }

  getTotalTime(): TimeUnit {
    return this.timeEntry.sumEntries();
  }

  get entries(): TimeEntry[] {
    return this.timeEntry.getAllEntries();
  }
}
