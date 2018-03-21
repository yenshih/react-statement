import { ElseIf, Else } from '../';

export const disableSiblingBranch = (current: any) => {
    // This branch is currently being enabled.
    // Find the first sibling branch with truthy `internalCondition` state.
    // Disable that branch.
    let child = current.sibling;
    while (child) {
        if (child.type !== ElseIf && child.type !== Else) {
            return;
        }
        if (child.memoizedState.internalCondition) {
            const instance = child.stateNode;
            instance.setState((state: any) => ({ ...state, internalCondition: false }));
            return;
        }
        if (child.type === Else) {
            return;
        }
        child = child.sibling;
    }
};
