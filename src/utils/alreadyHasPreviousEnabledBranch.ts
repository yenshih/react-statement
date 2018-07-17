import { If, ElseIf } from '..';

const alreadyHasPreviousEnabledBranch = (current: any) => {
    let { child } = current.return;
    let isEnabled = false;

    while (child !== current) {
        if (child.type === ElseIf) {
            isEnabled = isEnabled || child.memoizedState.internalCondition;
        }
        if (child.type === If) {
            isEnabled = child.memoizedProps.condition;
        }
        child = child.sibling;
    }

    return isEnabled;
};

export default alreadyHasPreviousEnabledBranch;
