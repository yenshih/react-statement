import { PureComponent } from 'react';

import { getInternalFiber, disableSiblingBranch, enableSiblingBranch } from './utils';

interface IfProps {
    condition: boolean;
}

class If extends PureComponent<IfProps> {
    componentDidMount() {
        this.updateInternalCondition();
    }

    componentDidUpdate() {
        this.updateInternalCondition();
    }

    private updateInternalCondition() {
        const { condition } = this.props;
        const current = getInternalFiber(this);

        return condition ? disableSiblingBranch(current) : enableSiblingBranch(current);
    }

    render() {
        const { condition, children } = this.props;

        return condition ? children : null;
    }
}

export default If;
