export class TimeUnit {
    constructor(public hours = 0, public minutes = 0) { }

    adjustTo24Hour(): TimeUnit {
        // Add the amount of hours in the minutes to the hours
        const adjustedHours = this.hours + Math.floor(this.minutes / 60);

        // Clamp our times to fit into 24 hours and 60 minutes
        const clampedHours = (adjustedHours < 0 ? 24 + adjustedHours : adjustedHours) % 24;
        const clampedMinutes = (this.minutes < 0 ? 60 + this.minutes : this.minutes) % 60;

        return new TimeUnit(clampedHours, clampedMinutes);
    }

    add(time: TimeUnit): TimeUnit {
        return new TimeUnit(this.hours + time.hours, this.minutes + time.minutes);
    }

    sub(time: TimeUnit): TimeUnit {
        return new TimeUnit(this.hours - time.hours, this.minutes - time.minutes);
    }

    toString(): string {
        const hours = this.hours > 9 ? this.hours : '0' + this.hours;
        const minutes = this.minutes > 9 ? this.minutes : '0' + this.minutes;
        return hours + ':' + minutes;
    }
}
