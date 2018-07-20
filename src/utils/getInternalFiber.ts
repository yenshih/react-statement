import { Component } from 'react';

import { Fiber } from '../types';

const getInternalFiber = (instance: Component) => {
    const internalFiberKey = Object.keys(instance).find(key => key.startsWith('_reactInternalFiber'));

    if (!internalFiberKey) {
        throw new Error('[react-statement] react-statement only supports react v16.');
    }

    return (instance as any)[internalFiberKey] as Fiber;
};

export default getInternalFiber;
