import { PureComponent } from 'react';

import { alreadyHasPreviousEnabledBranch, disableSiblingBranch, enableSiblingBranch, getInternalFiber } from './utils';

interface ElseIfProps {
    condition: boolean;
}

interface ElseIfState {
    internalCondition: boolean;
}

class ElseIf extends PureComponent<ElseIfProps, ElseIfState> {
    readonly state: ElseIfState = {
        internalCondition: false,
    };

    componentDidMount() {
        this.updateInternalCondition();
    }

    componentDidUpdate({ condition: prevCondition }: ElseIfProps) {
        const { condition } = this.props;

        prevCondition !== condition && this.updateInternalCondition();
    }

    private updateInternalCondition() {
        const { condition } = this.props;
        const { internalCondition } = this.state;
        const current = getInternalFiber(this);

        if (alreadyHasPreviousEnabledBranch(current)) {
            // It doesn't make sense to this `ElseIf` branch, skip it.
            return;
        }
        if (condition) {
            this.setState(state => ({ ...state, internalCondition: true }));

            disableSiblingBranch(current);
        }
        if (internalCondition) {
            this.setState(state => ({ ...state, internalCondition: false }));

            enableSiblingBranch(current);
        }
    }

    render() {
        const { children } = this.props;
        const { internalCondition } = this.state;

        return internalCondition ? children : null;
    }
}

export default ElseIf;
