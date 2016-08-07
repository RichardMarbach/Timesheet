/* tslint:disable:no-unused-variable */
/// <reference path="../typings.d.ts" />

import { addProviders, async, inject } from '@angular/core/testing';
import { TimeUnit } from './time-unit';

describe('TimeUnit', () => {
  describe('+constructor', () => {
    it('should initialise to 0', () => {
      const time = new TimeUnit();
      expect(time.hours).toEqual(0);
      expect(time.minutes).toEqual(0);
    });

    it('should accept values', () => {
      const time = new TimeUnit(15, 15);
      expect(time.hours).toEqual(15);
      expect(time.minutes).toEqual(15);
    });
  });

  describe('+add', () => {
    it('should add two times together', () => {
      const time = new TimeUnit(10, 10).add(new TimeUnit(5, 5));
      expect(time.hours).toEqual(15);
      expect(time.minutes).toEqual(15);
    });
  });

  describe('+sub', () => {
    it('should subtract two times from one another', () => {
      const time = new TimeUnit(10, 10).sub(new TimeUnit(5, 5));
      expect(time.hours).toEqual(5);
      expect(time.minutes).toEqual(5);
    });
  });

  describe('+adjustTo24Hours', () => {
    it('should wrap overflowing hours', () => {
      const time = new TimeUnit(25).adjustTo24Hour();
      expect(time.hours).toEqual(1);
    });

    it('should add overflowing minutes into hours', () => {
      const time = new TimeUnit(0, 70).adjustTo24Hour();
      expect(time.hours).toEqual(1);
      expect(time.minutes).toEqual(10);
    });

    it('should wrap hours when minutes overflow', () => {
      const time = new TimeUnit(23, 70).adjustTo24Hour();
      expect(time.hours).toEqual(0);
      expect(time.minutes).toEqual(10);
    });

    it('should handle negative hours', () => {
      const time = new TimeUnit(-1).adjustTo24Hour();
      expect(time.hours).toEqual(23);
    });

    it('should handle negative minutes', () => {
      const time = new TimeUnit(0, -10).adjustTo24Hour();
      expect(time.hours).toEqual(23);
      expect(time.minutes).toEqual(50);
    });
  });

  describe('+toString', () => {
    it('should pad values less than 10 with a zero', () => {
      const timeStamp = new TimeUnit().toString();
      expect(timeStamp).toEqual('00:00');
    });

    it('should not pad values greater than 10 with a zero', () => {
      expect(new TimeUnit(10, 10).toString()).toEqual('10:10');
    });
  });
});
