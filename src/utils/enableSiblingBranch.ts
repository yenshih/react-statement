import { ElseIf, Else } from '../';

export const enableSiblingBranch = (current: any) => {
    // This branch is currently being disabled.
    // Find the first sibling `ElseIf` branch with truthy `condition` props, or the `Else` branch.
    // Enable that branch.
    let child = current.sibling;
    while (child) {
        if (child.type !== ElseIf && child.type !== Else) {
            return;
        }
        if (child.memoizedProps.condition || child.type === Else) {
            const instance = child.stateNode;
            instance.setState((state: any) => ({ ...state, internalCondition: true }));
            return;
        }
        child = child.sibling;
    }
};
