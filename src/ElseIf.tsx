import { PureComponent } from 'react';

import { If } from './';

import { getInternalFiber, disableSiblingBranch, enableSiblingBranch } from './utils';

interface ElseIfProps {
    condition: boolean;
}

interface ElseIfState {
    internalCondition: boolean;
}

class ElseIf extends PureComponent<ElseIfProps, ElseIfState> {
    public readonly state: ElseIfState = {
        internalCondition: false,
    };

    public componentDidMount() {
        this.updateInternalCondition();
    }

    public componentDidUpdate({ condition: prevCondition }: ElseIfProps) {
        const { condition } = this.props;
        prevCondition !== condition && this.updateInternalCondition();
    }

    private alreadyHasPreviousEnabledBranch(current: any) {
        let child = current.return.child;
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
    }

    private updateInternalCondition() {
        const { condition } = this.props;
        const { internalCondition } = this.state;
        const current = getInternalFiber(this);
        if (this.alreadyHasPreviousEnabledBranch(current)) {
            // It doesn't make sense to this `ElseIf` branch, skip it.
            return;
        }
        if (condition) {
            this.setState(state => ({ ...state, internalCondition: true }));
            return disableSiblingBranch(current);
        }
        if (internalCondition) {
            this.setState(state => ({ ...state, internalCondition: false }));
            return enableSiblingBranch(current);
        }
    }

    public render() {
        const { children } = this.props;
        const { internalCondition } = this.state;
        return internalCondition ? children : null;
    }
}

export default ElseIf;
