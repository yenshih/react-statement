import { PureComponent } from 'react';

import { getInternalFiber } from '../utils';

interface SwitchProps<T> {
    expression?: T;
}

class Switch<T> extends PureComponent<SwitchProps<T>> {
    componentDidMount() {
        this.updateMatching();
    }

    componentDidUpdate({ expression: prevExpression = true }: SwitchProps<T>) {
        const { expression = true } = this.props;

        prevExpression !== expression && this.updateMatching();
    }

    updateMatching() {
        const { expression } = this.props;
        const fiber = getInternalFiber(this);

        // TODO: need for further improvement
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

export default Switch;
