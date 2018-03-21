import { PureComponent } from 'react';

interface ElseState {
    internalCondition: boolean;
}

class Else extends PureComponent<{}, ElseState> {
    public readonly state: ElseState = {
        internalCondition: false,
    };

    public render() {
        const { children } = this.props;
        const { internalCondition } = this.state;
        return internalCondition ? children : null;
    }
}

export default Else;
