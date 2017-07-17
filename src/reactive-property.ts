import { BehaviorSubject, IDisposable, IScheduler, Observable, Observer, Subject } from "rx";

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
        this.subject.onNext(value);
    }

    public subscribe(observer: (value: T) => void): IDisposable {
        return this.subject.subscribe(observer);
    }

    public filter(selector: (value: T) => boolean) {
        return this.subject.filter(selector);
    }

    public map<U>(selector: (value: T) => U) {
        return this.subject.map(selector);
    }

    public throttleWithTimeout(dueTime: number, scheduler?: IScheduler) {
        return this.subject.debounce(dueTime, scheduler);
    }

    public throttleWithSelector<TTimeout>(selector: (value: T) => Observable<TTimeout>) {
        return this.subject.debounceWithSelector(selector);
    }

    public toObservable(): Observable<T> {
        return this.subject;
    }

    public toObserver(): Observer<T> {
        return this.subject;
    }

    public toSubject(): Subject<T> {
        return this.subject;
    }

    public toBehaviourSubject(): BehaviorSubject<T> {
        return this.subject;
    }
}
