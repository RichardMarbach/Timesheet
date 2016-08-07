/* tslint:disable:no-unused-variable */
/// <reference path="../typings.d.ts" />

import { addProviders, async, inject } from '@angular/core/testing';
import { TimeEntry } from './time-entry';
import { TimeUnit } from './time-unit';

describe('TimeEntry', () => {
  it('should create an instance', () => {
    expect(new TimeEntry()).toBeTruthy();
  });

  it('should populate values assigned by the constructor', () => {
    const values = {
      startTime: new TimeUnit(),
      endTime: new TimeUnit(),
    };

    const entry = new TimeEntry(values);

    expect(entry.startTime).toEqual(values.startTime);
    expect(entry.endTime).toEqual(values.endTime);
  });

  describe('+elapsedTime', () => {
    it('should calculate the amount of time elapsed between startTime and endTime', () => {
      const elapsedTime = new TimeEntry({
        startTime: new TimeUnit(10, 50),
        endTime: new TimeUnit(15, 30)
      }).elapsedTime();

      expect(elapsedTime.hours).toEqual(4);
      expect(elapsedTime.minutes).toEqual(40);
    });

    it('should wrap around the clock if startTime is after endTime', () => {
      const elapsedTime = new TimeEntry({
        startTime: new TimeUnit(10, 0),
        endTime: new TimeUnit(5, 0)
      }).elapsedTime();

      expect(elapsedTime.hours).toEqual(19);
      expect(elapsedTime.minutes).toEqual(0);
    });
  });
});
