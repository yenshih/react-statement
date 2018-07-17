import { PureComponent } from 'react';

interface ElseState {
    internalCondition: boolean;
}

class Else extends PureComponent<{}, ElseState> {
    readonly state: ElseState = {
        internalCondition: false,
    };

    render() {
        const { children } = this.props;
        const { internalCondition } = this.state;

        return internalCondition ? children : null;
    }
}

export default Else;
