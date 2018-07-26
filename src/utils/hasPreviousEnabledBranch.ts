import compose from 'lodash.flowright';

import { If, ElseIf } from '../components';
import { Fiber } from '../types';

import { isBranchFiber, reduceFibers } from '.';

const getFirstSiblingFiber = (fiber: Fiber) => {
    const parent = fiber.return;

    if (!parent) {
        return null;
    }

    return parent.child;
};

const collectBranch = (branches: ReadonlyArray<Fiber>, fiber: Fiber) => {
    if (isBranchFiber(If)(fiber)) {
        return [fiber];
    }

    if (isBranchFiber(ElseIf)(fiber)) {
        return branches.concat(fiber);
    }

    return [];
};

const collectBranches = (current: Fiber) => reduceFibers<ReadonlyArray<Fiber>>({
    criterion: fiber => fiber !== current,
    reducer: collectBranch,
}, []);

const collectPreviousBranches = (current: Fiber) => collectBranches(current)(getFirstSiblingFiber(current));

const isBranchEnabled = (branch: Fiber) => {
    const instance: If | ElseIf = branch.stateNode;

    return instance.props.condition;
};

const hasEnabledBranch = (branches: ReadonlyArray<Fiber>) => branches.some(isBranchEnabled);

const hasPreviousEnabledBranch = compose(
    hasEnabledBranch,
    collectPreviousBranches,
);

export default hasPreviousEnabledBranch;
