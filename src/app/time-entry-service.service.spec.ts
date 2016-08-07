/* tslint:disable:no-unused-variable */
/// <reference path="../typings.d.ts" />

import { addProviders, async, inject } from '@angular/core/testing';
import { TimeUnit } from './time-unit';
import { TimeEntry } from './time-entry';
import { TimeEntryServiceService } from './time-entry-service.service';

describe('Service: TimeEntryService', () => {
  beforeEach(() => {
    addProviders([TimeEntryServiceService]);
  });

  describe('+getAllEntries', () => {
    it('should return an empty array when no entries are present', 
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        expect(service.getAllEntries()).toEqual([]);
    }));

    it('should return a list of all entries', 
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        const entry1 = new TimeEntry();
        const entry2 = new TimeEntry();
        service.addEntry(entry1);
        service.addEntry(entry2);
        expect(service.getAllEntries()).toEqual([entry1, entry2]);
    }));
  });

  describe('+save(entry)', () => {
    it('should assign automatically incrementing id',
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        const entry1 = new TimeEntry();
        const entry2 = new TimeEntry();
        service.addEntry(entry1);
        service.addEntry(entry2);
        expect(service.getEntryById(1)).toEqual(entry1);
        expect(service.getEntryById(2)).toEqual(entry2);
    }));
  });

  describe('+updateEntry(id)', () => {
    it('should return the entry with a corresponding id and updated data',
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        const entry1 = new TimeEntry();
        service.addEntry(entry1);
        const updatedEntry = service.updateEntryById(entry1.id, {
          endTime: new TimeUnit(10)
        });
        expect(updatedEntry.endTime).toEqual(new TimeUnit(10));
    }));

    it('should return null if the id is not found',
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        const entry1 = new TimeEntry();
        service.addEntry(entry1);
        const updatedEntry = service.updateEntryById(0, {
          endTime: new TimeUnit(10)
        });
        expect(updatedEntry).toEqual(null);
    }));
  });

  describe('+deleteEntry(id)', () => {
    it('should remove the entry with a corresponding id',
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        const entry1 = new TimeEntry();
        const entry2 = new TimeEntry();
        service.addEntry(entry1);
        service.addEntry(entry2);

        expect(service.getAllEntries()).toEqual([entry1, entry2]);
        service.deleteEntryById(1);
        expect(service.getAllEntries()).toEqual([entry2]);
        service.deleteEntryById(2);
        expect(service.getAllEntries()).toEqual([]);
    }));

    it('should not remove anything if no corresponding id found',
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        const entry1 = new TimeEntry();
        const entry2 = new TimeEntry();
        service.addEntry(entry1);
        service.addEntry(entry2);

        expect(service.getAllEntries()).toEqual([entry1, entry2]);
        service.deleteEntryById(3);
        expect(service.getAllEntries()).toEqual([entry1, entry2]);
    }));
  });

  describe('+sumEntries', () => {
    it('should sum all the entries',
      inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
        service.addEntry(new TimeEntry({endTime: new TimeUnit(2)}));
        service.addEntry(new TimeEntry({endTime: new TimeUnit(5)}));
        expect(service.sumEntries()).toEqual(new TimeUnit(7));
      }));
  });

  it('should ...',
    inject([TimeEntryServiceService], (service: TimeEntryServiceService) => {
      expect(service).toBeTruthy();
    }));
});
