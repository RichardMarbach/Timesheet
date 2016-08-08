import { Component, AfterViewInit, ViewChildren } from '@angular/core';
import { TimeUnit } from '../time-unit';
import { TimeEntry } from '../time-entry';
import { TimeEntryService } from '../time-entry.service';
import { ScrollGlueDirective } from '../shared/scroll-glue.directive';

@Component({
  moduleId: module.id,
  selector: 'time-sheet-app',
  templateUrl: 'time-sheet-app.component.html',
  styleUrls: ['time-sheet-app.component.css'],
  providers: [TimeEntryService],
  directives: [ScrollGlueDirective]
})
export class TimeSheetAppComponent implements AfterViewInit {
  @ViewChildren('newStart') focusChild;

  newEntry: any = new TimeEntry();

  constructor(private timeEntry: TimeEntryService) { }

  ngAfterViewInit() {
    this.focus(this.focusChild.first.nativeElement);
  }

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

  showListBorder(): boolean {
    return this.entries.length > 0;
  }

  focus(item) {
    item.focus();
    setTimeout(_ => {
      item.select();
    }, 0);
  }

  get entries(): TimeEntry[] {
    return this.timeEntry.getAllEntries();
  }
}
