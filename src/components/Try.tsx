import { PureComponent, ErrorInfo } from 'react';

import { getInternalFiber, areComponentsEqual } from '../utils';

import { Catch } from '.';

class Try extends PureComponent {
    componentDidCatch(error: Error, info: ErrorInfo) {
        const current = getInternalFiber(this);
        const { sibling } = current;

        if (!sibling || !areComponentsEqual(Catch)(sibling.type)) {
            return;
        }

        const instance: Catch = sibling.stateNode;

        instance.setState(state => ({ ...state, error, info }));
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

export default Try;
