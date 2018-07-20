import { ElseIf, Else } from '..';

import { Fiber } from '../types';

import { areComponentsEqual } from '.';

const disableSiblingBranch = (current: Fiber) => {

    /*
     * This branch is currently being enabled.
     * Find the first sibling branch with truthy `internalCondition` state.
     * Disable that branch.
     */
    let child = current.sibling;

    while (child && areComponentsEqual(child.type, ElseIf)) {
        const instance: ElseIf = child.stateNode;

        if (instance.state.internalCondition) {
            instance.setState(state => ({ ...state, internalCondition: false }));

            return;
        }

        child = child.sibling;
    }

    if (child && areComponentsEqual(child.type, Else)) {
        const instance: Else = child.stateNode;

        if (instance.state.internalCondition) {
            instance.setState(state => ({ ...state, internalCondition: false }));
        }
    }
};

export default disableSiblingBranch;
