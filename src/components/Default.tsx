import React, { PureComponent } from 'react';

import { BranchProps } from './Branch';

import { Branch } from '.';

type DefaultState = BranchProps;

class Default extends PureComponent<{}, DefaultState> {
    readonly state: DefaultState = {
        matching: false,
    };

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

export default Default;
