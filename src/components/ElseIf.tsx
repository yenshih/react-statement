import React, { PureComponent } from 'react';

import {
    disableBranches,
    enableBranches,
    getInternalFiber,
    hasPreviousEnabledBranch,
    needsToDisable,
    needsToEnable,
} from '../utils';

import { BranchProps } from './Branch';

import { Branch } from '.';

interface ElseIfProps extends Pick<BranchProps, 'children'> {
    condition: boolean;
}

type ElseIfState = Pick<BranchProps, 'matching'>;

class ElseIf extends PureComponent<ElseIfProps, ElseIfState> {
    readonly state: ElseIfState = {
        matching: false,
    };

    componentDidMount() {
        const { condition } = this.props;

        condition && this.updateMatching();
    }

    componentDidUpdate({ condition: prevCondition }: ElseIfProps) {
        const { condition } = this.props;

        prevCondition !== condition && this.updateMatching();
    }

    private updateMatching() {
        const { condition } = this.props;
        const { matching } = this.state;
        const fiber = getInternalFiber(this);

        if (hasPreviousEnabledBranch(fiber)) {
            // It doesn't make sense to this `ElseIf` branch, skip it.
            return;
        }

        if (condition) {
            this.setState(state => ({ ...state, matching: true }));

            disableBranches(needsToDisable)(fiber.sibling);
        }

        if (matching) {
            this.setState(state => ({ ...state, matching: false }));

            enableBranches(needsToEnable)(fiber.sibling);
        }
    }

    render() {
        const { children } = this.props;
        const { matching } = this.state;

        return (
            <Branch matching={matching}>
                {children}
            </Branch>
        );
    }
}

export default ElseIf;
