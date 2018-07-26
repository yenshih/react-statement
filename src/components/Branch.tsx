import { PureComponent, ReactNode } from 'react';

export interface BranchProps {
    matching: boolean;
    children?: ReactNode | (() => ReactNode);
}

class Branch extends PureComponent<BranchProps> {
    render() {
        const { matching, children } = this.props;

        if (!matching || !children) {
            return null;
        }

        return typeof children === 'function' ? children() : children;
    }
}

export default Branch;
