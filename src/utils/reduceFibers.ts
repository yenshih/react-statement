import { Fiber } from '../types';

import { iterateFibers } from '.';

interface FiberReducerConfig<T> {
    criterion?: (fiber: Fiber) => boolean;
    reducer: (accumulator: T, fiber: Fiber) => T;
}

const reduceFibers = <T>({ criterion, reducer }: FiberReducerConfig<T>, initialValue: T) => (fiber: Fiber | null) => {
    let accumulator = initialValue;

    const iteratee = (fiber: Fiber) => {
        accumulator = reducer(accumulator, fiber);
    };

    iterateFibers({
        criterion,
        iteratee,
    })(fiber);

    return accumulator;
};

export default reduceFibers;
