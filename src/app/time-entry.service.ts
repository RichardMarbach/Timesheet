/// <reference path="../typings.d.ts" />

import { Injectable } from '@angular/core';
import { TimeEntry } from './time-entry';
import { TimeUnit } from './time-unit';

@Injectable()
export class TimeEntryService {
  private timeEntries: TimeEntry[] = [];
  lastId = 0;

  constructor() { }

  addEntry(entry: TimeEntry): TimeEntryService {
    if (!entry.id) {
      entry.id = ++this.lastId;
    }
    this.timeEntries.push(entry);
    return this;
  }

  updateEntryById(id: number, values: Object): TimeEntry {
    const entry = this.getEntryById(id);
    if (!entry) {
      return null;
    }
    Object.assign(entry, values);
    return entry;
  }

  deleteEntryById(id: number): TimeEntryService {
    this.timeEntries = this.timeEntries
      .filter(entry => entry.id !== id);
    return this;
  }

  getEntryById(id: number): TimeEntry {
    return this.timeEntries
      .filter(entry => entry.id === id)
      .pop();
  }

  getAllEntries(): TimeEntry[] {
    return this.timeEntries;
  }

  clearEntries(): TimeEntryService {
    this.timeEntries = [];
    return this;
  }

  sumEntries(): TimeUnit {
    return this.timeEntries
      .reduce((acc, cur) => acc.add(cur.elapsedTime()), new TimeUnit());
  }
}
