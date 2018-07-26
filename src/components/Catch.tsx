import { PureComponent, ErrorInfo, ReactNode } from 'react';

interface CatchProps {
    children: (error: Error, info: ErrorInfo) => ReactNode;
}

interface CatchState {
    error?: Error;
    info?: ErrorInfo;
}

class Catch extends PureComponent<CatchProps, CatchState> {
    readonly state: CatchState = {};

    render() {
        const { children } = this.props;
        const { error, info } = this.state;

        return error && info ? children(error, info) : null;
    }
}

export default Catch;
