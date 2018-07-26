import { Fiber } from '../types';

interface FiberIteratorConfig {
    criterion?: (fiber: Fiber) => boolean;
    iteratee?: (fiber: Fiber) => void;
}

const iterateFibers = ({ criterion, iteratee }: FiberIteratorConfig) => (fiber: Fiber | null) => {
    let node = fiber;

    while (node) {
        if (criterion && !criterion(node)) {
            return node;
        }

        iteratee && iteratee(node);

        node = node.sibling;
    }

    return node;
};

export default iterateFibers;
