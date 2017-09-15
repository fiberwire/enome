import {
  BehaviorSubject,
  Observable,
  Observer,
  ReplaySubject,
  Scheduler,
  Subject,
  Subscription,
} from 'rxjs';
// tslint:disable-next-line:no-submodule-imports
import { IScheduler } from 'rxjs/Scheduler';
import { ReactiveProperty } from './index';

import * as _ from 'lodash';

export class ReactiveCollection<T> {
  private pushed: ReplaySubject<T> = new ReplaySubject<T>(1);
  private popped: ReplaySubject<T> = new ReplaySubject<T>(1);
  private shifted: ReplaySubject<T> = new ReplaySubject<T>(1);
  private unshifted: ReplaySubject<T> = new ReplaySubject<T>(1);
  private removed: ReplaySubject<T> = new ReplaySubject<T>(1);
  private rotated: ReplaySubject<T> = new ReplaySubject<T>(1);

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
      this.subscribeToPush(pushed => {
        const v = this.value;
        v.push(pushed);
        this.value = v;
      }),
      this.subscribeToUnshift(unshifted => {
        const v = this.value;
        v.unshift(unshifted);
        this.value = v;
      }),
    ];
  }

  public dispose(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public subscribeToPush(
    observer: (value: T) => void | Observer<T>
  ): Subscription {
    return this.pushed
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(observer);
  }

  public subscribeToPop(
    observer: (value: T) => void | Observer<T>
  ): Subscription {
    return this.popped
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(observer);
  }

  public subscribeToShift(
    observer: (value: T) => void | Observer<T>
  ): Subscription {
    return this.shifted
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(observer);
  }

  public subscribeToUnshift(
    observer: (value: T) => void | Observer<T>
  ): Subscription {
    return this.unshifted
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(observer);
  }

  public subscribeToRemove(
    observer: (value: T) => void | Observer<T>
  ): Subscription {
    return this.removed
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(observer);
  }

  public subscribeToRotate(
    observer: (value: T) => void | Observer<T>
  ): Subscription {
    return this.rotated
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(observer);
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

  public removeAt(i: number): ReactiveCollection<T> {
    this.remove(this.value[i]);
    return this;
  }

  //////// DON'T ROTATE INSIDE OF A SUBSCRIBER TO ROTATE
  //////// IT WILL CAUSE AN ENDLESS RECURSION
  //////// It's like telling the collection to rotate when it rotates
  //////// but since it rotates when it rotates
  //////// it will just rotate again, since you rotated
  //////// although, you can rotate a different collection inside a subscriber

  // takes the first value, pushes it to the back of the bus, and returns it.
  public rotate(): T {
    const value = this.value;
    const shifted = value.shift();
    value.push(shifted);
    this.rotated.next(shifted);
    this.value = value;
    return shifted;
  }

  public rotateEach(action: (value: T) => void): void {
    _.range(this.value.length).forEach(i => {
      action(this.rotate());
    });
  }

  public mapCollection<U>(selector: (value: T) => U): ReactiveCollection<U> {
    return new ReactiveCollection<U>(this.value.map(selector));
  }

  public filterCollection(
    selector: (value: T) => boolean
  ): ReactiveCollection<T> {
    return new ReactiveCollection<T>(this.value.filter(selector));
  }

  public forEach(action: (value: T) => void): ReactiveCollection<T> {
    this.value.forEach(action);
    return this;
  }

  public subscribe(
    observer: (value: T[]) => void | Observer<T[]>
  ): Subscription {
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

  public debounceWithSelector<TTimeout>(
    selector: (value: T[]) => Observable<TTimeout>
  ) {
    return this.array.throttle(selector);
  }

  public bufferTime(
    timeSpan: number,
    scheduler?: IScheduler
  ): Observable<T[][]> {
    return this.array.bufferTime(timeSpan, scheduler);
  }

  public bufferCount(count: number, skip?: number): Observable<T[][]> {
    return this.array.bufferCount(count, skip);
  }

  public bufferTimeCount(
    timeSpan: number,
    count: number,
    skip?: number,
    scheduler?: IScheduler
  ) {
    return this.array.bufferTimeCount(timeSpan, count, skip, scheduler);
  }

  public zip<U>(other: Observable<U>): Observable<[T[], U]> {
    return this.array.zip(other);
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
