import { Component } from 'react';

const getInternalFiber = (instance: Component) => {
    const internalFiberKey = Object.keys(instance).find(key => key.startsWith('_reactInternalFiber'));

    if (!internalFiberKey) {
        return null;
    }

    return (instance as any)[internalFiberKey];
};

export default getInternalFiber;
