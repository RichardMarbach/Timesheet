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

        if (typeof time === 'string') {
            const times = time.split(':');
            this._startTime = new TimeUnit(+times[0], +times[1]);
        } else {
            this._startTime = time;
        }
    }

    set endTime(time) {
        if (time === this._endTime) { return; }

        if (typeof time === 'string') {
            const times = time.split(':');
            this._endTime = new TimeUnit(+times[0], +times[1]);
        } else {
            this._endTime = time;
        }
    }

    elapsedTime(): TimeUnit {
        return this.endTime.sub(this.startTime).adjustTo24Hour();
    }
}
