import React, { PureComponent } from 'react';

import { areComponentsEqual, getInternalFiber } from '../utils';

import { BranchProps } from './Branch';

import { Branch, Switch } from '.';

interface CaseProps<T> extends Pick<BranchProps, 'children'> {
    value: T;
    fallthrough?: true;
}

type CaseState = Pick<BranchProps, 'matching'>;

class Case<T> extends PureComponent<CaseProps<T>, CaseState> {
    readonly state: CaseState = {
        matching: false,
    };

    componentDidUpdate({ value: prevValue, fallthrough: prevFallthrough }: CaseProps<T>) {
        const { value, fallthrough } = this.props;

        if (prevValue === value && prevFallthrough === fallthrough) {
            return;
        }

        this.updateMatching();
    }

    private updateMatching() {
        const fiber = getInternalFiber(this);
        const parent = fiber.return;

        if (!parent || !areComponentsEqual(Switch)(parent.type)) {
            return;
        }

        const instance: Switch<T> = parent.stateNode;

        instance.updateMatching();
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

export default Case;
