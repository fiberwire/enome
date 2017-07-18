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

    public subscribe(observer: (value: T) => void | Observer<T>): IDisposable {
        return this.subject.subscribe(observer);
    }

    public filter(selector: (value: T) => boolean) {
        return this.subject.filter(selector);
    }

    public map<U>(selector: (value: T) => U) {
        return this.subject.map(selector);
    }

    public debounceWithTimeout(dueTime: number, scheduler?: IScheduler) {
        return this.subject.debounce(dueTime, scheduler);
    }

    public debounceWithSelector<TTimeout>(selector: (value: T) => Observable<TTimeout>) {
        return this.subject.debounceWithSelector(selector);
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
