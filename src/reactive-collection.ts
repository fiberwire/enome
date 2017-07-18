import { BehaviorSubject, IDisposable, Observer, ReplaySubject, Subject } from "rx";
import { ReactiveProperty } from "./index";

export class ReactiveCollection<T> extends ReactiveProperty<T[]> {

    private pushed: ReplaySubject<T> = new ReplaySubject<T>(1);
    private popped: ReplaySubject<T> = new ReplaySubject<T>(1);
    private shifted: ReplaySubject<T> = new ReplaySubject<T>(1);
    private unshifted: ReplaySubject<T> = new ReplaySubject<T>(1);

    private subs: IDisposable[];

    constructor(value?: T[]) {
        super(value);

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

    public dispose() {
        this.subs.forEach((sub) => sub.dispose());
    }

    public subscribeToPush(observer: (value: T) => void | Observer<T>): IDisposable {
        return this.pushed.subscribe(observer);
    }

    public subscribeToPop(observer: (value: T) => void | Observer<T>): IDisposable {
        return this.popped.subscribe(observer);
    }

    public subscribeToShift(observer: (value: T) => void | Observer<T>): IDisposable {
        return this.shifted.subscribe(observer);
    }

    public subscribeToUnshift(observer: (value: T) => void | Observer<T>): IDisposable {
        return this.unshifted.subscribe(observer);
    }

    public push(value: T): ReactiveCollection<T> {
        this.pushed.onNext(value);
        return this;
    }

    public pop(value: T): T {
        const v = this.value;
        const popped = v.pop();
        this.popped.onNext(popped);
        this.value = v;
        return popped;
    }

    public shift(): T {
        const v = this.value;
        const shifted = v.shift();
        this.shifted.onNext(shifted);
        this.value = v;
        return shifted;
    }

    public unshift(value: T): ReactiveCollection<T> {
        this.unshifted.onNext(value);
        return this;
    }
}
