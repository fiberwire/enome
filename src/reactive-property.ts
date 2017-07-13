import { BehaviorSubject, IDisposable } from 'rx';

export class ReactiveProperty<T> {
    // tslint:disable-next-line:variable-name
    private _value: T;
    private subject: BehaviorSubject<T>;

    constructor(value: T) {
        this.subject = new BehaviorSubject(value);
        this._value = value;
    }

    public get value(): T {
        return this._value;
    }

    public set value(value: T){
        this._value = value;
        this.subject.onNext(value);
    }

    public subscribe(observer: (value: T) => void): IDisposable {
        return this.subject.subscribe(observer);
    }

}
