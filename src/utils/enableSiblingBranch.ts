import { ElseIf, Else } from '..';

import { Fiber } from '../types';

import { areComponentsEqual } from '.';

const enableSiblingBranch = (current: Fiber) => {

    /*
     * This branch is currently being disabled.
     * Find the first sibling `ElseIf` branch with truthy `condition` props, or the `Else` branch.
     * Enable that branch.
     */
    let child = current.sibling;

    while (child && areComponentsEqual(child.type, ElseIf)) {
        const instance: ElseIf = child.stateNode;

        if (instance.props.condition) {
            instance.setState(state => ({ ...state, internalCondition: true }));

            return;
        }

        child = child.sibling;
    }

    if (child && areComponentsEqual(child.type, Else)) {
        const instance: Else = child.stateNode;

        instance.setState(state => ({ ...state, internalCondition: true }));
    }
};

export default enableSiblingBranch;
