import { If, ElseIf } from '..';

import { Fiber } from '../types';

import { areComponentsEqual } from '.';

const collectBranches = (branches: Fiber[], child: Fiber) => {
    switch (true) {
        case areComponentsEqual(child.type, If): return [child];
        case areComponentsEqual(child.type, ElseIf): return branches.concat(child);
        default: return [];
    }
};

const alreadyHasPreviousEnabledBranch = (current: Fiber) => {
    const parent = current.return;

    if (!parent) {
        return true;
    }

    let { child } = parent;

    let branches: Fiber[] = [];

    while (child !== null && child !== current) {
        branches = collectBranches(branches, child);

        child = child.sibling;
    }

    for (const branch of branches) {
        const instance: If | ElseIf = branch.stateNode;

        if (instance.props.condition) {
            return true;
        }
    }

    return false;
};

export default alreadyHasPreviousEnabledBranch;
