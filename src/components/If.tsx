import React, { PureComponent } from 'react';

import { getInternalFiber, disableBranches, enableBranches, needsToDisable, needsToEnable } from '../utils';

import { BranchProps } from './Branch';

import { Branch } from '.';

interface IfProps extends Pick<BranchProps, 'children'> {
    condition: boolean;
}

class If extends PureComponent<IfProps> {
    componentDidMount() {
        this.updateMatching();
    }

    componentDidUpdate() {
        this.updateMatching();
    }

    private updateMatching() {
        const { condition } = this.props;
        const fiber = getInternalFiber(this);

        return (condition ? disableBranches(needsToDisable) : enableBranches(needsToEnable))(fiber.sibling);
    }

    render() {
        const { condition, children } = this.props;

        return (
            <Branch matching={condition}>
                {children}
            </Branch>
        );
    }
}

export default If;
