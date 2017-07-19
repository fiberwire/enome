import { BehaviorSubject, Observable, Observer, Subject, Subscription } from "rxjs";
import { IScheduler } from "rxjs/Scheduler";

export class ReactiveProperty<T> {
    // tslint:disable-next-line:variable-name
    private _value: T;
    private subject: BehaviorSubject<T>;

    constructor(value?: T) {
        this.subject = new BehaviorSubject(value);
        this._value = value;
    }

    public get value(): T {
        return this._value;
    }

    public set value(value: T) {
        this._value = value;
        this.subject.next(value);
    }

    public subscribe(observer: (value: T) => void | Observer<T>): Subscription {
        return this.subject.subscribe(observer);
    }

    public filter(selector: (value: T) => boolean): Observable<T> {
        return this.subject.filter(selector);
    }

    public map<U>(selector: (value: T) => U) {
        return this.subject.map(selector);
    }

    public throttleTime(dueTime: number, scheduler?: IScheduler) {
        return this.subject.throttleTime(dueTime, scheduler);
    }

    public throttle<TTimeout>(selector: (value: T) => Observable<TTimeout>) {
        return this.subject.throttle(selector);
    }

    public bufferTime(timeSpan: number, scheduler?: IScheduler): Observable<T[]> {
        return this.subject.bufferTime(timeSpan, scheduler);
    }

    public bufferCount(count: number, skip?: number): Observable<T[]> {
        return this.subject.bufferCount(count, skip);
    }

    public bufferTimeCount(timeSpan: number, count: number, skip?: number, scheduler?: IScheduler): Observable<T[]> {
        const timeBuffer = this.subject.bufferTime(timeSpan, scheduler);
        const countBuffer = this.subject.bufferCount(count, skip);

        return timeBuffer.race(countBuffer);
    }

    public asObservable(): Observable<T> {
        return this.subject;
    }

    public asObserver(): Observer<T> {
        return this.subject;
    }

    public asSubject(): Subject<T> {
        return this.subject;
    }

    public asBehaviourSubject(): BehaviorSubject<T> {
        return this.subject;
    }
}
