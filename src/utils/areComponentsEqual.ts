import { ReactType } from 'react';

const areComponentsEqual = <P extends {}>(alice: ReactType<P>) => (bob: ReactType): bob is typeof alice => {
    if (!module.hot || process.env.NODE_ENV === 'production') {
        return alice === bob;
    }

    const unwrapProxy = <P extends {}>(type: ReactType<P>) => {

        /**
         * Call a magic method to get the original component.
         *
         * @see {@link https://github.com/gaearon/react-hot-loader/blob/master/src/proxy/createClassProxy.js}
         */
        const PREFIX = '__reactstandin__';
        const UNWRAP_PROXY = `${PREFIX}getCurrent`;

        return typeof (type as any)[UNWRAP_PROXY] === 'function' ? (type as any)[UNWRAP_PROXY]() as ReactType<P> : type;
    };

    /**
     * We try to unwrap both components since react-hot-loader may create proxied versions components.
     *
     * @see {@link https://github.com/gaearon/react-hot-loader#checking-element-types}
     */
    return unwrapProxy(alice) === unwrapProxy(bob);
};

export default areComponentsEqual;
