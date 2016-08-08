/// <reference path="../typings.d.ts" />

import { TimeUnit } from './time-unit';

export class TimeEntry {
    id: number;
    private _startTime: any = new TimeUnit();
    private _endTime: any = new TimeUnit();

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }

    set startTime(time) {
        if (time === this._startTime) { return; }

        if (time instanceof TimeUnit) {
            this._startTime = time;
        } else {
            this._startTime = parseTimeString(time).adjustTo24Hour();
        }
    }

    set endTime(time) {
        if (time === this._endTime) { return; }

        if (time instanceof TimeUnit) {
            this._endTime = time;
        } else {
            this._endTime = parseTimeString(time).adjustTo24Hour();
        }
    }

    elapsedTime(): TimeUnit {
        return this.endTime.sub(this.startTime).adjustTo24Hour();
    }
}

function parseTimeString(input: any) {
    // Make sure it's an input we can work with
    if (typeof input !== 'string'
        || /[^0-9:]/.test(input)
        || input.length === 0) {
        return new TimeUnit();
    }

    // HH:MM
    if (input.indexOf(':') !== -1) {
        const times = input.split(':');
        // :MM
        if (input.indexOf(':') === 0) {
            return new TimeUnit(0, +times[1].slice(0, 2));
        }

        // HH:
        if (!times[1]) {
            return new TimeUnit(+times[0].slice(0, 2), 0);
        }

        // HH:MM
        return new TimeUnit(+times[0].slice(0, 2), +times[1].slice(0, 2));
    }

    // H or HH
    if (input.length === 2 || input.length === 1) {
        return new TimeUnit(+input);
    }

    // HMM
    if (input.length === 3) {
        return new TimeUnit(+input[0], +input.slice(1));
    }

    // HHMM
    return new TimeUnit(+input.slice(0, 2), +input.slice(2, 4));
}
