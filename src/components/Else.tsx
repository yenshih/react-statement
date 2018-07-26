import React, { PureComponent } from 'react';

import { BranchProps } from './Branch';

import { Branch } from '.';

type ElseState = BranchProps;

class Else extends PureComponent<{}, ElseState> {
    readonly state: ElseState = {
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

export default Else;
