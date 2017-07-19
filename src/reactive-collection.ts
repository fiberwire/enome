
import { BehaviorSubject, Observable, Observer, ReplaySubject, Subject, Subscription } from "rxjs";
import { IScheduler } from "rxjs/Scheduler";
import { ReactiveProperty } from "./index";

export class ReactiveCollection<T> {

    private pushed: ReplaySubject<T> = new ReplaySubject<T>(1);
    private popped: ReplaySubject<T> = new ReplaySubject<T>(1);
    private shifted: ReplaySubject<T> = new ReplaySubject<T>(1);
    private unshifted: ReplaySubject<T> = new ReplaySubject<T>(1);
    private removed: ReplaySubject<T> = new ReplaySubject<T>(1);

    private subs: Subscription[];

    private array: ReactiveProperty<T[]>;

    public get value() {
        return this.array.value;
    }

    public set value(value: T[]) {
        this.array.value = value;
    }

    constructor(value: T[] = []) {
        this.array = new ReactiveProperty<T[]>(value);

        this.subs = [
            this.subscribeToPush((pushed) => {
                const v = this.value;
                v.push(pushed);
                this.value = v;
            }),
            this.subscribeToUnshift((unshifted) => {
                const v = this.value;
                v.unshift(unshifted);
                this.value = v;
            }),
        ];
    }

    public dispose(): void {
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    public subscribeToPush(observer: (value: T) => void | Observer<T>): Subscription {
        return this.pushed.subscribe(observer);
    }

    public subscribeToPop(observer: (value: T) => void | Observer<T>): Subscription {
        return this.popped.subscribe(observer);
    }

    public subscribeToShift(observer: (value: T) => void | Observer<T>): Subscription {
        return this.shifted.subscribe(observer);
    }

    public subscribeToUnshift(observer: (value: T) => void | Observer<T>): Subscription {
        return this.unshifted.subscribe(observer);
    }

    public subscribeToRemove(observer: (value: T) => void | Observer<T>): Subscription {
        return this.removed.subscribe(observer);
    }

    public push(value: T): ReactiveCollection<T> {
        this.pushed.next(value);
        return this;
    }

    public pop(value: T): T {
        const v = this.value;
        const popped = v.pop();
        this.popped.next(popped);
        this.value = v;
        return popped;
    }

    public shift(): T {
        const v = this.value;
        const shifted = v.shift();
        this.shifted.next(shifted);
        this.value = v;
        return shifted;
    }

    public unshift(value: T): ReactiveCollection<T> {
        this.unshifted.next(value);
        return this;
    }

    public remove(value: T): ReactiveCollection<T> {
        const v = this.value;
        const removed = v.splice(v.indexOf(value));
        this.value = v;
        this.removed.next(removed[0]);
        return this;
    }

    public mapCollection<U>(selector: (value: T) => U): ReactiveCollection<U> {
        return new ReactiveCollection<U>(this.value.map(selector));
    }

    public filterCollection(selector: (value: T) => boolean): ReactiveCollection<T> {
        return new ReactiveCollection<T>(this.value.filter(selector));
    }

    public forEach(action: (value: T) => void): ReactiveCollection<T> {
        this.value.forEach(action);
        return this;
    }

    public subscribe(observer: (value: T[]) => void | Observer<T[]>): Subscription {
        return this.array.subscribe(observer);
    }

    public filter(selector: (value: T[]) => boolean) {
        return this.array.filter(selector);
    }

    public map<U>(selector: (value: T[]) => U) {
        return this.array.map(selector);
    }

    public debounceWithTimeout(dueTime: number, scheduler?: IScheduler) {
        return this.array.throttleTime(dueTime, scheduler);
    }

    public debounceWithSelector<TTimeout>(selector: (value: T[]) => Observable<TTimeout>) {
        return this.array.throttle(selector);
    }

    public bufferTime(timeSpan: number, scheduler?: IScheduler): Observable<T[][]> {
        return this.array.bufferTime(timeSpan, scheduler);
    }

    public bufferCount(count: number, skip?: number): Observable<T[][]> {
        return this.array.bufferCount(count, skip);
    }

    public bufferTimeCount(timeSpan: number, count: number, skip?: number, scheduler?: IScheduler) {
        return this.array.bufferTimeCount(timeSpan, count, skip, scheduler);
    }

    public asObservable(): Observable<T[]> {
        return this.array.asObservable();
    }

    public asObserver(): Observer<T[]> {
        return this.array.asObserver();
    }

    public asSubject(): Subject<T[]> {
        return this.array.asSubject();
    }

    public asBehaviourSubject(): BehaviorSubject<T[]> {
        return this.array.asBehaviourSubject();
    }
}
