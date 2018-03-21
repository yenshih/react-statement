import { PureComponent } from 'react';

import { getInternalFiber, disableSiblingBranch, enableSiblingBranch } from './utils';

interface IfProps {
    condition: boolean;
}

class If extends PureComponent<IfProps> {
    public componentDidMount() {
        this.updateInternalCondition();
    }

    public componentDidUpdate() {
        this.updateInternalCondition();
    }

    private updateInternalCondition() {
        const { condition } = this.props;
        const current = getInternalFiber(this);
        return condition ? disableSiblingBranch(current) : enableSiblingBranch(current);
    }

    public render() {
        const { condition, children } = this.props;
        return condition ? children : null;
    }
}

export default If;
