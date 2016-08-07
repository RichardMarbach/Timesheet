/// <reference path="../typings.d.ts" />

import { TimeUnit } from './time-unit';

export class TimeEntry {
    id: number;
    startTime: TimeUnit = new TimeUnit();
    endTime: TimeUnit = new TimeUnit();

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    elapsedTime(): TimeUnit {
        return this.endTime.sub(this.startTime).adjustTo24Hour();
    }
}
